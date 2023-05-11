import { Grid, Typography, Link } from "@mui/material";
import ForgotPasswordPage from "@/pages/forgotPassword";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const forgotPassword = (props) => {
    const {t} = useTranslation();
    const {setIsComponent} = props;


    const langKey = useSelector((state) => state && state.load_language && state.load_language.language);


    return <>
        <Grid container display="flex" alignItems="center" height="100%">
            <Grid item md={12}>
                <ForgotPasswordPage showTitle={false} />
            </Grid>
            <Grid px={1} py={1} underline="none" md={12} display="flex" justifyContent="end">
                <Link
                    onClick={() => setIsComponent('login')}
                    underline="none"
                    style={{
                        cursor: "pointer",
                        color: "#000",
                        display: "flex",
                        alignItems: "center",
                    }}>
                    <Typography> {langKey && langKey.no_account} </Typography>
                    <Typography
                        style={{
                            cursor: "pointer",
                            color: "#F26522",
                        }}
                        mx={1}>
                        Login
                    </Typography>
                </Link>
            </Grid>
        </Grid>
    </>
}

export default forgotPassword;