/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import LoadingDialog from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Pagination from '@mui/material/Pagination';
import {
  Grid,
  Paper,
  Typography,
  FormControl,
  OutlinedInput,
  Stack,
  ListItem,
  ListItemText,
  ListItemIcon,
  List,
  FilledInput,
  InputAdornment,
  IconButton,
  Button,
  FormHelperText,
  Divider,
  InputLabel,
  Drawer
} from "@mui/material";


const rows = [
  {
    id: 1,
    heading: "System Announcement",
    date: "15 March 2023, 00:00:00",
    content: "Congratulations, your level has reached level 4. Upgrading to the next level requires 290 experience, which can be obtained through daily tasks and novice tasks in the task center.",
  },
  {
    id: 2,
    heading: "System Announcement",
    date: "15 March 2023, 00:00:00",
    content: "Congratulations, your level has reached level 4. Upgrading to the next level requires 290 experience, which can be obtained through daily tasks and novice tasks in the task center.",
  },
  {
    id: 3,
    heading: "System Announcement",
    date: "15 March 2023, 00:00:00",
    content: "Congratulations, your level has reached level 4. Upgrading to the next level requires 290 experience, which can be obtained through daily tasks and novice tasks in the task center.",
  },
  {
    id: 4,
    heading: "System Announcement",
    date: "15 March 2023, 00:00:00",
    content: "Congratulations, your level has reached level 4. Upgrading to the next level requires 290 experience, which can be obtained through daily tasks and novice tasks in the task center.",
  },
  {
    id: 4,
    heading: "System Announcement",
    date: "15 March 2023, 00:00:00",
    content: "Congratulations, your level has reached level 4. Upgrading to the next level requires 290 experience, which can be obtained through daily tasks and novice tasks in the task center.",
  },

];

export default function ProfileAnnouncement() {
  const { t } = useTranslation();
  return (

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

        <Grid item xs={12} textAlign="center" sm={12} md={12} xl={12} padding="0px" className="profileannouncement">
          <List sx={{ padding: "0px !important", margin: "0px !important", display: "grid", gridTemplateColumns: "auto", gridGap: "20px", justifyContent: "flex-start", textAlign: "center !important" }}>
            {rows.map((row) => {
              return (
                <ListItem sx={{ padding: "16px 5px 16px 16px!important", borderRadius: "6px", border: "2px solid #DDDDDD", }} className="listitem">
                  <Grid item xs={12}>
                    <Grid item>
                      <Grid item display="flex" justifyContent="space-between" alignItems="center">
                        <Typography fontWeight="700" fontSize="14px" color="#000">{t(row.heading)}</Typography>
                        <Icon icon="radix-icons:dot-filled" fontSize={30} color="red" />
                      </Grid>
                      <Typography textAlign="left" fontSize="14px !important" color="#8C8C8C">{t(row.date)}</Typography>
                      <Typography textAlign="left" paddingTop={1} fontSize="12px !important" color="#000">{t(row.content)}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              );
            })}

          </List>
          <Grid item xs={12} textAlign="center" display="flex" justifyContent="center" paddingTop={3}>
            <Stack spacing={2} sx={{ textAlign: "center" }}>
              <Pagination count={5} variant="outlined" shape="rounded" />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>






  );
}
