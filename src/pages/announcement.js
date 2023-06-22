import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import moment from 'moment/min/moment-with-locales'
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
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Image } from "mui-image";
import utils from "@/common/utils";
import { getAnnouncement } from "@/store/actions/announcementAction";
import NoDataMessage from "@/common/NoDataMessage";
import ArticleModal from "@/common/ArticleModal";
import TitleBreadCrumbs from "@/common/TitleBreadCrumbs";



const Announcement = () => {
  const matches = useMediaQuery("(max-width:768px)");
  const router = useRouter();
  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);
  const { i18n } = useTranslation();


  const  {announcements,current_page,per_page,last_page}  = useSelector((state) => state?.announcement);



  //const announcements = announcement;

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [article, setArticle] = useState({});


  const handleModalOpen =(article)=>{
setArticle(article)
setOpen(true)
  }

  const [currentPage, setCurrentPage] = useState(page);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  
  useEffect(() => {
    console.log(':::lang key',langKey)
    dispatch(
      getAnnouncement({
        params: { lang_id: utils.convertLangCodeToID(i18n.language), rowsPerPage: 10,page:currentPage },
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
    <Grid height='100vh'container
        // alignItems="flex-start"
        justifyContent="center"
        alignContent="stretch">
     <ArticleModal article={article} open={open} setOpen={setOpen}/>
     
        <Grid
          item
          xs={12}
          container
          alignContent="flex-start"
          alignItems="center"
          overflow="auto"
        >
       <TitleBreadCrumbs title={langKey.announcement}/>
          <Grid container>
            {announcements?.length > 0 &&
              announcements.map((item, index) => {
                return (
                <>
                    <Grid
                      key={index}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      sx={{ padding: "5px", textAlign: "left",cursor:'pointer' }}
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
                          { moment(item.created_at).locale(utils.localChange(i18n.language)).format(utils.letterFormat2) } 
                        </Typography>
                      </Grid>
                    </Grid>
                    
                </>
                );
              })}
              
            {announcements?.length == 0 && (
             <NoDataMessage />
            )}
          </Grid> 
          </Grid>
          {announcements?.length > 0 && last_page > 1 && (
            <Grid
              item
              xs={12}
             
              display="flex"
              justifyContent="center"
              alignContent="center"
              marginTop={10}
              
            >
                <Pagination count={last_page} page={currentPage} onChange={handleChange} variant="outlined" shape="rounded" className="announce-pagination" />
            </Grid>
          )}
       
    </Grid>
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
          overflow="auto" height='90vh'   
          onScroll={handleScroll}
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
