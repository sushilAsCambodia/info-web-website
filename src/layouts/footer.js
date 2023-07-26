import * as React from 'react';
import Paper  from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@/components/svg/home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
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
        case  '/profile':
            selectedTab = 2;
            break;
        case  '/match':
            selectedTab = 3;
            break;
        default:
            break;
    }
    const [value, setValue] = React.useState(selectedTab);

    const langKey = useSelector((state) => state && state.load_language && state.load_language.language);



    return <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0,}}>
            <BottomNavigation
                showLabels
                value={value}
                sx={{justifyContent:'space-between'}}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}>
                <BottomNavigationAction sx={{
                    '.MuiBottomNavigationAction-label' : {
                        whiteSpace:'nowrap'
                    }
                }} onClick={() => router.push('/home')} label={langKey && langKey.home} icon={<HomeIcon color={value == 0 ? '#FF0000':'#8C8C8C'} />} />
                <BottomNavigationAction 
                    sx={{
                        '.MuiBottomNavigationAction-label' : {
                            whiteSpace:'nowrap'
                        }
                    }}
                    onClick={() => router.push('/lottery')} label={langKey && langKey.lottery} icon={<LotterIcon  color={value == 1?'#FF0000':'#8C8C8C'} />} />
                <BottomNavigationAction 
                    sx={{
                        '.MuiBottomNavigationAction-label' : {
                            whiteSpace:'nowrap'
                        }
                    }}
                    onClick={() => router.push('/match')} 
                    label={langKey && langKey.match} 
                    icon={<MatchIcon color={value == 2?'#FF0000':'#8C8C8C'}/>}
                     />
                <BottomNavigationAction 
                    sx={{
                        '.MuiBottomNavigationAction-label' : {
                            whiteSpace:'nowrap'
                        }
                    }}
                    onClick={() => router.push('/profile')} label={langKey && langKey.profile} icon={<ProfileIcon color={value == 3?'#FF0000':'#8C8C8C'} />} />
            </BottomNavigation>
        </Paper>
};
export default Footer;