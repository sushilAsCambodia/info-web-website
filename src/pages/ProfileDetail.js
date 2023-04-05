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
import UploadImg from "@/components/profile/uploadImg";

const ProfileDetail = () => {


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
                    alignContent="center"
                    alignItems="center"
                    overflow="auto"
                    className="uploadimg_main"
                    flexDirection="column"
                >

<Grid item >

</Grid>





                  <UploadImg />
                </Grid>
            </Grid>
        </>
    )

};
export default ProfileDetail;