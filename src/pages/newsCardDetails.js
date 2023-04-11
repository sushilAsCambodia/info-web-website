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
                            <Typography fontSize="18px" fontWeight="700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            </Typography>
                            <Typography color="#8C8C8C" pt={1} fontSize="13px">15/04/2023</Typography>
                        </Grid>
                        <Grid item xs={12} paddingTop="10px">
                         <Typography>
                         <img src="./assets/NewsJourney/bignewscarddetails.png" alt="一般" width="100%" height="auto" />
                         </Typography>
                           
                           <Typography pt={2} pb={4} fontSize="18px">
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                           Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                           Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                           Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                          eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur 
                          magni dolores eos qui ratione voluptatem sequi nesciunt.

                          {/* 照顧病人很重要，醫生會跟進，但這是一個充滿痛苦和痛苦的時期。
                            就最小的細節而言，任何人都不應從事任何一種工作，除非他從中得到一些好處。
                            不要在痛斥中生氣在快感中痛斥他要從痛中發一毛希望沒有滋生。
                            非為色欲所蒙蔽，不出也；棄職而軟其心者，其過也，是勞。

                           但是為了讓你明白那些指責快樂和讚美痛苦的人的所有這些天生的錯誤是從哪裡來的，我將公開整個事情，
                           我將解釋那位真理的發現者和幸福生活的締造者所說的那些話。
                           因為沒有人輕視、憎恨或逃避快樂，因為它是快樂，而是因為那些不知道如何理性地追隨快樂的人會遭受巨大的痛苦。 */}
                           </Typography>
                        </Grid>

                      
                      
                     
                    </Grid>
                  
                </Grid>
            </Grid>
        </>
    )

};
export default NewsCardDetails;