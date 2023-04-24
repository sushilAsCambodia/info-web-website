import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
const Match = () => {
    const [mounted,setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    },[]);
    return <>
        {mounted && <Typography sx={{textAlign:'center'}}>TODO</Typography>}
    </>
};   
export default Match;