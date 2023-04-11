import { Icon } from "@iconify/react";
import { Chip, Divider, Grid, Link, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import MiddleShow from "./MiddleShow";
export default function ResultsBanner({
  lang_id,
  winnerGalleryProducts,
  winnerGalleryCustomers,
  winnerGalleryAll,
}) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const rows = [
    {
      id: 1,
      news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "10/22/2023",
    },
    {
      id: 2,
      news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "10/22/2023",
    },
    {
      id: 3,
      news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "10/22/2023",
    },
    {
      id: 4,
      news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "10/22/2023",
    },
    {
      id: 4,
      news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "10/22/2023",
    },
    {
      id: 4,
      news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "10/22/2023",
    },
    {
      id: 4,
      news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "10/22/2023",
    },
    {
      id: 4,
      news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "10/22/2023",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnFocus: true,
    arrows: false,
    lazyLoad: false,
    centerMode: false,
  };
  useEffect(() => {
    setLoading(true);
    if (winnerGalleryProducts && winnerGalleryCustomers && winnerGalleryAll) {
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    }
  }, [
    winnerGalleryProducts,
    winnerGalleryCustomers,
    winnerGalleryAll,
    lang_id,
  ]);   
   const lottos = [10, 10, 10, 10, 10, 11];
  const lotto = () => {
    const bgColor = (index,length)=>{
        if(index % 2 != 0 && index!=length-1)
          return "grey"
      }
    
    return (
      <>
        <Grid
          container
          width="fit-content"
          border="1px solid grey"
          borderRadius="10px"
        >
          {lottos.map((lotto, index) => {
            return (
              <>
              {index==0 ? <Grid px={1} borderRadius="10px 0px 0px 10px" sx={{background:`${bgColor(index,lottos.length) }`}}>{lotto}</Grid>:''}
              {index==lottos.length-1 ? <Grid px={1} borderRadius="0px 10px 10px 0px" sx={{background:`${bgColor(index,lottos.length) }`}}>{lotto}</Grid>:''}
              {index!=lottos.length-1 && index!=0 ? <Grid px={1} sx={{background:`${bgColor(index,lottos.length) }`}}>{lotto}</Grid>:''}
                {index == lottos.length - 1 ? (
                  ""
                ) : (
                  <Divider
                    orientation="vertical"
                    sx={{ borderColor: "grey" }}
                    flexItem
                  />
                )}
              </>
            );
          })}
        </Grid>
      </>
    );
  };
  return (
    <>
      <Grid
        item
        container
        className="middle-grid"
        justifyContent="center"
        spacing={1}
        marginTop="10px"
      >
        <Grid item xs={3} border="1px solid grey" borderRadius="10px">
          <Grid>Latest Results</Grid>
          <Grid overflow="auto" height="450px">
            <Slider {...settings}>
              <Grid width="100%" paddingX="10px">
                <Card sx={{ border: "1px solid grey", marginY: "5px" }}>
                  <Grid sx={{ fontSize: "15px",borderBottom:"1px solid grey" }} px={1}>29 Mar 2023, Monday</Grid>
                  <CardHeader
                    sx={{ padding: "10px" }}
                    avatar={
                      <Grid
                        sx={{
                          background: "#FFE0E0",
                          borderRadius: "50%",
                          width: "35px",
                          height: "35px",
                        }}
                        textAlign="center"
                      >
                        <img
                          width="30px"
                          height="30px"
                          src="./assets/Logo/superlotto-logo.png"
                        />
                      </Grid>
                    }
                    title={
                      <Typography fontSize="13px" fontWeight="bold">
                        Super Lotto
                      </Typography>
                    }
                    subheader={lotto()}
                  />
                </Card>
              </Grid>
            </Slider>
          </Grid>
        </Grid>
        <Grid xs={6}>
          <Grid
            xs={12}
            mx={1}
            border="1px solid black"
            borderRadius="10px"
            height="100%"
          >
            <MiddleShow />
          </Grid>
        </Grid>
        <Grid item xs={3} border="1px solid grey" borderRadius="10px">
          <Grid px={1.5} container justifyContent="space-between" width="100%">
            <Grid>Announcements</Grid>
            <Grid
              component={Link}
              style={{ color: "blue", textDecoration: "none" }}
            >
              View all
            </Grid>
          </Grid>
          <Grid overflow="auto" height="450px">
            <Grid
              sx={{
                borderRadius: "0px 0px 10px 10px",
                height: 440,
                overflow: "auto",
              }}
              className="newsColumn"
            >
              {" "}
              <Slider {...settings}>
                {rows.map((row) => {
                  return (
                    <Grid>
                      <Grid
                        key={rows.id}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          borderBottom: "2px solid grey",
                          paddingBottom: "10px",
                          marginBottom: "10px",
                          // color: "white",
                          margin: "10px",
                        }}
                      >
                        <Grid textAlign="left">{row.news}</Grid>
                        <Grid textAlign="left">{row.date}</Grid>
                      </Grid>
                    </Grid>
                  );
                })}
              </Slider>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
