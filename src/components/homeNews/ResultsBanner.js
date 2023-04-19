import { Icon } from "@iconify/react";
import { Chip, Divider, Grid, Link, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import MiddleShow from "./MiddleShow";
import NewsSlider from "@/common/NewsSlider";
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
    const bgColor = (index,length,lotto)=>{
       if (lotto == 11)
          return "red"
      }
    
    return (
      <>
        <Grid
          container
          width="fit-content"
          border="1px solid grey"
          borderRadius="10px"
          className="lottoGrid"
        >
          {lottos.map((lotto, index) => {
            return (
              <>
              <Grid px={1} className={`${lotto === 11 ? "hitLotto":"" }`}>{lotto}</Grid>
                {/* {index == lottos.length - 1 ? (
                  ""
                ) : (
                  <Divider
                    orientation="vertical"
                    sx={{ borderColor: "grey" }}
                    flexItem
                  />
                )} */}
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
          <NewsSlider news={rows} />
        </Grid>
        <Grid xs={6}>
          <Grid
            xs={12}
            mx={1}
            border="1px solid grey"
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
              component={Link} href="/announcement"
              style={{ color: "blue", textDecoration: "none" }}
            >
              View all
            </Grid>
          </Grid>
          <Grid overflow="auto" height="450px">
            <NewsSlider news={rows}/>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
