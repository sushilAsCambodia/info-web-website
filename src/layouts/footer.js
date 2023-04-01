import * as React from 'react';
import Paper  from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import { useRouter } from 'next/router';
const Footer = () => {
    const [value, setValue] = React.useState(0);
    const router = useRouter();
    return <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0,}}>
            <BottomNavigation
                showLabels
                value={value}
                sx={{justifyContent:'space-between'}}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}>
                <BottomNavigationAction onClick={() => router.push('/home')} label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction onClick={() => router.push('/lottery')} label="Lottery" icon={<ScatterPlotIcon />} />
                <BottomNavigationAction onClick={() => router.push('/match')} label="Match" icon={<SportsBaseballIcon />} />
                <BottomNavigationAction onClick={() => router.push('/profile')} label="Profile" icon={<AccountCircleIcon />} />
            </BottomNavigation>
        </Paper>
};
export default Footer;