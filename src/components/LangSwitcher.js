import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {getLanguage} from '../store/actions/languageActions'
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTranslation } from 'react-i18next';
import {getAdvertise} from '@/store/actions/advertiseActions'
import {getCategory} from '@/store/actions/categoryActions'
import useMediaQuery from "@mui/material/useMediaQuery";
import utils from "../common/utils";
//import moment from "moment";
//import "moment/locale/km";
//import "moment/locale/zh-cn";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 80,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function LangSwitcher() { 
  const matches = useMediaQuery("(max-width:768px)");
  const {i18n} =  useTranslation();
  const dispatch = useDispatch();
  const [lang, setLang] = React.useState('')
  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);

  React.useEffect(() => {
    if(typeof window !='undefined') {
      const lang = window.localStorage.getItem('lang') || 'en';
      setLang(lang);
    }else {
      setLang(i18n.language);
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[i18n.language])
  React.useEffect(() => {
    if(lang!='') {
      if(Object.keys(langKey).length===0){
        dispatch(getLanguage(
          {
            params: {
              lang_id: utils.convertLangCodeToID(i18n.language)
            },
            callback:(res) => {
              localStorage.setItem('languageKey', JSON.stringify(res))
            }
          }
        ));
      }
      dispatch(getAdvertise(
        {
          params: {
              lang_id: utils.convertLangCodeToID(i18n.language)
          },
          callback:(res) => { }
        }
      )); 
      dispatch(getCategory(
        {
          params: {lang_id: utils.convertLangCodeToID(i18n.language)},
          callback:(res) => { }
        }
      ));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[lang])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const changeLanguage = (l) => {
    window.localStorage.setItem('lang',l);
    i18n.changeLanguage(l); 
    dispatch(getLanguage(
      {
        params: {
          lang_id: utils.convertLangCodeToID(i18n.language)
      },
        callback:(res) => {
          localStorage.setItem('languageKey', JSON.stringify(res))
        }
      }
  ));
    handleClose();
  }
  const labelLanguage = (l) => {
    let language = '';
    switch (l) {
      case 'en':
        language = 'Eng';
       // moment.locale("en");  
        break;
      case 'de':
        language = '中文';  
        //moment.locale("zh-cn");     
        break;
      case 'kh':
        language = 'ខ្មែរ';    
       // moment.locale("km");  
        break;
      default:
        language = 'Eng';
        //moment.locale("en"); 
        break;
    }    
    return language;
  }
 
  return (
    <div>
      <Button





  sx={matches ? {backgroundColor:"transparent", border:"0.5px solid #FFFFFF",minWidth:"60px", fontSize:"12px", color:"#fff", 
   padding:"0px", borderRadius:"5px", textTransform:"capitalize !important"}
   :
   {backgroundColor:"transparent", border:"0.5px solid #FFFFFF",minWidth:"100px", fontSize:"12px", color:"#fff",
    padding:"6px", borderRadius:"20px", textTransform:"capitalize !important"}}

        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        padding="0px !important"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}>
          {
            matches ? null :
            <img src='./assets/Logo/langicon.png' alt='' style={{paddingRight:"5px"}} /> 
          }
       {/* <img src='./assets/Logo/langicon.png' alt='' /> &nbsp; */}
        {labelLanguage(lang)}
      </Button>
      <StyledMenu
      
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {['en','kh','de'].map(
            (l) => {
                if(l!==lang) {
                  return (<MenuItem key={l} onClick={() => changeLanguage(l)} disableRipple> { labelLanguage(l)  } </MenuItem>);
                }
            },
        )} 
      </StyledMenu>
    </div>
  );
}