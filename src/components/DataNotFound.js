import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';

export default function DataNotFound(props) {
  const {width = undefined, height = undefined, objectFit = 'contain' ,content = undefined} = props;
  return (
    <Box sx={{ display: 'flex', alignItems:'center', justifyContent:'center',height:'100%' }}>
      <Grid textAlign="center">
        <picture>
          <img
            style={{
              width,
              height,
              objectFit,
              cursor:"pointer"
            }}
            src="./assets/not-found.png" 
            alt='not-found'
            loading="lazy"
          />
        </picture>
        {content && <Typography fontSize={10}>{content}</Typography>}
      </Grid> 
    </Box>
  );
}
