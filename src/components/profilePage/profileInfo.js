import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import LoadingDialog from "../Loading";
import DialogMessage from "../DialogMessage";
import {
  updateNickName,
  updatePassword,
  uploadProfile,
} from "@/store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/actions/authActions";
import utils from "@/common/utils";
import {
  Grid,
  Paper,
  Typography,
  FormControl,
  OutlinedInput,
  FilledInput,
  InputAdornment,
  IconButton,
  Button,
  FormHelperText,
  Divider,
  InputLabel,
  Drawer,
  Box
} from "@mui/material";
import { useTranslation } from "react-i18next";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import Image from "mui-image";


const nickNameMinLength = 4;
export default function ProfileInfo(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {openDialog,setOpenDialog,setResponseMessage} = props
  const { customer, loading,status } = useSelector((state) => state.auth);
  // const [openDialog,setOpenDialog]  = useState(false);

  const [imagePreviewUrl, setImagePreviewUrl] = useState();
  const [userName, setUserName] = useState(
    customer && customer.user_name ? customer.user_name : ""
  );
  const [nickName, setNickName] = useState(
    customer && customer.nick_name ? customer.nick_name : ""
  );

  const [editUsername, setEditUsername] = useState(true);

  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorPassword, setErrorPassword] = useState(false);
  const [errorCurrentPassword, setErrorCurrentPassword] = useState(false);
  const [errorCurrentPasswordMessage, setErrorCurrentPasswordMessage] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [errorConfirmPasswordMessage, setConfirmErrorPasswordMessage] =
    useState("");
  const [errorUserName, setErrorUserName] = useState(false);
  const [errorUserNameMessage, setErrorUserNameMessage] = useState("");
  const [file,setFile]  = useState(undefined);

  const router = useRouter();

  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);


  const ImgUpload = ({ onChange, src }) => {
    return (
      <label
        htmlFor="photo-upload"
        className="desktop-file-upload fas"
        style={{ "--uploadImg": `${imagePreviewUrl ? "" : "url('/assets/Profile/defaultavatar.jpg')"}` }}
      >
        {src &&  
        // <Image duration={1} alt="photo_upload" htmlFor="photo-upload" width={120} height={120} src={src} style={{borderRadius:"50%"}}/>

        <Box
        component="img"
        width={120} height={120} maxWidth={120} maxHeight={120} style={{borderRadius:"50%"}}
        src={src}
      />
        } 
        <input id="photo-upload" type="file" onChange={onChange} />
      </label>
    );
  };
  
  useEffect(() => {
    setNickName((customer && customer.nick_name ? customer.nick_name : ''));
    if(customer && customer.image) {
      setImagePreviewUrl( customer.image.path || '');
    }
  }, [customer]);
  const updateProfilePhoto = useCallback(file => {
    dispatch(
      uploadProfile(
        {
          body: {
            image: file
          },
          callback:(res) => {
            let { message = ''} = res; 
            setOpenDialog(true);
            setResponseMessage(langKey && langKey[message]);
          },
          auth: true,
          formdata: true
        }
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch,t,setOpenDialog,setResponseMessage]);
  useEffect(()=> {
    if(file) {
      updateProfilePhoto(file);
    }
  } ,[updateProfilePhoto,file])


  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      reader.onloadend = () => {
        setFile(file);
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onChangeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
    if(e.target.value){
      setErrorCurrentPasswordMessage('');
      setErrorCurrentPassword(false);
    }
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value == "") {
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
    if (confirmpassword != "") {
      if (confirmpassword != e.target.value) {
        setConfirmErrorPasswordMessage(langKey && langKey.password_is_not_match);
        setErrorConfirmPassword(true);
      } else {
        setErrorConfirmPassword(false);
      }
    }
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value); 
    if (e.target.value == "") {
      setConfirmErrorPasswordMessage(langKey && langKey.confirm_password_required);
      setErrorConfirmPassword(true);
    } else {
      if(utils.checkPassword(e.target.value) != null) {
        setConfirmErrorPasswordMessage(t(utils.checkPassword(e.target.value)));
        setErrorConfirmPassword(true);
      }else {
        if (password != e.target.value) {
          setConfirmErrorPasswordMessage(langKey && langKey.password_is_not_match);
          setErrorConfirmPassword(true);
        } else {
          setErrorConfirmPassword(false);
        } 
      } 
    }
  };
  const onSubmit = () => {
    if (password == "" && confirmpassword == "" && currentPassword =="") {
      setErrorPasswordMessage(langKey && langKey.password_required);
      setConfirmErrorPasswordMessage(langKey && langKey.confirm_password_required);
      setErrorCurrentPasswordMessage(langKey?.current_password_required);
      setErrorPassword(true);
      setErrorConfirmPassword(true);
      setErrorCurrentPassword(true)
      return;
    } else if (password === "") {
      setErrorPasswordMessage(langKey && langKey.password_required);
      setErrorPassword(true);
      return;
    } else if (confirmpassword === "") {
      setConfirmErrorPasswordMessage(langKey && langKey.confirm_password_required);
      setErrorConfirmPassword(true);
      return;
    }
    else if (currentPassword === "") {
      setErrorCurrentPasswordMessage(langKey?.current_password_required);
      setErrorCurrentPassword(true);
      return;
    }
    
    if (!errorPassword && !errorConfirmPassword && !errorCurrentPassword) {
      dispatch(
        updatePassword({
          body: {
            password,
            current_password:currentPassword
          },
          callback: (res) => {
            let { status_code, message = "" } = res;
            setOpenDialog(true);
            setResponseMessage(langKey && langKey[message]);
            if ([200, 201, 202, 203, 204].includes(status_code)) {
              setPassword("");
              setConfirmPassword("");
              setCurrentPassword("");
            }
          },
          auth: true,
        })
      );
    }
  };
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowCurrentPassword = () => setShowCurrentPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  const onChangeUserName = (e) => {
    setNickName(e.target.value)
    if (e.target.value == "") {
      setErrorUserName(true);
      setErrorUserNameMessage(langKey && langKey.user_name_required);
    } else {
      if (e.target.value.length >= nickNameMinLength) {
        setErrorUserName(false);
      } else {
        setErrorUserName(true);
        setErrorUserNameMessage(langKey && langKey.validate_nick_name);
      }
    }
  };
  
  const onUpdateUserName = () => {
    if (!errorUserName) {
      dispatch(
        updateNickName({
          body: {
            nick_name: nickName,
          },
          callback:(res)=> { 
            setOpenDialog(true); 
            let {status_code, message} = res; 
            if (message === "user_name_unique") {
              message = "update_user_name_unique";
            } 
            setResponseMessage(langKey && (langKey[message] || t(message)));
            setEditUsername(!editUsername);
          },
          auth: true,
        })
      ); 
    }

  };
  const handleLogout = () => {
    dispatch(
      logout({
        callback: (res) => {
          router.push("/login");
        },
        auth: true,
      })
    );
  };

  const [isValid, setValid] = useState(false);

  const validate = () => {
    return password.length || currentPassword.length || confirmpassword.length;
  };


  return (
    <>
      <Paper sx={{ padding: "40px" }} elevation={3} component={Grid} container>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          flexWrap="nowrap"
          border="1px solid grey"
          p={2}
          borderRadius="10px"
          className="uploadimg_main"
        >
          <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
          <FormControl fullWidth id="nickNameFormControl">
            <InputLabel>{langKey && langKey.nick_name}</InputLabel>
            <FilledInput
              disabled={editUsername}
              name="nickname"
              placeholder={langKey && langKey.nick_name}
              inputProps={{ maxLength: 16 }}
              id="nicknameInputField"
              type="text"
              value={nickName}
              onChange={onChangeUserName}
              sx={{ background: "#fff" }}
              endAdornment={
                <InputAdornment position="end" background="#fff">
                  {editUsername ? (
                    <Button
                      disableElevation
                      variant="contained"
                      sx={{
                        color: "black",
                        background: "#EFEEEE",
                        textTransform: "capitalize",
                        border: "1px solid grey",
                      }}
                      onClick={() => {
                        setEditUsername(!editUsername);
                      }}
                    >
                      <Icon
                        icon="mdi:circle-edit-outline"
                        width={20}
                        style={{ marginRight: "5px" }}
                      />
                    {langKey && langKey.edit}
                    </Button>
                  ) : (
                    <Button
                    disabled={errorUserName}
                      // disableElevation
                      variant="contained"
                      sx={{
                        color: "white",
                        background: "#FF6F31",
                        textTransform: "capitalize",
                        // border: "1px solid grey",
                        "&:hover": {
                          background: "#ff1b1b"
                        },
              
                      }}
                      onClick={onUpdateUserName}
                    >
                    {langKey && langKey.submit}
                    </Button>
                  )}
                </InputAdornment>
              }
            />
            <FormHelperText style={{margin:0,padding:'0 10px'}}>{userName}</FormHelperText>
            {errorUserName && <FormHelperText error>{errorUserNameMessage}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12} my={5}>
          <Divider
            id="changePasswordDivider"
            sx={{
              "&:before": {
                width: "0px",
                //   background: 'orange'
              },
            }}
            textAlign="left"
          >
            <Typography variant="h5">{langKey && langKey.change_password}</Typography>
          </Divider>
        </Grid>
        <Grid item xs={12} >
          <FormControl
            variant="outlined"
            fullWidth
            sx={{
              borderRadius: "15px",
              marginBottom: "5px",
            }}
          >
            <InputLabel> {langKey?.current_password}</InputLabel>
            <OutlinedInput
              fullWidth
              label={langKey?.current_password}
              name="currentPassword"
              placeholder={langKey && langKey.current_password}
              inputProps={{ maxLength: 16 }}
              id="outlined-adornment-password"
              type={showCurrentPassword ? "text" : "password"}
              error={errorCurrentPassword}
              value={currentPassword}
              onChange={onChangeCurrentPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowCurrentPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showCurrentPassword ?  <Visibility /> : <VisibilityOff /> }
                  </IconButton>
                </InputAdornment>
              }
            />
           {errorCurrentPassword && (
              <FormHelperText error>{errorCurrentPasswordMessage}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} pt={1}>
          <FormControl
            variant="outlined"
            fullWidth
            sx={{
              borderRadius: "15px",
              marginBottom: "5px",
            }}
          >
            <InputLabel> {langKey && langKey.password}</InputLabel>
            <OutlinedInput
              fullWidth
              label={langKey && langKey.password}
              name="password"
              // placeholder={t("password")}
              inputProps={{ maxLength: 16 }}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
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
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errorPassword && (
              <FormHelperText error>{errorPasswordMessage}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} mb={2} pt={1}>
          <FormControl
            variant="outlined"
            fullWidth
            sx={{
              borderRadius: "15px",
              marginBottom: "5px",
            }}
          >
            <InputLabel>{langKey && langKey.confirm_password}</InputLabel>

            <OutlinedInput
              sx={{ paddingRight: "10px" }}
              name="confirm_password"
              // placeholder={t("confirm_password")}
              label={langKey && langKey.confirm_password}
              inputProps={{ maxLength: 16 }}
              id="outlined-adornment-confirmpassword"
              type={showConfirmPassword ? "text" : "password"}
              error={errorConfirmPassword}
              value={confirmpassword}
              onChange={onChangeConfirmPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                    edge="end"
                    style={{paddingRight:"11px"}}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            /> 
            {errorConfirmPassword && <FormHelperText error>{errorConfirmPasswordMessage}</FormHelperText> }
          </FormControl>
        </Grid>

        <Grid item xs={6} pr={1}>
          <Button
            disableElevation
            fullWidth
            variant="contained"
            sx={{
              color: "#6F6F6F",
              background: "#D4D4D4",
              textTransform: "capitalize",
              "&:hover": {
                color: "white"
              },
            }}
            onClick={()=>router.push('/')}
          >
            {langKey && langKey.cancel}
          </Button>
        </Grid>
        <Grid item xs={6} pl={1}>
          <Button
            disableElevation
            fullWidth
            variant="contained"
            sx={{
              color: "white",
              background:
                "linear-gradient(90.04deg, #FF0000 0.04%, #FF6F31 99.97%);",
              textTransform: "capitalize",
            }}
           disabled={!validate()}
            onClick={onSubmit}
          >
      {langKey && langKey.submit}
          </Button>
        </Grid>
        
      </Paper>
      {/* <Grid container justifyContent="center" py={5}>
        <Grid item>
          <Button  style={{background:'#FAFAFA',border:'1px solid #DDDDDD',fontSize:'14px',padding:'5px 25px'}} onClick={handleLogout}>{langKey && langKey.logout}</Button>
        </Grid>
      </Grid> */}
      <LoadingDialog loading={loading}/>
     </>
  );
}
