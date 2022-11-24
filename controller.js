const lib = require("./library.js");

module.exports.trips = async (req, res) => {
  try {
    const from1 = req.query.from1;
    const from2 = req.query.from2;
    const dest = req.query.destination;
    const departureTime = req.query.departureTime;
    // Although Promise.all would seem like a faster way of getting the data from the api, it very often results in requests timing out.
    // const [from1SiteId, from2SiteId, destSiteId] = await Promise.all([getSiteId(from1), getSiteId(from2), getSiteId(dest)]);
    const from1SiteId = await lib.getSiteId(from1);
    const from2SiteId = await lib.getSiteId(from2);
    const destSiteId = await lib.getSiteId(dest);
    
    const trip1 = await lib.getTrip(from1SiteId, destSiteId, departureTime, 'p1');
    const arrivalTime = trip1[trip1.length - 1].arrivalTime;
    const trip2 = await lib.getTrip(from2SiteId, destSiteId, arrivalTime, 'p2');
    const responseObject = { trip1, trip2 };
    res.json(responseObject);
  } catch (err) {
    if (err.message.includes("Couldn't get data from TRAFIKLAB")) {
      return res.status(502).json({ message: "Couldn't get data from TRAFIKLAB" });
    }
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};