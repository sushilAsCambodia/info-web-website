import React from "react";
import { 
    Grid, 
} from "@mui/material";
import UploadImg from "@/components/profile/uploadImg";
const ProfileDetail = () => {
    return (
        <Grid container justifyContent="center" padding="0px 16px">
            <Grid
                item
                xs={12}
                container
                className="uploadimg_main"
                paddingTop={5}>
                <UploadImg />
            </Grid>
        </Grid>
    );
};
export async function getStaticProps(context) {
    return {
        props: { auth: true }, // will be passed to the page component as props
    }
}
export default ProfileDetail;