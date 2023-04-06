import * as React from 'react';
import Paper  from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@/components/svg/home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import LotterIcon from '@/components/svg/lottery';
import ProfileIcon from '@/components/svg/user';
import MatchIcon from '@/components/svg/match';
const Footer = () => {
    const {t} = useTranslation();
    let selectedTab = 0;
    const router = useRouter();
    switch (router.pathname.toLowerCase()) {
        case  '/home':
            selectedTab = 0;
            break;
        case  '/lottery':
            selectedTab = 1;
            break;
        case  '/match':
            selectedTab = 2;
            break;
        case  '/profile':
            selectedTab = 3;
            break;
        default:
            break;
    }
    const [value, setValue] = React.useState(selectedTab);
    return <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0,}}>
            <BottomNavigation
                showLabels
                value={value}
                sx={{justifyContent:'space-between'}}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}>
                <BottomNavigationAction onClick={() => router.push('/home')} label={t('home')} icon={<HomeIcon color={value == 0?'#FF0000':''} />} />
                <BottomNavigationAction onClick={() => router.push('/lottery')} label={t('lottery')} icon={<LotterIcon  color={value == 1?'#FF0000':''} />} />
                <BottomNavigationAction onClick={() => router.push('/match')} label={t('match')} icon={<MatchIcon color={value == 2?'#FF0000':''}/>} />
                <BottomNavigationAction onClick={() => router.push('/profile')} label={t('profile')} icon={<ProfileIcon color={value == 3?'#FF0000':''} />} />
            </BottomNavigation>
        </Paper>
};
export default Footer;