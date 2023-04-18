import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FullSilder from '../homeNews/FullSilder';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getBanner } from '@/store/actions/bannerActions'
import { getCard } from '@/store/actions/cardActions'
import { getCategory } from '@/store/actions/categoryActions'
import { useEffect } from 'react';
import utils from '@/common/utils';
import CardSlice from './CardSlide';
import Issue from './Issue';
import { Typography } from '@mui/material';
export default function DialogDesktop() {
  const { banners } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  const { i18n } = useTranslation(); 
  useEffect(() => {
    dispatch(getBanner(
      {
        params: { fake: true },
        callback: (res) => {
          console.log(res, 'callback')
        }
      }
    ));  
  }, [i18n.language]);
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; 
  
  return (
    <div> 
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          posistion:'relative',
          '& .MuiDialog-paper':{
            overflowY:'initial'
          }
        }} 
      >
        <Typography component="div" sx={{
          width:40,
          height:40,
          position:'absolute',
          top: '-16px',
          right: '-16px',
          zIndex: '99',
          background: 'red',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor:'#FF6F31'
        }} onClick={handleClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.00021 5.586L11.9502 0.636002L13.3652 2.051L8.41521 7.001L13.3652 11.951L11.9502 13.365L7.00021 8.415L2.05021 13.365L0.637207 11.95L5.58721 7L0.637207 2.05L2.05021 0.638001L7.00021 5.588V5.586Z" fill="white"/>
          </svg>
        </Typography>
        <DialogContent sx={{ padding: 1 }}>
          <FullSilder banners={banners} isWeb={true} />
          <CardSlice />
          <Issue/>
        </DialogContent>
      </Dialog>
    </div>
  );
}