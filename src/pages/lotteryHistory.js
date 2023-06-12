import { useCallback, useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button
} from "@mui/material";
import { getLotteryHistory } from "@/store/actions/lotteryActions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import utils from "@/common/utils";
import { useTranslation } from "react-i18next";
import LotteryHistoryCard from "@/components/lottery/LotteryHistoryCard";
const lotteryHistory = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [lotteryHistories, setLotteryHistories] = useState([]);
  const { lotteryHistory = {}, loading_history } = useSelector(state => state.lottery);
  const router = useRouter();
  const {id} = router.query
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const [toBottom, setToBottom] = useState(false);
  const handleGetLotteryHistory = useCallback(() => {
    console.log(id,'lotteryId')
    dispatch(getLotteryHistory(
      {
        params: {
          rowsPerPage: 10,
          page:1,
          lottery_id: id,
          lang_id: utils.convertLangCodeToID(i18n.language)
        }
      }
    ))
  }, [dispatch,i18n.language,id])

  useEffect(() => {
    handleGetLotteryHistory();
  }, []);
  useEffect(() => {
    if (Object.keys(lotteryHistory).length) {
      setLotteryHistories(curr => {
        console.log(curr.concat(lotteryHistory.data))
        return curr.concat(lotteryHistory.data);
      })
    }else {
      setLotteryHistories([])
    }
  }, [lotteryHistory]);

  const handleScroll = (event) => { 
    if ( 
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
        event.currentTarget.clientHeight
    ) { 
      setCurrentPage(currentPage + 1);
      console.log(currentPage+1)
    }
  };
  return (
    <>
      <Grid
        className='sticky-header'
        item
        xs={12}
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginTop: "10px", background:'#fff', top:-1, padding:1 }}
      >
        <Typography>{router?.query?.title}</Typography>
        <Grid >
          <Button
            size="small"
            textTransform="capitalize !important"
            variant="outlined"
            sx={{ border: "1px solid #ddd", color: "#8C8C8C", textTransform: "capitalize !important" }}
            onClick={() => { router.push('/games') }}>
            <Typography
              component="span"
              sx={{
                whiteSpace: "nowrap",
                fontSize: "11px",
                display: "flex",
                alignItems: "center",
                textTransform: "capitalize",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.5 0.25H1C0.801088 0.25 0.610322 0.329018 0.46967 0.46967C0.329018 0.610322 0.25 0.801088 0.25 1V5.5C0.25 5.69891 0.329018 5.88968 0.46967 6.03033C0.610322 6.17098 0.801088 6.25 1 6.25H5.5C5.69891 6.25 5.88968 6.17098 6.03033 6.03033C6.17098 5.88968 6.25 5.69891 6.25 5.5V1C6.25 0.801088 6.17098 0.610322 6.03033 0.46967C5.88968 0.329018 5.69891 0.25 5.5 0.25ZM13 7.75H8.5C8.30109 7.75 8.11032 7.82902 7.96967 7.96967C7.82902 8.11032 7.75 8.30109 7.75 8.5V13C7.75 13.1989 7.82902 13.3897 7.96967 13.5303C8.11032 13.671 8.30109 13.75 8.5 13.75H13C13.1989 13.75 13.3897 13.671 13.5303 13.5303C13.671 13.3897 13.75 13.1989 13.75 13V8.5C13.75 8.30109 13.671 8.11032 13.5303 7.96967C13.3897 7.82902 13.1989 7.75 13 7.75ZM10.75 0.25C9.0955 0.25 7.75 1.5955 7.75 3.25C7.75 4.9045 9.0955 6.25 10.75 6.25C12.4045 6.25 13.75 4.9045 13.75 3.25C13.75 1.5955 12.4045 0.25 10.75 0.25ZM3.25 7.75C1.5955 7.75 0.25 9.0955 0.25 10.75C0.25 12.4045 1.5955 13.75 3.25 13.75C4.9045 13.75 6.25 12.4045 6.25 10.75C6.25 9.0955 4.9045 7.75 3.25 7.75Z" fill="#8C8C8C" />
              </svg>
              &nbsp; Games
            </Typography>
          </Button>


        </Grid>
      </Grid>
      <Grid item xs={12} style={{ padding: 10,overflowX:'auto' }} 
      onScroll={handleScroll}
      sx={{
        maxHeight:'calc(100vh - 137px)'
      }}>
        {
          lotteryHistories.map((r,key) => {
            return (
              <div key={key} style={{marginBottom:10}}> <LotteryHistoryCard  lottery={r}/> </div>
            );
          })
        }
      </Grid>
    </>
  ) 
}
export default lotteryHistory;