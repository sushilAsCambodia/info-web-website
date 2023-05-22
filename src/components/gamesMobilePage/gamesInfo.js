import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";

import { Icon } from "@iconify/react";

const GamesInfo = (props) => {
  const { name,favourite=false } = props;
  return (
    <Grid container alignItems="center" borderBottom="1px solid #D9D9D9" pb={2} mb={2} justifyContent="space-between">
      <Grid
        container
        item
        xs={'auto'}
        alignItems="center"
        justifyContent="center"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50px",
          background: "linear-gradient(90deg, #FF0000 0%, #FF6F31 100%)",
        }}
      >
        <Typography variant="h5" style={{ color: "white" }}>
          {Array.from(name)[0]}
        </Typography>
      </Grid>
      <Grid container item xs={9} px={1}>
        <Typography>{name}</Typography>
      </Grid>
      <Grid container item xs={1}>
        <Icon width={30} color={favourite ?"#F2DA00":"#DDDDDD"} icon="material-symbols:star-rate-rounded" />
      </Grid>
    </Grid>
  );
};
export default GamesInfo;
