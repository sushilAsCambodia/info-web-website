import {
  Typography,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  OutlinedInput,
  Checkbox,
  ListItemText,
  ListSubheader,
  TableCell,
  TableRow,
  InputAdornment,
  Icon,
  Button,
} from "@mui/material";
import api from "@/services/http";
import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import Menu from "@mui/material/Menu";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Schedule from "@/components/football/schedule";
import TitleBreadCrumbs from "@/common/TitleBreadCrumbs";
import FootBallFollow from "@/components/football/FootBallFollow";
import FootBallLiveScore from "@/components/football/FootBallLiveScore";
import FootBallEnd from "@/components/football/FootBallEnd";
import DataLoading from "@/components/DataLoading";
import utils from "@/common/utils";
import { styled, alpha } from "@mui/material/styles";

import {
  getScheduleList,
  getMatchEndList,
  getCompetitionList,
  addRemoveFavourite,
  getMatchListFavorite,
  getMatchLiveScoreList,
} from "@/store/actions/footballActions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "80%", // Set the width to 100% to occupy the full width of the parent container
    minWidth: 100, // Set a minimum width (adjust the value according to your needs)
  },
  ulClass: {
    width: "100%", // Set the width to 100% to occupy the full width of the parent container
    minWidth: "249px !important", // Set a minimum width (adjust the value according to your needs)
    // Add any custom styles for the ul-class
  },
  liClass: {
    width: "100%", // Set the width to 100% to occupy the full width of the parent container
    minWidth: 649, // Set a minimum width (adjust the value according to your needs)
    // Add any custom styles for the ul-class
  },
  gridClass: {
    // Add any custom styles for the grid-class
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "4px",
    paddingBottom: "30px",
  },
  stickyButtons: {
    // Add any custom styles for the sticky buttons
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "4px",
    padding: "6px 10px",
    position: "sticky",
    left: 0,
    right: 0,
    bottom: 0,
    background: "#fff",
  },
  button: {
    // Add any custom styles for the buttons
    textTransform: "lowercase",
    fontSize: "12px",
    color: "#fff",
  },
}));

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 280,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const filterList = { America: ["Stanley cup", "FIFA"], UK: ["Euro cup"] };
const America = ["Stanley cup", "FIFA"];
const UK = ["Euro Cup"];

const data = [
  {
    id: 1,
    name: "America",
    plans: [
      { id: 1, name: "Stanley cup", type: "ltd" },
      { id: 2, name: "FIFA", type: "subscription" },
    ],
  },
  {
    id: 2,
    name: "UK",
    plans: [{ id: 3, name: "Euro cup", type: "ltd" }],
  },
];




