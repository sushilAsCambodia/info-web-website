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
    ListItem,
    ListItemText,
    ListItemIcon,
    List,
    Dialog,
    OutlinedInput,
    Divider,
    TextField
} from "@mui/material";
import Router from "next/router";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useTranslation } from "react-i18next";
  
const Feedback = () => { 
    const {t} = useTranslation();
    return (
        <>
            <Grid
                container
                alignItems="flex-start"
                justifyContent="center"
                padding="0px 16px"
            >
         
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
                        <Grid item xs={12} paddingTop="30px">
                            <Typography paddingBottom="20px">
                            {t('feedback_content')}
                            </Typography>
                            <TextField
                            fullWidth
                                id="outlined-multiline-static"
                                multiline
                                rows={6}
                                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                                labore et dolore magna aliqua. Ut enim ad minim veniam, Ut enim ad minim veniam,"
                              />
                        </Grid>

                        <Grid item xs={12} paddingTop="30px">
                            <Typography paddingBottom="20px">
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
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      >
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
                  sx={{
                    color: "white",
                    background:
                      "linear-gradient(90.04deg, #FF0000 0.04%, #FF6F31 99.97%);",
                    textTransform: 'capitalize'
                  }}
                 
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