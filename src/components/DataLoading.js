import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function DataLoading(props) {
  const {size = 40, inside = false} = props;
  const style = { display: 'flex', alignItems:'center', justifyContent:'center', height:'100%' };
  if(inside) {
    style.position = 'absolute';
    style.width = '100%';
  }
  return (
    <Box sx={style}>
      <CircularProgress size={size}/>
    </Box>
  );
}
