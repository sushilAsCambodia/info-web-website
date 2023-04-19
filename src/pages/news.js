import React, { useEffect, useState } from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Pagination from '@mui/material/Pagination';

import {
    Button,
    Typography,
    Stack,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    Icon,
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

const News = () => {
    const matches = useMediaQuery("(max-width:768px)");
    const router = useRouter();

    const breadcrumbs = [
        <Link underline="hover" component={Link} key="1" color="inherit"  sx={{cursor:"pointer"}}   onClick={()=>router.push('/')}>
            Home
        </Link>,
        <Typography key="2" color="#F24E1E">
            News
        </Typography>,
    ];
    return (
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
                            <Typography variant="h5" fontWeight={600}>News</Typography>
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
                    <Grid item xs={12} sm={12} md={12} xl={12} padding="0px">
                        <List sx={{ padding: "0px !important", margin: "0px !important", display: "grid", gridTemplateColumns: "auto auto auto auto", gridGap: "20px", justifyContent: "flex-start", textAlign: "center !important" }}>
                            {rows.map((row) => {
                                return (
                                    <ListItem sx={{ padding: "20px 60px 20px 20px !important", backgroundColor: "#FFF5F0", borderRadius: "11px", border: "1px solid #FF6F31", }}>
                                        <Grid item xs={12}>
                                            <Grid item>
                                                <Typography fontWeight="500" fontSize="12px" color="#000">{row.news}</Typography>
                                                <Typography paddingTop={1} textAlign="left" fontSize="10px !important" color="#8C8C8C">
                                                    {row.date}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                );
                            })}

                        </List>
                    </Grid>
                    <Grid item xs={12} textAlign="center" display="flex" justifyContent="center" paddingTop={3}>
                        <Stack spacing={2} sx={{ textAlign: "center" }}>
                            <Pagination count={5} variant="outlined" shape="rounded" />
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )

};
export default News;