# seeYouThere

## This is an app to help you synchronise your travelling on the Stockholm public transportation to meet someone

### Link to deployed app
https://see-you-there.herokuapp.com/

### Description
You are meeting your friend in the city and you are both very busy people. She sends you a message saying she will take the 18:10 train from Kista, but she doesn't really have the time to check when she will be arriving at Hornstull. So there you are, making several different searches in the SL-app to figure out when you should be leaving Liljeholmen to arrive at the same time.

This app does the job for you.

To do this, it makes several requests to two of trafiklabs api:s: SL Platsuppslag and SL Reseplanerare 3.1. SL Platsuppslag is needed to convert the names of places into place id:s, which you can then send to SL Reseplanerare 3.1 to get your trip suggestions.

### Tech stack
The tech I'm using is node.js and express for the backend and React for the frontend.

### Future improvements
I've realized there is a bit of a UX problem, as a lot of people assume that the time you input should be the time that you both want to arrive. To fix that, I plan to add that feature to the app, so that you can switch between the two.

### Known issues
#### Trafiklab API sending timeouts and empty responses
I've been having issues with requests to the SL api:s timing out or sending empty responses. Removing a Promise.all and making all the requests one at a time improved the situation, but some requests still do time out. This also means that the backend has to wait for 5 requests (instead of 2 + one Promise.all) before it can send a response to the frontend, theoretically making it a lot slower.

After communicating about my problem with Trafiklab, they told me it should work better if I space my request in time. While I think this is something they really should solve on their side, I want my app to work right now, so I saw this as an opportunity to learn handling API:s not working exactly as well as you would want them to. Trafiklab sends me back a message saying the request timed out after 10 seconds. I don't want to wait that long, so what I did is I set a time limit to my requests of 1 second. If I haven't gotten the response by then, I send a new request. I do this three times if necessary. In this process I also check that I didn't get back an empty response, which is another source of errors with these API:s.

To be able to manually test this without sending a thousand requests to the actual api:s, I made a very basic mock api, returning random errors more often than the real api, and otherwise some data in the expected form and shape. 

#### Other issues
When using the platsuppslag API I am simply taking the first suggestions of several. Most of the time that works great. For a few places this gives slightly unexpected results: searching for Farsta right now will give you Farsta strand as the first suggestion.

Getting the first persons trip is a simple as inputting all the given data in a query string. To get the second persons trip is somewhat more complicated, and there is also room for improvement here. There is an option in the API to get a trip arriving before a certain time instead of choosing the departure time. To then get the second persons trip, we simply have to take the last in the array of trip suggestions that is the response of our request. However, this does not really take into account that a train that would suit us much better might arrive two minutes after the time we put in. To handle this, I would have to do something more complex, possibly adding a few minutes to the time in the request and then comparing the arrival times with the requested one.

### How to install and run the project
To run this project in development mode, you need the api keys from trafiklab. You can get them by creating a user account and creating a project at Trafiklab.se. You can then request the keys you need. Put them in a .env-file in the backend and name them:
SL_PLATSUPPSLAG_KEY and RESEPLANERARE_31_KEY.

To start the backend run `npm install`, then `npm run dev`.
To start the frontend cd into `client`, then `npm install` and `npm run start`.

The project can also be run with my mockAPI. It won't return the right data, and is only there to allow for experiments with error handling.

To start the mockAPI, cd into `mockAPI` then `npm run start`.
Start the regular backend with `npm run withMock` instead.
The frontend is started as above.