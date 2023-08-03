import {
  Typography,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  styled,
  TableCell,
  TableRow,
  tableCellClasses,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Box,
  Stack,
  Divider,
  Collapse,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import utils from "@/common/utils";
import moment from "moment/moment";
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import { Icon } from "@iconify/react";
import { lottoTable } from "@/pages/LotteryPage";
import ActionModal from "./ActionModal";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { Image } from "mui-image";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    "& .MuiTableCell-root": {
      border: "1px solid #DDDDDD",
    },
  },
});

export default function FootBallLiveScore({
  footballFavoritList,
  lang_id,
  loadings,
  footballScheduleList,
  last_page,
  currentpage,
  pageChange,
  footballLiveScoreList,
}) {
  const [select, setSelect] = useState(0);
  const [filter, setFilter] = useState("China National");
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const [age, setAge] = useState("");
  const handlePageChange = (event, value) => {
    pageChange(value);
  };

  const langKey = useSelector(
    (state) => state && state.load_language && state.load_language.language
  );

  const handleCloseModal = (event) => {
    setOpenModal(false);
  };

  const style = {
    position: "absolute",
    top: "300px",
    left: "70%",
    transform: "translate(-50%, -50%)",
    width: 750,
    bgcolor: "background.paper",
    border: "1px solid #DDDDDD",
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.grey,
    },
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    cursor: "pointer",
    // hide last border
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#DDDDDD",
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: "10px",
    },
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  }));

  const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
    background: "#FF6F31",
    borderRight: "1px solid #DDDDDD ",
    borderTop: "1px solid #DDDDDD ",
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.grey,
    },
    color: "white",
    // hide last border
    "&:first-of-type": {
      borderLeft: "1px solid #DDDDDD",
    },
  }));
  const classes = useStyles();
  function createData(img, name, calories, fat, data, id, favourite, awayTeam) {
    return { img, name, calories, fat, data, id, favourite, awayTeam };
  }
  const rows = [
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_7_2.png",
      "Frozen yoghurt",
      159,
      "03-12 16:00",
      1,
      "[18] Gunma Hot Spring",
      true,
      "Yamagata Mountain God"
    ),

    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
      "Cupcake",
      305,
      "03-12 16:00",
      4,
      "[18] Gunma Hot Spring",
      true,
      "Yamagata Mountain God"
    ),
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
      "Gingerbread",
      356,
      "03-12 16:00",
      5,
      "[18] Gunma Hot Spring",
      true,
      "Yamagata Mountain God"
    ),
  ];
  var regex = /\d+/g;

  return (
    <>
      {/* chart modal  */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Grid sx={style}>
            <ActionModal />
          </Grid>
        </Fade>
      </Modal>
      <Grid container px={{ xs: 2, md: 0 }}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 700 }}
              className={classes.table}
              id="tablehover"
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledHeaderCell width="200px">
                    {langKey && langKey.competition}
                  </StyledHeaderCell>

                  <StyledHeaderCell width="50px" align="center">
                    {langKey && langKey.rounds}
                  </StyledHeaderCell>
                  <StyledHeaderCell width="50px" align="center">
                    {langKey && langKey.time}
                  </StyledHeaderCell>
                  <StyledHeaderCell width="100px" align="center">
                    {langKey && langKey.status}
                  </StyledHeaderCell>
                  <StyledHeaderCell width="170px" align="center">
                    {langKey && langKey.home_team}
                  </StyledHeaderCell>
                  <StyledHeaderCell width="100px" align="center">
                    {langKey && langKey.score}
                  </StyledHeaderCell>
                  <StyledHeaderCell width="170px" align="center">
                    {langKey && langKey.visiting_team}
                  </StyledHeaderCell>
                  <StyledHeaderCell width="30px" align="center">
                    {langKey && langKey.half_time}
                  </StyledHeaderCell>
                </TableRow>
              </TableHead>
              {loadings && (
                <div>
                  <Backdrop
                    sx={{
                      color: "#ccc",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={loadings}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </div>
              )}
              <TableBody>
                {footballLiveScoreList && footballLiveScoreList.length > 0 ? (
                  footballLiveScoreList.map((item, index) => {
                    let stage =
                      item && item.match_schedule && item.match_schedule.stage;
                    let font_color;
                    let background_color;
                    if (
                      item &&
                      item?.match_schedule?.competition &&
                      item?.match_schedule?.competition?.background_colour ===
                        null
                    ) {
                      background_color = "#e60039";
                    } else {
                      background_color =
                        item?.match_schedule?.competition?.background_colour;
                    }
                    if (
                      item &&
                      item?.match_schedule?.competition &&
                      item?.match_schedule?.competition?.font_colour === null
                    ) {
                      font_color = "#ffffff";
                    } else {
                      font_color = item?.competition?.font_colour;
                    }
                    let image_URL =
                      item &&
                      item?.match_schedule?.competition &&
                      item?.match_schedule?.competition.image;
                    return (
                      <StyledTableRow
                        key={item.id}
                        className="rowHeight"
                        onClick={() => {
                          router.push(
                            `/MatchDetails/${
                              item.matchId ? item.matchId : item.id
                            }?status=${item.elapsed}`
                          );
                        }}
                      >
                        <StyledTableCell
                          align="left"
                          style={{
                            height: "45px!important",
                            color: font_color,
                            background: background_color,
                          }}
                        >
                          <Grid
                            style={{
                              display: "flex",
                              alignItems: "center",
                              background: background_color,
                            }}
                          >
                            <Image
                              width={25}
                              src={image_URL}
                              alt="football_endtab"
                            />
                            <Typography mx={1} fontSize={"13px"}>
                              {lang_id == 1
                                ? item?.match_schedule?.competition?.nameEn
                                : lang_id == 2
                                ? item?.match_schedule?.competition?.name
                                : item?.match_schedule?.competition?.nameEn}
                            </Typography>
                          </Grid>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {lang_id == 1
                            ? stage && stage.match(regex)
                            : lang_id == 3
                            ? stage && stage.match(regex)
                            : stage}
                          {/* {stage && stage.match(regex)} */}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {moment(item?.match_schedule?.startTime).format(
                            "HH:mm"
                          )}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.elapsed}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.home_team && lang_id == 1
                            ? item.home_team && item.home_team.nameEn
                            : item.home_team && lang_id == 2
                            ? item.home_team && item.home_team.nameFull
                            : item.home_team && lang_id == 3
                            ? item.home_team && item.home_team.nameEnFull
                            : ""}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {/* {item.fat} <IconButton onClick={() => setOpenModal(true)}>
                            <Icon icon="ic:baseline-live-tv" color="#03C12D" />
                          </IconButton> */}
                          {item && item.score}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.away_team && lang_id == 1
                            ? item.away_team && item.away_team.nameEn
                            : item.away_team && lang_id == 2
                            ? item.away_team && item.away_team.nameFull
                            : item.away_team && lang_id == 3
                            ? item.away_team && item.away_team.nameEnFull
                            : ""}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item && item.halfTimeScore}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                ) : !loadings ? (
                  <>
                    <TableRow>
                      <TableCell component="th" scope="row" colSpan={7}>
                        <Grid textAlign={"center"} item xs={12} paddingTop={5}>
                          <img
                            alt="not_found_2"
                            style={{ height: "50vh" }}
                            src="./assets/Home/not-found.gif"
                          />
                          <Typography textAlign="center">
                            {langKey && langKey.no_data_found}
                          </Typography>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </>
                ) : (
                  ""
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
