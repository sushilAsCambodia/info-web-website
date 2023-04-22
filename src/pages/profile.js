import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { styled } from '@mui/material/styles';
import {
  Button,
  Typography,
  Grid,
  ListItem,
  List,
  Box,
  Divider,
  Card
} from "@mui/material";
import Router from "next/router";
import { logout } from "@/store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import UserProfileIcon from "@/components/svg/profile";
import AnnouncementIcon from "@/components/svg/announcement";
import FeedbackIcon from "@/components/svg/feedback";
import LogoutIcon from "@/components/svg/logout";
import CustomerServiceIcon from "@/components/svg/customerService";
import useMediaQuery from "@mui/material/useMediaQuery";

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProfileInfo from "@/components/profilePage/profileInfo";
import Feedback from "./feedback";
import { useRouter } from "next/router";
import DialogMessage from "@/components/DialogMessage";
import Announcement from "./announcement";
import ProfileAnnouncement from "@/components/profilePage/profileannouncement";
import Cookies from "js-cookie";
const Profile = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const matches = useMediaQuery("(max-width:768px)");
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [openDialog,setOpenDialog]=useState(false)
  const [responseMessage,setResponseMessage]  = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  useEffect(() => {
    if(Cookies.get('token')) {
      setMounted(true);
    }else {
      router.push('/login');
    }
  },[]);
  useEffect(() => {
    const hash = router.asPath.split('#')[1];
    if(hash == 'feedback') {
      setValue(2);
    }else if(hash == 'system'){
      setValue(1)
    }
     else {
      setValue(0);
    }
   }, [ router.asPath ]);

  useEffect(() => {
    setMounted(true);
  }, []);
  const { isLogin, customer } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(
      logout({
        callback: (res) => {
          Router.push("/home");
        },
        auth: true,
      })
    );
  };
  const goToLogin = () => {
    Router.push("/login");
  };
  const goToProfileDetail = () => {
    Router.push("/profileDetail");
  };
  const goToAnnouncement = () => {
    Router.push("/announcement");
  };

  const goToFeedback = () => {
    Router.push("/feedback");
  };

  const goToCustomerService = () => {
    Router.push("/customerService");
  };
  const CusTabs = styled(Tabs)({
    border: '1px solid #DDDDDD',
    borderRadius:'10px',
    '& .MuiTabs-indicator': {
      backgroundColor: 'none',
    }
  });
  const CusTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    // marginRight: theme.spacing(1),
    color: 'black',
    '&:hover': {
      color: '#FF6F31',
      opacity: 1,
    //   background: 'orange'
    },
    '&.Mui-selected': {
      color: 'white',
      background: '#FF6F31',
      borderRadius:'10px',
    }
  }));
  
