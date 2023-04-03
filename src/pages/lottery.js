import Layout from '@/layouts'
import api from '@/services/http'
import { useDispatch, useSelector } from 'react-redux';
import {getBannerSync} from '@/store/reducers/bannerSlice'
import { useEffect } from 'react';
const Lottery = () => {
    // useSelector((state) => state)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBannerSync((res) => {
            console.log(res,'res')
        }));
    },[]);
    return <>
        Lottery
    </>
}; 
export default Lottery;