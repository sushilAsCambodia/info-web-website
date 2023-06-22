

import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import {Modal,Fade,Box,Typography,Backdrop} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment/min/moment-with-locales'
import utils from "@/common/utils";
import i18n from './i18n';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    height: 'auto',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 2,
  };

export default function ArticleModal(props) {
 const {article,open,setOpen}=props

 const handleClickOpen = () => {
  setOpen(true);
};
const handleClose = () => {
  setOpen(false);
};


  return (
    <>
    {/* <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={open}
    onClose={()=>setOpen(false)}
    closeAfterTransition
    slots={{ backdrop: Backdrop }}
    slotProps={{
      backdrop: {
        timeout: 500,
      },
    }}
  >
    <Fade in={open}>
      <Box sx={style}>
        <Typography id="transition-modal-title" variant="h6" component="h2" fontWeight='bold'>
          {article.title}
        </Typography>
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          {article.comment}
        </Typography>
      </Box>
    </Fade>
  </Modal> */}





<div>
    
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <Typography  variant="h6" fontSize="16px" component="h6" fontWeight='bold' marginRight={5}>
          {article.title}
        </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers >
          <Typography gutterBottom fontSize="15px">
      
          {article.comment}
       
          </Typography>
          <Typography fontSize="15px">
          { moment(article.created_at).locale(utils.localChange(i18n.language)).format(utils.letterFormat2) }
          </Typography>
        </DialogContent>
     
      </BootstrapDialog>
    </div>


</>



  );
}