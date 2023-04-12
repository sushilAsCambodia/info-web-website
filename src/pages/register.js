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
import LoadingDialog from "@/components/Loading";
import FormHelperText from '@mui/material/FormHelperText';
import { useDispatch, useSelector } from 'react-redux';
import {register,login} from '@/store/actions/authActions';
import { useTranslation } from "react-i18next";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(0),
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
  const {t} = useTranslation();
  const [registerSuccess,setRegisterSuccess] = useState(false);
  const [responseMessage,setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorUserName, setErrorUserName] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const goToLogin = () => {
    Router.push("/login");
  }; 
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignup = () => {
    dispatch(register(
        { 
            body: { user_name:username, password:password },
            callback: (res) => {
              setLoading(false);
              const {status_code, message = ''} = res;
              setResponseMessage(t(message));
              setOpen(true)
              if([200,201,202,203].includes(status_code)) {
                setRegisterSuccess(true);
                dispatch(login(
                  { 
                      body: { user_name: username, password:password},
                      callback: (res) => {
                        const {status_code} = res; 
                        if([200,201,202,203].includes(status_code)) {
                          Router.push('/home');
                        }
                      }
                  }
                ));
              }
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
  // Register Dialog 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return mounted && (
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
                {t('register')}
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
                  {t('user_name')}
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
                    placeholder={t('user_name')}
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
                  {errorUserName && <FormHelperText error>{t('validate_user_name')}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} mb={4}>
                <Typography fontWeight="bold" pb={1}>
                {t('password')}
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
                    placeholder={t('password')}
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
                  {errorPassword && <FormHelperText error>{t('validate_password')}</FormHelperText>}
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
                    {t('signup_for_now')}
                  </Button>
                </Grid>
              </Grid>


              <Grid item container spacing={2} mt={1}>
                <Grid item xs={12} textAlign="center" textTransform="capitalize">
                  <Typography>{t('signup_via')}</Typography>
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
                <Link underline="none" style={{ cursor: "pointer", color: "#00C2FF", padding: "10px" }} ><Icon icon="flat-color-icons:google" fontSize="35px" /></Link>
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
                <Link underline="none" style={{ cursor: "pointer", fontSize: '12px', color: "#000", padding: "10px", display: 'flex' }} onClick={goToLogin} >{t('already_have_an_account')}<Typography style={{ fontSize: '12px', cursor: "pointer", color: "#F26522" }}>{t('login')}</Typography></Link>

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
        id="registerdialog">
        <DialogContent dividers sx={{maxWidth: '220px', textAlign:'center'}}>
          <Typography>
            {responseMessage}
          </Typography>
        </DialogContent>
        {!registerSuccess && <DialogActions >
          <Grid container textAlign="center">
            <Grid item md={6}  width="50%" sx={{borderRight:'1px solid #eee'}}  padding="5px" onClick={handleClose}>
              {t('cancel')}
            </Grid>
            <Grid item md={6} width="50%" padding="5px" onClick={() =>  Router.push('/login')} sx={{color:'#0898D6'}}>
             {t('login')}
            </Grid> 
          </Grid> 
        </DialogActions>}
      </BootstrapDialog>
    </>
  )
}