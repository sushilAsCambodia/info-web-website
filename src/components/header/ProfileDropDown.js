import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import { Icon } from "@iconify/react";
import MuiButton from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { logout } from "@/store/actions/authActions";
import { useRouter } from "next/router";
export default function ProfileDropDown(props) {
  const { customer, logout } = props;
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      minWidth: 180,
      border:"1px solid rgba(0, 0, 0, 0.12)",
    },
  }));

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
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
        }}
      >
        <Icon icon="mdi:user" width={25} />
        {customer.user_name}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
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
          sx={{ justifyContent: "flex-end" }}
        >
          {t("profile")}
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={logout}
          disableRipple
          sx={{ justifyContent: "flex-end" }}
        >
           {t("logout")}
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
