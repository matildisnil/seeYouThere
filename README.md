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

### How to install and run the project
The frontend and the backend are kept in different folders on github, you will need to run `npm install` in both. Run the backend in development with `npm run dev` and the frontend with `npm start`.

To make it work, you need the api keys from trafiklab. You can get them by creating a user account and creating a project. You can then request the keys you need. Put them in a .env-file in the backend and name them:
SL_PLATSUPPSLAG_KEY and RESEPLANERARE_31_KEY.

### Known issues
I've been having issues with requests to the SL api:s timing out or sending empty responses. Removing a Promise.all and making the requests one at a time seems to largely have solved it, but some requests still do time out. This also means that the backend has to wait for 5 requests (instead of 3) before it can send a response to the frontend, theoretically making it a lot slower.
