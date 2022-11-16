import { Divider } from '@mui/material';
import React from 'react';

const Leg = ({ legState, index }) => (
  <div>
    {index === 0 ? '' : <Divider />}
    <div>{`${legState.meansOfTransportation} ${legState.meansOfTransportation !== 'WALK' ? `towards ${legState.direction}` : ''}`}</div>
    <div className="leg__part">
      <div>{`${legState.originName}`}</div>
      <div>{`${legState.departureTime.slice(0, 5)}`}</div>
    </div>
    <div className="leg__part">
      <div>{`${legState.destName}`}</div>
      <div>{`${legState.arrivalTime.slice(0, 5)}`}</div>
    </div>
  </div>
);

export default Leg;
