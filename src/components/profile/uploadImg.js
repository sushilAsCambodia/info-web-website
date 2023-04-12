import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  ListItem,
  FormHelperText,
  List,
  IconButton
} from "@mui/material";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const ImgUpload = ({
  onChange,
  src
}) => {
  return (
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload" >
        <img htmlFor="photo-upload" src={src} />
      </div>
      <input id="photo-upload" type="file" onChange={onChange} />
    </label>
  );
}



const UploadImg = () => {
  const { customer } = useSelector((state) => state.auth);
  const [userName, setUsername] = useState((customer && customer.user_name ? customer.user_name : ''));
  const { t } = useTranslation();
  const [file, setFile] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState();
  const [errorPasswordNotMatch,setErrorPasswordNotMatch] = useState(false);
  const [errorUserName,setErrorUserName] = useState(false);
  const [editUserName,setEditUserName] = useState(false);
  const [editPassword,setEditPassword] = useState(false);
  const [password,setPassword] = useState('');
  const [errorPassword,setErrorPassword] = useState(false);
  const [errorPasswordMessage,setErrorPasswordMessage] = useState('');
  const [confirmpassword,setConfirmPassword] = useState('');
  const [errorConfirmPasswordMessage,setConfirmErrorPasswordMessage] = useState('');
  const [errorConfirmPassword,setErrorConfirmPassword] = useState(false);
  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if(file) {
      reader.onloadend = () => {
        setFile(file);
        setImagePreviewUrl(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }
  // drawer start 
  const [state, setState] = useState({ bottom: false });
  const toggleDrawer = (anchor, open, edit = '') => (event) => {
    if(edit === 'editUser') {
      setEditUserName(true);
    }else if(edit==='editPassword') {
      setEditPassword(true);
    }
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if(!open) {
      setEditPassword(false);
      setEditUserName(false);
    }
    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    setUsername((customer && customer.user_name ? customer.user_name : ''));
  }, [customer]);
  const onChangeUserName = (e) => {
    setUsername(e.target.value)
    if(e.target.value == '') {
      setErrorUserName(true);
    }else {
      setErrorUserName(false)
    }
  }
  const onUpdateUserName = () => {
    if(!errorUserName) {
      console.log('@TODO: update username',userName)
    }
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if(e.target.value == '') {
      setErrorPasswordMessage('Password is required');
      setErrorPassword(true);
    }else { 
        setErrorPassword(false); 
    }
    if(confirmpassword!='') {
      if(confirmpassword != e.target.value) {
        setConfirmErrorPasswordMessage('Password is not match');
        setErrorConfirmPassword(true);
      }else {
        setErrorConfirmPassword(false);
      }
    }
    if(e.target.value.length < 6) {
      setErrorPasswordMessage(t('validate_password'));
      setErrorPassword(true);
    }
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if(e.target.value == '') {
      setErrorPasswordMessage('Confirm Password is required');
      setErrorConfirmPassword(true);
    }else { 
        setErrorConfirmPassword(false); 
    } 
    if(password != e.target.value) {
      setConfirmErrorPasswordMessage('Password is not match');
      setErrorConfirmPassword(true);
    }else {
      setErrorConfirmPassword(false);
    }
    if(e.target.value.length < 6) {
      setConfirmErrorPasswordMessage(t('validate_password'));
      setErrorConfirmPassword(true);
    }
  };
  const onSubmit = () => {
    if(password == '' && confirmpassword == '') {
      setErrorPasswordMessage('Password is required');
      setConfirmErrorPasswordMessage('Confirm Password is required');
      setErrorPassword(true);
      setErrorConfirmPassword(true);
      return;
    }else if(password === '') {
      setErrorPasswordMessage('Password is required');
      setErrorPassword(true);
      return;
    }else if(confirmpassword === '') {
      setConfirmErrorPasswordMessage('Confirm Password is required');
      setErrorConfirmPassword(true);
      return;
    }
    if(!errorPassword && !errorConfirmPassword && !errorPasswordNotMatch) {
      console.log('@TODO: safe save password');
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const list = (anchor) => (
    <Box sx={{ width: anchor === 'bottom' ? 'auto' : 250 }} role="presentation">
      <Typography className="drawerline"></Typography>
      <List sx={{ padding: "70px 16px" }}>
        {editUserName && <ListItem disablePadding sx={{ paddingBottom: "10px" }}>
          <Grid item xs={12} sm={12} >
            <Typography fontWeight="bold" pb={1} textAlign="left">
              {t('nick_name')} <Typography component="span" sx={{color:'red'}}>*</Typography>
            </Typography>
            <FormControl
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: "15px",
                marginBottom: "5px",
              }}>
              <OutlinedInput
                sx={{ paddingRight: "10px" }}
                name="Username"
                placeholder={t('user_name')}
                inputProps={{ maxLength: 16 }}
                id="outlined-adornment-username"
                type="text"
                value={userName}
                onChange={onChangeUserName}
                error={errorUserName}
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        color: "white",
                        background: "#FF6E31",
                        textTransform: 'capitalize'
                      }}
                      onClick={onUpdateUserName}>
                      {t('save')}
                    </Button>
                  </InputAdornment>
                }
              />
              {errorUserName && <FormHelperText error>Error username</FormHelperText>}
            </FormControl>
          </Grid>
        </ListItem>}
        {
          editPassword && <>
            <ListItem disablePadding sx={{ paddingBottom: "10px" }}>
              <Grid item xs={12} sm={12} >
                <Typography fontWeight="bold" pb={1} textAlign="left">
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
                    sx={{ paddingRight: "10px" }}
                    name="password"
                    placeholder={t('password')}
                    inputProps={{ maxLength: 16 }}
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    error={errorPassword}
                    value={password}
                    onChange={onChangePassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {errorPassword && <FormHelperText error>{errorPasswordMessage}</FormHelperText>}
                </FormControl>
              </Grid>
            </ListItem>
            <ListItem disablePadding sx={{ paddingBottom: "10px" }}>
              <Grid item xs={12} sm={12} >
                <Typography fontWeight="bold" pb={1} textAlign="left">
                  {t('confirm_password')}
                </Typography>
                <FormControl
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: "15px",
                    marginBottom: "5px",
                  }}>
                  <OutlinedInput
                    sx={{ paddingRight: "10px" }}
                    name="confirm_password"
                    placeholder={t('confirm_password')}
                    inputProps={{ maxLength: 16 }}
                    id="outlined-adornment-confirmpassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    error={(errorConfirmPassword || errorPasswordNotMatch)}
                    value={confirmpassword}
                    onChange={onChangeConfirmPassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {
                    errorConfirmPassword && <FormHelperText error>{errorConfirmPasswordMessage}</FormHelperText>
                  } 
                </FormControl>
              </Grid>
            </ListItem>
            <ListItem disablePadding sx={{ paddingBottom: "10px" }}>
              <Grid item xs={12} sm={12} >
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
                  {t('submit')}
                </Button>
              </Grid>
            </ListItem>
          </>
        }
      </List>
    </Box>
  );
  return (
    <>
      <Grid item xs={12} textAlign="center">
        <form>
          <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
          <Grid item xs={12} sm={12} >
            <Typography fontWeight="bold" pb={1} textAlign="left">
              {t('nick_name')}
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
                sx={{ paddingRight: "10px" }}
                name="nickname"
                placeholder={t('user_name')}
                inputProps={{ maxLength: 16 }}
                id="outlined-adornment-nickname"
                type="text"
                disabled
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        color: "white",
                        background: "#FF6E31",
                        textTransform: 'capitalize'
                      }}
                      onClick={toggleDrawer('bottom', true,'editUser')}>
                      {t('edit')}
                    </Button>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              sx={{
                marginTop: "20px",
                color: "#000",
                boxShadow: "none",
                border: "0.5px solid #DDDDDD",
                borderRadius: "10px",
                background:
                  "linear-gradient(90.04deg, #E9E9E9 0.04%, #E9E9E9 99.97%);",
                textTransform: 'capitalize'
              }}
              onClick={toggleDrawer('bottom', true,'editPassword')}>
              {t('change_password')}
            </Button>
          </Grid>
        </form>
      </Grid>
      <Grid>
        <Drawer anchor={'bottom'} open={state['bottom']} onClose={toggleDrawer('bottom', false)}>
          {list('bottom')}
        </Drawer>
      </Grid>
    </>
  )
}
export default UploadImg;
