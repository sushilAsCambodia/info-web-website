import * as React from "react";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  Modal,
  Fade,
  Box,
  Typography,
  Backdrop,
  Grid,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  height: "fit-content",
  minHeight: "30vh",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
};

export default function ConfirmationModal(props) {
  const { action, open, setOpen, message } = props;
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setTimeout(() => {
      action();
      setOpen(false);
    }, 2000);
    setLoading(true);
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        {!loading ? (
          <Grid sx={style} container style={{ justifyContent: "center" }}>
            <Grid
              container
              item
              xs={12}
              justifyContent="center"
              alignContent="center"
            >
              <Typography variant="h4">{message}</Typography>
            </Grid>
            <Grid item xs={12} container alignContent="center" justifyContent="space-evenly">
              <Button variant="outlined" onClick={() => setOpen(false)}>No</Button>
              <Button variant="contained" sx={{color:"white",background:"#ff703d" }} onClick={handleClose}>Yes</Button>
            </Grid>
          </Grid>
        ) : (
          <Grid sx={style} textAlign="center">
            <Icon width="200px" icon="line-md:loading-twotone-loop" />
          </Grid>
        )}
      </Fade>
    </Modal>
  );
}
