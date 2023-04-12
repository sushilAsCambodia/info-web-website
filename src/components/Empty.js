import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@material-ui/core';
export default function Empty({ text = 'No data available' }) {
  return (
    <Box sx={{ display: 'flex', alignItems:'center', justifyContent:'center', height:'100%' }}>
      <Typography>{text}</Typography>
    </Box>
  );
}
