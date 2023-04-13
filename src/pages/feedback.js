import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import {
  Button,
  Typography,
  FormControl,
  Grid,
  IconButton,
  InputAdornment, 
  OutlinedInput, 
  TextField
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { createFeedback } from "@/store/actions/feedbackActions";
import { useDispatch, useSelector } from 'react-redux';
const Feedback = () => {
  const {loading} = useSelector((state) => state.feedback)
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [content,setContent]  = useState('');
  const [contact,setContact]  = useState('');
  const [errorContent,setErrorContent]  = useState(false);
  const onChangeContent = (e) => {
    if(e.target.value.length <=500) {
      setContent(e.target.value)
      if(e.target.value!='') {
        setErrorContent(false);
      }else {
        setErrorContent(true);
      }
    }
  }
  const onChangeContact = (e) => {
    setContact(e.target.value);
  }
  const onSubmit = () => {
    if(content === '') {
      setErrorContent(true);
    }else {
      setErrorContent(false);
      if(!errorContent) {
        dispatch(createFeedback({
          body: {
            content: content,
            contact: contact
          },
          callback:(res) => {
            console.log('call' , res)
          }
        }))
      }
    } 
  };
  return (
    <>
      <Grid
        container
        alignItems="flex-start"
        justifyContent="center"
        padding="0px 16px">

        <Grid
          item
          xs={12}
          container
          alignContent="flex-start"
          alignItems="center"
          overflow="auto"
        >
          <Grid item xs={12} sm={12} md={12} xl={12} padding="0px">
            <Grid item xs={12} paddingTop="15px">
              <Typography fontSize="18px">
                {t('send_your_feedback_here')}
              </Typography>
            </Grid>
            <Grid item xs={12} paddingTop="10px">
              <Typography paddingBottom="20px" fontSize="12px">
                {t('feedback_content')} <Typography component="span" sx={{color:'red'}}>*</Typography>
              </Typography>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                multiline
                rows={6}
                placeholder="Please input your feedback, do not exceed 500 characters"
                value={content}
                onChange={onChangeContent}
                error={errorContent}
                helperText={errorContent ? t('required_feedback') : ''}/>
            </Grid>

            <Grid item xs={12} paddingTop="10px">
              <Typography paddingBottom="20px" fontSize="12px">
                {t('contact')}
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
                  id="outlined-adornment-password"
                  type="text"
                  value={contact}
                  onChange={onChangeContact}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end">
                        <Icon icon="ooui:message" width={20} color="#F26522" />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} paddingTop="30px">
              <Button
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  color:"white",
                  background:
                    "linear-gradient(90.04deg, #FF0000 0.04%, #FF6F31 99.97%);",
                  textTransform: 'capitalize'
                }}
                onClick={onSubmit}
              >
                {t('submit')}
              </Button>
            </Grid>

          </Grid>

        </Grid>
      </Grid>
    </>
  )

};
export default Feedback;