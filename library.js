require('dotenv').config();
const fetch = require('node-fetch');
const slPlatsuppslagKey = process.env.SL_PLATSUPPSLAG_KEY;
const slReseplanerare31Key = process.env.RESEPLANERARE_31_KEY;

const AbortController = require('abort-controller');

const responseChecker = (parsedResponseData) => {
  // this could probably be cleaned up
  if (!parsedResponseData || parsedResponseData?.ResponseData?.length === 0) {
    throw new Error("Request to TRAFIKLABs api returned empty response.");
  }
  if (parsedResponseData?.Message?.includes('Request timed out')) {
    throw new Error("Request to TRAFIKLABs api timed out.");
  }
  if (!parsedResponseData?.ResponseData && !parsedResponseData?.Trip) {
    throw new Error("Invalid response.");
  }
}

const fetchWithTimeoutAndResultChecker = async (uri) => {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 1000);

  try {
    const response = await fetch(uri, { signal: controller.signal });
    clearTimeout(timeout);
    const parsedResponse = await response.json();
    responseChecker(parsedResponse);
    return parsedResponse;
  } catch (error) {
    // if (error.name === "AbortError") {
    //   console.log('request was aborted');
    // }
  } finally {
    clearTimeout(timeout);
  }
}

const getSiteId = async (place) => {
  const encodedPlace = encodeURIComponent(place);
  const slPlatsuppslagUri = process.env.NODE_ENV === "test" ? "http://localhost:3001/platsuppslag" : `https://api.sl.se/api2/typeahead.json?key=${slPlatsuppslagKey}&searchstring=${encodedPlace}&stationsonly=true&maxresults=1`;

  try {
    let siteId = null;
    let counter = 3;
    while (!siteId && counter > 0) {
      const data = await fetchWithTimeoutAndResultChecker(slPlatsuppslagUri);
      siteId = data?.ResponseData[0]?.SiteId;
      counter--
    }
    if (counter === 0 && !siteId) {
      throw new Error("Couldn't get data from TRAFIKLAB");
    }
    return siteId;
  } catch (err) {
    throw (err);
  }
}

const getTrip = async (fromCode, toCode, time, person) => {
  try {
    const slTripUri = process.env.NODE_ENV === "test" ? "http://localhost:3001/travelplanner" : `http://api.sl.se/api2/TravelplannerV3_1/trip.json?key=${slReseplanerare31Key}&originId=${fromCode}&destId=${toCode}&Time=${time}${person === 'p2' ? '&searchForArrival=1' : ''}`;
    let trip = null;
    let counter = 3;
    while (!trip && counter > 0) {
      const data = await fetchWithTimeoutAndResultChecker(slTripUri);
      trip = person === 'p1' ? data?.Trip[0]?.LegList?.Leg : data?.Trip[data?.Trip?.length - 1]?.LegList?.Leg;
      counter--
    }
    if (counter === 0 && !trip) {
      throw new Error("Couldn't get data from TRAFIKLAB");
    }

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
  } catch (err) {
    throw (err);
  }
}

module.exports = {
  getSiteId, getTrip
}