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

const Profile = () => {

    const goToLogin = () => {
        Router.push("/Login");
    };
    const goToProfileDetail = () => {
        Router.push("/ProfileDetail");
    };
    const goToAnnouncement = () => {
        Router.push("/Announcement");
    };

    const goToFeedback = () => {
        Router.push("/Feedback");
    };

    const goToCustomerService = () => {
        Router.push("/CustomerService");
    };

    const goToLogout = () => {
        Router.push("/Logout");
    };
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
                        <List sx={{ padding: "0px" }}>
                            <ListItem sx={{ padding: "0px 0px" }}>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{ padding: "18px 0px", borderRadius: "5px" }}
                                    boxShadow="none"
                                    display="flex"
                                    alignItems="center"
                                >
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
                                                <Typography fontWeight="600" fontSize="12px">Log in to enjoy more exciting features</Typography>
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
                                                    Login/Register
                                                </Button>

                                            </Grid>

                                        </Grid>
                                    </Grid>
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
                                Important Links
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
                                    alignItems="center"
                                >
                                    <Grid item xs={2} display="flex" alignItems="center">
                                        <Icon icon="healthicons:ui-user-profile" fontSize="40px" color="#FF6E31" />
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
                                                <Typography fontWeight="500" fontSize="16px">Profile</Typography>
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
                                        <Icon icon="mingcute:announcement-line" fontSize="40px" color="#FF6E31" />
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
                                                <Typography fontWeight="500" fontSize="16px">Announcement</Typography>
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
                                        <Icon icon="ri:feedback-line" fontSize="40px" color="#FF6E31" />
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
                                                <Typography fontWeight="500" fontSize="16px">Feedback</Typography>
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
                                        <Icon icon="ri:customer-service-2-fill" fontSize="40px" color="#FF6E31" />
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
                                                <Typography fontWeight="500" fontSize="16px">Customer Service</Typography>
                                            </Grid>
                                            <Grid item display="flex" alignItems="center" color="#8C8C8C;">
                                                <Icon icon="material-symbols:keyboard-arrow-right" fontSize="25px" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </ListItem>
                            <Divider />
                            <ListItem sx={{ padding: "0px 0px" }} onClick={goToLogout}>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{ padding: "12px 0px", borderRadius: "5px" }}
                                    boxShadow="none"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Grid item xs={2} display="flex" alignItems="center">
                                        <Icon icon="mdi:logout-variant" fontSize="40px" color="#FF6E31" />
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
                                                <Typography fontWeight="500" fontSize="16px">Logout</Typography>
                                            </Grid>
                                            <Grid item display="flex" alignItems="center" color="#8C8C8C;">
                                                <Icon icon="material-symbols:keyboard-arrow-right" fontSize="25px" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </ListItem>
                        </List>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} xl={12} padding="0px">
                        <Grid item xs={12} paddingTop="20px" paddingBottom="20px" >
                            <Typography fontWeight="600">
                                DOWNLOAD APP
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