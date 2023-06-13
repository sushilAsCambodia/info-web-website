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