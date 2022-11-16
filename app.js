const express = require('express');
const cors = require("cors");
const app = express();
require('dotenv').config();
const fetch = require('node-fetch');
const slPlatsuppslagKey = process.env.SL_PLATSUPPSLAG_KEY;
const slReseplanerare31Key = process.env.RESEPLANERARE_31_KEY;

app.use(express.static('static'));
express.urlencoded({ extended: false });

if (process.env.NODE_ENV === 'development') {
  const whitelist = ["http://localhost:3000"]
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  }
  app.use(cors(corsOptions));
}

const errorChecker = (parsedResponseData) => {
  if(!parsedResponseData || parsedResponseData?.ResponseData?.length === 0){
    throw new Error("Request to TRAFIKLABs api returned empty response.")
  }
  if(parsedResponseData?.Message?.includes('Request timed out')){
    throw new Error("Request to TRAFIKLABs api timed out.")
  }
}

const getSiteId = async (place) => {
  const encodedPlace = encodeURIComponent(place);
  const slPlatsuppslagUri = `https://api.sl.se/api2/typeahead.json?key=${slPlatsuppslagKey}&searchstring=${encodedPlace}&stationsonly=true&maxresults=5`;
  const response = await fetch(slPlatsuppslagUri);
  // console.log(response, encodedPlace);
  const parsedResponse = await response.json();
  // console.log(parsedResponse, encodedPlace);
  errorChecker(parsedResponse);
  return parsedResponse.ResponseData[0].SiteId;
}

const getTrip = async (fromCode, toCode, time, person) => {
  const slTripUri = `http://api.sl.se/api2/TravelplannerV3_1/trip.json?key=${slReseplanerare31Key}&originId=${fromCode}&destId=${toCode}&Time=${time}${person === 'p2' ? '&searchForArrival=1' : ''}`;
  const response = await fetch(slTripUri);
  const parsedResponse = await response.json();
  errorChecker(parsedResponse);
  const trip = person === 'p1' ? parsedResponse.Trip[0].LegList.Leg : parsedResponse.Trip[parsedResponse.Trip.length - 1].LegList.Leg;
  const tripData = trip.map(partOfTrip => {
    return {
      originName: partOfTrip.Origin.name,
      destName: partOfTrip.Destination.name,
      departureTime: partOfTrip.Origin.time,
      arrivalTime: partOfTrip.Destination.time,
      meansOfTransportation: partOfTrip.Product ? partOfTrip.Product.name : partOfTrip.type,
      direction: partOfTrip.direction || '',
    }
  });
  return tripData;
}



app.get('/api/trips', async (req, res, next) => {
  try {
    const from1 = req.query.from1;
    const from2 = req.query.from2;
    const dest = req.query.destination;
    const departureTime = req.query.departureTime;
    // Although Promise.all would seem like a faster way of getting the data from the api, it very often results in requests timing out.
    // const [from1SiteId, from2SiteId, destSiteId] = await Promise.all([getSiteId(from1), getSiteId(from2), getSiteId(dest)]);
    const from1SiteId = await getSiteId(from1);
    const from2SiteId = await getSiteId(from2);
    const destSiteId = await getSiteId(dest);
    
    const trip1 = await getTrip(from1SiteId, destSiteId, departureTime, 'p1');
    const arrivalTime = trip1[trip1.length - 1].arrivalTime;
    const trip2 = await getTrip(from2SiteId, destSiteId, arrivalTime, 'p2');
    const responseObject = { trip1, trip2 };
    res.json(responseObject);
  } catch (err) {
    if(err.message.includes('Request to TRAFIKLABs api timed out')){
      return res.status(504).json({ message: 'The request to the TRAFIKLAB api timed out. Please try again.' })
    }
    if(err.message.includes('Request to TRAFIKLABs api returned empty response')){
      return res.status(502).json({ message: 'The request to the TRAFIKLAB api returned an empty response. Please try again.' }) 
    }
    if (err.message.includes('Cannot read properties of undefined')) {
      return res.status(502).json({ message: 'Something went wrong requesting data from TRAFIKLAB. Please try again.' })
    }
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

module.exports.app = app;