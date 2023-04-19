import {
  Grid,
  List,
  ListItem,
  Card,
  Typography,
  Container,
  Button,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
export default function Index() {
  const matches = useMediaQuery("(max-width:768px)");
  return (
    <Grid
      sx={{
        backgroundImage: 'url("./assets/Download/bg-download-download.png")',
        position: "relative",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "90vh",
        backgroundPosition: "center",
      }}
    >
      <Grid container justifyContent="center" >
        <Grid
          borderRadius="30px"
          width="400px"
          height="700px"
          border="12px solid white"
          margin="50px auto"
          
        >
          <Grid textAlign="center" mt={5}>
            <Typography variant="h5" fontWeight="bold" color="white">Wonderful information in the palm of</Typography>
            <Typography variant="h3" fontWeight="bold" sx={{color: 'white','-webkit-text-stroke':' 2px #F24E1E' }}>YOUR HAND</Typography>
          </Grid>
          <Grid textAlign="center" pl={10}>
            <img src="./assets/Download/football.png"/>
          </Grid>
          <Grid item textAlign="center" mt={2}>
            <Typography fontWeight={700} fontSize="20px">
              DOWNLOAD APP
            </Typography>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Grid item xs={6}>
              <Typography textAlign="center">
                <img src="./assets/Home/iosbtn.png" />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography textAlign="center">
                <img src="./assets/Home/androidbtn.png" />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
