import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { Typography, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import JournalItem from "@/common/JournalItem";
import { getJournal } from "@/store/actions/journalActions";

const responsive = {
  largeDesktop: {
    breakpoint: { max: 4000, min: 1321 },
    items: 5,
  },
  desktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 1320, min: 1025 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 685 },
    items: 5,
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
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const [value, setValue] = React.useState(0);
  const {lang_id=[]} = props; 
  const dispatch = useDispatch();
  const { journals = [], loading } = useSelector((state) => state.journal);

  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash == "journal") {
      setValue(1);
    } else {
      setValue(0);
    }
  }, [router.asPath]);

  useEffect(() => {
      dispatch(getJournal(
        {
            params: {lang_id: lang_id,take: 10},
            callback:(res) => {
              console.log('getJournal:::',res)
            }
        }
      ));
  },[lang_id])
  return (
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
            Journals
          </Typography>
        </Divider>
      </Grid>
      <Grid item xs={12}>
        <Carousel
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
          {journals.map((item,index)=>{
            return(<><JournalItem item={item}/></>)
          })}
        </Carousel>
      </Grid>
    </Grid>
  );
}
