import {
  Grid,
  List,
  ListItem,
  Card,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import { useTranslation } from "react-i18next";
export default function Index() {
  const matches = useMediaQuery("(max-width:393px)");
  const {t} = useTranslation()

  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);


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
      {matches ? 
      <Grid container justifyContent="center" >
        <Grid
          borderRadius="30px"
          width="80vw"
          height="600px"
          border="12px solid white"
          margin="50px auto"
          
        >
          <Grid textAlign="center" mt={5}>
            <Typography fontSize="20px" fontWeight="bold" color="white">{t("half_slogan")}</Typography>
            <Typography variant="h4" fontWeight="bold" sx={{color: 'white','-webkit-text-stroke':' 2px #F24E1E' }}>{t("your_hand")}</Typography>
          </Grid>
          <Grid textAlign="center" pl={5}>
            <img height="300px" src="./assets/Download/football.png"/>
          </Grid>
          <Grid item textAlign="center" mt={2}>
        
            <Typography fontWeight={700} fontSize="20px" textTransform="uppercase">
            {langKey && langKey.download_app}
            </Typography>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Grid item xs={6}>
              <Typography textAlign="center">
                <img width="100px" src="./assets/Home/iosbtn.png" />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography textAlign="center">
                <img width="100px" src="./assets/Home/androidbtn.png" />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>:
      <Grid container justifyContent="center" >
      <Grid
        borderRadius="30px"
        width={{xs:"80vw",sm:"400px"}}
        height="670px"
        border="12px solid white"
        margin="50px auto"
        
      >
        <Grid textAlign="center" mt={5}>
          <Typography variant="h5" fontWeight="bold" color="white">{t("half_slogan")}</Typography>
          <Typography variant="h3" fontWeight="bold" sx={{color: 'white','-webkit-text-stroke':' 2px #F24E1E' }}>{t("your_hand")}</Typography>
        </Grid>
        <Grid textAlign="center" pl={10}>
          <img src="./assets/Download/football.png"/>
        </Grid>
        <Grid item textAlign="center" mt={2}>
          <Typography fontWeight={700} fontSize="20px" textTransform="uppercase">
       {langKey && langKey.download_app}
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
      }
    </Grid>
  );
}
