import * as React from 'react';
import Box from '@mui/material/Box';

export default function DataNotFound() {
  return (
    <Box sx={{ display: 'flex', alignItems:'center', justifyContent:'center',height:'100%' }}>
      <img
      src="./assets/not-found.png"
        // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        // alt={item.title}
        loading="lazy"
      />
    </Box>
  );
}
