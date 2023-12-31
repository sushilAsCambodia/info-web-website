import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import {
    Button,
    Typography,
    FormControl,
    Grid, 
    ListItem, 
    List, 
} from "@mui/material";   
import { useTranslation } from "react-i18next";
import { getCustomerService } from "@/store/actions/customerServiceActions";
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link'
import utils from "@/common/utils";
import { Image } from "mui-image";
import ForgotPassword from "./forgotPassword";

const CustomerService = () => { 
    const {loading, data} = useSelector((state) => state.customer_service);
    const dispatch = useDispatch();
    const { t,i18n } = useTranslation();
    useEffect(() => {
        dispatch(getCustomerService({
            params: {lang_id: utils.convertLangCodeToID(i18n.language)},
            callback:(res) => {
                console.log('')
            }
          }))
    },[dispatch,i18n.language])


    const langKey = useSelector((state) => state && state.load_language && state.load_language.language);


    return (
        <>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                padding="0px 16px"
                height="100%"
            > 
                <Grid item xs={12} sm={12} md={12} xl={12} padding="0px">
                    <ForgotPassword showTitle={false}/>
                    {/* <Grid item xs={12} paddingTop="15px" textAlign="center">
                        <Image alt="servicebigimg" src="./assets/Profile/servicebigimg.png" />
                    </Grid>
                    <Grid item xs={12} >
                        <Typography paddingBottom="20px" textAlign="center">
                            {langKey && langKey.contact_customer_service_via}
                        </Typography>
                        <List sx={{ display:"flex", justifyContent:"center"  }}>
                        {
                            data && data.length > 0 && data.map((social,key) => {
                                return <ListItem key={key} sx={{padding: '0',display:'flex',flexDirection:'column', width:'45px'}}>
                                    <Link href={social.account || ''} target="_blank">
                                        <Image alt="social" src={social.icon || ''} height={28} width={29} style={{objectFit: 'contain'}}/>
                                    </Link>
                                </ListItem>;
                            })
                        } 
                        </List>
                    </Grid>  */}
                </Grid>
                
            </Grid>
        </>
    )

};
export default CustomerService;