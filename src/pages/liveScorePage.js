import {
  Typography,
  Grid,
  ListItemText,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";

import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

import MatchTitleBanner from "@/components/LiveScore/matchTitleBanner";
import MatchLiveFeed from "@/components/LiveScore/matchLiveFeed";
import TitleBreadCrumbs from "@/common/TitleBreadCrumbs";

export default function LiveScorePage() {
  const router = useRouter();
  const [select, setSelect] = useState(0);
  const [age, setAge] = useState("");

  const [value, setValue] = useState("");

  function createData(id, team, r1, r2, r3, r4, audience, handicap, wl, total) {
    return { id, team, r1, r2, r3, r4, audience, handicap, wl, total };
  }

  const rows = [
    createData(1, "chealsea", 5, 3, 7, 6, 0, 159, 6.0, 24, 4.0),
    createData(2, "liverpool", 1, 0, 2, 4, 1, 237, 9.0, 37, 4.3),
    createData(3, "Brazil", 3, 4, 1, 2, 2, 27, 9.0, 37, 4.3),
  ];

  useEffect(() => {}, []);

  return (
    <>
      <TitleBreadCrumbs title={"Live Score"} />

      <Grid height="fit-content">
        <Grid container mb={2} alignItems="center">
          <img
            width={60}
            src={
              "https://img.freepik.com/premium-vector/football-lion-team-logo_441059-63.jpg"
            }
          />
          <Typography mx={1}></Typography>
          <ListItemText
            primary={<Typography>Russian Basketball Super League </Typography>}
            secondary={
              <Typography variant="body2">Season 2022-2023</Typography>
            }
          />
        </Grid>
        <MatchTitleBanner matchData={rows} />
        <MatchLiveFeed matchData={rows} />
      </Grid>
    </>
  );
}
