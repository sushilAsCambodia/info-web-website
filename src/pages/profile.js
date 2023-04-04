import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import {login} from '@/store/reducers/userSlice';
import {useEffect} from 'react'
import { useRouter } from 'next/router';
import { middleware } from '@/middleware';
const Profile = () => { 
    const profile = useSelector((state) => state.user.profile);
    console.log(profile,'state');
    const dispatch = useDispatch();
    const router = useRouter();
    const handleLogin = () => {
        dispatch(login(
            { 
                body: { username:'vitou1', password:'111' },
                callback: (res) => {
                    console.log(res,'callback')
                }
            }
        ));
    }
    useEffect(() => {
        middleware(router, (res) => {
            console.log(res);
        });
    },[]);
    return <>
        <Button  endIcon={<SendIcon />} onClick={handleLogin}>
            Send
        </Button>
    </>
}; 
export default Profile;