import { Grid, Typography, Link } from "@mui/material";
import ForgotPasswordPage from "@/pages/forgotPassword";
import { useSelector } from "react-redux";
const ForgotPassword = (props) => {
    const {setIsComponent,t} = props;
    const langKey = useSelector((state) => state && state.load_language && state.load_language.language);
    return <>
        <Grid container display="flex" alignItems="center">
            <Grid item md={12} height="370px">
                <ForgotPasswordPage showTitle={false} />
            </Grid>
            <Grid px={1} py={1} underline="none" item md={12} display="flex" justifyContent="center">
                <Link
                    onClick={() => setIsComponent('login')}
                    underline="none"
                    style={{
                        cursor: "pointer",
                        color: "#000",
                        display: "flex",
                        alignItems: "center",
                    }}>
                    <Typography> {langKey && (langKey.no_account || t('no_account'))} </Typography>
                    <Typography
                        style={{
                            cursor: "pointer",
                            color: "#F26522",
                        }}
                        mx={1}>
                         {langKey && (langKey.login || t('login'))} 
                    </Typography>
                </Link>
            </Grid>
        </Grid>
    </>
}

export default ForgotPassword;