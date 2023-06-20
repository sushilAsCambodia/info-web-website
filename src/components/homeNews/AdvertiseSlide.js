import {useEffect,useState} from 'react';
import { Grid, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import utils from '@/common/utils';
import Link from 'next/link';
const AdvertiseSlide = (props) => {
    const {advertises = []} = props;
    const [tabValue, setTabValue] = useState(0);
    const [newAds, setNewAds] = useState([]);


    useEffect(() => {
     
      setNewAds(advertises.filter(b =>b.position == 'brand_ad_space'));
      // setNewBanners(banners.filter(b => b.platform.toLowerCase() == type && b.position == 'top_carousel'));
    },[advertises])
    return <Grid sx={{minHeight:'80px'}}>
    {
        newAds && newAds.length > 0 && <Grid item 
        
        >
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
              color:'white',
            },
          }}
          >
          {
            newAds.map((card,index) => {
              return <Tab 
                  key={index} 
                  onClick={()=> setTabValue(0)} 
                  sx={{ padding: '5px', minWidth:"80px",minHeight:'80px'}} 
                  label={<Link href={card?.ads_link ? card.ads_link:''} target='_blank'><Grid position="relative" textAlign="center" sx={{borderRadius:'4px',overflow:'hidden'}}>
                  <Grid 
                    sx={{backgroundImage:`url(${card.icon})`, backgroundSize:'cover'}} 
                    alt="机率" width="70px" height="70px" className="card-custom"
                  >
                    <span></span>
                  </Grid>
                  <Typography
                    position="absolute"
                    fontSize="10px !important"
                    textTransform="capitalize"
                    bottom="8%"
                    left="0"
                    right="0"
                    color='white'
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                {utils.subString(card.title||'N/A' ,10)}
                  </Typography>
                  {/* <Typography
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
                  </Typography> */}
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
    </Grid>;
}
export default AdvertiseSlide;