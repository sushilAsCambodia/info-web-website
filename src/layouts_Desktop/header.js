import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { logout } from "@/store/actions/authActions";
import { Grid, Menu, Fade } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import LangSwitcher from "@/components/LangSwitcher";
import { Icon } from "@iconify/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import ProfileDropDown from "@/components/header/ProfileDropDown";
import Link from "next/link";
const Header = () => {
  const matches = useMediaQuery("(max-width:768px)");
  const matches2 = useMediaQuery("(max-width:1024px)");
  const { customer, isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(
      logout({
        callback: (res) => {
          router.push("/");
        },
        auth: true,
      })
    );
  };
  const [anchorScore, setAnchorScore] = useState(null);
  const openScore = Boolean(anchorScore);
  const handleScoreClick = (event) => {
    setAnchorScore(event.currentTarget);
  };
  const handleScoreClose = () => {
    setAnchorScore(null);
  };
  const menuList = [
    { label: "Lottery Draw", page: "LotteryPage" },
    { label: "Data Chart", page: "DataChart" },
    { label: "FootBall", page: "FootBall" },
    { label: "BasketBall", page: "BasketBall" },
  ];
  return (
    <>
      {router.pathname == "/login" || router.pathname == "/register" ? (
        ""
      ) : (
        <>
          <AppBar
            position="static"
            style={{
              background:
                "linear-gradient(90.08deg, #FF0000 0.08%, #FF6F31 99.94%)",
              height: "56px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              width={{ xs: "95%", xl: "80%" }}
              container
              justifyContent="space-between"
            >
              <Grid item xs={6}>
                <Link href="/">
                  <img src="./assets/Logo/logowhite.png" />
                </Link>
              </Grid>
              <Grid
                item
                xs={6}
                container
                spacing={2}
                sx={{ alignItems: "center", justifyContent: "flex-end" }}
              >
                <Grid item>
                  <Icon width={20} icon="solar:moon-bold" />
                </Grid>
                <Grid item>
                  <Icon width={20} icon="zondicons:notification" />
                </Grid>
                <Grid item>
                  <Icon width={20} icon="material-symbols:search-rounded" />
                </Grid>
                <Grid item>
                  {!isLogin ? (
                    <Button
                      onClick={() => {
                        router.push("/login");
                      }}
                      variant="container"
                      sx={{
                        background: "white",
                        color: "red",
                        fontSize: "12px",
                        borderRadius: "20px",
                        "&:hover": {
                          background: "red",
                          color: "white",
                        },
                      }}
                    >
                      Login/Register
                    </Button>
                  ) : (
                    <ProfileDropDown
                      customer={customer}
                      logout={handleLogout}
                    />
                  )}
                </Grid>
                <Grid item>
                  <LangSwitcher />
                </Grid>
              </Grid>
            </Grid>
          </AppBar>
          <AppBar
            position="static"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
            }}
            sx={{
              background: "linear-gradient(to right, #373737 50%, white 0%)",
            }}
          >
            <Grid width={{ xs: "95%", xl: "80%" }} sx={{ background: "white" }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="strech"
              >
                <Grid item xs={2} md={1}>
                  <MenuItem
                    id="fade-button"
                    aria-controls={openScore ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openScore ? "true" : undefined}
                    onClick={handleScoreClick}
                    sx={{
                      background: "#373737",
                      "&:hover": {
                        background: "grey",
                      },
                      paddingLeft: "0px",
                    }}
                  >
                    <Typography color="white">Live Score</Typography>
                    {openScore ? (
                      <Icon
                        color="white"
                        icon="material-symbols:keyboard-arrow-up-rounded"
                      />
                    ) : (
                      <Icon
                        color="white"
                        icon="material-symbols:keyboard-arrow-down-rounded"
                      />
                    )}
                  </MenuItem>
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorScore}
                    open={openScore}
                    onClose={handleScoreClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={handleScoreClose}>score 1</MenuItem>
                    <MenuItem onClick={handleScoreClose}>score 2</MenuItem>
                    <MenuItem onClick={handleScoreClose}>score 3</MenuItem>
                  </Menu>
                </Grid>
                <Grid item xs={6} lg={7.5} container color="black">
                  <Grid>
                    <MenuItem
                      onClick={() => {
                        router.push("/");
                      }}
                    >
                      <Typography textAlign="center">Home</Typography>
                    </MenuItem>
                  </Grid>
                  {!matches2 ? menuList.map((item) => {
                    return (
                      <Grid>
                        <MenuItem sx={{paddingX:{xs:"5px",lg:"15px"}}} onClick={() => router.push(`/${item.page}`)}>
                          <Typography  textAlign="center">{item.label}</Typography>
                        </MenuItem>
                      </Grid>
                    );
                  }) : ''}
                 
                  <Grid>
                    <MenuItem
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      sx={{
                        color: `${!open ? "#037DED" : undefined}`,
                        fontWeight: "bold",
                      }}
                    >
                      More{" "}
                      {open ? (
                        <Icon icon="material-symbols:keyboard-arrow-up-rounded" />
                      ) : (
                        <Icon icon="material-symbols:keyboard-arrow-down-rounded" />
                      )}
                    </MenuItem>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {matches2 ? menuList.map((item) => {
                    return (
                        <MenuItem onClick={() => router.push(`/${item.page}`)}>
                          <Typography textAlign="center">{item.label}</Typography>
                        </MenuItem>
                    );
                  }) : ''}
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={4}
                  lg={2.5}
                  container
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Button
                    variant="contain"
                    sx={{
                      padding: "4px 8px",
                      marginRight: "5px",
                      fontSize: "12px",
                      background:
                        "linear-gradient(90deg, #FF0000 0%, #FF6F31 100%)",
                      color: "white",
                    }}
                    onClick={() => router.push("/download")}
                  >
                    <Icon icon="material-symbols:app-shortcut" width={20} />
                    Download App
                  </Button>

                  <Button
                    variant="contain"
                    sx={{
                      background: "black",
                      color: "#FFD233",
                      padding: "4px 8px",
                      fontSize: "12px",
                    }}
                  >
                    <Icon icon="ic:round-star-border" width={20} />
                    Favorite
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </AppBar>
        </>
      )}
    </>
  );
};
export default Header;
