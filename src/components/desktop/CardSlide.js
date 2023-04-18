import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
export default function CardSlice() {
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        className='card-desktop-slice'
        sx={{
            position:'relative',
            '& .MuiTabs-indicator':{
                display:'none'
            }
        }}

        aria-label="scrollable auto tabs example">
        <Tab disableRipple label={
            <Card sx={{ display: 'flex', width:248,height:90.54,padding:'7px'}}>
                <CardMedia
                    component="img"
                    sx={{ width: 106.88, height:77.82 }}
                    image="/assets/home/home_1stt2.jpg"
                    alt="Live from space album cover"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 auto', textAlign:'start', padding:'0px 0px 0 3px' }}>
                        <Typography component="div" sx={{fontWeight:'bold',fontSize:'14px'}}>
                            God of Wealth
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{fontSize:'12px'}}>
                            2023
                        </Typography>
                        <Button
                            variant="contained"
                            disabled={loading ? true : false}
                            size="small"
                            sx={{
                                color: "white",
                                background: loading
                                    ? "linear-gradient(90.04deg, #8C8C8C 0.04%, #D0D0D0 99.97%);"
                                    : "linear-gradient(90.04deg, #FF0000 0.04%, #FF6F31 99.97%);",
                                textTransform: "capitalize",
                                fontSize:'8px',
                                borderRadius: '10px'
                            }}>
                            Latest Issue 094
                        </Button>
                    </CardContent> 
                </Box>
            </Card>
        } /> 
        <Tab disableRipple label={
            <Card sx={{ display: 'flex', width:248,height:90.54,padding:'7px'}}>
                <CardMedia
                    component="img"
                    sx={{ width: 106.88, height:77.82 }}
                    image="/assets/home/home_1stt2.jpg"
                    alt="Live from space album cover"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 auto', textAlign:'start', padding:'0px 0px 0 3px' }}>
                        <Typography component="div" sx={{fontWeight:'bold',fontSize:'14px'}}>
                            God of Wealth
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{fontSize:'12px'}}>
                            2023
                        </Typography>
                        <Button
                            variant="contained"
                            disabled={loading ? true : false}
                            size="small"
                            sx={{
                                color: "white",
                                background: loading
                                    ? "linear-gradient(90.04deg, #8C8C8C 0.04%, #D0D0D0 99.97%);"
                                    : "linear-gradient(90.04deg, #FF0000 0.04%, #FF6F31 99.97%);",
                                textTransform: "capitalize",
                                fontSize:'8px',
                                borderRadius: '10px'
                            }}>
                            Latest Issue 094
                        </Button>
                    </CardContent> 
                </Box>
            </Card>
        } /> 
        <Tab disableRipple label={
            <Card sx={{ display: 'flex', width:248,height:90.54, padding:'7px'}}>
                <CardMedia
                    component="img"
                    sx={{ width: 106.88, height:77.82 }}
                    image="/assets/home/home_1stt2.jpg"
                    alt="Live from space album cover"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 auto', textAlign:'start', padding:'0px 0px 0 3px' }}>
                        <Typography component="div" sx={{fontWeight:'bold',fontSize:'14px'}}>
                            God of Wealth
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{fontSize:'12px'}}>
                            2023
                        </Typography>
                        <Button
                            variant="contained"
                            disabled={loading ? true : false}
                            size="small"
                            sx={{
                                color: "white",
                                background: loading
                                    ? "linear-gradient(90.04deg, #8C8C8C 0.04%, #D0D0D0 99.97%);"
                                    : "linear-gradient(90.04deg, #FF0000 0.04%, #FF6F31 99.97%);",
                                textTransform: "capitalize",
                                fontSize:'8px',
                                borderRadius: '10px'
                            }}>
                            Latest Issue 094
                        </Button>
                    </CardContent> 
                </Box>
            </Card>
        } /> 
      </Tabs>
      <style>
        {
            `
                .card-desktop-slice > .MuiButtonBase-root:first-child{
                    position: absolute;
                    top: 50%;
                    z-index: 9;
                    left: 15px;
                    transform: translate(-50%, -50%);
                }
                .card-desktop-slice > .MuiButtonBase-root:last-child {
                    position: absolute;
                    top: 50%;
                    z-index: 9;
                    right: -28px;
                    transform: translate(-50%, -50%);
                }
                .card-desktop-slice > .MuiButtonBase-root svg {
                    background: #FF6F31;
                    border-radius:50%;
                    color:#fff;
                }
            `
        }
      </style>
    </Box>
  );
}