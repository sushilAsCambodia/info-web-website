import React from "react"; 
import { Grid,Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import utils from "@/common/utils";
import {getAdvertise} from '@/store/actions/advertiseActions'
import Carousel from "react-multi-carousel";
import Image from "mui-image";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const [newAdverts, setNewAdverts] = useState([]);

  const dispatch = useDispatch();
  const { i18n } = useTranslation(); 
  const isH5 = useMediaQuery("(max-width:768px)");

  // useEffect(() => {
  //   dispatch(getAdvertise(
  //     {
  //         params: {
  //           lang_id: utils.convertLangCodeToID(i18n.language)
  //         },
  //         callback:(res) => { }
  //     }
  //   ));
  // }, [i18n.language,dispatch]); 
  useEffect(() => {
    let type = 'web';
    if(isH5) type = 'h5';
    setNewAdverts(advertises.filter(b => b.position == 'central_carousel'));
  },[advertises,isH5])
  // console.log("advertises:::",advertises)
  // console.log("newadverts:::",newAdverts)
  return (
    <>
    { 
      newAdverts && newAdverts.length > 0 && (
        <Grid mt={5}>
          <Carousel
            responsive={responsive}
            additionalTransfrom={0}
            swipeable={newAdverts.length>1?true:false}
            draggable={newAdverts.length>1?true:false}
            arrows={newAdverts.length>1?true:false}
            autoPlaySpeed={3000}
            autoPlay={newAdverts.length !== 1}
            centerMode={false}
            containerClass="container-with-dots"
            dotListClass=""
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            showDots
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false} 
            // rtl={true}
            >
            {newAdverts.map((ad, index) => (
              <Link href={ad.ads_link} target='_blank' key={index}>
                <Grid 
                  style={{
                    color: "white",
                    textAlign: "left",
                    height: "300px",
                    // border: "1px solid grey",
                    borderRadius: "5px",
                  }} 
                >
                  <Image  
                    src={ad.icon}
                    alt={ad.title}
                    style={{
                      width: "100%",
                      // height:'100%',
                      objectFit:"fill", 
                    }}
                  />
                </Grid>
              </Link>
            ))}
          </Carousel>
        </Grid>
      )
    }
    </>
  );
}
