import { useDispatch, useSelector } from 'react-redux';
import {getBannerSync} from '@/store/reducers/bannerSlice'
import { useEffect } from 'react';
const Lottery = () => {
    const banners = useSelector((state) => state.banner);
    console.log(banners,'state');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBannerSync((res) => {
            console.log(res,'callback')
        }));
    },[]);
    return <>
        Lottery
    </>
}; 
export default Lottery;