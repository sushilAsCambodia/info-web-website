import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
export default function LoadingDialog(props) {
  const {loading , setLoading} = props; 
  return (
    <div> 
      <Dialog
        open={loading}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <CircularProgress/>
        </DialogContent>
      </Dialog>
    </div>
  );
}