export default function FootBallPage() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const [select, setSelect] = useState(0);
  const [competition, setCompetition] = useState("");
  const [selectedName, setSelectedName] = useState([]);
  const [competitionIdd, setCompetitionIdd] = useState([]);
  const [page, setPage] = useState(1);
  const [footballList, setFootballList] = useState([]);
  const [footballEndList, setFootballEndList] = useState([]);
  const [footballScheduleListData, setFootballScheduleListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [competitionList, setCompetitionList] = useState([]);
  const [footballFavoritList, setFootballFavoritList] = useState([]);
  const [compfilter, setCompfilter] = useState(true);
  const [matchId, setMatchId] = useState("");
  const [dateoption, setDateoption] = useState("Ten");
  const { customer = {} } = useSelector((state) => state.auth);
  const [datefilter, setDatefilter] = useState(moment().format("YYYY-MM-DD"));
  const [datefilterEnd, setDatefilterEnd] = useState(
    moment().format("YYYY-MM-DD")
  );
  const language_id = utils.convertLangCodeToID(i18n.language);
  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;

  //   setSelectedName(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };
  const [confirm, setConfirm] = useState(false);
  const classes = useStyles();

  const handleCheckbox = (e, name) => {
    if (e.target.checked === true) {
      setSelectedName((current) => [...current, name]);
    } else {
      //var index = setSelectedName.indexOf(name);
      setSelectedName((current) => current.filter((nm) => nm !== name));
      //setSelectedName(index);
    }
    //setSelectedName(current => [...current, name])
  };

  const selectAll = () => {
    setLoading(true);
    /*** Competition Id */
    let competId = [];
    competitions &&
      competitions.length > 0 &&
      competitions.map((ids, index) => {
        ids &&
          ids.competitions &&
          ids.competitions.length > 0 &&
          ids.competitions.map((item, i) => {
            if (
              selectedName.includes(item.nameEn) ||
              selectedName.includes(item.name)
            ) {
              competId.push(item.id);
            }
          });
      });
    if (select === "Schedule") {
      dispatch(
        getScheduleList({
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language),
            season: moment().format("YYYY"),
            status: 0,
            member_ID: customer?.member_ID,
            date_option: dateoption,
            page: 1,
            date: datefilter,
            competition_ids: competId,
            page: currentPage,
            descending: false,
            sortBy: "startTime",
          },
          callback: (res) => {
            setFootballList(res && res.data);
            setCompetition(res && res.competition);
            const arrayName = [];
            const competeName =
              res &&
              res.competition.length > 0 &&
              res &&
              res.competition.map((ids, index) => {
                ids &&
                  ids.competitions &&
                  ids.competitions.length > 0 &&
                  ids.competitions.map((item, i) => {
                    //  if(selectedName.includes(item.nameEn) || selectedName.includes(item.name)){
                    //   competId.push(item.id)
                    //  }
                    ids.isCheck = true;
                    arrayName.push(item.nameEn);
                  });
              });
            setSelectedName(arrayName);
           

            setLoading(false);
          },
        })
      );
    } else if (select == "End") {
      dispatch(
        getMatchEndList({
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language),
            season: moment().format("YYYY"),
            status: 2,
            member_ID: customer?.member_ID,
            page: 1,
            date: datefilterEnd,
            competition_ids: competId,
            page: currentPage,
            descending: false,
            sortBy: "startTime",
          },
          callback: (res) => {
            setFootballEndList(res && res.data);
            const arrayName = [];
            const competeName =
              res &&
              res.competition.length > 0 &&
              res &&
              res.competition.map((ids, index) => {
                ids &&
                  ids.competitions &&
                  ids.competitions.length > 0 &&
                  ids.competitions.map((item, i) => {
                    //  if(selectedName.includes(item.nameEn) || selectedName.includes(item.name)){
                    //   competId.push(item.id)
                    //  }
                    ids.isCheck = true;
                    arrayName.push(item.nameEn);
                  });
              });
            setSelectedName(arrayName);
            setCompetition(res && res.competition);
            setLoading(false);
          },
        })
      );
    } else if (select == "Score") {
      dispatch(
        getMatchLiveScoreList({
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language),
            member_ID: customer?.member_ID,
            // competition_ids: competId,
            sortBy: "startTime",
          },
          callback: (res) => {
            setFootballLiveScoreList(res && res.data);
            const arrayName = [];

            const competeName =
              res &&
              res.data &&
              res.data.competition.length > 0 &&
              res.data.competition.map((ids, index) => {
                ids &&
                  ids.competitions &&
                  ids.competitions.length > 0 &&
                  ids.competitions.map((item, i) => {
                    //  if(selectedName.includes(item.nameEn) || selectedName.includes(item.name)){
                    //   competId.push(item.id)
                    //  }
                    ids.isCheck = true;
                    arrayName.push(item.nameEn);
                  });
              });
            setSelectedName(arrayName);
            setCompetition(res && res.data && res.data.competition);
            setLoading(false);
          },
        })
      );
    } else if (select === "Follow") {
      dispatch(
        getMatchListFavorite({
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language),
            member_ID: customer?.member_ID,
            page: 1,
            is_favorite: true,
            competition_ids: competId,
            page: currentPage,
            descending: false,
            sortBy: "startTime",
          },
          callback: (res) => {
            setLoading(false);
            setFootballFavoritList(res && res.data);
            const arrayName = [];

            const competeName =
              res &&
              res.competition.length > 0 &&
              res &&
              res.competition.map((ids, index) => {
                ids &&
                  ids.competitions &&
                  ids.competitions.length > 0 &&
                  ids.competitions.map((item, i) => {
                    //  if(selectedName.includes(item.nameEn) || selectedName.includes(item.name)){
                    //   competId.push(item.id)
                    //  }
                    ids.isCheck = true;
                    arrayName.push(item.nameEn);
                  });
              });
            setSelectedName(arrayName);
            setCompetition(res && res.competition);            
          
          },
        })
      );
    }
  };
 
  /******* Clear competition filter*/
  const clearCheckBox = () => {
    const competId = ["No data"];
    setLoading(true);
    if (select === "Schedule") {
      dispatch(
        getScheduleList({
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language),
            season: moment().format("YYYY"),
            status: 0,
            member_ID: customer?.member_ID,
            page: 1,
            date: datefilter,
            competition_ids: competId,
            page: currentPage,
            descending: false,
            sortBy: "startTime",
          },
          callback: (res) => {
            setFootballList(res && res.data);
            const arrayName = [];
            setSelectedName(arrayName);
            setCompetition(res && res.competition);
            setLoading(false);
          },
        })
      );
    } else if (select == "End") {
      dispatch(
        getMatchEndList({
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language),
            season: moment().format("YYYY"),
            status: 2,
            member_ID: customer?.member_ID,
            page: 1,
            date: datefilterEnd,
            competition_ids: competId,
            page: currentPage,
            descending: false,
            sortBy: "startTime",
          },
          callback: (res) => {
            setFootballEndList(res && res.data);
            const arrayName = [];
            setSelectedName(arrayName);
            setCompetition(res && res.competition);
            setLoading(false);
          },
        })
      );
    } else if (select == "Score") {
      dispatch(
        getMatchLiveScoreList({
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language),
            member_ID: customer?.member_ID,
            competition_ids: competId,
            sortBy: "startTime",
          },
          callback: (res) => {
            setFootballLiveScoreList(res && res.data);
            const arrayName = [];
            setSelectedName(arrayName);
            setCompetition(res && res.data && res.data.competition);
            setLoading(false);
          },
        })
      );
    }else if (select === "Follow") {
      dispatch(
        getMatchListFavorite({
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language),
            member_ID: customer?.member_ID,
            page: 1,
            is_favorite: true,
            competition_ids: competId,
            page: currentPage,
            descending: false,
            sortBy: "startTime",
          },
          callback: (res) => {
            setFootballFavoritList(res && res.data);
            setCompetition(res && res.competition);
            const arrayName = [];
            setSelectedName(arrayName);                        
            setLoading(false);
          },
        })
      );
    }
  };

  /******* Filter by competition */
  function filterByCompetition() {
    setConfirm(true)
    setCompfilter(false);  
    setLoading(true);
    /*** Competition Id */
    let competId = [100000];
    competition &&
      competition.length > 0 &&
      competition.map((ids, index) => {
        ids &&
          ids.competitions &&
          ids.competitions.length > 0 &&
          ids.competitions.map((item, i) => {
            if (
              selectedName.includes(item.nameEn) ||
              selectedName.includes(item.name)
            ) {
              competId.push(item.id);
            } else {
              competId.push(1000000);
            }
          });
      });
    // if(competId && competId.length===0){
    //   competId.push('No data')
    // } else {
    //   competId=competId
    // }

    if (select === "Schedule") {
      dispatch(
        getScheduleList({
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language),
            season: moment().format("YYYY"),
            status: 0,
            member_ID: customer?.member_ID,
            page: 1,
            date: datefilter,
            competition_ids: competId.length > 0 ? competId : "No Data",
            page: currentPage,
            descending: false,
            sortBy: "startTime",
          },
          callback: (res) => {
            setFootballList(res && res.data);
            setCompetition(res && res.competition);
            setLoading(false);
          },
        })
      );
    } else if (select == "End") {
      dispatch(
        getMatchEndList({
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language),
            season: moment().format("YYYY"),
            status: 2,
            member_ID: customer?.member_ID,
            page: 1,
            date: datefilterEnd,
            competition_ids: competId,
            page: currentPage,
            descending: false,
            sortBy: "startTime",
          },
          callback: (res) => {
            setFootballEndList(res && res.data);
            setCompetition(res && res.competition);
            setLoading(false);
          },
        })
      );
    } else if (select == "Score") {
      dispatch(
        getMatchLiveScoreList({
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language),
            member_ID: customer?.member_ID,
            competition_ids: competId,
            sortBy: "startTime",
          },
          callback: (res) => {
            setFootballLiveScoreList(res && res.data);
            setCompetition(res && res.data && res.data.competition);
            setLoading(false);
          },
        })
      );
    } else if (select === "Follow") {
      dispatch(
        getMatchListFavorite({
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language),
            member_ID: customer?.member_ID,
            page: 1,
            is_favorite: true,
            competition_ids: competId,
            page: currentPage,
            descending: false,
            sortBy: "startTime",
          },
          callback: (res) => {
            setFootballFavoritList(res && res.data);
            setCompetition(res && res.competition);            
            setLoading(false);
          },
        })
      );
    }
    
  }
  const [value, setValue] = useState("");
  const [footballLiveScoreList, setFootballLiveScoreList] = useState([]);

  const [currentPage, setCurrentPage] = useState(page);
  const langKey = useSelector(
    (state) => state && state.load_language && state.load_language.language
  );

  const {
    footballScheduleList,
    current_page,
    per_page,
    last_page,
    competitions,
  } = useSelector((state) => state?.football);
  const { scheduleResultList = [] } = useSelector((state) => state?.lottery);

  const manageCompetition = () => {
    let competId = [];
    competitions &&
      competitions.length > 0 &&
      competitions.map((ids, index) => {
        ids &&
          ids.competitions &&
          ids.competitions.length > 0 &&
          ids.competitions.map((item, i) => {
            if (
              selectedName.includes(item.nameEn) ||
              selectedName.includes(item.name)
            ) {
              competId.push(item.id);
            }
          });
      });
    return competId;
  };

  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash) {
      setSelect(hash);
      setValue(hash);
    } else {
      setSelect("Follow");
      setValue("Follow");
    }
  }, [router.asPath]);

  /*******Add and remove favorite follow*/
  const handleAddRemoveFollow = (id) => {
  
    setLoading(true);
    customer?.member_ID
      ? dispatch(
          addRemoveFavourite({
            body: {
              id: id,
              member_ID: customer?.member_ID,
              type: "match_schedule",
            },
            callback: async (res) => {                    
              setLoading(false);
              if(res && res.status_code===201){
              const params= {
                      lang_id: utils.convertLangCodeToID(i18n.language),
                      member_ID: customer?.member_ID,
                      page: 1,
                      is_favorite: true,                     
                      page: currentPage,
                      descending: false,
                      sortBy: "startTime",
                    }
              try {
                const response = await api.get('lotto/data44-aistat/match-schedules', params);               
             const responseDetails=   response && response.data && response.data.data && response.data.data.data && response.data.data.data.data
                setFootballFavoritList(responseDetails);
                setCompetition(response && response.data && response.data.data && response.data.data.competition);              
                 setLoading(false);
                 const arrayName = [];
                    const competeName =
                    response && response.data && response.data.data && response.data.data.competition.length > 0 &&
                    response && response.data && response.data.data && response.data.data.competition.competition.map((ids, index) => {
                        ids &&
                          ids.competitions &&
                          ids.competitions.length > 0 &&
                          ids.competitions.map((item, i) => {
                            //  if(selectedName.includes(item.nameEn) || selectedName.includes(item.name)){
                            //   competId.push(item.id)
                            //  }
                            let name =
                              language_id == 1 || language_id == 3
                                ? item.nameEnFull
                                : item.nameFull;
                            ids.isCheck = true;
                            arrayName.push(name);
                          });
                      });
        
                    setSelectedName(arrayName);
                // setLoading2(false);
              }catch (error) {
               return console.log("error")
              }
            }
              
              
            },
          })
        )
      : router.push("/login");
  };
  /*******Add and remove favorite*/
  const handleAddRemove = (id) => {
    setLoading(true);
    customer?.member_ID
      ? dispatch(
          addRemoveFavourite({
            body: {
              id: id,
              member_ID: customer?.member_ID,
              type: "match_schedule",
            },
            callback: (res) => {
              dispatch(
                getScheduleList({
                  params: {
                    lang_id: utils.convertLangCodeToID(i18n.language),
                    season: moment().format("YYYY"),
                    status: 0,
                    member_ID: customer?.member_ID,
                    page: 1,
                    date: datefilter,
                    page: currentPage,
                    descending: false,
                    sortBy: "startTime",
                  },
                  callback: (res) => {
                    setFootballList(res && res.data);
                    setCompetition(res && res.competition);
                    setLoading(false);
                  },
                })
              );

              dispatch(
                getMatchListFavorite({
                  params: {
                    lang_id: utils.convertLangCodeToID(i18n.language),
                    member_ID: customer?.member_ID,
                    page: 1,
                    is_favorite: true,
                    competition_ids: competId,
                    page: currentPage,
                    descending: false,
                    sortBy: "startTime",
                  },
                  callback: (res) => {
                    setFootballFavoritList(res && res.data);
                    setCompetition(res && res.competition);
                    const arrayName = [];
                    const competeName =
                      res &&
                      res.competition.length > 0 &&
                      res &&
                      res.competition.map((ids, index) => {
                        ids &&
                          ids.competitions &&
                          ids.competitions.length > 0 &&
                          ids.competitions.map((item, i) => {
                            //  if(selectedName.includes(item.nameEn) || selectedName.includes(item.name)){
                            //   competId.push(item.id)
                            //  }
                            let name =
                              language_id == 1 || language_id == 3
                                ? item.nameEnFull
                                : item.nameFull;
                            ids.isCheck = true;
                            arrayName.push(name);
                          });
                      });
        
                    setSelectedName(arrayName);
                    setLoading(false);
                  },
                })
              );
            },
          })
        )
      : router.push("/login");
  };
  /*******Live Score function*/
  function liveScore() {    
    let competId = [];
    competition &&
      competition.length > 0 &&
      competition.map((ids, index) => {
        ids &&
          ids.competitions &&
          ids.competitions.length > 0 &&
          ids.competitions.map((item, i) => {
            if (
              selectedName.includes(item.nameEn) ||
              selectedName.includes(item.name)
            ) {
              competId.push(item.id);
            }
          });
      });
 
    
    dispatch(
      getMatchLiveScoreList({
        params: {
          lang_id: utils.convertLangCodeToID(i18n.language),
          member_ID: customer?.member_ID,
          // competition_ids: competId,
          sortBy: "startTime",
        },
        callback: (res) => {
          setFootballLiveScoreList(res && res.data);         
          setCompetition(res && res.data && res.data.competition);

          const arrayName = [];
          const competeName =
            res &&
            res.data &&
            res.data.competition.length > 0 &&
            res.data.competition.map((ids, index) => {
              ids &&
                ids.competitions &&
                ids.competitions.length > 0 &&
                ids.competitions.map((item, i) => {
                  //  if(selectedName.includes(item.nameEn) || selectedName.includes(item.name)){
                  //   competId.push(item.id)
                  //  }
                  let name =
                    language_id == 1 || language_id == 3
                      ? item.nameEnFull
                      : item.nameFull;
                  ids.isCheck = true;
                  arrayName.push(name);
                });
            });
          if (compfilter) {           
            setSelectedName(arrayName);
          }
          setLoading(false);
        },
      })
    );
  }