// DESKTOP ELEMENTS 
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 1 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  return !matches ? (
    <Grid display="flex" justifyContent="center" pt={9} minHeight={750}>
     <Grid sx={{ width: 700 }} className="profiletab">
        <CusTabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          sx={{color:"black"}}
          indicatorColor="transparent"
          >
          <CusTab label={t("personal_information")} {...a11yProps(0)} onClick={() => router.push('/profile#profile')}/>
          <CusTab label={t("system_announcement")} {...a11yProps(1)} onClick={() => router.push('/profile#system')}/>
          <CusTab label={t("feedback")} {...a11yProps(2)} onClick={() => router.push('/profile#feedback')}/>
        </CusTabs>
      <SwipeableViews
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} >
          <ProfileInfo setOpenDialog={setOpenDialog} openDialog={openDialog} setResponseMessage={setResponseMessage}/>
        </TabPanel>
        <TabPanel value={value} index={1} >
        <ProfileAnnouncement />
        </TabPanel>
        <TabPanel value={value} index={2} >
          <Card sx={{padding:"15px"}} elevation={5}>
          <Feedback />
          </Card>
        </TabPanel>
      </SwipeableViews>
    </Grid>
    <DialogMessage
       open={openDialog} 
       setOpen={setOpenDialog} 
       message={responseMessage}
      //  onClosed={()=>setOpenDialog(false)}
     />
    </Grid>
  ) : (
    <> 
      {mounted && <Grid
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
                  {isLogin ? (
                    <>
                      <Grid item xs={12} display="flex" alignItems="center">
                        <img 
                          src={customer.image?.path || '/assets/Profile/user-icon.png'} 
                          style={{ height:50,width:50,borderRadius:'50%'}}
                          onError={(e) => e.target.src = '/assets/Profile/user-icon.png'}
                        />
                        &nbsp;{" "}
                        <Typography fontWeight="600" fontSize="12px">
                          {customer.user_name || "Profile Name"}
                        </Typography>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={2} display="flex" alignItems="center">
                        <img src="/assets/Profile/user-icon.png" />
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
                            <Typography fontWeight="600" fontSize="12px">
                              {t("login_to_enjoy")}
                            </Typography>
                            <Button
                              variant="contained"
                              onClick={goToLogin}
                              sx={{
                                fontSize: "12px",
                                marginTop: "6px",
                                color: "white",
                                background:
                                  "linear-gradient(90.04deg, #FF0000 0.04%, #FF6F31 99.97%);",
                                textTransform: "capitalize",
                                borderRadius: "22px",
                                padding: "4px 10px",
                              }}
                            >
                              {t("login")}/{t("register")}
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  )}
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
              <Typography>{t("important_links")}</Typography>
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
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                      width="30px"
                      height="30px"
                      component="span"
                      sx={{ border: "1px solid #FF6E31", borderRadius: "50%" }}
                    >
                      <UserProfileIcon color="#FF6E31" />
                    </Box>
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
                        <Typography fontWeight="500" fontSize="16px">
                          {t("profile")}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        display="flex"
                        alignItems="center"
                        color="#8C8C8C;"
                      >
                        <Icon
                          icon="material-symbols:keyboard-arrow-right"
                          fontSize="25px"
                        />
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
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                      width="30px"
                      height="30px"
                      component="span"
                      sx={{ border: "1px solid #FF6E31", borderRadius: "50%" }}
                    >
                      <AnnouncementIcon color="#FF6E31" />
                    </Box>
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
                        <Typography fontWeight="500" fontSize="16px">
                          {t("announcement")}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        display="flex"
                        alignItems="center"
                        color="#8C8C8C;"
                      >
                        <Icon
                          icon="material-symbols:keyboard-arrow-right"
                          fontSize="25px"
                        />
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
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                      width="30px"
                      height="30px"
                      component="span"
                      sx={{ border: "1px solid #FF6E31", borderRadius: "50%" }}
                    >
                      <FeedbackIcon size={20} color="#FF6E31" />
                    </Box>
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
                        <Typography fontWeight="500" fontSize="16px">
                          {t("feedback")}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        display="flex"
                        alignItems="center"
                        color="#8C8C8C;"
                      >
                        <Icon
                          icon="material-symbols:keyboard-arrow-right"
                          fontSize="25px"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
              <ListItem
                sx={{ padding: "0px 0px" }}
                onClick={goToCustomerService}
              >
                <Grid
                  item
                  xs={12}
                  sx={{ padding: "12px 0px", borderRadius: "5px" }}
                  boxShadow="none"
                  display="flex"
                  alignItems="center"
                >
                  <Grid item xs={2} display="flex" alignItems="center">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                      width="30px"
                      height="30px"
                      component="span"
                      sx={{ border: "1px solid #FF6E31", borderRadius: "50%" }}
                    >
                      {/* <CustomerServiceIcon color="#FF6E31"/> */}
                      <CustomerServiceIcon color="#FF6E31" />
                    </Box>
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
                        <Typography fontWeight="500" fontSize="16px">
                          {t("customerservice")}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        display="flex"
                        alignItems="center"
                        color="#8C8C8C;"
                      >
                        <Icon
                          icon="material-symbols:keyboard-arrow-right"
                          fontSize="25px"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem sx={{ padding: "0px 0px" }} onClick={handleLogout}>
                {isLogin ? (
                  <Grid
                    container
                    item
                    xs={12}
                    sx={{ padding: "12px 0px", borderRadius: "5px" }}
                    boxShadow="none"
                    display="flex"
                    alignItems="center"
                  >
                    <Grid item xs={2} display="flex" alignItems="center">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        width="30px"
                        height="30px"
                        component="span"
                        sx={{
                          border: "1px solid #FF6E31",
                          borderRadius: "50%",
                        }}
                      >
                        <LogoutIcon size={17} color="#FF6E31" />
                      </Box>
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
                          <Typography fontWeight="500" fontSize="16px">
                            {t("logout")}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          display="flex"
                          alignItems="center"
                          color="#8C8C8C;"
                        >
                          <Icon
                            icon="material-symbols:keyboard-arrow-right"
                            fontSize="25px"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  ""
                )}
              </ListItem>
            </List>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={12} padding="0px">
            <Grid item xs={12} paddingTop="20px" paddingBottom="20px">
              <Typography fontWeight="600">{t("download_app")}</Typography>
            </Grid>
            <List sx={{ padding: "0px" }}>
              <ListItem sx={{ padding: "0px 0px" }}>
                <Grid
                  item
                  xs={12}
                  sx={{ padding: "12px 0px", borderRadius: "5px" }}
                  boxShadow="none"
                >
                  <Grid
                    container
                    spacing={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item xs={6} md={6}>
                      <img
                        src="/assets/Home/iosbtn.png"
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <img
                        src="/assets/Home/androidbtn.png"
                        style={{ width: "100%" }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>}
      
    </>
  );
}; 
export default Profile;
