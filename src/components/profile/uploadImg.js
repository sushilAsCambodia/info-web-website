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
import { Image } from "mui-image";

const minLength = 6;
const ImgUpload = ({
  onChange,
  src
}) => {
  return (
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload" >
        {src ? <Image alt="photo_upload" htmlFor="photo-upload" src={src} onError={(e) => e.target.src = '/assets/Profile/defaultavatar.jpg'} /> : 
        <Image alt="photo_default_upload" src="/assets/Profile/defaultavatar.jpg" style={{borderRadius: '50%'}}/> 
      } 
      </div>
      <input id="photo-upload" type="file" onChange={onChange}    accept="image/png , image/jpeg, image/jpg" />
    </label>
  );
}
const UploadImg = () => {
  const { customer, loading } = useSelector((state) => state.auth);
  const [userName, setUsername] = useState((customer && customer.user_name ? customer.user_name : ''));
  const [nickName, setNickName] = useState((customer && customer.nick_name ? customer.nick_name : ''));
  const [disabledNickName, setDisabledNickName] = useState(true);
  const { t } = useTranslation();
  const [imagePreviewUrl, setImagePreviewUrl] = useState();
  const dispatch = useDispatch();
  const [errorNickName, setErrorNickName] = useState(false);
  const [errorNickNameMessage, setErrorNickNameMessage] = useState(''); 
  const [editUserName, setEditUserName] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [errorCurrentPassword, setErrorCurrentPassword] = useState(false);
  const [errorCurrentPasswordMessage, setErrorCurrentPasswordMessage] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordNotMatch, setErrorPasswordNotMatch] = useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [errorConfirmPasswordMessage, setConfirmErrorPasswordMessage] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [textAction, setTextAction] = useState('save');
  const [openDialog, setOpenDialog] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [file, setFile] = useState(undefined);

  const langKey = useSelector((state) => state && state.load_language && state.load_language.language); 
  useEffect(() => {
    if(customer && (customer.nick_name != null || customer.nick_name != '')) {
      setDisabledNickName(true)
    }else {
      setDisabledNickName(false)
    }
  },[customer])
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
  const updateProfilePhoto = useCallback(file => {
    // if(Math.abs(file.size / (1024 ** 2)) > 1) {
    //   setOpenDialog(true);
    //   setResponseMessage(langKey && (langKey.file_is_too_large || t('file_is_too_large')) );
    //   setFile(null);
    //   setImagePreviewUrl('');
    // }else {
      const formdata = new FormData;
      formdata.append('image',file);
      dispatch(
        uploadProfile(
          {
            body: formdata,
            callback: (res) => {
              let { message = '' } = res;
              setOpenDialog(true);
              setResponseMessage(langKey && (langKey[message] || t(message)) );
            },
            auth: true,
            formdata: true
          }
        )
      ).then(e => {
       
        if(!e.payload) {
          setFile(null);
          setOpenDialog(true);
          setImagePreviewUrl('');
          setResponseMessage(langKey && (langKey.something_went_wrong || t('something_went_wrong')));
        }
      })
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch,t]);
  useEffect(() => {
    if(nickName!='') {
      setTextAction('edit');
    }
  },[nickName])
  useEffect(() => {
    if (file) { 
      updateProfilePhoto(file);
    }
  }, [updateProfilePhoto,file])
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
  const onChangeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
    if(e.target.value) {
      setErrorCurrentPassword(false)
      setErrorCurrentPasswordMessage('')
    }
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value == '') {
      setErrorPasswordMessage(langKey && langKey.password_required);
      setErrorPassword(true);
    } else {
      if(utils.checkPassword(e.target.value) != null) {
        setErrorPasswordMessage(t(utils.checkPassword(e.target.value)));
        setErrorPassword(true);
      }else {
        setErrorPassword(false);
      }
    }
    if (confirmpassword != '') {
      if (confirmpassword != e.target.value) {
        setConfirmErrorPasswordMessage(langKey && langKey.password_is_not_match);
        setErrorConfirmPassword(true);
      } else {
        setErrorConfirmPassword(false);
      }
    }
    // if (e.target.value.length < minLength) {
    //   setErrorPasswordMessage(langKey && langKey.validate_password);
    //   setErrorPassword(true);
    // }
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value == '') {
      setErrorPasswordMessage(langKey && langKey.confirm_password_required);
      setErrorConfirmPassword(true);
    } else {
      if(utils.checkPassword(e.target.value) != null) {
        setErrorPasswordMessage(t(utils.checkPassword(e.target.value)));
        setErrorConfirmPassword(true);
      }else {
        setErrorConfirmPassword(false);
      }
    }
    if (password != e.target.value) {
      setConfirmErrorPasswordMessage(langKey && langKey.password_is_not_match);
      setErrorConfirmPassword(true);
    } else {
      setErrorConfirmPassword(false);
    }
    // if (e.target.value.length < minLength) {
    //   setConfirmErrorPasswordMessage(langKey && langKey.validate_password);
    //   setErrorConfirmPassword(true);
    // }
  };
  const onSubmit = () => {
    if (password == '' && confirmpassword == '' && currentPassword == '') {
      setErrorPasswordMessage(langKey && langKey.password_required);
      setConfirmErrorPasswordMessage(langKey && langKey.confirm_password_required);
      setErrorCurrentPasswordMessage(langKey?.current_password_required)
      setErrorPassword(true);
      setErrorConfirmPassword(true);
      setErrorCurrentPassword(true)
      return;
    } else if (password === '') {
      setErrorPasswordMessage(langKey && langKey.password_required);
      setErrorPassword(true);
      return;
    } else if (confirmpassword === '') {
      setConfirmErrorPasswordMessage(langKey && langKey.confirm_password_required);
      setErrorConfirmPassword(true);
      return;
    }else if (currentPassword === '') {
      setErrorCurrentPasswordMessage(langKey?.current_password_required);
      setErrorCurrentPassword(true);
      return;
    }
    if (!errorPassword && !errorConfirmPassword && !errorPasswordNotMatch && !errorCurrentPassword) {
      dispatch(
        updatePassword(
          {
            body: {
              password,
              current_password:currentPassword
            },
            callback: (res) => {
              let { status_code, message = '' } = res;
              setOpenDialog(true);
              setResponseMessage(langKey&& langKey[message]);
              if ([200, 201, 202, 203, 204].includes(status_code)) {
                setPassword('');
                setConfirmPassword('');
                setCurrentPassword('');
              }
            },
            auth: true
          }
        )
      );
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowCurrentPassword = () => setShowCurrentPassword((show) => !show);
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    if((currentPassword!='' && confirmpassword!='' && password!='') && (!errorPassword && !errorCurrentPassword && !errorConfirmPassword)) {
      setDisableSubmit(false)
    }else {
      setDisableSubmit(true)
    }
  },[currentPassword,password,confirmpassword,errorCurrentPassword,errorPassword,errorConfirmPassword])
  const list = (anchor) => (
    <Box sx={{ width: anchor === 'bottom' ? 'auto' : 250 }} role="presentation">
      <Typography className="drawerline"></Typography>
      <List sx={{ padding: "25px 20px 0 20px" }}>
        {editUserName && 
        <ListItem disablePadding sx={{ paddingBottom: "10px" }}>
          <Grid item xs={12} sm={12} >
            <Typography fontWeight="bold" pb={1} textAlign="left">
            {langKey && langKey.nick_name} <Typography component="span" sx={{ color: 'red' }}>*</Typography>
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
                placeholder= {langKey && langKey.nick_name}
                inputProps={{ maxLength: 16 }}
                id="outlined-adornment-nickname"
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                error={errorNickName}
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
                      onClick={setUpdateNickName}>
                     {langKey && langKey.save}
                    </Button>
                  </InputAdornment>
                }
              />
              {errorNickName && <FormHelperText error>{errorNickNameMessage}</FormHelperText>}
            </FormControl>
          </Grid>
        </ListItem>}
        {
          editPassword && <>
          <ListItem disablePadding>
              <Grid item xs={12} sm={12}>
                <Typography fontWeight="bold" pb={1} textAlign="left">
                {langKey?.current_password}
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
                    name="current_password"
                    placeholder={langKey?.current_password}
                    inputProps={{ maxLength: 16 }}
                    id="outlined-adornment-current-password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={onChangeCurrentPassword}
                    error={errorCurrentPassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showCurrentPassword ? <Visibility /> :  <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
              {errorCurrentPassword && <FormHelperText error>{errorCurrentPasswordMessage}</FormHelperText>}

                </FormControl>
              </Grid>
            </ListItem>
            <ListItem disablePadding>
              <Grid item xs={12} sm={12} >
                <Typography fontWeight="bold" pb={1} textAlign="left">
                {langKey && langKey.new_password}
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
                    placeholder={langKey && langKey.new_password}
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
                          {showPassword ? <Visibility /> :  <VisibilityOff />}
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
                {langKey && langKey.confirm_new_password}
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
                    placeholder={langKey && langKey.confirm_new_password}
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
                          {showConfirmPassword ? <Visibility /> :  <VisibilityOff />}
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
                  disabled={disableSubmit}
                  sx={{
                    color: "white",
                    background:
                      "linear-gradient(90.04deg, #FF0000 0.04%, #FF6F31 99.97%);",
                    textTransform: 'capitalize'
                  }}
                  onClick={onSubmit}
                >
                {langKey && langKey.submit}
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
  }, [state]);
  const onCloseDrawer = () => {
    setEditPassword(false);
    setEditUserName(false);
    setState({ ...state, bottom: false });
  }
  const onUpdateNickName = () => {
    setEditPassword(false);
    setEditUserName(true);
    if(nickName == '') {
      if(textAction == 'edit') {
        setEditUserName(true);
        setState({ ...state, bottom: true });
      }else {
        setEditUserName(true);
        setState({ ...state, bottom: true });
        // setErrorNickName(true);
        // setErrorNickNameMessage(langKey && langKey.nick_name_required);
      }
    }else {
      if (nickName.length < 6) {
        if(textAction == 'edit') {
          setEditUserName(true);
          setState({ ...state, bottom: true });
        }else {
          setErrorNickName(true);
          setErrorNickNameMessage(langKey && langKey.validate_nick_name);
        }
      }else {
        setErrorNickName(false);
        if(textAction == 'save') {
          setUpdateNickName();
        }else {
          setEditUserName(true);
          setState({ ...state, bottom: true });
        }
      }
    }
  }
  const setUpdateNickName = () => {
    if(nickName == '') {
      setErrorNickName(true);
      setErrorNickNameMessage(langKey && langKey.nick_name_required);
    }else {
      if (nickName.length < 6) {
        setErrorNickName(true);
        setErrorNickNameMessage(langKey && langKey.validate_nick_name);
      }else {
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
                setResponseMessage(langKey && langKey[message]);
                if([200,201,202,203,204].includes(status_code)) {
                  setTextAction('edit');
                }
              },
              auth: true
            }
          )
        ); 
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
            {langKey && langKey.user_name}
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
                placeholder={langKey && langKey.user_name}
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
            {langKey && (langKey.nick_name || t('nick_name'))}
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
                placeholder={langKey && langKey.nick_name}
                inputProps={{ maxLength: 16 }}
                id="outlined-adornment-nickname"
                type="text"
                // disabled={disabledNickName}
                readOnly
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
                      onClick={onUpdateNickName}
                      >
                      {textAction == 'edit' ? (langKey && (langKey.edit || t('edit'))) : (langKey && (langKey.add || t('add')))}
                    </Button>
                  </InputAdornment>
                }
              />
              {/* {errorNickName && <FormHelperText error>{errorNickNameMessage}</FormHelperText>} */}
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
       {langKey && langKey.change_password}
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
