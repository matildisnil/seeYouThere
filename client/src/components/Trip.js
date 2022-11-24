import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';

import ExpandedLegContainer from './ExpandedLegContainer';
import MinimizedLegContainer from './MinimizedLegContainer';

const Trip = ({ partialTripState, person }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleIsExpanded = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <Box className="container trip-container" onClick={toggleIsExpanded}>
      <Typography variant="h6" component="h2">
        Person
        {person === 'p1' ? ' 1 ' : ' 2 ' }
      </Typography>
      <div>
        {isExpanded
          ? <ExpandedLegContainer partialTripState={partialTripState} />
          : <MinimizedLegContainer partialTripState={partialTripState} />}
      </div>
    </Box>
  );
};

export default Trip;
