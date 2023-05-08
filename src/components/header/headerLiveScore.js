import {
    Typography,
    Grid,
    Chip
  } from "@mui/material";
  import { useState } from "react";
  import utils from "@/common/utils";
  import moment from "moment/moment";
  import { useRouter } from "next/router";

  import { Icon } from "@iconify/react";
  export default function headerLiveScore() {
    const router = useRouter();

    const [selectSport, setSelectSport] = useState("football");

    return (
        <>
        <Grid
          item
          xs={12}
          container
          p={1}
          borderBottom="1px solid #373737"
        >
          <Grid item p={1}>
            <Chip
              onClick={() => {
                setSelectSport("football");
                router.push('/liveScorePage')
              }}
              className={`${
                selectSport == "football"
                  ? "sportChipSelect"
                  : "sportChip"
              }`}
              label={<Typography p={1}>FootBall</Typography>}
            />
          </Grid>
          <Grid item p={1}>
            <Chip
             onClick={() => {
              setSelectSport("basketBall");
              router.push('/liveScorePage')
            }}
              className={`${
                selectSport == "basketBall"
                  ? "sportChipSelect"
                  : "sportChip"
              }`}
              label={<Typography p={1}>BasketBall</Typography>}
            />
          </Grid>
          <Grid item p={1}>
            <Chip
             onClick={() => {
              setSelectSport("lottery");
              router.push('/liveScorePage')
            }}
              className={`${
                selectSport == "lottery"
                  ? "sportChipSelect"
                  : "sportChip"
              }`}
              label={<Typography p={1}>Lottery</Typography>}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} p={2}>
          {["Argintina", "England", "France", "Germany"].map(
            (item, key) => {
              return (
                <Grid item xs={4}>
                  <Typography
                    my={1}
                    sx={{ fontSize: "14px", fontWeight: "bold" }}
                  >
                    {item}
                  </Typography>
                  <Typography my={1} sx={{ fontSize: "14px" }}>
                    Division 1-Round 9
                  </Typography>
                  <Typography my={1} sx={{ fontSize: "14px" }}>
                    Estudiantes La Plata vs Newells Old Boys
                  </Typography>
                </Grid>
              );
            }
          )}
        </Grid>
      </>
    );
  }
  