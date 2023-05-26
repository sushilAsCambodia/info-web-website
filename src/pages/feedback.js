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
  TextField,
  FormHelperText 
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { createFeedback } from "@/store/actions/feedbackActions";
import { useDispatch, useSelector } from 'react-redux';
import utils from '@/common/utils';
import LoadingDialog from "@/components/Loading";
import DialogMessage from "@/components/DialogMessage";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Token } from "@mui/icons-material";

const Feedback = () => {
  const {loading} = useSelector((state) => state.feedback);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  const [profilePage,setProfilePage]  = useState(false);
  const [content,setContent]  = useState('');
  const [contact,setContact]  = useState('');
  const [openDialog,setOpenDialog]  = useState(false);
  const [errorContent,setErrorContent]  = useState(false);
  const [errorEmail,setErrorEmail]  = useState(false);
  const [disabled,setDisabled]  = useState(true);
  const [errorEmailMessage,setErrorEmailMessage]  = useState('');
  const [responseMessage,setResponseMessage]  = useState(''); 

  const onChangeContent = (e) => {
    if(e.target.value.length <= 500) {
      setContent(e.target.value)
      if(e.target.value != '') {
        setErrorContent(false);
        if(!errorEmail) {
          setDisabled(false)
        }
      }else {
        setErrorContent(true);
        setDisabled(true);
      }
    }
  }
  const onChangeContact = (e) => {
    setContact(e.target.value);
    if(e.target.value!='') {
      const isValidEmail = utils.validateEmail(e.target.value);
      if(isValidEmail) {
        setErrorEmail(false);
        if(!errorContent) {
          setDisabled(false)
        }
      }else {
        setErrorEmailMessage('invalid_email');
        setErrorEmail(true);
        setDisabled(true);
      }
    } 
  } 
  const onSubmit = () => {
    if(content == '' && contact == '') {
      setErrorContent(true);
      setErrorEmail(true);
      setErrorEmailMessage('contact_required');
    }else if (content == '') {
      setErrorContent(true);
    }else if (content == '') {
      setErrorEmailMessage('contact_required');
      setErrorEmail(true);
    }else {
      if(!errorContent && !errorEmail && !disabled) { 
        dispatch(createFeedback({
          body: {
            feedback_content: content,
            contact: contact
          },
          callback:(res) => {
            const {message = '' } = res;
            if(res.status_code === 201){
              setOpenDialog(true)
              setResponseMessage(t(message));
              setTimeout(()=> {setOpenDialog(false)
              setContent('');
              setContact('');
              setDisabled(true);
            },1000)
            }else if(res.status_code === 401){
              Cookies.remove('token')
              setOpenDialog(true)
              setResponseMessage(t(message));
            }
          }
        }))
      }
    } 
  };
  useEffect(() => {
    const hash = router.asPath;
    if(hash == '/profile#feedback') {
      setProfilePage(true);
    }
  }, [ router.asPath ]);
  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);
  return   ( 
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
                {langKey && langKey.send_your_feedback_here}
              </Typography>
            </Grid>
            <Grid item display="flex" flexDirection={`${profilePage? "column-reverse":"column" }`}>
            <Grid item xs={12} paddingTop="10px">
              <Typography paddingBottom="20px" fontSize="12px">
              {langKey && langKey.feedback_content} <Typography component="span" sx={{color:'red'}}>*</Typography>
              </Typography>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                multiline
                rows={6}
                placeholder={langKey && langKey.do_not_exceed_characters}
                value={content}
                onChange={onChangeContent}
                error={errorContent}
                helperText={errorContent ? (langKey && langKey.feedback_content_required) : ''}/>
            </Grid>

            <Grid item xs={12} paddingTop="10px">
              <Typography paddingBottom="20px" fontSize="12px">
                {langKey && langKey.contact}
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
                  name="email"
                  placeholder={langKey && langKey.email}
                  id="outlined-adornment-email"
                  type="text"
                  value={contact}
                  onChange={onChangeContact}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle email visibility"
                        edge="end">
                        <Icon icon="ooui:message" width={20} color="#F26522" />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errorEmail && <FormHelperText error>{langKey && (langKey.errorEmailMessage || t('invalid_email'))}</FormHelperText>}
              </FormControl>
            </Grid>
            </Grid>

            <Grid item xs={12} paddingTop="30px">
              <Button
                fullWidth
                variant="contained"
                disabled={disabled}
                sx={{
                  color:"white",
                  background:
                    "linear-gradient(90.04deg, #FF0000 0.04%, #FF6F31 99.97%);",
                  textTransform: 'capitalize'
                }}
                onClick={onSubmit}>
                {langKey && langKey.submit}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DialogMessage 
        open={openDialog} 
        setOpen={setOpenDialog} 
        message={responseMessage} 
        redirect={{pathname:'/login'}}
      />
    </>
  )
};
export default Feedback;