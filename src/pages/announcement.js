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
  Modal,
  Backdrop,
  Fade,
  Box
} from "@mui/material";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useSelector } from "react-redux";
import { Image } from "mui-image";
import utils from "@/common/utils";
import { getAnnouncement } from "@/store/actions/announcementAction";
import NoDataMessage from "@/common/NoDataMessage";
import ArticleModal from "@/common/ArticleModal";



const Announcement = () => {
  const matches = useMediaQuery("(max-width:768px)");
  const router = useRouter();
  const langKey = useSelector((state) => state?.load_language?.language);
  // const { announcement } = useSelector(
  //   (state) => state?.announcement?.announcements
  // );
  // const announcements = announcement?.filter((item) => {
  //   return item.status === "0";
  // });


  const  {announcements,current_page,per_page,last_page}  = useSelector((state) => state?.announcement);



  //const announcements = announcement;

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);

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


  const [open, setOpen] = useState(false);
  const [article, setArticle] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleModalOpen =(article)=>{
setArticle(article)
setOpen(true)
  }

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


  const handleScroll = (event) => {
    if (
      last_page !== currentPage &&
      last_page > currentPage &&
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
        event.currentTarget.clientHeight
    ) {
      setCurrentPage(currentPage + 1);
      
    }
  };
  return !matches ? (
    <>
     <ArticleModal article={article} open={open} setOpen={setOpen}/>
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
                    sx={{ padding: "10px", textAlign: "left",cursor:'pointer' }}
                    onClick={()=>handleModalOpen(item)}
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
                        fontWeight="bold"
                        className="twoLinesEllip"
                        color="#000"
                        height="48px"
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        fontWeight="500"
                        className="twoLinesEllip"
                        color="#000"
                        height="48px"
                        title={item.comment}
                      >
                        {item.comment}
                      </Typography>
                      <Typography
                        paddingTop={1}
                        textAlign="left"
                        fontSize="12px"
                        color="#8C8C8C"
                      >
                        { moment(item.created_at).format(utils.letterFormat2) } 
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
                <Pagination count={last_page} page={currentPage} onChange={handleChange} variant="outlined" shape="rounded" className="announce-pagination" />
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
          overflow="auto" height='90vh'   onScroll={handleScroll}
          >
          
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
                            xs={1.6}
                            display="flex"
                            alignItems="center"
                           
                          >
                            <Image
                              alt="announcement"
                              src="./assets/Profile/announcement.png"
                              width={'35px'}
                              height={'35px'}
                            />
                          </Grid>
                          <Grid item xs={10.4}>
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
                                  fontSize="14px"
                                  color="#000"
                                >
                                  {item.title}
                                </Typography>
                                <Typography
                                  textAlign="left"
                                  fontSize="12px !important"
                                  color="#8C8C8C"
                                >
                                  {item.comment}
                                </Typography>
                                <Typography
                                  textAlign="left"
                                  fontSize="12px !important"
                                  color="#8C8C8C"
                                >
                                 { moment(item.created_at).format(utils.letterFormat2) }
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
    </>
  );
};
export default Announcement;
