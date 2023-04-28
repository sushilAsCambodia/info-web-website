import React, { useEffect, useState, useCallback } from "react";
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
import { updateNickName, updatePassword, uploadProfile } from "@/store/actions/authActions";
import { useDispatch, useSelector } from 'react-redux';
import utils from "@/common/utils";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingDialog from "../Loading";
import DialogMessage from "../DialogMessage";
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
  const { customer, loading } = useSelector((state) => state.auth);
  const [userName, setUsername] = useState((customer && customer.user_name ? customer.user_name : ''));
  const [nickName, setNickName] = useState((customer && customer.nick_name ? customer.nick_name : ''));
  const { t } = useTranslation();
  const [imagePreviewUrl, setImagePreviewUrl] = useState();
  const dispatch = useDispatch();
  const [errorNickName, setErrorNickName] = useState(false);
  const [errorNickNameMessage, setErrorNickNameMessage] = useState('');
  const [errorUserName, setErrorUserName] = useState(false);
  const [errorUserNameMessage, setErrorUserNameMessage] = useState('');
  const [editUserName, setEditUserName] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordNotMatch, setErrorPasswordNotMatch] = useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [errorConfirmPasswordMessage, setConfirmErrorPasswordMessage] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [textAction, setTextAction] = useState('save');
  const [openDialog, setOpenDialog] = useState(false);
  const [file, setFile] = useState(undefined);
  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      reader.onloadend = () => {
        setFile(file);
        setImagePreviewUrl(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }
  const updateProfilePhoto = (file) => {
    dispatch(
      uploadProfile(
        {
          body: {
            image: file
          },
          callback: (res) => {
            let { message = '' } = res;
            setOpenDialog(true);
            setResponseMessage(t(message));
          },
          auth: true,
          formdata: true
        }
      )
    )
  }
  useEffect(() => {
    if(nickName!='') {
      setTextAction('edit');
    }
  },[])
  useEffect(() => {
    if (file) {
      console.log(file, 'file');
      updateProfilePhoto(file);
    }
  }, [file])
  // drawer start 
  const [state, setState] = useState({ bottom: false });
  const toggleDrawer = (anchor, open, edit = '') => (event) => {
    if (edit === 'editUser') {
      setEditPassword(false);
      setEditUserName(true);
    } else if (edit === 'editPassword') {
      setEditUserName(false);
      setEditPassword(true);
    }
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if (!open) {
      setEditPassword(false);
      setEditUserName(false);
    }
    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    setUsername((customer && customer.user_name ? customer.user_name : ''));
    if (customer && customer.image) {
      setImagePreviewUrl(customer.image.path || '');
    }
  }, [customer]);
  const onChangeUserName = (e) => {
    setUsername(e.target.value)
    if (e.target.value == '') {
      setErrorUserName(true);
      setErrorUserNameMessage(t('user_name_required'));
    } else {
      if (e.target.value.length > 5) {
        setErrorUserName(false);
      } else {
        setErrorUserName(true);
        setErrorUserNameMessage(t('validate_user_name'));
      }
    }
  }
  const onUpdateUserName = () => {
    if (!errorUserName) {
      dispatch(
        updateNickName(
          {
            body: {
              user_name: userName
            },
            callback: (res) => {
              let { message = '' } = res;
              if (message === 'user_name_unique') {
                message = 'update_user_name_unique';
              }
              setOpenDialog(true);
              setResponseMessage(t(message));
            },
            auth: true
          }
        )
      );
    }
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value == '') {
      setErrorPasswordMessage(t('password_required'));
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
    if (confirmpassword != '') {
      if (confirmpassword != e.target.value) {
        setConfirmErrorPasswordMessage(t('password_is_not_match'));
        setErrorConfirmPassword(true);
      } else {
        setErrorConfirmPassword(false);
      }
    }
    if (e.target.value.length < 6) {
      setErrorPasswordMessage(t('validate_password'));
      setErrorPassword(true);
    }
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value == '') {
      setErrorPasswordMessage(t('confirm_password_required'));
      setErrorConfirmPassword(true);
    } else {
      setErrorConfirmPassword(false);
    }
    if (password != e.target.value) {
      setConfirmErrorPasswordMessage(t('password_is_not_match'));
      setErrorConfirmPassword(true);
    } else {
      setErrorConfirmPassword(false);
    }
    if (e.target.value.length < 6) {
      setConfirmErrorPasswordMessage(t('validate_password'));
      setErrorConfirmPassword(true);
    }
  };
  const onSubmit = () => {
    if (password == '' && confirmpassword == '') {
      setErrorPasswordMessage(t('password_required'));
      setConfirmErrorPasswordMessage(t('confirm_password_required'));
      setErrorPassword(true);
      setErrorConfirmPassword(true);
      return;
    } else if (password === '') {
      setErrorPasswordMessage(t('password_required'));
      setErrorPassword(true);
      return;
    } else if (confirmpassword === '') {
      setConfirmErrorPasswordMessage(t('confirm_password_required'));
      setErrorConfirmPassword(true);
      return;
    }
    if (!errorPassword && !errorConfirmPassword && !errorPasswordNotMatch) {
      dispatch(
        updatePassword(
          {
            body: {
              password
            },
            callback: (res) => {
              let { status_code, message = '' } = res;
              setOpenDialog(true);
              setResponseMessage(t(message));
              if ([200, 201, 202, 203, 204].includes(status_code)) {
                setPassword('');
                setConfirmPassword('');
              }
            },
            auth: true
          }
        )
      );
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
      <List sx={{ padding: "25px 20px 0 20px" }}>
        {editUserName && <ListItem disablePadding sx={{ paddingBottom: "10px" }}>
          <Grid item xs={12} sm={12} >
            <Typography fontWeight="bold" pb={1} textAlign="left">
              {t('nick_name')} <Typography component="span" sx={{ color: 'red' }}>*</Typography>
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
              {errorUserName && <FormHelperText error>{errorUserNameMessage}</FormHelperText>}
            </FormControl>
          </Grid>
        </ListItem>}
        {
          editPassword && <>
            <ListItem disablePadding>
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
  const callback = useCallback((data) => {
    if (data) {
      setState({ ...state, bottom: false });
    }
  }, []);
  const onCloseDrawer = () => {
    setEditPassword(false);
    setEditUserName(false);
    setState({ ...state, bottom: false });
  }
  const onUpdateNickName = (e) => {
    console.log(nickName,textAction);
    if(nickName == '') {
      setErrorNickName(true);
      setErrorNickNameMessage('nickname_is_required');
    }else {
      setErrorNickName(false);
      if(textAction == 'save') {
        dispatch(
          updateNickName(
            {
              body: {
                nick_name: nickName
              },
              callback: (res) => {
                const {status_code} = res;
                let { message = '' } = res;
                if (message === 'user_name_unique') {
                  message = 'update_user_name_unique';
                }
                setOpenDialog(true);
                setResponseMessage(t(message));
                if(![200,201,202,203,204].includes(status_code)) {
                  setTextAction('edit');
                }else{
                  setTextAction('edit');
                }
              },
              auth: true
            }
          )
        ); 
      }else {
        setEditUserName(true);
        setState({ ...state, bottom: true });
        console.log('On edit')
        // setTextAction('save');
      }
    }
  }
  return (
    <>
      <Grid item xs={12} textAlign="center">
        <form>
          <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
          <Grid item xs={12} sm={12} >
            <Typography fontWeight="bold" pb={1} textAlign="left">
              {t('user_name')}
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
                name="user_name"
                placeholder={t('user_name')}
                inputProps={{ maxLength: 16 }}
                id="outlined-adornment-user-name"
                type="text"
                disabled
                value={userName} 
              />
            </FormControl>
          </Grid>
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
              }}>
              <OutlinedInput
                sx={{ paddingRight: "10px" }}
                name="nickname"
                placeholder={t('nick_name')}
                inputProps={{ maxLength: 16 }}
                id="outlined-adornment-nickname"
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
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
                      onClick={(e) => onUpdateNickName(e)}>
                      {textAction == 'edit' ? t('edit') : t('save')}
                    </Button>
                  </InputAdornment>
                }
              />
              {errorNickName && <FormHelperText error>{errorNickNameMessage}</FormHelperText>}
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
              onClick={toggleDrawer('bottom', true, 'editPassword')}>
              {t('change_password')}
            </Button>
          </Grid>
        </form>
      </Grid>
      <Grid>
        <Drawer className="mui-profile-drawer-wrapper" anchor={'bottom'} open={state['bottom']} onClose={onCloseDrawer}>
          {list('bottom')}
        </Drawer>
      </Grid>
      <LoadingDialog loading={loading} />
      <DialogMessage
        open={openDialog}
        setOpen={setOpenDialog}
        message={responseMessage}
        onClosed={callback} />
    </>
  )
}
export default UploadImg;
