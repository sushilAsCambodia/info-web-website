import {useState,useEffect} from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { Typography, Divider, Button } from "@mui/material";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getAdvertise } from "@/store/actions/advertiseActions";
import { Icon } from "@iconify/react";
import { Image } from "mui-image";
import utils from "@/common/utils";

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

export default function PartnersColumns(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);
  const { advertises = []} = useSelector((state) => state.advertise);
  const dispatch  = useDispatch();

  const [value, setValue] = useState(0);
  const [partners, setPartners] = useState([]);
  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash == "journal") {
      setValue(1);
    } else {
      setValue(0);
    }
  }, [router.asPath]);
  useEffect(() => {
    dispatch(getAdvertise(
      {
          params: {
            lang_id: utils.convertLangCodeToID(t.language)
          },
          callback:(res) => { }
      }
    ));
  }, [t.language,dispatch]); 

  useEffect(() => {
    setPartners(advertises.filter(b =>b.position == 'partners'));
  },[advertises])
  console.log("partenrs:::",advertises)
  console.log("partenrs:::",partners)
  
  return (
    partners && partners.length > 0 && 
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
          {langKey && langKey.partners}
          </Typography>
        </Divider>
      </Grid>
      <Grid item xs={12}>
        <Carousel
        className="makecenterforpartner"
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
          {partners && partners.length > 0 && partners.map((item,index)=>{
            return(
              <Grid
            sx={{
              margin: "5px",
              borderRadius: "10px",
              //   paddingX:"5px"
            }}
            key={index}
          >
            <Grid
              style={{
                height: "120px",
                paddingX: "5px",
                border: "1px solid grey",
                borderRadius: "5px",
              }}
              container
              alignItems="center"
              justifyContent="center"
            >
              <Grid item padding="5px">
                <Image
                  src={item.icon}
                  alt="clts_logo"
                  style={{
                    minWidth: "100px",
                    maxHeight: "80px",
                    maxWidth:"150px"
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
            )
          })}
        
         
        </Carousel>
      </Grid>
    </Grid>
  );
}
