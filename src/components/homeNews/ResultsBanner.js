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
import FullSilder from "./FullSilder";
import LottoList from "@/common/LottoList";
import useMediaQuery from "@mui/material/useMediaQuery";
import AnnouncementItem from "@/common/AnnouncementItem";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  largeDesktop: {
    breakpoint: { max: 4000, min: 1321 },
    items: 3,
  },
  desktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 1320, min: 1025 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 565 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 564, min: 375 },
    items: 2,
  },
  smallMobile: {
    breakpoint: { max: 389, min: 0 },
    items: 1,
  },
};

const announcement = [
  {
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "03 Apr 2023",
  },
];
export default function ResultsBanner(props) {
  const { lang_id = [], banners = {} } = props;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const matches = useMediaQuery("(max-width:1199px)");
  const matches2 = useMediaQuery("(max-width:768px)");

  const langKey = useSelector(
    (state) => state && state.load_language && state.load_language.language
  );

  return (
    <>
      <Grid
        item
        container
        md={12}
        className="middle-grid"
        justifyContent="center"
        marginTop="10px"
        // px={{xs:1,md:0}}
      >
        <Grid
          item
          xs={12}
          lg={3}
          xl={2.5}
          border={{ xs: "0px solid #ddd", md: "1px solid #ddd" }}
          borderRadius="2px"
          height={`${matches2 ? "100px":"" }`}
        >
          <Typography px={1.5} mb={1}>
            {" "}
            {langKey && langKey.latest_results}
          </Typography>
          <Grid
            overflow="auto"
            className={matches ? "verticleLotto" : "horizontalLotto"}
            px={1}
          >
            <LottoList />
            <LottoList />
            <LottoList />
            <LottoList />
            <LottoList />
            <LottoList />
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          lg={7}
          xl={7.5}
          py={{ xs: 1, lg: 0 }}
          px={{ xs: 0, lg: 1 }}
        >
          <Grid
            item
            xs={12}
            border={{ xs: "0px solid #ddd", md: "1px solid #ddd" }}
            borderRadius="2px"
            height="100%"
            container
            alignItems="space-between"
          >
            <MiddleShow />
          </Grid>
        </Grid>
        {!matches2 ? (
          <Grid
            item
            xs={12}
            lg={2}
            border={{ xs: "0px solid #ddd", md: "1px solid #ddd" }}
            borderRadius="2px"
          >
            <Grid
              px={1.5}
              mb={1}
              container
              justifyContent="space-between"
              width="100%"
            >
              <Typography> {langKey && langKey.announcement}</Typography>
              <Grid
                component={Link}
                href="/announcement"
                style={{ color: "#037DED", textDecoration: "none" }}
              >
                <Typography> {langKey && langKey.view_all}</Typography>
              </Grid>
            </Grid>
            <Grid
              overflow="auto"
              className={matches ? "verticleLotto" : "horizontalLotto"}
              px={1}
            >
              <AnnouncementItem announcement={announcement} />
              <AnnouncementItem announcement={announcement} />
              <AnnouncementItem announcement={announcement} />
              <AnnouncementItem announcement={announcement} />
              <AnnouncementItem announcement={announcement} />
              <AnnouncementItem announcement={announcement} />
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
}
