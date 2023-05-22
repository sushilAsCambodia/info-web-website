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
import { Image } from "mui-image";
export default function Index() {
  const matches = useMediaQuery("(max-width:414px)");
  const xs = useMediaQuery("(max-width:375px)");
  const lowHeight = useMediaQuery("(max-height:455px)");
  const {t} = useTranslation()
  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);
  return (
    <>
      { matches ? 
      <Grid
        sx={{
          backgroundImage: 'url("./assets/Download/bg-download-download.png")',
          position: "relative",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center", 
          height: '100%',
          display:'flex',
          alignItems:'center'
        }}
      >
      <Grid container justifyContent="center" >
        <Grid
          borderRadius="30px"
          width="80vw"
          padding={'10px 10px'}
          border="12px solid white">
          <Grid textAlign="center" mt={5}>
            <Typography fontSize="20px" fontWeight="bold" color="white">{langKey && langKey.half_slogan}</Typography>
            <Typography variant="h4" fontWeight="bold" sx={{color: 'white','-webkit-text-stroke':' 2px #F24E1E' }}>{langKey && langKey.your_hand}</Typography>
          </Grid>
          <Grid textAlign="center" pl={5}>
            <Image alt="football" style={{maxHeight:xs?230:300, objectFit:'contain'}} src="./assets/Download/football.png"/>
          </Grid>
          <Grid item textAlign="center" mt={2}>
        
            <Typography fontWeight={700} fontSize="20px" textTransform="uppercase">
            {langKey && langKey.download_app}
            </Typography>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Grid item xs={6}>
              <Typography textAlign="center">
                <Image alt="iosbtn" style={{maxWidth:144}} src="./assets/Home/iosbtn.png" />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography textAlign="center">
                <Image alt="androidbtn" style={{maxWidth:144}} src="./assets/Home/androidbtn.png" />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </Grid> :
      <Grid
        sx={{
          backgroundImage: 'url("./assets/Download/bg-download-download.png")',
          position: "relative",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center", 
          height:'100%'
        }}>
      <Grid container justifyContent="center" height="100%" alignItems="center">
        <Grid
          borderRadius="30px"
          width={{ xs: "80vw", sm: "400px" }}
          height={{ xs: "85%", lg: "80%" }}
          padding="30px 10px 0 10px"
          position="relative"
          overflow="hidden"
          border="12px solid white">
          <Grid textAlign="center">
            <Typography variant="h5" fontWeight="bold" color="white" textTransform="uppercase">
              {/* {langKey && langKey.half_slogan} */}
              Wonderful information in the palm of
            </Typography>
            <Typography variant="h3" fontWeight="bold" sx={{color: 'white','-webkit-text-stroke':' 2px #F24E1E',fontSize:48 }}>
              {langKey && langKey.your_hand}
            </Typography>
          </Grid> 
          <Grid  textAlign="center" pl={10} style={{width:300,height:'55%',position: 'absolute',bottom: 110,display:lowHeight?'none':''}}>
            <Image alt="football" style={{width:'100%',height:'100%',objectFit:'contain'}} src="./assets/Download/football.png"/>
          </Grid> 
          <Grid item xs={12} style={{position: 'absolute',bottom:10,width:'100%'}}>
            <Grid item sx={12} textAlign="center">
              <Typography fontWeight={700} fontSize="20px" textTransform="uppercase">
                {langKey && langKey.download_app}
              </Typography>
            </Grid>
            <Grid item width="100%" style={{display:'inline-flex',justifyContent:'center'}}>
              <Typography component="div" textAlign="center" style={{margin:5}}>
                <Image alt="iosbtn" style={{maxWidth:144}} src="./assets/Home/iosbtn.png" />
              </Typography>
              <Typography component="div" textAlign="center" style={{margin:5}}>
                <Image alt="androidbtn" style={{maxWidth:144}} src="./assets/Home/androidbtn.png" />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </Grid>
      }
  </>
  )
}
