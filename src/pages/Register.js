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
  OutlinedInput,
  Dialog,
  Divider,
} from "@mui/material";
import Router from "next/router";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { middleware } from '@/middleware';
import LoadingDialog from "@/components/Loading";
import FormHelperText from '@mui/material/FormHelperText';
import { useDispatch, useSelector } from 'react-redux';
import {register} from '@/store/reducers/userSlice';

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


export default function Register() {
  const [loading, setLoading] = useState(false);
  const [errorUserName, setErrorUserName] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const goToLogin = () => {
    Router.push("/Login");
  }; 
  const dispatch = useDispatch();
  const handleSignup = () => {
    dispatch(register(
        { 
            body: { username:username, password:password },
            callback: (res) => {
              setLoading(false);
              const {status} = res;
              if(status == 200 || status == 201) {
                Router.push('/home');
              }else {
                setOpen(true)
              }
              console.log(status,res,'callback')
            }
        }
    ));
  }
  const onSubmit = () => {
    if (username == '' && password == '') {
      setErrorUserName(true);
      setErrorPassword(true);
      return false
    } else if (password == '') {
      setErrorPassword(true);
      return false
    } else if (username == '') {
      setErrorUserName(true);
      return false
    }
    if (!errorPassword && !errorUserName) {
      setLoading(true)
      handleSignup();
    }
  };
  const onChangeUserName = (e) => {
    if (e.target.value != '' && e.target.value.length < 6) {
      setErrorUserName(true);
    } else {
      setErrorUserName(false);
    }
    setUserName(e.target.value)
  }
  const onChangePassword = (e) => {
    if (e.target.value != '' && e.target.value.length < 6) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
    setPassword(e.target.value)
  }
  useEffect(() => {
    middleware(Router, (res) => {
      console.log(res);
    });
  }, []);
  // Register Dialog 
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
                Register
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
                    id="outlined-adornment-username"
                    value={username}
                    onChange={(e) => onChangeUserName(e)}
                    error={errorUserName}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle username visibility"
                          edge="end"
                        >
                          <Icon icon="mdi:user" width={20} color="#F26522" />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {errorUserName && <FormHelperText error>The username format is a combination of 6-16 letters and numbers</FormHelperText>}
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
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => onChangePassword(e)}
                    error={errorPassword}
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
                  {errorPassword && <FormHelperText error>The format of the account number is 6-16 letters or numbers</FormHelperText>}
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
                    onClick={onSubmit}
                  >
                    Sign up for now
                  </Button>
                </Grid>
              </Grid>


              <Grid item container spacing={2} mt={1}>
                <Grid item xs={12}  >
                  <Typography textAlign="center">Log In Via</Typography>
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
                <Link underline="none" style={{ cursor: "pointer", color: "#013B91", padding: "10px" }} ><Icon icon="ic:baseline-facebook" fontSize="35px" /></Link>
                <Link underline="none" style={{ cursor: "pointer", color: "#00C2FF", padding: "10px" }} ><Icon icon="ant-design:twitter-circle-filled" fontSize="35px" /></Link>
                <Link underline="none" style={{ cursor: "pointer", color: "#0898D6", padding: "10px" }} ><Icon icon="entypo-social:linkedin-with-circle" fontSize="35px" /></Link>
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
                <Link underline="none" style={{ cursor: "pointer", fontSize: '12px', color: "#000", padding: "10px", display: 'flex' }} onClick={goToLogin} >Already have an account？<Typography style={{ fontSize: '12px', cursor: "pointer", color: "#F26522" }}>Login</Typography></Link>

              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
      <LoadingDialog loading={loading} setLoading={setLoading}></LoadingDialog>

      {/* Register Dialog */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        id="registerdialog"
      >

        <DialogContent dividers>
          <Typography gutterBottom>
            This account already exists, <br /> Please Log In
          </Typography>

        </DialogContent>
        <DialogActions fontSize="14px !important" display="flex" justifyContent="space-around !important">
          <Button fontSize="14px" autoFocus onClick={handleClose} position="relative !important" className="borderright">
            Cancel
          </Button>

          <Button fontSize="14px" autoFocus onClick={handleClose}>
            <Link underline="none" style={{ fontSize: '12px' }} ><Typography style={{ cursor: "pointer", color: "#F26522" }}>Login</Typography></Link>

          </Button>
        </DialogActions>
      </BootstrapDialog>

    </>
  )
}
