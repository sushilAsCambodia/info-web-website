import React from 'react';
import { Grid, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'next/link';
const AdvertiseSlide = (props) => {
    const {advertises = []} = props;
    const [tabValue, setTabValue] = React.useState(0);
    return <>
    {
        advertises && advertises.length > 0 && <Grid item   sx={{marginTop:'5px',marginBottom:'5px'}}>
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
            advertises.map((card,index) => {
              return <Tab 
                  key={index} 
                  onClick={()=> setTabValue(0)} 
                  sx={{ padding: '5px'}} 
                  label={<Link href={card.ads_link} target='_blank'><Grid position="relative" textAlign="center" sx={{borderRadius:'4px',overflow:'hidden'}}>
                  <Grid 
                    sx={{backgroundImage:`url(${card.icon})`, backgroundSize:'cover'}} 
                    alt="机率" width="80px" height="80px" className="card-custom"
                  >
                    <span></span>
                  </Grid>
                  <Typography
                    position="absolute"
                    fontSize="10px !important"
                    bottom="25%"
                    left="0"
                    right="0"
                    color='white'
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {card.title||'N/A'}
                  </Typography>
                  <Typography
                    position="absolute"
                    bottom="10%"
                    left="0"
                    right="0"
                    color='white'
                    fontSize='10px !important'
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {card.description||'N/A'}
                  </Typography>
                </Grid></Link>}>
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
export default AdvertiseSlide;