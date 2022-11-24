const express = require('express')
const app = express()
const port = 3001
p1 = (ms) =>  new Promise(resolve => setTimeout(resolve, ms));
const mockdata = require('./mockdata.js');

app.get('/platsuppslag', async (req, res) => {
  const random = Math.random();
  if(random > 0.9){
    res.json({ StatusCode: 0, Message: null, ExecutionTime: 0, ResponseData: [] });
  } else if (random >0.7){
    const result = await p1(4000);
    res.json({
      StatusCode: 1008,
      Message: 'Request timed out, timeout is set to:10000'
    });
  } else if(random >0.6){
    res.json({Message: 'random error'});
  }
  else {
    res.json(mockdata.siteData);
  }
})

app.get('/travelplanner', async (req, res) => {
  const random = Math.random();
  if (random > 0.9){
    res.json(null);
  } else if (random >0.8){
    await p1(4000);
    res.json({
      StatusCode: 1008,
      Message: 'Request timed out, timeout is set to:10000'
    })
  } else if(random >0.7){
    res.json('random error');
  } else {
    res.json(mockdata.tripData);
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})