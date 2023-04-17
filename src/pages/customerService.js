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
import { useTranslation } from "react-i18next";
import { getCustomerService } from "@/store/actions/customerServiceActions";
import { useDispatch, useSelector } from 'react-redux';
import utils from "@/common/utils";
const CustomerService = () => { 
    const {loading, data} = useSelector((state) => state.customer_service);
    const dispatch = useDispatch();
    const { t,i18n } = useTranslation();
    useEffect(() => {
        dispatch(getCustomerService({
            params: {lang_id: utils.convertLangCodeToID(i18n.language)},
            callback:(res) => {
                console.log(res,'abc')
            }
          }))
    },[i18n.language])
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
                        <Grid item xs={12} paddingTop="15px" textAlign="center">
                            <img src="./assets/Profile/servicebigimg.png" />
                        </Grid>
                        <Grid item xs={12} >
                            <Typography paddingBottom="20px" textAlign="center">
                                {t('contact_customer_service_via')}
                            </Typography>
                           <List sx={{ display:"flex", justifyContent:"center"  }}>
                            {
                                data && data.length > 0 && data.map((social) => {
                                    return <ListItem sx={{padding: '0',display:'flex',flexDirection:'column', width:'45px'}}>
                                        <img src={social.icon||''} height={28} width={29} style={{objectFit: 'contain'}}></img>
                                    </ListItem>;
                                })
                            } 
                           </List>
                        </Grid> 
                    </Grid>
                  
                </Grid>
            </Grid>
        </>
    )

};
export default CustomerService;