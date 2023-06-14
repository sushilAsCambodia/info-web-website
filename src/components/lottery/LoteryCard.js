import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import utils from "@/common/utils";
import moment from "moment/moment";
import { useRouter } from "next/router";
import Image from "mui-image";
import { addRemoveFavourite } from "@/store/actions/favouriteActions";
import { Icon } from "@iconify/react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBackDrop from "../LoadingBackDrop";


const toastOption = {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  }


const LotteryCard = (props) => {
  const router = useRouter();
  const {lottery,allFavourite}=props
  const { customer = {} } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isFavourite, setIsFavourite] = useState(lottery.is_favorite);
  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);
  const [loading, setLoading] = useState(false);

  const checkActive = (active_features, value) => {
    if (active_features && active_features !== "") {
      const arr = active_features.split(",");
      if (arr && arr.length > 0) {
        if (arr.includes(value)) return true;
      }
    }
    return false;
  };
  const goToLotteryHistory = (lottery = {}) => {
    const title =
      lottery?.translation?.translation + lottery?.latest_result?.issue;
    router.push({
      pathname: "/lotteryHistory",
      query: { title: title, id: lottery.id, },
    });
  };
  const handleAddRemove = () => {
    setLoading(true)
    customer?.member_ID
      ? dispatch(
          addRemoveFavourite({
            body: {
              lottery_id: lottery?.lottery_id,
              member_ID: customer?.member_ID,
            },
            callback: (res) => {
                setIsFavourite(!isFavourite)
                toast.success(langKey[res?.message], toastOption);
                setLoading(false)
                allFavourite()
              //   const { message = "" } = res;
              //   if (res.status_code === 201) {
              //     setOpenDialog(true);
              //     setResponseMessage(t(message));
              //     setTimeout(() => {
              //       setOpenDialog(false);
              //       Router.push("/profile");
              //       setContent("");
              //       setContact("");
              //       setDisabled(true);
              //     }, 1000);
              //   } else if (res.status_code === 401) {
              //     Cookies.remove("token");
              //     setOpenDialog(true);
              //     setResponseMessage(t(message));
              //   }
            },
          })
        )
      : router.push("/login");
  };
  
  return (<>     
   <ToastContainer />
  <LoadingBackDrop loading={loading} />
    <Card>
      <CardHeader
        style={{ padding: "0 5px 0 5px", borderBottom: "1px solid #ddd" }}
        title={
          <Grid container style={{ flexWrap: "nowrap", alignItems: "center" }}>
            <Grid item xs={10} style={{ fontSize: 12, color: "#8C8C8C" }}>
              {lottery?.latest_result?.opendate &&
                moment(lottery?.latest_result?.opendate).format(
                  utils.lotteryFormat
                )}
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
             
            >
              {isFavourite ? (
                <Icon icon="ant-design:star-filled" color="#F2DA00"  onClick={() => {
                    (handleAddRemove());
                  }}/>
              ) : (
                <Icon icon="ant-design:star-filled" color="#ddd"  onClick={() => {
                    (handleAddRemove());
                  }}/>
              )}
            </Grid>
          </Grid>
        }
      />
      <CardContent style={{ padding: 5 }}>
        <Typography component="span" style={{ fontSize: 12, color: "#444444" }}>
          {lottery?.translation?.translation} {lottery?.latest_result?.issue}
        </Typography>
        <Grid
          container
          style={{
            position: "relative",
            alignItems: "center",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Typography
            component="span"
            style={{ background: "#FFE0D2", width: "37px", height: "24px" }}
          ></Typography>
          <Grid
            container
            style={{ position: "absolute", alignItems: "center", left: 20 }}
          >
            <Grid
              className="mui-image-round"
              item
              style={{
                margin: 2,
                textAlign: "center",
                fontSize: 12,
                color: "#fff",
                padding: 1,
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: "0.5px solid #DDDDDD",
                background: "#fff",
              }}
            >
              <Image
                alt="photo_upload"
                htmlFor="photo-upload"
                width={30}
                height={30}
                src={
                  lottery?.icon
                    ? lottery.icon
                    : "/assets/Lottery/superlotto-logo1.png"
                }
                sx={{ borderRadius: "50px" }}
              />
            </Grid>
            {lottery &&
              lottery.latest_result &&
              lottery.latest_result.result_data &&
              lottery.latest_result.result_data.map((r, key) => {
                return (
                  <Grid
                    key={key}
                    item
                    style={{
                      margin: 2,
                      textAlign: "center",
                      fontSize: 12,
                      color: "#fff",
                      padding: 1,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: r.color,
                    }}
                  >
                    {r.num}
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions style={{ padding: 5, background: "#F8F8F8" }}>
        <Grid container style={{ flexWrap: "nowrap", alignItems: "center" }}>
          <Grid
            item
            xs={4}
            style={{ fontSize: "10px", color: "#8C8C8C", textAlign: "left" }}
          >
            {checkActive(lottery?.active_features, "Chart") && (
              <span>{langKey.chart}</span>
            )}
          </Grid>
          <Grid
            item
            xs={4}
            style={{ fontSize: "10px", color: "#8C8C8C", textAlign: "center" }}
          >
            {checkActive(lottery?.active_features, "PastResult") && (
              <span onClick={() => goToLotteryHistory(lottery)}>{langKey.history}</span>
            )}
          </Grid>
          {moment(lottery?.latest_result?.opendate).format(utils.formatDate) ==
            moment().format(utils.formatDate) && (
            <Grid
              item
              xs={4}
              style={{ fontSize: "10px", color: "#8C8C8C", textAlign: "right" }}
            >
              {langKey.today_result}
            </Grid>
          )}
        </Grid>
      </CardActions>
    </Card></>
  );
};
export default LotteryCard;
