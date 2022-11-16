import React from 'react';
import Leg from './Leg';

const ExpandedLegContainer = ({ partialTripState }) => (
  <div>
    {partialTripState.map((element, index) => (
      <Leg
        legState={element}
          // eslint-disable-next-line react/no-array-index-key
        key={index + element.destName}
        index={index} />
    ))}
  </div>
);

export default ExpandedLegContainer;
