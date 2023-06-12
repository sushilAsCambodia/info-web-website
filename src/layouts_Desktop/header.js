import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { logout } from "@/store/actions/authActions";
import { Grid, Menu, Fade, Popover, Chip } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import LangSwitcher from "@/components/LangSwitcher";
import { Icon } from "@iconify/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { getLanguage } from "../store/actions/languageActions";
import ProfileDropDown from "@/components/header/ProfileDropDown";
import HeaderLiveScore from "@/components/header/headerLiveScore";
import Link from "next/link";
import utils from "@/common/utils";
import Image from "mui-image";
// import { signOut } from "next-auth/react";
const Header = () => {
  const matches = useMediaQuery("(max-width:768px)");
  const matches2 = useMediaQuery("(max-width:1074px)");
  const { t, i18n } = useTranslation();
  const { customer, isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [path, setPath] = useState("");
  const [hash, setHash] = useState("");
  const open = Boolean(anchorEl);
  const [scroll, setScroll] = useState(false);

  const langKey = useSelector(
    (state) => state && state.load_language && state.load_language.language
  );

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
          // signOut(); // third party will refresh the page
          // use this without social login 
          router.push("/login");
        },
        auth: true,
      })
    );
  };
  const [anchorScore, setAnchorScore] = useState(null);
  const handleScoreClick = (event) => {
    setAnchorScore(event.currentTarget);
  };
  const handleScoreClose = () => {
    setAnchorScore(null);
  };
  const openScore = Boolean(anchorScore);
  const id = openScore ? "simple-popover" : undefined;

  const menuList = [
    { label: langKey && langKey.lottery_draw, page: "LotteryPage" },
    { label: (langKey && langKey.data_chart), page: "DataChart" },
    { label: langKey && langKey.foot_ball, page: "footBallPage" },
    { label: (langKey && langKey.basket_ball), page: "basketBall" },
  ];

  useEffect(() => {
    const path = router.asPath;
    const hash = router.asPath.split("#")[0];
    console.log("header hash:::", hash, path);

    setPath(path);
    setHash(hash);

    handleScoreClose();
  }, [router.asPath]);

  window.addEventListener("scroll", () => {
    setScroll(window.pageYOffset > 56);
  });
  // useEffect(() => {
  //   if (i18n.language) {
  //     dispatch(
  //       getLanguage({
  //         params: {
  //           lang_id: utils.convertLangCodeToID(i18n.language),
  //         },
  //         callback: (res) => {
  //           localStorage.setItem("languageKey", JSON.stringify(res));
  //         },
  //       })
  //     );
  //   }
  // }, [dispatch, i18n.language]);
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.addEventListener("scroll", () =>
  //       setScroll(window.pageYOffset > 50)
  //     );
  //   }

  // }, []);
  return (
    <>
      {router.pathname == "/login" || router.pathname == "/register" ? (
        ""
      ) : (
        <Grid className="sticky-header" paddingBottom="90px">
          <AppBar
            style={{
              background:
                "linear-gradient(90.08deg, #FF0000 0.08%, #FF6F31 99.94%)",
              height: "56px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // position:`${scroll ? "static":"" }`
            }}
          >
            <Grid
              width={{ xs: "95%", xl: "80%" }}
              container
              justifyContent="space-between"
            >
              <Grid item xs={4}>
                <Link href="/">
                  <Image src="./assets/Logo/new-logo.png" width="130px" height="100%" alt="info_logo" />
                </Link>
              </Grid>
              <Grid
                item
                xs={8}
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
                      {langKey && langKey.login}/{langKey && langKey.register}
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
            // position="static"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              background: "linear-gradient(to right, #373737 50%, white 0%)",
              top: 55,
            }}
          >
            <Grid width={{ xs: "95%", xl: "80%" }} sx={{ background: "white" }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="strech"
              >
                <Grid item xs={3} sm={2} md={2} lg={1}>
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
                    <Typography color="white">
                      {langKey && langKey.live_score}
                    </Typography>
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
                  <Popover
                    id={id}
                    open={openScore}
                    anchorEl={anchorScore}
                    onClose={handleScoreClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Grid
                      container
                      sx={{
                        background: "#494949",
                        color: "white",
                        width: { xs: "95vw", xl: "80vw" },
                      }}
                    >
                      <HeaderLiveScore />
                    </Grid>
                  </Popover>
                </Grid>
                <Grid item xs={6} md={6} lg={8} container color="black" marginRight="auto">
                  <Grid>
                    <MenuItem
                      onClick={() => {
                        router.push("/");
                      }}
                    >
                      <Typography
                        textAlign="center"
                        className={`${
                          hash == "/" || path == "/" ? "selectedTab" : ""
                        }`}
                      >
                        {langKey && langKey.home}{" "}
                      </Typography>
                    </MenuItem>
                  </Grid>
                  {!matches2
                    ? menuList.map((item, index) => {
                        return (
                          <Grid key={index}>
                            <MenuItem
                              sx={{ paddingX: { xs: "3px", lg: "15px" } }}
                              onClick={() => router.push(`${item.page}`)}
                            >
                              <Typography
                                textAlign="center"
                                className={`${
                                  hash == item.page || path == item.page
                                    ? "selectedTab"
                                    : ""
                                }`}
                              >
                                {item.label}
                              </Typography>
                            </MenuItem>
                          </Grid>
                        );
                      })
                    : ""}

                  {matches2 ? (
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
                        {t("more")}
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
                        {menuList.map((item, index) => {
                          return (
                            <MenuItem
                              key={index}
                              onClick={() => {
                                router.push(`${item.page}`), handleClose();
                              }}
                            >
                              <Typography
                                textAlign="center"
                                className={`${
                                  hash == item.page || path == item.page
                                    ? "selectedTab"
                                    : ""
                                }`}
                              >
                                {item.label}
                              </Typography>
                            </MenuItem>
                          );
                        })}
                      </Menu>
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid
                  item
                  xs={4}
                  lg={2.5}
                  container
                  alignItems="center"
                  flexWrap="nowrap"
                  justifyContent="flex-end"
                >
                  <Button
                    variant="contain"
                    sx={{
                      whiteSpace: "nowrap",
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
                    {langKey && langKey.download_app}
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
                    {langKey && langKey.favorites}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </AppBar>
        </Grid>
      )}
    </>
  );
};
export default Header;
