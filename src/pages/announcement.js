import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Pagination from '@mui/material/Pagination';
import {
    Button,
    Typography,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    Stack,
    ListItem,
    ListItemText,
    ListItemIcon,
    List,
    Dialog,
    OutlinedInput,
    Divider,
} from "@mui/material";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useSelector } from "react-redux";
import { Image } from "mui-image";


const rows = [
    {
        id: 1,
        news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        date: "03 Apr 2023",
    },
    {
        id: 2,
        news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        date: "03 Apr 2023",
    },
    {
        id: 3,
        news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        date: "03 Apr 2023",
    },
    {
        id: 4,
        news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        date: "03 Apr 2023",
    },
    {
        id: 4,
        news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        date: "03 Apr 2023",
    },
    {
        id: 4,
        news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        date: "03 Apr 2023",
    },
    {
        id: 4,
        news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        date: "03 Apr 2023",
    },
    {
        id: 4,
        news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        date: "03 Apr 2023",
    },
];

const Announcement = () => {
    const matches = useMediaQuery("(max-width:768px)");
    const router = useRouter();
    const langKey = useSelector((state) => state && state.load_language && state.load_language.language);
    const breadcrumbs = [
        <Link underline="hover" component={Link} key="1" color="inherit"  sx={{cursor:"pointer"}}   onClick={()=>router.push('/')}>
             {langKey && langKey.home}
        </Link>,
        <Typography key="2" color="#F24E1E">
             {langKey && langKey.announcement}
        </Typography>,
    ];


  

    return !matches ? (
        <>
            <Grid
                container
                alignItems="flex-start"
                justifyContent="center"
                padding="20px 16px"
            >
                <Grid
                    item
                    xs={12}
                    container
                    alignContent="flex-start"
                    alignItems="center"
                    overflow="auto"
                >
                    <Grid item xs={12} sm={12} md={12} xl={12} padding="0px" display="flex" justifyContent="space-between" alignItems="center" paddingBottom={2}>
                        <Grid>
                            <Typography variant="h5" fontWeight={600}>{langKey && langKey.announcement}</Typography>
                        </Grid>
                        <Grid>
                            <Stack spacing={2}>
                                <Breadcrumbs
                                    separator={<NavigateNextIcon fontSize="small" />}
                                    aria-label="breadcrumb"
                                >
                                    {breadcrumbs}
                                </Breadcrumbs>
                            </Stack>
                        </Grid>
                    </Grid>
                        <Grid container>
                            {rows.map((row,index) => {
                                return (
                                    <Grid key={index} item xs={12} sm={6} md={4} lg={3} sx={{ padding: "10px", textAlign:"left",  }}>
                                            <Grid item sx={{backgroundColor: "#FFF5F0",border: "1px solid #FF6F31",borderRadius: "11px",padding:"10px"  }}>
                                                <Typography fontWeight="500" className="twoLinesEllip" color="#000">{row.news}</Typography>
                                                <Typography paddingTop={1} textAlign="left" fontSize="12px" color="#8C8C8C">
                                                    {row.date}
                                                </Typography>
                                            </Grid>
                                    </Grid>
                                );
                            })}

                        </Grid>

                    <Grid item xs={12} textAlign="center" display="flex" justifyContent="center" paddingTop={3}>
                        <Stack spacing={2} sx={{ textAlign: "center" }}>
                            <Pagination count={5} variant="outlined" shape="rounded" />
                        </Stack>
                    </Grid>

                </Grid>
            </Grid>
        </>
    ) : (
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
                                        <Image alt="announcement" src="./assets/Profile/announcement.png" />
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
                                        <Image alt="announcement" src="./assets/Profile/announcement.png" />
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
                                        <Image alt="announcement" src="./assets/Profile/announcement.png" />
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
                                        <Image alt="announcement" src="./assets/Profile/announcement.png" />
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
                                        <Image alt="announcement" src="./assets/Profile/announcement.png" />
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