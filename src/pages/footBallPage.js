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
} from "@mui/material";
import { useState, useEffect } from "react";
import moment from "moment";

import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Schedule from "@/components/football/schedule";
import TitleBreadCrumbs from "@/common/TitleBreadCrumbs";
import FootBallFollow from "@/components/football/FootBallFollow";
import FootBallEnd from "@/components/football/FootBallEnd";
import DataLoading from "@/components/DataLoading";
import utils from "@/common/utils";

import {
  getScheduleList,
  getMatchEndList,
  getCompetitionList,
  addRemoveFavourite,getMatchListFavorite
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
  
  const [matchId, setMatchId] = useState("");
  const [dateoption, setDateoption] = useState("Ten");
  const { customer = {} } = useSelector((state) => state.auth);
  const [datefilter, setDatefilter] = useState(moment().format("YYYY-MM-DD"));
  const [datefilterEnd, setDatefilterEnd] = useState(moment().format("YYYY-MM-DD"));
  const language_id= utils.convertLangCodeToID(i18n.language)
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setSelectedName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const [value, setValue] = useState("");
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
           
              // setIsFavourite(!isFavourite);
              // toastMessage(langKey[res?.message]);
              //   allFavourite();
              //setLoading(false);
              dispatch(
                getScheduleList({                 
                  params: {
                    lang_id: utils.convertLangCodeToID(i18n.language),
                    season: moment().format("YYYY"),
                    status: 0,
                    member_ID: customer?.member_ID,                   
                    page: 1,                   
                    date:datefilter,
                    page: currentPage,
                    descending:false,
                    sortBy:'startTime'
                  },
                  callback: (res) => {
                    setFootballList(res && res.data);
                    setLoading(false);
                  },
                })
              );
            },
          })
        )
      : router.push("/login");
  };
