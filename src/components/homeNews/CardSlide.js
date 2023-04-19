import React from 'react';
import { Grid, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
const CardSlide = (props) => {
    const {cards = []} = props;
    const [tabValue, setTabValue] = React.useState(0);
    return <>
    {
        cards && cards.length > 0 && <Grid item   sx={{marginTop:'5px',marginBottom:'5px'}}>
        <Tabs
          value={tabValue}
          onChange={(e) => setTabValue(e.target.value)}
          variant="scrollable"
          aria-label="scrollable auto tabs example"
          className="MuiTabs-custom-tab"
          TabIndicatorProps={{
            style: { display:'none' }
          }}
          sx={{
            position:'relative',
            '& .MuiButtonBase-root .MuiSvgIcon-root': {
              background:'#FF6F31',
              borderRadius:'50%',
              color:'white'
            }
          }}
          >
          {
            cards.map((card,index) => {
              return <Tab 
                  key={index} 
                  onClick={()=> setTabValue(0)} 
                  sx={{ padding: '5px'}} 
                  label={<Grid position="relative" textAlign="center" sx={{borderRadius:'4px',overflow:'hidden'}}>
                  <Grid sx={{background:`url(${card.image})`}} alt="机率" width="80px" height="80px" className="card-custom">
                    <span></span>
                  </Grid>
                  <Typography
                    position="absolute"
                    fontSize="10px !important"
                    bottom="25%"
                    left="0"
                    right="0"
                    color='white'
                  >
                    {card.translate||'N/A'}
                  </Typography>
                  <Typography
                    position="absolute"
                    bottom="10%"
                    left="0"
                    right="0"
                    color='white'
                    fontSize='10px !important'
                  >
                    {card.label||'N/A'}
                  </Typography>
                </Grid>}>
              </Tab> 
            })
          }
          
        </Tabs> 
        <style>
          {
            `
              .card-custom > span{
                position: absolute;
                height: 100%;
                left: 0;
                right: 0;
                background:linear-gradient(360deg, #FF0000 0%, rgba(255, 110, 49, 0.37) 100%)
              }
              .MuiTabs-custom-tab > .MuiButtonBase-root:first-child {
                position: absolute;
                top: 50%;
                z-index: 9;
                left: 15px;
                transform: translate(-50%, -50%);
              }
              .MuiTabs-custom-tab > .MuiButtonBase-root:last-child {
                position: absolute;
                top: 50%;
                z-index: 9;
                right: 0px;
                transform: translate(-50%, -50%);
              }
            `
          }
        </style>
        </Grid>
    }
    </>;
}
export default CardSlide;