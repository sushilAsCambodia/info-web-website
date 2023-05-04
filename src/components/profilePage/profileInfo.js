import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import LoadingDialog from "../Loading";
import DialogMessage from "../DialogMessage";
import {
  updateNickName,
  updatePassword,
  uploadProfile,
} from "@/store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
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
  Drawer
} from "@mui/material";
import { useTranslation } from "react-i18next";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";



export default function ProfileInfo(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {openDialog,setOpenDialog,setResponseMessage} = props
  const { customer, loading,status } = useSelector((state) => state.auth);
  // const [openDialog,setOpenDialog]  = useState(false);

  const [imagePreviewUrl, setImagePreviewUrl] = useState();
  const [userName, setUsername] = useState(
    customer && customer.user_name ? customer.user_name : ""
  );

  const [editUsername, setEditUsername] = useState(true);

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorPassword, setErrorPassword] = useState(false);
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
        style={{ "--uploadImg": `${imagePreviewUrl ? "" : "url('/assets/Profile/profile_upload.png')"}` }}
      >
          <img htmlFor="photo-upload" width={50} src={src} style={{borderRadius:"50px"}}/>
        <input id="photo-upload" type="file" onChange={onChange} />
      </label>
    );
  };
  
  useEffect(() => {
    setUsername((customer && customer.user_name ? customer.user_name : ''));
    if(customer && customer.image) {
      setImagePreviewUrl( customer.image.path || '');
    }
  }, [customer]);
  const updateProfilePhoto = (file) => {
    dispatch(
      uploadProfile(
        {
          body: {
            image: file
          },
          callback:(res) => {
            let { message = ''} = res; 
            setOpenDialog(true);
            setResponseMessage(t(message));
            console.log('update',res)
          },
          auth: true,
          formdata: true
        }
      )
    )
  }
  useEffect(()=> {
    if(file) {
      console.log( file,'file');
      updateProfilePhoto(file);
    }
  } ,[file])


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

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value == "") {
      setErrorPasswordMessage("Password is required");
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
    if (confirmpassword != "") {
      if (confirmpassword != e.target.value) {
        setConfirmErrorPasswordMessage("Password is not match");
        setErrorConfirmPassword(true);
      } else {
        setErrorConfirmPassword(false);
      }
    }
    if (e.target.value.length < 6) {
      setErrorPasswordMessage(langKey && langKey.validate_password);
      setErrorPassword(true);
    }
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value == "") {
      setErrorPasswordMessage("Confirm Password is required");
      setErrorConfirmPassword(true);
    } else {
      setErrorConfirmPassword(false);
    }
    if (password != e.target.value) {
      setConfirmErrorPasswordMessage("Password is not match");
      setErrorConfirmPassword(true);
    } else {
      setErrorConfirmPassword(false);
    }
    if (e.target.value.length < 6) {
      setConfirmErrorPasswordMessage(langKey && langKey.validate_password);
      setErrorConfirmPassword(true);
    }
  };
  const onSubmit = () => {
    if (password == "" && confirmpassword == "") {
      setErrorPasswordMessage("Password is required");
      setConfirmErrorPasswordMessage("Confirm Password is required");
      setErrorPassword(true);
      setErrorConfirmPassword(true);
      return;
    } else if (password === "") {
      setErrorPasswordMessage("Password is required");
      setErrorPassword(true);
      return;
    } else if (confirmpassword === "") {
      setConfirmErrorPasswordMessage("Confirm Password is required");
      setErrorConfirmPassword(true);
      return;
    }
    if (!errorPassword && !errorConfirmPassword) {
      dispatch(
        updatePassword({
          body: {
            password,
          },
          callback: (res) => {
            let { status_code, message = "" } = res;
            setOpenDialog(true);
            setResponseMessage(t(message));
            if ([200, 201, 202, 203, 204].includes(status_code)) {
              setPassword("");
              setConfirmPassword("");
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  const onChangeUserName = (e) => {
    setUsername(e.target.value)
    if (e.target.value == "") {
      setErrorUserName(true);
      setErrorUserNameMessage(langKey && langKey.user_name_required);
    } else {
      if (e.target.value.length > 5) {
        setErrorUserName(false);
      } else {
        setErrorUserName(true);
        setErrorUserNameMessage(langKey && langKey.validate_user_name);
      }
    }
  };
  
  const onUpdateUserName = () => {
    if (!errorUserName) {
      try {
        dispatch(
          updateNickName({
            body: {
              user_name: userName,
            },
            callback:(res)=> {
             
              let {status_code, message} = res; 
              if (message === "user_name_unique") {
                message = "update_user_name_unique";
              }
                console.log("try:::",message)
                console.log(openDialog, typeof setOpenDialog)
                setResponseMessage(t(message));
                setEditUsername(!editUsername);
           
            },
            auth: true,
          })
        );
              
      } catch (error) {
        console.log(error)
      }
      setOpenDialog(true);
      console.log("status:::",status)
    }

  };


  return (
    <>
    <Paper sx={{ padding: "40px" }} elevation={5} component={Grid} container>
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
          <InputLabel>{langKey && langKey.user_name}</InputLabel>
          <FilledInput
            disabled={editUsername}
            name="nickname"
            placeholder={langKey && langKey.user_name}
            inputProps={{ maxLength: 16 }}
            id="nicknameInputField"
            type="text"
            value={userName}
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
                        {errorUserName && <FormHelperText error>{errorUserNameMessage}</FormHelperText>}

        </FormControl>
      </Grid>

      <Grid xs={12} my={5}>
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

      <Grid item xs={12}>
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
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errorPassword && (
            <FormHelperText error>{errorPasswordMessage}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12} my={1}>
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
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errorConfirmPassword && (
            <FormHelperText error>{errorConfirmPasswordMessage}</FormHelperText>
          )}
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
          onClick={onSubmit}
        >
     {langKey && langKey.submit}
        </Button>
      </Grid>
    </Paper>
     <LoadingDialog loading={loading}/>
     </>
  );
}