//   function timeAndDate() {
//     console.log(new Date());
// }

  useEffect(() => {
    console.log("selectselect",select)
    //setInterval(timeAndDate, 10000);
    setLoading(true);
  
    // dispatch(
    //   getScheduleList({
    //     params: {
    //       lang_id: utils.convertLangCodeToID(i18n.language),
    //       season:moment().format('YYYY'),
    //       status:0,
    //       page:1,
    //       date_option:30

    //     },
    //     callback: (res) => {
    //       setLoading(false)
    //       setFootballList(res && res.data && res.data.data)
    //     },
    //   })
    // );

    // dispatch(
    //   getScheduleList({
    //     params: { lang_id: utils.convertLangCodeToID(i18n.language), season:moment().format('YYYY'),
    //     status:0,
    //     member_ID: customer?.member_ID,
    //     date_option:dateoption,
    //     page:1,
    //      rowsPerPage: 15,page:currentPage },
    //     callback: (res) => {  setFootballList(res && res.data)
    //       setLoading(false)  },
    //   })
    // );
    let competId=[]
    competitions && competitions.length>0 && competitions.map((ids,index)=>{
      
      ids && ids.competitions && ids.competitions.length>0 && ids.competitions.map((item,i)=>{
       
       if(selectedName.includes(item.nameEn) || selectedName.includes(item.name)){
        competId.push(item.id)
       }
      })
    })

    setCompetitionIdd(competId)

    if(select=="End") {      
      console.log("yertyetretruetru") 
      dispatch(
        getMatchEndList({
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language),
            season: moment().format("YYYY"),
            status: 2,
            member_ID: customer?.member_ID,           
            page: 1,         
            date:datefilterEnd,
            competition_ids:competId,
            page: currentPage,
            descending:false,
            sortBy:'startTime'
          },
          callback: (res) => {
            setFootballEndList(res && res.data);
            setLoading(false);
          },
        })
      );
    } 

    if(select==="Schedule"){
    dispatch(
      getScheduleList({
        params: {
          lang_id: utils.convertLangCodeToID(i18n.language),
          season: moment().format("YYYY"),
          status: 0,
          member_ID: customer?.member_ID,
          date_option: dateoption,
          page: 1,         
          date:datefilter,
          competition_ids:competId,
          page: currentPage,
          descending:false,
          sortBy:'startTime'
        },
        callback: (res) => {
          setFootballList(res && res.data);
          setLoading(false);
        },
      })
    );
    } 
    
     
    if(select==="Follow") {

      dispatch(
        getMatchListFavorite({
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language),                     
            member_ID: customer?.member_ID,           
            page: 1,
            is_favorite:true,   
            competition_ids:competId,
            page: currentPage,
            descending:false,
            sortBy:'startTime'
          },
          callback: (res) => {
            setFootballFavoritList(res && res.data);
            setLoading(false);
          },
        })
      );
      
    }
    
    

    // dispatch(
    //   getMatchEndList({
    //     params: {
    //       lang_id: utils.convertLangCodeToID(i18n.language),
    //       competition_id: "70",
    //       season: moment().format("YYYY"),
    //       isFinish: 1,
    //     },
    //     callback: (res) => {
    //       setFootballEndList(res && res.data && res.data.data);
    //     },
    //   })
    // );
    dispatch(
      getCompetitionList({
        params: {
          lang_id: utils.convertLangCodeToID(i18n.language),
        },
        callback: (res) => {
          setCompetitionList(res && res.data);
        },
      })
    );
  }, [currentPage, dateoption,datefilter,selectedName,select,datefilterEnd]);
  const lang_id = utils.convertLangCodeToID(i18n.language);

  var result = footballScheduleList.filter(function(e) {
    return competitionIdd.indexOf(e.competitionId) != -1
  })

  //const footballlist=selectedName && selectedName.length>0?result:footballScheduleList

  const renderSelectGroup = (product) => {
    const items = product.competitions.map((p) => {
      let name=language_id==1 || language_id==3?p.nameEnFull:p.nameFull
      return (
        <MenuItem key={p.id} value={name}>
          <Checkbox checked={selectedName.indexOf(name) > -1} />
          <ListItemText style={{whiteSpace:"initial"}} primary={name} />
        </MenuItem>
      );
    });
    //return [<ListSubheader>{product.country}</ListSubheader>, items];
    return [items];
  };
 
  
console.log("datefilter",datefilterEnd)

  //console.log("competitionscompetitionscompetitions", competitions);
  //console.log("FootballEndList",footballEndList,footballList)
  console.log("footballFavoritList",footballFavoritList,select)
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
          <FormControl fullWidth>
          <InputLabel id="demo-multiple-checkbox-label">{langKey && langKey.select_event}</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={selectedName}
              onChange={(e) => handleChange(e)}
            
              input={<OutlinedInput label="Select event" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {competitions && competitions.length>0 && competitions.map((p) => renderSelectGroup(p))}
            </Select>

            {/* <Select
          value={competition}
          onChange={(e)=>setCompetition(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{ paddingLeft: "5px", fontSize: {xs:"12px",md:"14px"} }}
          startAdornment={
            <InputAdornment position="start">
              <Icon icon="material-symbols:calendar-today" width={20} />
            </InputAdornment>
          }
        >
          <MenuItem value="">
            <em>   {langKey && langKey.select_event}</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select> */}
          </FormControl>
        </Grid>
      </Grid>
      <TabPanel value={value} index={"Follow"}>
        <FootBallFollow footballFavoritList={footballFavoritList} lang_id={lang_id}    currentpage={currentPage}
          pageChange={(value) => setCurrentPage(value)}
          last_page={last_page}
          loadings={loading} />
      </TabPanel>
      <TabPanel value={value} index={"Score"}>
        <FootBallFollow />
      </TabPanel>

      <TabPanel value={value} index={"End"}>
        <FootBallEnd  datefilters={(value) => setDatefilterEnd(value)} currentpage={currentPage}
          pageChange={(value) => setCurrentPage(value)}
          last_page={last_page}
          loadings={loading}     footballEndList={footballEndList}  lang_id={lang_id} />
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
