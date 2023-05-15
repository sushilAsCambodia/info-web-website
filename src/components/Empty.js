import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
export default function Empty({ text = 'No data available' }) {

  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);

  return (
    <Box sx={{ display: 'flex', alignItems:'center', justifyContent:'center', height:'100%' }}>
      <Typography>{langKey && langKey.no_data_available}</Typography>
    </Box>
  );
}
