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
  
const NewsCardDetails = () => {

  


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
                            <Typography fontSize="18px">
                            The Premier League isn’t Apple’s first push into soccer. The company added all MLS games
                            </Typography>
                            <Typography color="#8C8C8C" pt={1}>15/04/2023</Typography>
                        </Grid>
                        <Grid item xs={12} paddingTop="10px">
                         <Typography>
                         <img src="./assets/NewsJourney/bignewscarddetails.png" alt="一般" width="100%" height="auto" />
                         </Typography>
                           
                           <Typography pt={2} pb={4}>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                           Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                           Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                           Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                          eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                           </Typography>
                        </Grid>

                      
                      
                     
                    </Grid>
                  
                </Grid>
            </Grid>
        </>
    )

};
export default NewsCardDetails;