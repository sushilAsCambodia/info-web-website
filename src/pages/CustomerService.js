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
    TextField
} from "@mui/material";
import Router from "next/router";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { width } from "@mui/system";
  
const CustomerService = () => { 

    return (
        <>
            <Grid
                container
                alignItems="flex-start"
                justifyContent="center"
                padding="0px 16px"
            >
         
                <Grid
                    item
                    xs={12}
                    container
                    alignContent="flex-start"
                    alignItems="center"
                    overflow="auto"
                >
                    <Grid item xs={12} sm={12} md={12} xl={12} padding="0px">
                        <Grid item xs={12} paddingTop="15px">
                            <Typography fontSize="18px" textAlign="center">
                            <img src="./assets/Profile/servicebigimg.png" width="100%" />
                            </Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography paddingBottom="20px" textAlign="center">
                            Contact Customer Service Via
                            </Typography>
                           <List sx={{ display:"flex", justifyContent:"center"  }}>
                            <ListItem sx={{padding: '0',display:'flex',flexDirection:'column', width:'45px'}}><Icon icon="logos:whatsapp-icon" fontSize="35px" /></ListItem>
                            <ListItem sx={{padding: '0',display:'flex',flexDirection:'column', width:'45px'}}><Icon icon="logos:telegram" fontSize="35px" /></ListItem>
                            <ListItem sx={{padding: '0',display:'flex',flexDirection:'column', width:'45px'}}><Icon icon="logos:whatsapp-icon" fontSize="35px" /></ListItem>
                            <ListItem sx={{padding: '0',display:'flex',flexDirection:'column', width:'45px'}}><Icon icon="logos:telegram" fontSize="35px" /></ListItem>
                            <ListItem sx={{padding: '0',display:'flex',flexDirection:'column', width:'45px'}}><Icon icon="logos:telegram" fontSize="35px" /></ListItem>
                            <ListItem sx={{padding: '0',display:'flex',flexDirection:'column', width:'45px'}}><Icon icon="logos:whatsapp-icon" fontSize="35px" /></ListItem>
                           </List>
                        </Grid>

                     
                    </Grid>
                  
                </Grid>
            </Grid>
        </>
    )

};
export default CustomerService;