/******** Default data loading */
  useEffect(() => {
    setConfirm(false)   
    setLoading(true);
    let competId = [];
    competitions &&
      competitions.length > 0 &&
      competitions.map((ids, index) => {
        ids &&
          ids.competitions &&
          ids.competitions.length > 0 &&
          ids.competitions.map((item, i) => {
            if (
              selectedName.includes(item.nameEn) ||
              selectedName.includes(item.name)
            ) {
              competId.push(item.id);
            }
          });
      });

    if (select == "End") {
      setSelectedName([]);
      dispatch(
        getMatchEndList({
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language),
            season: moment().format("YYYY"),
            status: 2,
            member_ID: customer?.member_ID,
            page: 1,
            date: datefilterEnd,
            page: currentPage,
            descending: false,
            sortBy: "startTime",
          },
          callback: (res) => {
            setFootballEndList(res && res.data);           
            setCompetition(res && res.competition);

            const arrayName = [];
            res &&
              res.competition.length > 0 &&
              res &&
              res.competition.map((ids, index) => {
                ids &&
                  ids.competitions &&
                  ids.competitions.length > 0 &&
                  ids.competitions.map((item, i) => {
                    let name =
                      language_id == 1 || language_id == 3
                        ? item.nameEnFull
                        : item.nameFull;
                    ids.isCheck = true;
                    arrayName.push(name);
                  });
              });

            setSelectedName(arrayName);
            setLoading(false);
          },
        })
      );
    } else if (select === "Schedule" && confirm==false) {
      setSelectedName([]);
      dispatch(
        getScheduleList({
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language),
            season: moment().format("YYYY"),
            status: 0,
            member_ID: customer?.member_ID,
            date_option: dateoption,
            page: 1,
            date: datefilter,
            page: currentPage,
            descending: false,
            sortBy: "startTime",
          },
          callback: (res) => {
            setFootballList(res && res.data);
            setCompetition(res && res.competition);

            const arrayName = [];
            const competeName =
              res &&
              res.competition.length > 0 &&
              res &&
              res.competition.map((ids, index) => {
                ids &&
                  ids.competitions &&
                  ids.competitions.length > 0 &&
                  ids.competitions.map((item, i) => {
                    //  if(selectedName.includes(item.nameEn) || selectedName.includes(item.name)){
                    //   competId.push(item.id)
                    //  }
                    let name =
                      language_id == 1 || language_id == 3
                        ? item.nameEnFull
                        : item.nameFull;
                    ids.isCheck = true;
                    arrayName.push(name);
                  });
              });

            setSelectedName(arrayName);
            // setCompetition(competeName)

            setLoading(false);
          },
        })
      );
    } else if (select === "Follow") {
      dispatch(
        getMatchListFavorite({
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language),
            member_ID: customer?.member_ID,
            page: 1,
            is_favorite: true,
            competition_ids: competId,
            page: currentPage,
            descending: false,
            sortBy: "startTime",
          },
          callback: (res) => {
            setFootballFavoritList(res && res.data);
            setCompetition(res && res.competition);
            const arrayName = [];
            const competeName =
              res &&
              res.competition.length > 0 &&
              res &&
              res.competition.map((ids, index) => {
                ids &&
                  ids.competitions &&
                  ids.competitions.length > 0 &&
                  ids.competitions.map((item, i) => {
                    //  if(selectedName.includes(item.nameEn) || selectedName.includes(item.name)){
                    //   competId.push(item.id)
                    //  }
                    let name =
                      language_id == 1 || language_id == 3
                        ? item.nameEnFull
                        : item.nameFull;
                    ids.isCheck = true;
                    arrayName.push(name);
                  });
              });

            setSelectedName(arrayName);
            setLoading(false);
          },
        })
      );
    } else if (select === "Score") {
      dispatch(
        getMatchListFavorite({
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language),
            member_ID: customer?.member_ID,
            page: 1,
            is_favorite: true,
            competition_ids: competId,
            page: currentPage,
            descending: false,
            sortBy: "startTime",
          },
          callback: (res) => {
            setFootballFavoritList(res && res.data);
            setLoading(false);
          },
        })
      );

      liveScore();
      const interval = setInterval(() => {
        liveScore();
      }, 10000);
      return () => clearInterval(interval);     
    }

  
  }, [currentPage, dateoption, datefilter, select, datefilterEnd, compfilter]);
  const lang_id = utils.convertLangCodeToID(i18n.language);

  var result = footballScheduleList.filter(function (e) {
    return competitionIdd.indexOf(e.competitionId) != -1;
  });
  //console.log("competeNamecompeteName",competition)
  //const footballlist=selectedName && selectedName.length>0?result:footballScheduleList

  /****** Render Competition */
 /*** name.match(/(\b\S)?/g).join("")*/  
  const renderSelectGroup = (product) => {
    const items =
      product &&
      product.competitions.length > 0 &&
      product.competitions.map((p) => {
        let name =
          language_id == 1 || language_id == 3 ? p.nameEnFull : p.nameFull;
        let nameData =
          // language_id == 1 || language_id == 3
          //   ? name.match(/(\b\S)?/g).join("")
          //   : p.name;
          language_id == 1 || language_id == 3
          ? p.name
          : p.name;
        let checkboxVal = selectedName.includes(name);

        return (
          <MenuItem key={p.id} value={name} className={classes.liClass}>
            <Checkbox
              onClick={(e) => handleCheckbox(e, name)}
              checked={checkboxVal ? true : false}
            />
            {nameData}
          </MenuItem>
        );
      });
    //return [<ListSubheader>{product.country}</ListSubheader>, items];
    return [items];
  };

  /********* Render Component */
  return (
    <>
      {/* <Typography variant="h5" fontWeight="bold">
      {langKey && langKey.foot_ball} 
      </Typography> */}
      <TitleBreadCrumbs title={langKey && langKey.foot_ball} />

      <Grid
        container
        mb={2}
        px={{ xs: 2, md: 0 }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid
          item
          xs={"auto"}
          container
          border="1px solid grey"
          borderRadius="5px"
        >
          <MenuItem
            sx={{ borderRadius: "5px 0px 0px 5px" }}
            className={`${select === "Follow" ? "filterTabSelected" : ""}`}
            onClick={() => {
              router.push("/footBallPage#Follow");
            }}
          >
            {langKey && langKey.follow}
          </MenuItem>
          <MenuItem
            sx={{ borderRadius: "0px 0px 0px 0px" }}
            className={`${select === "Score" ? "filterTabSelected" : ""}`}
            onClick={() => {
              router.push("/footBallPage#Score");
            }}
          >
            {langKey && langKey.score}
          </MenuItem>
          <MenuItem
            sx={{ borderRadius: "0px 0px 0px 0px" }}
            className={`${select === "End" ? "filterTabSelected" : ""}`}
            onClick={() => {
              router.push("/footBallPage#End");
            }}
          >
            {langKey && langKey.end}
          </MenuItem>
          <MenuItem
            sx={{ borderRadius: "0px 5px 5px 0px" }}
            className={`${select === "Schedule" ? "filterTabSelected" : ""}`}
            onClick={() => {
              router.push("/footBallPage#Schedule");
            }}
          >
            {langKey && langKey.schedule}
          </MenuItem>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel id="demo-multiple-checkbox-label">
              {" "}
              {langKey && langKey.selectcompetition}
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={selectedName}
              placeholder={
                <OutlinedInput label={langKey && langKey.selectcompetition} />
              }
              className={classes.ulClass}
              input={
                <OutlinedInput label={langKey && langKey.selectcompetition} />
              }
              // renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
             
              <div
                className={classes.gridClass || "grid-class"}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: "4px",
                  paddingBottom: "30px"
                  
                }}
              >
                {competition &&
                  competition.length > 0 &&
                  competition.map((p) => renderSelectGroup(p))}
              </div>
              <div
                className={classes.stickyButtons}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: "4px",
                  padding: "6px 10px",
                  position: "sticky",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  background: "#fff",
                  zIndex:999999999
                }}
              >
                <Button
                  onClick={selectAll}
                  className={classes.button}
                  style={{
                    textTransform: "lowercase",
                    fontSize: "12px",
                    color: "#fff",
                  }}
                  variant="contained"
                  size="small"
                >
                  {langKey && langKey.selectall}
                </Button>
                <Button
                  onClick={clearCheckBox}
                  className={classes.button}
                  style={{
                    textTransform: "lowercase",
                    fontSize: "12px",
                    color: "#fff",
                  }}
                  size="small"
                  variant="contained"
                  color="error"
                >
                  {langKey && langKey.clearall}
                </Button>
                {/* <Button   style={{textTransform:"lowercase", fontSize:"12px",color:"#fff"}}  variant="contained" color="success" size="small" >
                {langKey && langKey.confirm} 
                </Button> */}
                <Button
                  onClick={filterByCompetition}
                  style={{
                    textTransform: "lowercase",
                    fontSize: "12px",
                    color: "#fff",
                    background: "green",
                  }}
                >
                  {langKey && langKey.confirm}                  
                </Button>
              </div>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <TabPanel value={value} index={"Follow"}>
        <FootBallFollow
          footballFavoritList={footballFavoritList}
          lang_id={lang_id}
          currentpage={currentPage}
          pageChange={(value) => setCurrentPage(value)}
          last_page={last_page}
          handleAddRemove={handleAddRemoveFollow}
          loadings={loading}
        />
      </TabPanel>
      <TabPanel value={value} index={"Score"}>
        <FootBallLiveScore
          footballFavoritList={footballFavoritList}
          lang_id={lang_id}
          footballLiveScoreList={
            footballLiveScoreList && footballLiveScoreList.live_scores
          }
          currentpage={currentPage}
          pageChange={(value) => setCurrentPage(value)}
          last_page={last_page}
          loadings={loading}
        />
      </TabPanel>

      <TabPanel value={value} index={"End"}>
        <FootBallEnd
          datefilters={(value) => setDatefilterEnd(value)}
          currentpage={currentPage}
          pageChange={(value) => setCurrentPage(value)}          
          last_page={last_page}
          loadings={loading}
          footballEndList={footballEndList}
          lang_id={lang_id}
        />
      </TabPanel>
      <TabPanel value={value} index={"Schedule"}>
        <Schedule
          dateoptions={(value) => setDateoption(value)}
          datefilter={(value) => setDatefilter(value)}
          matchId={(value) => setMatchId(value)}
          handleAddRemove={handleAddRemove}
          lang_id={lang_id}
          footballScheduleList={footballList}
          currentpage={currentPage}
          pageChange={(value) => setCurrentPage(value)}
          last_page={last_page}
          loadings={loading}
        />
      </TabPanel>
    </>
  );
}
