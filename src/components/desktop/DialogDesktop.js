import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FullSilder from '../homeNews/FullSilder';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {getBanner} from '@/store/actions/bannerActions'
import {getCard} from '@/store/actions/cardActions'
import {getCategory} from '@/store/actions/categoryActions'
import { useEffect } from 'react';  
import utils from '@/common/utils';
export default function DialogDesktop() {
    const {banners} = useSelector((state) => state.banner);
    const {cards} = useSelector((state) => state.card);
    const {categories} = useSelector((state) => state.category); 
    const dispatch = useDispatch();
    const {i18n} = useTranslation();
    useEffect(() => { 
        dispatch(getBanner(
            {
                params: { fake:true },
                callback:(res) => {
                    console.log(res,'callback')
                }
            }
        ));
        dispatch(getCard(
            {
                params: { fake:true },
                callback:(res) => {
                    console.log(res,'callback')
                }
            }
        ));
        dispatch(getCategory(
            {
                params: {lang_id: utils.convertLangCodeToID(i18n.language)},
                callback:(res) => {
                    console.log(res,'callback')
                }
            }
        ));
    },[i18n.language]); 
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      > 
        <DialogContent sx={{padding:1}}>
          <FullSilder banners={banners} cards={cards} isWeb={true}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}