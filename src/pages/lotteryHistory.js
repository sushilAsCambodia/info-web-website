import { useCallback, useEffect, useState } from "react";
import { Grid, Typography, Button, Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { getLotteryHistory } from "@/store/actions/lotteryActions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import utils from "@/common/utils";
import { useTranslation } from "react-i18next";
import LotteryHistoryCard from "@/components/lottery/LotteryHistoryCard";
import DataLoading from "@/components/DataLoading";
import LoadingBackDrop from "@/components/LoadingBackDrop";

const lotteryHistory = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [lotteryHistories, setLotteryHistories] = useState([]);
  const { lotteryHistory = {}, loading_history } = useSelector(
    (state) => state.lottery
  );
  const router = useRouter();
  const { id } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(2);
  const [historyTitle, setHistoryTitle] = useState('');



  const handleGetLotteryHistory = (page = 1) => {
        dispatch(
          getLotteryHistory({
            params: {
              rowsPerPage: 10,
              page: page,
              lottery_id: id,
              lang_id: utils.convertLangCodeToID(i18n.language),
            },
            callback: (res) => {

              page == 1
                ? (setLotteryHistories(res.data.paginate.data),
                  setPageLimit(res.data.paginate.last_page),
                  handleClose())
                : setLotteryHistories((data) => data.concat(res.data.paginate.data));
              handleClose();
              
              setHistoryTitle(res.data.lottery.translation.translation)
            },
          })
        )
     
  };

  // useEffect(() => {
  //   handleGetLotteryHistory(1);
  // }, []);

  useEffect(() => {
    if(currentPage < pageLimit && id !== undefined){
      handleOpen()
      handleGetLotteryHistory(currentPage);
    }
  }, [currentPage,router.query,i18n.language]);

  const handleScroll = (event) => {
    if (
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
      event.currentTarget.clientHeight
    ) {
      setCurrentPage(currentPage + 1);
    }
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
     <LoadingBackDrop loading={open}/>
      <Grid
        className="sticky-header"
        item
        xs={12}
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginTop: "10px", background: "#fff", top: -1, padding: 1 }}
      >
        <Typography>{historyTitle ? historyTitle:  router?.query?.title}</Typography>
      </Grid>

      <Grid
        item
        xs={12}
        style={{ padding: 10, overflowX: "auto" }}
        onScroll={handleScroll}
        sx={{
          maxHeight: "calc(100vh - 137px)",
        }}
      >
        {lotteryHistories.map((r, key) => {
          return (
            <div key={key} style={{ marginBottom: 10 }}>
              <LotteryHistoryCard lottery={r} icon={router?.query?.icon} />
            </div>
          );
        })}
      </Grid>
    </>
  );
};
export default lotteryHistory;
