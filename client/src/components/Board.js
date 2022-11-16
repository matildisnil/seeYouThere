import React from 'react';
import Trip from './Trip';

const Board = ({ tripState }) => (
  <div className="board">
    <Trip partialTripState={tripState.trip1} person="p1" />
    <Trip partialTripState={tripState.trip2} person="p2" />
  </div>
);

export default Board;
