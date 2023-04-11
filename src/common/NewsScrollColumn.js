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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

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
                background: "linear-gradient(to left, #FF6F31 50%, white 0%)",
              }}
              className="half-border"
              position="relative"
            >
                <div id="holder" style={{position:"absolute"}}>
          <div id="mask" style={{position:"relative"}}>
            
          </div>
          </div>
              <Grid
                style={{
                  background: "black",
                  color: "white",
                  textAlign: "left",
                  height: "50px",
                  padding: "10px",
                  borderRadius: "10px 10px 0px 0px",
                }}
              >
                Internation news
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
                    <Grid
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
                      <Grid textAlign="left">{row.news}</Grid>
                      <Grid textAlign="left">{row.date}</Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
    </>
      
    
  );
}
