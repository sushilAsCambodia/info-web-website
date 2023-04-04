import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import {
  Button,
  Typography,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Dialog,
  OutlinedInput,
} from "@mui/material";
import Router from "next/router";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);


  const goToRegister = () => {
    Router.push("/Register");
  };
  const goToForgotPassword = () => {
    Router.push("/ForgotPassword");
  };
  // Login Dialog 
const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};
const handleClose = () => {
  setOpen(false);
};
  return (
    <>
    <Grid
      container
      alignItems="flex-start"
      justifyContent="center"
    >
      <Grid
        item
        container
        maxWidth="500px"
        mt={10}
        mb={10}
        sx={{ minHeight: "500px" }}
      >
        <Grid item container xs={12} sm={12} padding={2}>
          <Grid container alignItems="flex-end" alignContent="center" mb={8}>
            <Typography variant="h5" sx={{ position: "relative" }}>
              Login

            </Typography>
          </Grid>
          <form
            className="lnr"
            style={{
              boxSizing: "borderBox",
              flexWrap: "wrap",
              flexDirection: "row",
              alignItems: "flex-end",
              marginBottom: "16px",
              width: "100%",
            }}
          >
            <Grid item xs={12} sm={12} mb={3}>
              <Typography fontWeight="bold" pb={1}>
                Username
              </Typography>

              <FormControl
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: "15px",
                  marginBottom: "5px",
                }}
              >
                <OutlinedInput
                  name="Username"
                  placeholder="Username"
                  inputProps={{ maxLength: 16 }}
                  id="outlined-adornment-password"
                  type="text"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      >
                        <Icon icon="mdi:user" width={20} color="#F26522" />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} mb={4}>
              <Typography fontWeight="bold" pb={1}>
                Password
              </Typography>
              <FormControl
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: "15px",
                  marginBottom: "5px",
                }}
              >
                <OutlinedInput
                  name="password"
                  placeholder="Password"
                  inputProps={{ maxLength: 16 }}
                  id="outlined-adornment-password"
                  type="password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <Icon icon="ri:eye-close-fill" color="#F26522" />
                        ) : (
                          <Icon icon="ph:eye-bold" color="#F26522" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item container spacing={2} mb={1}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    color: "white",
                    background:
                      "linear-gradient(90.04deg, #FF0000 0.04%, #FF6F31 99.97%);",
                    textTransform: 'capitalize'
                  }}
                  onClick={handleClickOpen}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
           
            <Grid
              item
              sm={12}
              container
              sx={{
                cursor: "pointer",
                color: "#8C8C8C",
                fontSize: { xs: "13px", sm: "inerited" },
                justifyContent: { xs: "center", sm: "center" },
              }}
              underline="none"
            >
              <Link underline="none" style={{ cursor: "pointer", color: "#F26522" }} onClick={goToForgotPassword}> forgot password?</Link>
            </Grid>
            <Grid item container spacing={2} mt={1}>
              <Grid item xs={12}  >
               <Typography  textAlign="center">Log In Via</Typography>
              </Grid>
            </Grid>
            <Grid
              item
              sm={12}
              container
              sx={{
                cursor: "pointer",
                color: "#8C8C8C",
                fontSize: { xs: "13px", sm: "inerited" },
                justifyContent: { xs: "center", sm: "center" },
              }}
              underline="none"
            >
              <Link underline="none" style={{ cursor: "pointer",  color: "#013B91", padding:"10px" }} ><Icon icon="ic:baseline-facebook" fontSize="35px" /></Link>
              <Link underline="none" style={{ cursor: "pointer", color: "#00C2FF",padding:"10px"  }} ><Icon icon="ant-design:twitter-circle-filled" fontSize="35px" /></Link>
              <Link underline="none" style={{ cursor: "pointer", color: "#0898D6",padding:"10px"  }} ><Icon icon="entypo-social:linkedin-with-circle" fontSize="35px" /></Link>
            </Grid>
            <Grid
              item
              sm={12}
              container
              sx={{
                cursor: "pointer",
                color: "#8C8C8C",
                fontSize: { xs: "13px", sm: "inerited" },
                justifyContent: { xs: "center", sm: "center" },
              }}
              underline="none"
            >
              <Link underline="none" style={{ cursor: "pointer", fontSize:'12px',  color: "#000", padding:"10px", display:'flex' }} onClick={goToRegister} >Don’t have an account？ <Typography style={{fontSize:'12px', cursor: "pointer", color: "#F26522"}}>Register</Typography></Link>
         
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>


    {/* Login Dialog */}
    <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        id="logindialog"
      >

        <DialogContent dividers>
          <Typography gutterBottom>
          Please enter the correct username or Password
          </Typography>
     
        </DialogContent>
        <DialogActions fontSize="14px !important" display="flex" textAlign="center" justifyContent="center !important">
          <Button fontSize="14px" autoFocus onClick={handleClose}>
          ok
          </Button>
        </DialogActions>
    </BootstrapDialog>
</>
  )
}
