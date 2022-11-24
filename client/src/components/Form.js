import {
  TextField, Button, Box, Typography, Link,
} from '@mui/material';
import React, { useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

const REACT_APP_PATH_TO_SERVER = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080'
  : 'https://see-you-there.herokuapp.com';

const Form = ({ setTripState }) => {
  const defaultValues = {
    p1From: '',
    p2From: '',
    destination: '',
  };
  const [formValues, setFormValues] = useState(defaultValues);
  const [timeValue, setTimeValue] = useState(null);
  const [errMessage, setErrMessage] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleClearInputField = name => {
    setFormValues(prev => ({ ...prev, [name]: '' }));
  };

  const formSubmitHandler = async e => {
    e.preventDefault();
    setTripState(null);
    setErrMessage('');
    try {
      const formattedTime = timeValue._d.toLocaleTimeString('it-IT');
      const uri = `${REACT_APP_PATH_TO_SERVER}/api/trips?from1=${formValues.p1From}&from2=${formValues.p2From}&destination=${formValues.destination}&departureTime=${formattedTime}`;
      const data = await fetch(uri);
      const parsedData = await data.json();
      if (!data.ok) {
        throw new Error(parsedData.message);
      }
      setTripState(parsedData);
    } catch (err) {
      setErrMessage(err.message);
    }
  };

  return (
    <Box className="form-container container">
      <Typography variant="h3" component="h1" align="center" m={2} className="form-container__heading">See you there!</Typography>
      <Typography variant="body1" component="h2" align="center" mt={2} className="form-container__subheading">
        This app retrieves information from
      </Typography>
      <Typography variant="body1" component="h2" align="center" mb={3} className="form-container__subheading">
        <Link href="https://www.trafiklab.se/" target="_blank" rel="noreferrer">Trafiklab.se</Link>
      </Typography>
      <form onSubmit={formSubmitHandler} className="form">
        <TextField
          id="p1From-input"
          name="p1From"
          label="Where is person 1 travelling from?"
          type="text"
          value={formValues.p1From}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear person 1 departure input field"
                  onClick={() => handleClearInputField('p1From')}
                  edge="end">
                  {formValues.p1From && <ClearIcon />}
                </IconButton>
              </InputAdornment>),
          }}
          required />
        <TextField
          id="p2From-input"
          name="p2From"
          label="Where is person 2 travelling from?"
          type="text"
          value={formValues.p2From}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear person 2 departure input field"
                  onClick={() => handleClearInputField('p2From')}
                  edge="end">
                  {formValues.p2From && <ClearIcon />}
                </IconButton>
              </InputAdornment>),
          }}
          required />
        <TextField
          id="destination-input"
          name="destination"
          label="Where are you meeting?"
          type="text"
          value={formValues.destination}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear destination input field"
                  onClick={() => handleClearInputField('destination')}
                  edge="end">
                  {formValues.destination && <ClearIcon />}
                </IconButton>
              </InputAdornment>),
          }}
          required />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <TimePicker
            id="p1DepTime-input"
            label="When is person 1 leaving"
            name="p1DepTime"
            ampm={false}
            value={timeValue}
            onChange={newValue => {
              setTimeValue(newValue);
            }}
            renderInput={params => <TextField {...params} />} />
        </LocalizationProvider>
        <Button variant="contained" type="submit" color="primary">Submit</Button>
      </form>
      {errMessage && (
      <Typography variant="body1" align="center" sx={{ mt: 1.5 }}>
        {errMessage}
        {' '}
      </Typography>
      )}
    </Box>
  );
};

export default Form;
