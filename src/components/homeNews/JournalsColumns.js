import React from "react";
import { Typography, Divider } from "@mui/material";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import JournalItem from "@/common/JournalItem";
import { getJournal } from "@/store/actions/journalActions";
import DialogDesktop from "@/components/desktop/DialogDesktop";
const responsive = {
  largeDesktop: {
    breakpoint: { max: 4000, min: 1321 },
    items: 5,
  },
  desktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 1320, min: 1025 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 685 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 686, min: 321 },
    items: 2,
  },
  smallMobile: {
    breakpoint: { max: 320, min: 0 },
    items: 1,
  },
};




export default function JournalsColumns(props) {
  const { i18n } = useTranslation(); 
  const [open, setOpen] = React.useState(false);
  const [albumId, setAlbumId] = React.useState('');
  const [journals, setJournals] = React.useState('');
  const {lang_id=''} = props; 
  const dispatch = useDispatch();
  const {  loading } = useSelector((state) => state.journal); 
  useEffect(() => {
    dispatch(getJournal(
      {
        params: {lang_id: lang_id, take: 60},
        callback:(res) => { 
          setJournals(res.data)
        }
      }
    ));
  },[dispatch,lang_id])


  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);



  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={4} marginY="15px">
          <Divider
            sx={{
              "&::before, &::after": {
                borderColor: "red",
              },
              fontWeight: "bold",
              textTransform: "uppercase",
              fontFamily: "system-ui",
            }}
          >
            <Typography variant="h5" paddingX="10px" fontWeight="bold">
              {langKey && langKey.journal}
            </Typography>
          </Divider>
        </Grid>
        <Grid item xs={12} className="home-carousel-wrapper" paddingX='20px'>
          <Carousel
          className="makecenterforjournal"
            responsive={responsive}
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
          >
            {journals?.length > 0 ? journals.map((item,index)=>{
              return <JournalItem setOpen={setOpen} setAlbumId={setAlbumId} key={index} item={item} i18n={i18n.language}/>;
            }):<Typography textAlign="center">{langKey && langKey.no_journal_data}</Typography>}
          </Carousel>
        <style>
          {
            ` .react-multiple-carousel__arrow {
                min-width: 24px;
                min-height: 24px;
                background: linear-gradient(0deg, #EFEFEF, #EFEFEF),
                linear-gradient(0deg, #FFFFFF, #FFFFFF);
              }
              .home-carousel-wrapper {
                position: relative;
              }
             .home-carousel-wrapper .react-multi-carousel-list {
              position: unset !important;
            }
              .home-carousel-wrapper .react-multiple-carousel__arrow--left {
                left: 0px;
              }
              .home-carousel-wrapper .react-multiple-carousel__arrow--right {
                right:0px; 
              }
             
            
              .react-multiple-carousel__arrow::before {
                font-size: 10px;
                color: #444444;
              }
            `
          }
        </style>
        </Grid>
      </Grid>
      {/* Show dialog album here */}
      <DialogDesktop open={open} albumId={albumId} setOpen={setOpen}/>
    </>
  );
}
