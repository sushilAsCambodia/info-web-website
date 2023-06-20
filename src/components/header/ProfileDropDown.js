import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector } from "react-redux";
import {
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Divider,
  Grid,
  Button
} from "@mui/material";
import { Icon } from "@iconify/react";
import MuiButton from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Router from "next/router";
import ConfirmationModalWeb from "@/common/ConfirmationModalWeb";
import { useDispatch } from "react-redux";

import { logout } from "@/store/actions/authActions";
import { useRouter } from "next/router";
export default function ProfileDropDown(props) {
  const { customer, logout } = props;
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const [openn,setOpenn] = useState(false)

  const router = useRouter();
  const handleClick = (event) => {
    const target = document.getElementById('demo-customized-button');
    setAnchorEl(event.currentTarget);
    setTimeout(() => {
      const dropDown = document.querySelector('#demo-customized-menu .MuiMenu-paper')
      if(dropDown) {
        dropDown.style.minWidth = target.offsetWidth+'px';
        dropDown.style.transformOrigin = `${target.offsetWidth}px 0`;
      }
    }, 1);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {
    const onScroll = () => {
      setAnchorEl(null);
    }
    window.addEventListener("scroll",onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll); // clean up
    }
  },[]);
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0} 
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      border:"1px solid rgba(0, 0, 0, 0.12)",
    },
  }));
  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);
  const handleConfirmation = ()=>{
    setOpenn(true)
  }

  return (
    <div 
    >
         <ConfirmationModalWeb _handleLogout={logout} open={openn} setOpen={setOpenn} message={langKey && langKey.you_want_logout}/>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        // onClick={handleClick}
        onMouseEnter={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          background: "white",
          borderRadius: "20px",
          height: "35px",
          fontSize: "13px",
          color: "#FF2D14",
          "&:hover": {
            background: "#efefef",
          },
          textTransform:'initial'
        }}
      >
        <Icon icon="mdi:user" width={25} />
        {customer.user_name}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
          onMouseLeave: handleClose,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
       
      >
        <MenuItem
          onClick={() => {
            router.push("/profile"),handleClose();
          }}
          disableRipple
          sx={{ justifyContent: "flex-start" }}
        >
        {langKey && langKey.profile}
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          // onClick={logout}
          disableRipple
          sx={{ justifyContent: "flex-start" }}
          onClick={handleConfirmation}
        >
         {langKey && langKey.logout}
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
