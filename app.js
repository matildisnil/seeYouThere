const express = require('express');
const cors = require("cors");
const app = express();
const { trips } = require("./controller.js");
require('dotenv').config();

app.use(express.static('static'));
express.urlencoded({ extended: false });

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
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

app.get('/api/trips', trips);

module.exports.app = app;