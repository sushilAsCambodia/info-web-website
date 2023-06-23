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
  TableCell,TableRow
} from "@mui/material";
import { useState, useEffect } from "react";
import moment from "moment";

import { useRouter } from "next/router";
import { useSelector,useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Schedule from "@/components/football/schedule";
import TitleBreadCrumbs from "@/common/TitleBreadCrumbs";
import FootBallFollow from "@/components/football/FootBallFollow";
import FootBallEnd from "@/components/football/FootBallEnd";
import DataLoading from "@/components/DataLoading";
import utils from "@/common/utils";

import {
  getScheduleList,getMatchEndList
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
  const [selectedName, setSelectedName] = useState([]);
  const [page, setPage] = useState(1);
  const [footballList, setFootballList] = useState([]);
  const [footballEndList, setFootballEndList] = useState([]);
  const [loading, setLoading] = useState(false);
  

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
  const langKey = useSelector(
    (state) => state && state.load_language && state.load_language.language
  );
  
  const {
    scheduleResultList = []  
  } = useSelector((state) => state?.lottery);

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

  useEffect(() => { 
    setLoading(true)   
    dispatch(
      getScheduleList({    
        params: {         
          lang_id: utils.convertLangCodeToID(i18n.language),
          competition_id: '70',
          season:moment().format('YYYY'),
          isFinish:0,
        },
        callback: (res) => {   
          setLoading(false)      
          setFootballList(res && res.data)        
        },
      })
    );    
    dispatch(
      getMatchEndList({    
        params: {         
          lang_id: utils.convertLangCodeToID(i18n.language),
          competition_id: '70',
          season:moment().format('YYYY'),
          isFinish:1,
        },
        callback: (res) => {         
          setFootballEndList(res && res.data)        
        },
      })
    );    
  }, []);

  const renderSelectGroup = (product) => {
    const items = product.plans.map((p) => {
      return (
        <MenuItem key={p.id} value={p.name}>
          <Checkbox checked={selectedName.indexOf(p.name) > -1} />
          <ListItemText primary={p.name} />
        </MenuItem>
      );
    });
    return [<ListSubheader>{product.name}</ListSubheader>, items];
  };

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
              onClose={() => console.log("picked:::", selectedName)}
              input={<OutlinedInput label="Select event" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {data?.map((p) => renderSelectGroup(p))}
            </Select>
          </FormControl>
          
        </Grid>
      </Grid>
      <TabPanel value={value} index={"Follow"}>
        <FootBallFollow />
      </TabPanel>
      <TabPanel value={value} index={"Score"}>
        <FootBallFollow />
      </TabPanel>

      <TabPanel value={value} index={"End"}>
        <FootBallEnd footballEndList={footballEndList} />
      </TabPanel>
      <TabPanel value={value} index={"Schedule"}>
        <Schedule footballList={footballList} loadings={loading}/>
      </TabPanel>
    </>
  );
}
