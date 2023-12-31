import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import utils from '@/common/utils';
import Issue from './Issue';
import { Typography } from '@mui/material';
import ImageCarouselComponent from '../ImageCarouselComponent';
import { getJournalDetial } from '@/store/actions/journalActions';
export default function DialogDesktop(props) {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const {open,setOpen,albumId} = props;
  const [banners,setBanners] = React.useState([]);
  const [year,setYear] = React.useState('');
  const [drawerOpen,setDrawerOpen] = React.useState(open);
  const handleClose = () => {
    setOpen(false);
    setDrawerOpen(false);
  };   

  React.useEffect(() => {
    if (open) {
        dispatch(getJournalDetial(
            {
              id: albumId,
              params: { lang_id: utils.convertLangCodeToID(i18n.language) },
              callback: (res) => {
                setDrawerOpen(true)
              }
            }
        ));
    }
  }, [dispatch,albumId,open,i18n.language]);

  const { journalDetail = [] } = useSelector(state => state.journal);
  
  React.useEffect(() => {
      setBanners([]);
      if(Array.isArray(journalDetail) && journalDetail.length > 0) {
        const item = journalDetail[0];
        const images = []; 
        for (let j = 0; j < item.album_slavs.length; j++) {
          const issue = item.album_slavs[j].issue;

          for (let i = 0; i < item.album_slavs[j].album_slav_images.length; i++) {
            const itm = item.album_slavs[j].album_slav_images[i];
            images.push({
              original:itm.images,
              thumbnail:itm.images,
              issue:issue,
              issue_date:itm.issue_date,
            })
        }
      }
        setBanners(images);
      }
  },[journalDetail]);
  return (
    <Dialog
      open={drawerOpen}
      onClose={handleClose}
      maxWidth="sm"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        posistion:'relative',
        '& .MuiDialog-paper': {
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
        backgroundColor:'#FF6F31',
        cursor:"pointer"
      
      }} onClick={handleClose}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.00021 5.586L11.9502 0.636002L13.3652 2.051L8.41521 7.001L13.3652 11.951L11.9502 13.365L7.00021 8.415L2.05021 13.365L0.637207 11.95L5.58721 7L0.637207 2.05L2.05021 0.638001L7.00021 5.588V5.586Z" fill="white"/>
        </svg>
      </Typography>
      <DialogContent sx={{ padding: 2 }}>
        <ImageCarouselComponent images={banners} isWeb={true} year={year}/> 
        <Issue albumId={albumId} setYear={setYear}/>
      </DialogContent>
    </Dialog>
  );
}