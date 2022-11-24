const express = require('express');
const cors = require("cors");
const app = express();
// const controller = require("./controller.js");
// require('dotenv').config();

app.use(express.static('static'));
// express.urlencoded({ extended: false });

// if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
//   const whitelist = ["http://localhost:3000"]
//   const corsOptions = {
//     origin: function (origin, callback) {
//       if (!origin || whitelist.indexOf(origin) !== -1) {
//         callback(null, true)
//       } else {
//         callback(new Error("Not allowed by CORS"))
//       }
//     },
//     credentials: true,
//   }
//   app.use(cors(corsOptions));
// }

// app.get('/api/trips', controller.trips);

app.get('/test',(req,res) => {
  res.json({'message': 'hello'});
})

module.exports.app = app;