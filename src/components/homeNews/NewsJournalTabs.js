import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import FullSilder from "./FullSilder";
import MultiTabs from "./MultiTabs";
import JournalCard from "../homeJournal/JournalCard";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getJournal } from "@/store/actions/journalActions";
import { useDispatch, useSelector } from "react-redux";
import AdvertiseSlide from "./AdvertiseSlide";
import ResultsBanner from "./ResultsBanner";
import { getCategory } from "@/store/actions/categoryActions";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Grid
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Grid>{children}</Grid>}
    </Grid>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function NewsJournalTabs(props) {
  const { t } = useTranslation();
  const { banners = [], advertises = [], lang_id } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const router = useRouter();
  const [value, setValue] = React.useState(0);
  const [categories, setCategories] = React.useState('');
  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash == "journal") {
      setValue(1);
    } else {
      setValue(0);
    }
  }, [router.asPath]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => { 
    dispatch(
      getCategory({
        params: { lang_id: lang_id },
        callback: (res) => { 
          setCategories(res.data.category)
         },
      })
    );
  }, [dispatch,lang_id]);
  // useEffect(() => {
  //   if (value === 1) {
  //     dispatch(
  //       getJournal({
  //         params: { lang_id: lang_id, take: 60 },
  //         callback: (res) => {},
  //       })
  //     );
  //   }
  // }, [dispatch,lang_id, value]);

  const langKey = useSelector(
    (state) => state && state.load_language && state.load_language.language
  );
  return (
    <Grid item className="tabclass makefixedtab" >
      {/* <ResultsBanner banners={banners}/> */}

      <Grid sx={{ height: "100%" }} >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          className={`${router.asPath == '/home#journal' ? "sticky-header":"" } mui-home-tab-wrapper`}
          sx={{ background:"white",paddingTop:"7px", minHeight:"auto" }}
        >
          <Tab
            className="mui-custom-home mui-custom-new"
            label={langKey && langKey.news }
            {...a11yProps(0)}
            onClick={() => router.push("/home#newsfeed")}
          />
          <Tab
            className="mui-custom-home mui-custom-journal"
            label={langKey?.journal}
            {...a11yProps(1)}
            onClick={() => router.push("/home#journal")}
          />
        </Tabs>

        <TabPanel value={value} index={0} position="relative">
        <FullSilder banners={advertises} />
          <AdvertiseSlide advertises={advertises} />
          <MultiTabs categories={categories} lang_id={lang_id} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <JournalCard lang_id={lang_id} />
        </TabPanel>
      </Grid>
    </Grid>
  );
}
