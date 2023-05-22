import React from "react"; 
import { Grid,Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import utils from "@/common/utils";
import {getAdvertise} from '@/store/actions/advertiseActions'
import Carousel from "react-multi-carousel";
import Image from "mui-image";

const responsive = {
  largeDesktop: {
    breakpoint: { max: 4000, min: 1321 },
    items: 1,
  },
  desktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 1320, min: 1025 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 685 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 686, min: 321 },
    items: 1,
  },
  smallMobile: {
    breakpoint: { max: 320, min: 0 },
    items: 1,
  },
};

export default function Advertisement(props) {
  const { advertises = []} = useSelector((state) => state.advertise);
  const dispatch = useDispatch();
  const { i18n } = useTranslation(); 
  useEffect(() => {
    dispatch(getAdvertise(
      {
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language)
          },
          callback:(res) => { }
      }
    ));
  }, [i18n.language,dispatch]); 
  return (
    <>
      <Grid mt={5}>
        <Carousel
          responsive={responsive}
          additionalTransfrom={0}
          swipeable={advertises.filter(ad => ad.platform == 2).length>1?true:false}
          draggable={advertises.filter(ad => ad.platform == 2).length>1?true:false}
          arrows={advertises.filter(ad => ad.platform == 2).length>1?true:false}
          autoPlaySpeed={3000}
          centerMode={false}
          containerClass="container-with-dots"
          dotListClass=""
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false} >
          {advertises.filter(ad => ad.platform == 2).map((ad, index) => (
            <Link href={ad.ads_link} target='_blank' key={index}>
              <Grid 
                style={{
                  color: "white",
                  textAlign: "left",
                  height: "302.33px",
                  // border: "1px solid grey",
                  borderRadius: "5px",
                }} 
              >
                <Image  
                  src={ad.icon}
                  alt={ad.title}
                  style={{
                    width: "100%",
                    height:'100%',
                    objectFit:"cover", 
                  }}
                />
              </Grid>
            </Link>
          ))}
        </Carousel>
      </Grid>
    </>
  );
}
