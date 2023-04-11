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
    Box,
    Divider,
} from "@mui/material";
import Router from "next/router";
import {logout, setLogout} from '@/store/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import UserProfileIcon from "@/components/svg/profile";
import AnnouncementIcon from "@/components/svg/announcement";
import FeedbackIcon from "@/components/svg/feedback";
import LogoutIcon from "@/components/svg/logout";
import CustomerServiceIcon from "@/components/svg/customerService";
const Profile = () => { 
    const {t} = useTranslation();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [])
    const {isLogin, profile } = useSelector((state) => state.user); 
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout(
            { 
                callback: (res) => {
                    dispatch(setLogout());
                    Router.push('/home');
                    // const {status_code} = res;
                    // if([200,201,202,203].includes(status_code)) {
                    //     setLogout();
                    //     Router.push('/home');
                    // }else if(status_code === 419) {
                    //     setLogout();
                    // }else {
                    //     setLogout();
                    //     Router.push('/home');
                    // }
                },
                auth: true
            },
        ));
    }
    const goToLogin = () => {
        Router.push("/login");
    };
    const goToProfileDetail = () => {
        Router.push("/profileDetail");
    };
    const goToAnnouncement = () => {
        Router.push("/announcement");
    };

    const goToFeedback = () => {
        Router.push("/feedback");
    };

    const goToCustomerService = () => {
        Router.push("/customerService");
    }; 

    return mounted && (
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
                        <List sx={{ padding: "0px" }}>
                            <ListItem sx={{ padding: "0px 0px" }}>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{ padding: "18px 0px", borderRadius: "5px" }}
                                    boxShadow="none"
                                    display="flex"
                                    alignItems="center">
                                    { isLogin ? <>
                                        <Grid item xs={2} display="flex" alignItems="center">
                                            <img src="./assets/Profile/user-icon.png" />
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Grid
                                                item
                                                xs={12}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="space-between">
                                                <Grid item>
                                                    <Typography fontWeight="600" fontSize="12px">{profile.user_name || 'Profile Name'}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </>: <>
                                        <Grid item xs={2} display="flex" alignItems="center">
                                            <img src="./assets/Profile/user-icon.png" />
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Grid
                                                item
                                                xs={12}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="space-between"
                                            >
                                                <Grid item>
                                                    <Typography fontWeight="600" fontSize="12px">{t('login_to_enjoy')}</Typography>
                                                    <Button
                                                        variant="contained"
                                                        onClick={goToLogin}
                                                        sx={{
                                                            fontSize: "12px",
                                                            marginTop: "6px",
                                                            color: "white",
                                                            background:
                                                                "linear-gradient(90.04deg, #FF0000 0.04%, #FF6F31 99.97%);",
                                                            textTransform: 'capitalize',
                                                            borderRadius: '22px',
                                                            padding: "4px 10px"
                                                        }}
                                                    >
                                                        {t('login')}/{t('register')}
                                                    </Button>

                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    </>}
                                </Grid>

                            </ListItem>
                        </List>
                        <Divider />
                    </Grid>
                </Grid>
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
                            <Typography>
                               {t('important_links')}
                            </Typography>
                        </Grid>

                        <List sx={{ padding: "0px" }}>
                            <ListItem sx={{ padding: "0px 0px" }} onClick={goToProfileDetail}>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{ padding: "12px 0px", borderRadius: "5px" }}
                                    boxShadow="none"
                                    display="flex"
                                    alignItems="center">
                                    <Grid item xs={2} display="flex" alignItems="center">
                                        <Box display="flex" alignItems="center" justifyContent="center" textAlign="center" width="30px" height="30px" component="span" sx={{ border: '1px solid #FF6E31',borderRadius:'50%' }}>
                                            <UserProfileIcon color="#FF6E31"/>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Grid
                                            item
                                            xs={12}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Grid item>
                                                <Typography fontWeight="500" fontSize="16px">{t('profile')}</Typography>
                                            </Grid>
                                            <Grid item display="flex" alignItems="center" color="#8C8C8C;">
                                                <Icon icon="material-symbols:keyboard-arrow-right" fontSize="25px" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </ListItem>
                            <Divider />
                            <ListItem sx={{ padding: "0px 0px" }} onClick={goToAnnouncement}>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{ padding: "12px 0px", borderRadius: "5px" }}
                                    boxShadow="none"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Grid item xs={2} display="flex" alignItems="center">
                                        <Box display="flex" alignItems="center" justifyContent="center" textAlign="center" width="30px" height="30px" component="span" sx={{ border: '1px solid #FF6E31',borderRadius:'50%' }}>
                                            <AnnouncementIcon color="#FF6E31"/>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Grid
                                            item
                                            xs={12}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Grid item>
                                                <Typography fontWeight="500" fontSize="16px">{t('announcement')}</Typography>
                                            </Grid>
                                            <Grid item display="flex" alignItems="center" color="#8C8C8C;">
                                                <Icon icon="material-symbols:keyboard-arrow-right" fontSize="25px" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </ListItem>
                            <Divider />
                            <ListItem sx={{ padding: "0px 0px" }} onClick={goToFeedback}>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{ padding: "12px 0px", borderRadius: "5px" }}
                                    boxShadow="none"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Grid item xs={2} display="flex" alignItems="center">
                                        <Box display="flex" alignItems="center" justifyContent="center" textAlign="center" width="30px" height="30px" component="span" sx={{ border: '1px solid #FF6E31',borderRadius:'50%' }}>
                                            <FeedbackIcon size={20} color="#FF6E31"/>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Grid
                                            item
                                            xs={12}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Grid item>
                                                <Typography fontWeight="500" fontSize="16px">{t('feedback')}</Typography>
                                            </Grid>
                                            <Grid item display="flex" alignItems="center" color="#8C8C8C;">
                                                <Icon icon="material-symbols:keyboard-arrow-right" fontSize="25px" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </ListItem>
                            <Divider />
                            <ListItem sx={{ padding: "0px 0px" }} onClick={goToCustomerService}>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{ padding: "12px 0px", borderRadius: "5px" }}
                                    boxShadow="none"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Grid item xs={2} display="flex" alignItems="center">
                                        <Box display="flex" alignItems="center" justifyContent="center" textAlign="center" width="30px" height="30px" component="span" sx={{ border: '1px solid #FF6E31',borderRadius:'50%' }}>
                                            {/* <CustomerServiceIcon color="#FF6E31"/> */}
                                            <CustomerServiceIcon color="#FF6E31"/>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Grid
                                            item
                                            xs={12}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Grid item>
                                                <Typography fontWeight="500" fontSize="16px">{t('customerservice')}</Typography>
                                            </Grid>
                                            <Grid item display="flex" alignItems="center" color="#8C8C8C;">
                                                <Icon icon="material-symbols:keyboard-arrow-right" fontSize="25px" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </ListItem>
                            <ListItem sx={{ padding: "0px 0px" }} onClick={handleLogout}>
                                {isLogin ? <Grid
                                    container
                                    item
                                    xs={12}
                                    sx={{ padding: "12px 0px", borderRadius: "5px" }}
                                    boxShadow="none"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Grid item xs={2} display="flex" alignItems="center">
                                        <Box display="flex" alignItems="center" justifyContent="center" textAlign="center" width="30px" height="30px" component="span" sx={{ border: '1px solid #FF6E31',borderRadius:'50%' }}>
                                            <LogoutIcon size={17} color="#FF6E31"/>
                                        </Box>
                                    </Grid>
                                     <Grid item xs={10}>
                                        <Grid
                                            item
                                            xs={12}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Grid item>
                                                <Typography fontWeight="500" fontSize="16px">{t('logout')}</Typography>
                                            </Grid>
                                            <Grid item display="flex" alignItems="center" color="#8C8C8C;">
                                                <Icon icon="material-symbols:keyboard-arrow-right" fontSize="25px" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>: ''}
                                
                            </ListItem>
                        </List>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} xl={12} padding="0px">
                        <Grid item xs={12} paddingTop="20px" paddingBottom="20px" >
                            <Typography fontWeight="600">
                            {t('download_app')}
                            </Typography>
                        </Grid>
                        <List sx={{ padding: "0px" }}>
                            <ListItem sx={{ padding: "0px 0px" }}>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{ padding: "12px 0px", borderRadius: "5px" }}
                                    boxShadow="none"
                                    display="flex"
                                    alignItems="center"
                                   
                                >
                                   
                                    <Grid item xs={12} margin="0 auto">
                                        <Grid
                                            item
                                            xs={12}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-around"
                                        >
                                            <Grid item>
                                            <Typography textAlign="center"><img src="./assets/Home/iosbtn.png" /></Typography>
                                            </Grid>
                                            <Grid item display="flex" alignItems="center">
                                            <Typography textAlign="center"><img src="./assets/Home/androidbtn.png" /></Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )

};  
export default Profile;