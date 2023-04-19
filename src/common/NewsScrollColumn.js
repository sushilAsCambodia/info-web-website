import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { Typography, Divider, Button,Link } from "@mui/material";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

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
export default function NewsScrollColumn(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash == "journal") {
      setValue(1);
    } else {
      setValue(0);
    }
  }, [router.asPath]);

  return (
    <>
      <Grid
        sx={{
          // border: "2px dashed red",
          padding: "15px",
          borderRadius: "10px",
          border: "2px dashed red",
        }}
        className="half-border"
        position="relative"
      >
        <Grid
          sx={{
            position: "absolute",
            // background: "linear-gradient(to left, #FF6F31 50%, white 0%)",
            background:"#FF6F31",
            height:545,
            width:250,
            right:"-1%",
            top:-2,
            borderRadius:"0px 10px 10px 0px"
          }}
        >
        </Grid>
        <Grid sx={{ backgroundColor: "black", borderRadius: "10px", position:"relative",zIndex:3 }}>
          <Grid
            style={{
              background: "black",
              color: "white",
              textAlign: "left",
              // height: "50px",
              padding: "10px",
              borderRadius: "10px 10px 0px 0px",
            }}
          >
            <Typography>Internation news</Typography>
            <Button
              variant="contained"
              sx={{ background: "#FFD233", padding: "2px", fontSize: "13px" }}
            >
              More
            </Button>
          </Grid>

          <Grid
            sx={{
              borderRadius: "0px 0px 10px 10px",
              height: 440,
              overflow: "auto",
              "--bgImg": `url(${"../assets/News/Mask.png"})`,
            }}
            className="newsColumn"
          >
            {rows.map((row) => {
              return (
           <Grid component={Link} href="/newsSingle" color="black" sx={{textDecoration:"none"}} 
                  key={rows.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderBottom: "2px solid white",
                    paddingBottom: "10px",
                    marginBottom: "10px",
                    color: "white",
                    margin: "10px",
                  }}
                >
                  <Typography textAlign="left">{row.news}</Typography>
                  <Typography textAlign="left">{row.date}</Typography>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
