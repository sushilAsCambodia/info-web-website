/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import {
  Grid,
  ListItem,
  Typography,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  FormHelperText 
} from "@mui/material";
import { useTranslation } from "react-i18next";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function ProfileInfo(props) {
  const { categories, lang_id } = props;
  const { t } = useTranslation();

  const [password, setPassword] = useState("");
  const [confirmpassword,setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordNotMatch, setErrorPasswordNotMatch] = useState(false);
  const [errorConfirmPassword,setErrorConfirmPassword] = useState(false);
  const [errorPasswordMessage,setErrorPasswordMessage] = useState('');
  const [errorConfirmPasswordMessage,setConfirmErrorPasswordMessage] = useState('');

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
      setErrorPasswordMessage(t("validate_password"));
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
      setConfirmErrorPasswordMessage(t("validate_password"));
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
    if (!errorPassword && !errorConfirmPassword && !errorPasswordNotMatch) {
      console.log("@TODO: safe save password");
    }
  };
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid>
          <Grid>
            <Typography fontWeight="bold" pb={1} textAlign="left">
              {t("password")}
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
               fullWidth
                name="password"
                placeholder={t("password")}
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
          <Grid item xs={12} sm={12}>
            <Typography fontWeight="bold" pb={1} textAlign="left">
              {t("confirm_password")}
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
                name="confirm_password"
                placeholder={t("confirm_password")}
                inputProps={{ maxLength: 16 }}
                id="outlined-adornment-confirmpassword"
                type={showConfirmPassword ? "text" : "password"}
                error={errorConfirmPassword || errorPasswordNotMatch}
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
                <FormHelperText error>
                  {errorConfirmPasswordMessage}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
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
              {t("submit")}
            </Button>
          </Grid>
    </Grid>
  );
}
