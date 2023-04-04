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

const Announcement = () => {

    const goToLogin = () => {
        Router.push("/Login");
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
                                    sx={{ padding: "12px 0px", borderRadius: "5px" }}
                                    boxShadow="none"
                                    display="flex"
                                    alignItems="self-start"
                                >
                                    <Grid item xs={1} display="flex" alignItems="center" marginRight="5px">
                                        <img src="./assets/Profile/announcement.png" />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Grid
                                            item
                                            xs={12}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Grid item>
                                                <Typography fontWeight="500" fontSize="12px" color="#000">A Grand Prize Winner Won Magnum Life by Playing
                                                    Magnum Kungfu Stampcard Campaign</Typography>
                                                <Typography textAlign="left" fontSize="10px !important" color="#8C8C8C">
                                                    A lucky female winner from Taman Dahlia, Cheras, won Magnum Life
                                                    Grand Prize with RM1,000 every day for 20 years.
                                                </Typography>
                                                <Typography textAlign="left" fontSize="10px !important" color="#8C8C8C">
                                                    30 Mar 2023, 02:20 PM
                                                </Typography>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Grid>

                            </ListItem>
                            <Divider />
                            <ListItem sx={{ padding: "0px 0px" }}>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{ padding: "12px 0px", borderRadius: "5px" }}
                                    boxShadow="none"
                                    display="flex"
                                    alignItems="self-start"
                                >
                                    <Grid item xs={1} display="flex" alignItems="center" marginRight="5px">
                                        <img src="./assets/Profile/announcement.png" />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Grid
                                            item
                                            xs={12}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Grid item>
                                                <Typography fontWeight="500" fontSize="12px" color="#000">A Grand Prize Winner Won Magnum Life by Playing
                                                    Magnum Kungfu Stampcard Campaign</Typography>
                                                <Typography textAlign="left" fontSize="10px !important" color="#8C8C8C">
                                                    A lucky female winner from Taman Dahlia, Cheras, won Magnum Life
                                                    Grand Prize with RM1,000 every day for 20 years.
                                                </Typography>
                                                <Typography textAlign="left" fontSize="10px !important" color="#8C8C8C">
                                                    30 Mar 2023, 02:20 PM
                                                </Typography>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Grid>

                            </ListItem>
                            <Divider />
                            <ListItem sx={{ padding: "0px 0px" }}>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{ padding: "12px 0px", borderRadius: "5px" }}
                                    boxShadow="none"
                                    display="flex"
                                    alignItems="self-start"
                                >
                                    <Grid item xs={1} display="flex" alignItems="center" marginRight="5px">
                                        <img src="./assets/Profile/announcement.png" />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Grid
                                            item
                                            xs={12}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Grid item>
                                                <Typography fontWeight="500" fontSize="12px" color="#000">A Grand Prize Winner Won Magnum Life by Playing
                                                    Magnum Kungfu Stampcard Campaign</Typography>
                                                <Typography textAlign="left" fontSize="10px !important" color="#8C8C8C">
                                                    A lucky female winner from Taman Dahlia, Cheras, won Magnum Life
                                                    Grand Prize with RM1,000 every day for 20 years.
                                                </Typography>
                                                <Typography textAlign="left" fontSize="10px !important" color="#8C8C8C">
                                                    30 Mar 2023, 02:20 PM
                                                </Typography>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Grid>

                            </ListItem>
                            <Divider />
                            <ListItem sx={{ padding: "0px 0px" }}>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{ padding: "12px 0px", borderRadius: "5px" }}
                                    boxShadow="none"
                                    display="flex"
                                    alignItems="self-start"
                                >
                                    <Grid item xs={1} display="flex" alignItems="center" marginRight="5px">
                                        <img src="./assets/Profile/announcement.png" />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Grid
                                            item
                                            xs={12}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Grid item>
                                                <Typography fontWeight="500" fontSize="12px" color="#000">A Grand Prize Winner Won Magnum Life by Playing
                                                    Magnum Kungfu Stampcard Campaign</Typography>
                                                <Typography textAlign="left" fontSize="10px !important" color="#8C8C8C">
                                                    A lucky female winner from Taman Dahlia, Cheras, won Magnum Life
                                                    Grand Prize with RM1,000 every day for 20 years.
                                                </Typography>
                                                <Typography textAlign="left" fontSize="10px !important" color="#8C8C8C">
                                                    30 Mar 2023, 02:20 PM
                                                </Typography>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Grid>

                            </ListItem>
                            <Divider />
                            <ListItem sx={{ padding: "0px 0px" }}>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{ padding: "12px 0px", borderRadius: "5px" }}
                                    boxShadow="none"
                                    display="flex"
                                    alignItems="self-start"
                                >
                                    <Grid item xs={1} display="flex" alignItems="center" marginRight="5px">
                                        <img src="./assets/Profile/announcement.png" />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Grid
                                            item
                                            xs={12}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Grid item>
                                                <Typography fontWeight="500" fontSize="12px" color="#000">A Grand Prize Winner Won Magnum Life by Playing
                                                    Magnum Kungfu Stampcard Campaign</Typography>
                                                <Typography textAlign="left" fontSize="10px !important" color="#8C8C8C">
                                                    A lucky female winner from Taman Dahlia, Cheras, won Magnum Life
                                                    Grand Prize with RM1,000 every day for 20 years.
                                                </Typography>
                                                <Typography textAlign="left" fontSize="10px !important" color="#8C8C8C">
                                                    30 Mar 2023, 02:20 PM
                                                </Typography>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Grid>

                            </ListItem>
                            <Divider />
                            
                        </List>
                        <Divider />
                    </Grid>

                </Grid>
            </Grid>
        </>
    )

};
export default Announcement;