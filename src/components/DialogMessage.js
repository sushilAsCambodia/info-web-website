import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import {
    Button,
    Typography,
    Dialog,
} from "@mui/material";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(0),
    },
}));
/**
 * @param {*} props 
 * message String | is message show 
 * open bool | is show dialog
 * setOpen func | is set hide show dialog
 * redirect Object | is router object
 * @returns void
 */
const DialogMessage = (props) => {
    const router = useRouter(0);
    const { message = '', open = false, setOpen,redirect = {}, onClosed } = props;
    const { t } = useTranslation();
    const handleClose = () => {
        setOpen(false);
        if(redirect && Object.keys(redirect).length > 0) {
            router.push(redirect);
        }
        if(onClosed) {
            onClosed(true)
        }
    };
    const langKey = useSelector((state) => state && state.load_language && state.load_language.language);

    return <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            id="logindialog" 
            sx={{
                '.MuiDialog-paper' : {
                    width:'90%',
                    margin:0
                }
            }}
        >
        <DialogContent dividers sx={{ maxWidth: "290px" }}>
            <Typography gutterBottom>
                {message}
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleClose}>
            {langKey && langKey.ok}
            </Button>
        </DialogActions>
    </BootstrapDialog>;
}
export default DialogMessage;