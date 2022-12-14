import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Typography, Box } from '@mui/material';

const MinimizedLegContainer = ({ partialTripState }) => (
  <Box className="minimized-legs-container">
    <Typography variant="p" component="p">{`${partialTripState[0].originName} ${partialTripState[0].departureTime.slice(0, 5)}`}</Typography>
    <Box className="arrowIcon">
      <ArrowForwardIcon sx={{ fontSize: 18 }} />
    </Box>
    <Typography className="minimized-legs-container__destination" variant="p" component="p">{`${partialTripState[partialTripState.length - 1].destName} ${partialTripState[partialTripState.length - 1].arrivalTime.slice(0, 5)}`}</Typography>
    <Box>
      <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 30 }} />
    </Box>
  </Box>
);

export default MinimizedLegContainer;
