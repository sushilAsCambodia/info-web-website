import { Grid, List, ListItem, Card, Typography, Container } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import NewsColumns from "@/components/homeNews/NewsColumns";
export default function Home() {
  const matches = useMediaQuery("(max-width:768px)");
  return !matches ? (
    <Container sx={{
      position: "relative",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: '100vh',
      backgroundPosition: "center"

    }}>
    
        <Grid item >
        <NewsColumns />
        </Grid>
    </Container>
  ) : (
    <Container sx={{
      backgroundImage: 'url("./assets/Home/landingpagebg.jpg")',
      position: "relative",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: '100vh',
      backgroundPosition: "center"
    }}>
      <Grid
        container
        xs={12}
        justifyContent="center"
      >
        <Grid item xs={12} sm={12} md={12} xl={12}>
          <Grid item textAlign="center" sx={{
            position: 'absolute',
            left: '0',
            right: '0',
            bottom: '150px',
          }} >
            <Typography fontWeight={700} fontSize="20px">DOWNLOAD APP</Typography>
          </Grid>

          <Grid item sx={{
            position: 'absolute',
            left: '0',
            right: '0',
            bottom: '90px',
          }}>
            <Grid item xs={12} display="flex" justifyContent="space-between">
            <Grid item xs={6} >
            <Typography textAlign="center"><img src="./assets/Home/iosbtn.png" /></Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography textAlign="center"><img src="./assets/Home/androidbtn.png" /></Typography>

            </Grid>
           
            </Grid>
          </Grid>

          <Grid item textAlign="center" sx={{
            position: 'absolute',
            left: '0',
            right: '0',
            bottom: '20px',
          }}>
            <Grid item color="#1639e5" fontFamily="sans-serif">
              <Link href="/home">Continue to home page</Link>
            </Grid>
          </Grid>


        </Grid>
      </Grid>
    </Container>
  );
}
