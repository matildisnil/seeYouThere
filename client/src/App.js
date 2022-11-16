import React, { useState } from 'react';
import Board from './components/Board';
import Form from './components/Form';
// import './App.css';

function App() {
  const [tripState, setTripState] = useState(null);
  // console.log(tripState);
  return (
    <div className="app">
      <Form setTripState={setTripState} />
      {tripState
        ? <Board tripState={tripState} />
        : ''}
    </div>
  );
}

export default App;
