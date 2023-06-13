import {
  Typography,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";

import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import ScoreTable from "@/components/football/ScoreTable";
import Schedule from "@/components/football/schedule";

import TitleBreadCrumbs from "@/common/TitleBreadCrumbs";
// import ScoreTab from "@/components/football/ScoreTab";
import EndTab from "@/components/football/FootBallEnd";
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

export default function BasketBallPage() {
  const router = useRouter();
  const [select, setSelect] = useState(0);
  const [age, setAge] = useState("");

  const [value, setValue] = useState("");
  const langKey = useSelector(
    (state) => state && state.load_language && state.load_language.language
  );

  const handleChange = (event) => {
    setAge(event.target.value);
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

  return (
    <>
      {/* <Typography variant="h5" fontWeight="bold">
        {langKey && langKey.foot_ball} 
        </Typography> */}
      <TitleBreadCrumbs title={langKey && langKey.basket_ball} />

      <Grid container mb={2} alignItems="center" justifyContent="space-between">
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
              router.push("/basketBallPage#Follow");
            }}
          >
            {langKey && langKey.follow}
          </MenuItem>
          <MenuItem
            sx={{ borderRadius: "0px 0px 0px 0px" }}
            className={`${select === "Score" ? "filterTabSelected" : ""}`}
            onClick={() => {
              router.push("/basketBallPage#Score");
            }}
          >
            {langKey && langKey.score}
          </MenuItem>
          <MenuItem
            sx={{ borderRadius: "0px 0px 0px 0px" }}
            className={`${select === "End" ? "filterTabSelected" : ""}`}
            onClick={() => {
              router.push("/basketBallPage#End");
            }}
          >
            {langKey && langKey.end}
          </MenuItem>
          <MenuItem
            sx={{ borderRadius: "0px 5px 5px 0px" }}
            className={`${select === "Schedule" ? "filterTabSelected" : ""}`}
            onClick={() => {
              router.push("/basketBallPage#Schedule");
            }}
          >
            {langKey && langKey.schedule}
          </MenuItem>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">
              {langKey && langKey.select_category}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="category-select"
              value={age}
              label="Select Category"
              onChange={handleChange}
              style={{ paddingY: "0px" }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <TabPanel value={value} index={"Follow"}>
        <ScoreTable />
      </TabPanel>
      <TabPanel value={value} index={"Score"}>
        <ScoreTable />
      </TabPanel>

      <TabPanel value={value} index={"End"}>
      <ScoreTable />
      </TabPanel>
      <TabPanel value={value} index={"Schedule"}>
      <ScoreTable />
      </TabPanel>
    </>
  );
}
