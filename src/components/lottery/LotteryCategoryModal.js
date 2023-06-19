import { useSelector,useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import {
  Grid,
  Typography,
  Modal,
  Backdrop,
  Fade,
  Divider,
  colors,
} from "@mui/material";
import utils from "@/common/utils";
import moment from "moment/moment";
import Image from "mui-image";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { getLotteryResultByCategoryId,getLotteryCategory } from "@/store/actions/lotteryActions";
const style = {
  position: "absolute",
  top: "300px",
  left: "75%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #DDDDDD",
  p: 2,
};

const LotteryCategoryModal = (props) => {
    const router = useRouter()
  const { lotteryResultByID = [],lotteryCategories=[] } = useSelector((state) => state.lottery);
  const [categoryData, setCategoryData] = useState([]);

  const {customer}=useSelector((state)=>state.auth)
  const dispatch = useDispatch();

  const { open, handleClose } = props;
  const { i18n } = useTranslation();

  const lotteryResultByIDFilter = () => {
    const item = categoryData?.data?.filter((obj) => {
      return obj.lottery_bind !== null && obj.lottery.length > 0;
    });
    return item;
  };

  useEffect(() => {
    if(open){
    dispatch(
      getLotteryResultByCategoryId({
        params: {
            // rowsPerPage: rowsPerPage,
            // page: 1,
            lang_id: utils.convertLangCodeToID(i18n.language),
            pick: "",
            category_id: "",
        },
        callback: (res) => {
        //   console.log(':::datamodal',res.data)
          setCategoryData(res?.data)
        },
      })
    );
  }
  }, [i18n.language,open]);
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Grid sx={style}>
          {lotteryResultByIDFilter()?.length > 0 &&
            lotteryResultByIDFilter().map((item, index) => {
              return (
                <>
                  <Divider>
                    <Typography id="transition-modal-title" title={item?.translation?.translation} variant="h6" className="singleLinesEllips" style={{maxWidth:'500px'}}>
                      {item?.translation?.translation}
                    </Typography>
                  </Divider>
                  <Grid container>
                    {item?.lottery?.map((lottery, index) => {
                      return (
                        <>
                          <Grid item xs={4} p={1} position="relative" >
                            {/* <div className="ribbon ribbon-top-right">
                              <span>New</span>
                            </div> */}
                            <Grid
                              sx={{
                                cursor:'pointer',
                                background: "#F3F3F3",
                                border: "1px solid #DDDDDD",
                                padding: "10px",
                                borderRadius: "10px",
                                textAlign: "center",
                                '&:hover':{
                                    background:'#ff9900',
                                    color:'white',
                                    border:'1px solid #ff723e'
                                }
                              }}
                              onClick={()=>{router.push(`/lotteryPastResults?title=${lottery?.translation?.translation}&id=${lottery.id}&categoryId=${lottery.category_id}`)}}

                            >
                              <Typography title={lottery?.translation?.translation} className="singleLinesEllips">
                                {lottery?.translation?.translation}
                              </Typography>
                            </Grid>
                          </Grid>
                        </>
                      );
                    })}

                    {/* <Grid item xs={4} p={1}>
                      <Grid
                        sx={{
                          background: "#F3F3F3",
                          border: "1px solid #DDDDDD",
                          padding: "10px",
                          borderRadius: "10px",
                          textAlign: "center",
                        }}
                      >
                        <Typography>Speed Racing</Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={4} p={1}>
                      <Grid
                        sx={{
                          background: "#F3F3F3",
                          border: "1px solid #DDDDDD",
                          padding: "10px",
                          borderRadius: "10px",
                          textAlign: "center",
                        }}
                      >
                        <Typography>Speed Racing</Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={4} p={1}>
                      <Grid
                        sx={{
                          background: "#F3F3F3",
                          border: "1px solid #DDDDDD",
                          padding: "10px",
                          borderRadius: "10px",
                          textAlign: "center",
                        }}
                      >
                        <Typography>Speed Racing</Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={4} p={1}>
                      <Grid
                        sx={{
                          background: "#F3F3F3",
                          border: "1px solid #DDDDDD",
                          padding: "10px",
                          borderRadius: "10px",
                          textAlign: "center",
                        }}
                      >
                        <Typography>Speed Racing</Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={4} p={1}>
                      <Grid
                        sx={{
                          background: "#F3F3F3",
                          border: "1px solid #DDDDDD",
                          padding: "10px",
                          borderRadius: "10px",
                          textAlign: "center",
                        }}
                      >
                        <Typography>Speed Racing</Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={4} p={1}>
                      <Grid
                        sx={{
                          background: "#F3F3F3",
                          border: "1px solid #DDDDDD",
                          padding: "10px",
                          borderRadius: "10px",
                          textAlign: "center",
                        }}
                      >
                        <Typography>Speed Racing</Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={4} p={1}>
                      <Grid
                        sx={{
                          background: "#F3F3F3",
                          border: "1px solid #DDDDDD",
                          padding: "10px",
                          borderRadius: "10px",
                          textAlign: "center",
                        }}
                      >
                        <Typography>Speed Racing</Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={4} p={1}>
                      <Grid
                        sx={{
                          background: "#F3F3F3",
                          border: "1px solid #DDDDDD",
                          padding: "10px",
                          borderRadius: "10px",
                          textAlign: "center",
                        }}
                      >
                        <Typography>Speed Racing</Typography>
                      </Grid>
                    </Grid> */}
                  </Grid>
                </>
              );
            })}
        </Grid>
      </Fade>
    </Modal>
  );
};
export default LotteryCategoryModal;
