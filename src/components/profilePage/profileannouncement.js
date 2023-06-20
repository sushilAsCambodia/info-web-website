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
import utils from "@/common/utils";
import { getAnnouncement } from "@/store/actions/announcementAction";
import NoDataMessage from "@/common/NoDataMessage";
import moment from "moment/moment";

export default function ProfileAnnouncement() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);

  const  {announcements,current_page,per_page,last_page}  = useSelector((state) => state?.announcement);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(page);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };


  useEffect(() => {
    dispatch(
      getAnnouncement({
        params: { lang_id: utils.convertLangCodeToID(langKey), rowsPerPage: 10,page:currentPage },
        callback: (res) => {},
      })
    );
  }, [langKey,currentPage]);


  // const handleScroll = (event) => {
  //   if (
  //     last_page !== currentPage &&
  //     last_page > currentPage &&
  //     event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
  //       event.currentTarget.clientHeight
  //   ) {
  //     setCurrentPage(currentPage + 1);
      
  //   }
  // };



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

        <Grid item  textAlign="center"xs={12} sm={12} md={12} xl={12} padding="0px" className="profileannouncement">
          <List sx={{ padding: "0px !important", margin: "0px !important"}}>
            {announcements?.length > 0 && announcements.map((item,index) => {
              return (
                <ListItem key={index} sx={{ padding: "16px 5px 16px 16px!important", borderRadius: "6px", border: "2px solid #DDDDDD",marginY:'5px',"&:hover": {
                  border: "2px solid red",
                }, }}  >
                  <Grid item xs={12}>
                    <Grid item>
                      <Grid item display="flex" justifyContent="space-between" alignItems="center">
                        <Typography fontWeight="700" fontSize="14px" color="#000">{item.title} </Typography>
                        <Icon icon="radix-icons:dot-filled" fontSize={30} color="red" />
                      </Grid>
                      <Typography textAlign="left" fontSize="14px !important" color="#8C8C8C">{item.comment} </Typography>
                      <Typography textAlign="left" paddingTop={1} fontSize="12px !important" color="#000">{ moment(item.created_at).format(utils.DateWithTime) }</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              );
            })}
          </List>

            {announcements?.length == 0 && (
             <NoDataMessage />
            )}


        </Grid>

        {announcements?.length > 0 && last_page > 1 &&  (
            <Grid
              item
              xs={12}
              textAlign="center"
              display="flex"
              justifyContent="center"
              paddingTop={3}
            >
              <Stack spacing={2} sx={{ textAlign: "center" }}>
                <Pagination count={last_page} page={currentPage} onChange={handleChange} variant="outlined" shape="rounded" className="announce-pagination" />
              </Stack>
            </Grid>
          )}
      </Grid>
    </Grid>






  );
}
