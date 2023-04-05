import { useDispatch, useSelector } from 'react-redux';
import {getBannerSync} from '@/store/reducers/bannerSlice'
import { useEffect } from 'react';  
import { Typography } from '@mui/material';
const Lottery = () => { 
    const banners = useSelector((state) => state.banner);
    console.log(banners,'state');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBannerSync(
            {
                params: {},
                callback:(res) => {
                    console.log(res,'callback')
                }
            }
        ));
    },[]); 
    return <>
        <Typography sx={{textAlign:'center'}}>TODO</Typography>
    </>
}; 
export default Lottery;