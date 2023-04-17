import * as React from "react";
import AppBar from "@mui/material/AppBar";
import {logout} from '@/store/actions/authActions';
import { Grid, Menu, Fade } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import LangSwitcher from "@/components/LangSwitcher";
import { Icon } from "@iconify/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useRouter } from "next/router";

import ProfileDropDown from "@/components/header/ProfileDropDown";
const Header = () => {
  const matches = useMediaQuery("(max-width:768px)");
  const {customer,isLogin} = useSelector((state) => state.auth);
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
    dispatch(logout(
        { 
            callback: (res) => {
                router.push('/'); 
            },
            auth: true
        },
    ));
}
  const [anchorScore, setAnchorScore] = useState(null);
  const openScore = Boolean(anchorScore);
  const handleScoreClick = (event) => {
    setAnchorScore(event.currentTarget);
  };
  const handleScoreClose = () => {
    setAnchorScore(null);
  };

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
            <Grid width="80%" container justifyContent="space-between">
              <Grid xs={6}>
                <a href="/">
                  <img src="./assets/Logo/logowhite.png" />
                </a>
              </Grid>
              <Grid
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
                  {!isLogin?
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
                  :
                  < ProfileDropDown /> }
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
            }}
            sx={{
              background: "linear-gradient(to right, #373737 50%, white 0%)",
            }}
          >
            <Grid width="80%" sx={{ background: "white" }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="strech"
              >
                <Grid xs={1}>
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
                <Grid xs={9} container color="black">
                  <Grid>
                    <MenuItem
                      onClick={() => {
                        router.push("/");
                      }}
                    >
                      <Typography textAlign="center">Home</Typography>
                    </MenuItem>
                  </Grid>
                  <Grid>
                    <MenuItem onClick={() => router.push("/LotteryPage")}>
                      <Typography textAlign="center">Lottery Draw</Typography>
                    </MenuItem>
                  </Grid>
                  <Grid>
                    <MenuItem>
                      <Typography textAlign="center">Data Chart</Typography>
                    </MenuItem>
                  </Grid>
                  <Grid>
                    <MenuItem>
                      <Typography textAlign="center">Foot Ball</Typography>
                    </MenuItem>
                  </Grid>
                  <Grid>
                    <MenuItem>
                      <Typography textAlign="center">BasketBall</Typography>
                    </MenuItem>
                  </Grid>
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
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
                <Grid
                  xs={2}
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Button
                    variant="contain"
                    sx={{
                      padding: "4px 8px",
                      fontSize: "12px",
                      background:
                        "linear-gradient(90deg, #FF0000 0%, #FF6F31 100%)",
                      color: "white",
                    }}
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
