import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import moment from "moment/moment";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Pagination from "@mui/material/Pagination";
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
import utils from "@/common/utils";
import { getAnnouncement } from "@/store/actions/announcementAction";
import NoDataMessage from "@/common/NoDataMessage";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Announcement = () => {
  const matches = useMediaQuery("(max-width:768px)");
  const router = useRouter();
  const langKey = useSelector((state) => state?.load_language?.language);
  const { announcement } = useSelector(
    (state) => state?.announcement?.announcements
  );
  const announcements = announcement?.filter((item) => {
    return item.status === "0";
  });

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const dispatch = useDispatch();

  const breadcrumbs = [
    <Link
      underline="hover"
      component={Link}
      key="1"
      color="inherit"
      sx={{ cursor: "pointer" }}
      onClick={() => router.push("/")}
    >
      {langKey && langKey.home}
    </Link>,
    <Typography key="2" color="#F24E1E">
      {langKey && langKey.announcement}
    </Typography>,
  ];

  useEffect(() => {
    dispatch(
      getAnnouncement({
        params: { lang_id: utils.convertLangCodeToID(langKey), take: 10 },
        callback: (res) => {},
      })
    );
  }, [langKey]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            xl={12}
            padding="0px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            paddingBottom={2}
          >
            <Grid>
              <Typography variant="h5" fontWeight={600}>
                {langKey && langKey.announcement}
              </Typography>
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
            {announcements?.length > 0 &&
              announcements.map((item, index) => {
                return (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    sx={{ padding: "10px", textAlign: "left" }}
                  >
                    <Grid
                      item
                      sx={{
                        backgroundColor: "#FFF5F0",
                        border: "1px solid #FF6F31",
                        borderRadius: "11px",
                        padding: "10px",
                      }}
                    >
                      <Typography
                        fontWeight="500"
                        className="twoLinesEllip"
                        color="#000"
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        fontWeight="500"
                        className="twoLinesEllip"
                        color="#000"
                      >
                        {item.comment}
                      </Typography>
                      <Typography
                        paddingTop={1}
                        textAlign="left"
                        fontSize="12px"
                        color="#8C8C8C"
                      >
                        { moment(item.created_at).format(utils.DateWithTime) }
                      </Typography>
                    </Grid>
                  </Grid>
                );
              })}
            {announcements?.length == 0 && (
             <NoDataMessage />
            )}
          </Grid>
          {announcements?.length > 0 && (
            <Grid
              item
              xs={12}
              textAlign="center"
              display="flex"
              justifyContent="center"
              paddingTop={3}
            >
              <Stack spacing={2} sx={{ textAlign: "center" }}>
                <Pagination count={totalPage} page={page} variant="outlined" shape="rounded" className="announce-pagination" />
              </Stack>
            </Grid>
          )}
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
              {announcements?.length > 0 &&
                announcements.map((item, index) => {
                  return (
                    <div key={index}>
                      <ListItem sx={{ padding: "0px 0px" }}>
                        <Grid
                          item
                          xs={12}
                          sx={{ padding: "12px 0px", borderRadius: "5px" }}
                          boxShadow="none"
                          display="flex"
                          alignItems="self-start"
                        >
                          <Grid
                            item
                            xs={1}
                            display="flex"
                            alignItems="center"
                            marginRight="5px"
                          >
                            <Image
                              alt="announcement"
                              src="./assets/Profile/announcement.png"
                            />
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
                                <Typography
                                  fontWeight="500"
                                  fontSize="12px"
                                  color="#000"
                                >
                                  {item.title}
                                </Typography>
                                <Typography
                                  textAlign="left"
                                  fontSize="10px !important"
                                  color="#8C8C8C"
                                >
                                  {item.comment}
                                </Typography>
                                <Typography
                                  textAlign="left"
                                  fontSize="10px !important"
                                  color="#8C8C8C"
                                >
                                 { moment(item.created_at).format(utils.DateWithTime) }
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <Divider />
                    </div>
                  );
                })}
            </List>
            {/* <Divider /> */}
            {announcements?.length == 0 && <NoDataMessage />}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Announcement;
