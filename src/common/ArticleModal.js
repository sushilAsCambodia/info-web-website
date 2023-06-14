

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
  return (
    <Modal
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
  </Modal>
  );
}