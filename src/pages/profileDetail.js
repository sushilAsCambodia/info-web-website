import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import {
    Button,
    Typography,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    ListItem,
    ListItemText,
    ListItemIcon,
    List,
    Dialog,
    OutlinedInput,
    Divider,
} from "@mui/material";
import Router from "next/router";
import UploadImg from "@/components/profile/uploadImg";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
const ProfileDetail = () => {
    
    return (
        <>
            <Grid
                container
             
                justifyContent="center"
                padding="0px 16px"
            >
                <Grid
                    item
                    xs={12}
                    container
                  
                    className="uploadimg_main"
                 
paddingTop={5}
                >
                  <UploadImg />
                </Grid>
            </Grid>





  


        </>
    )

};
export default ProfileDetail;