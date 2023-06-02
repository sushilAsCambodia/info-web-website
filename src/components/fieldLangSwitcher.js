import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTranslation } from 'react-i18next';
import { Select,FormControl,InputLabel,InputAdornment,IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import {getLanguage} from '../store/actions/languageActions'
import utils from "../common/utils";
export default function FieldLanguageSwitcher() {
  const dispatch = useDispatch();
  const {i18n} =  useTranslation();
  const [langLabel,setLangLabel] = React.useState(i18n && i18n.language ? i18n.language :'en')
  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setLangLabel(event.target.value)
    i18n.changeLanguage(event.target.value);
  };

  const changeLanguage = (l) => {
    window.localStorage.setItem('lang',l);
    setLangLabel(labelLanguage(l))
  }
  const labelLanguage = (l) => {
    let language = '';
    switch (l) {
      case 'en':
        language = 'Eng';
        break;
      case 'de':
        language = 'Ch';
        break;
      case 'kh':
        language = 'Kh';
        break;
      default:
        break;
    }
    return language;
  } 
  React.useEffect(() => {
    if(langLabel) {
      dispatch(getLanguage(
        {
          params: {
            lang_id: utils.convertLangCodeToID(langLabel)
          },
          callback:(res) => {
            localStorage.setItem('languageKey', JSON.stringify(res))
          }
        }
      ));
    }
  },[langLabel]);
  return (
    <>
    <FormControl sx={{ minWidth: 120 }} className="switch-lang-dropdown-wrapper"
    // size="small"
    fullWidth
    >
      <InputLabel id="demo-select-small">{langKey && langKey.language}</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={langLabel}
        label={langKey && langKey.language}
        onChange={handleClick}
        style={{paddingright:"30px"}}
        renderValue={() => {
          return <em>{langKey && langKey.lang}</em>;
        }}
        endAdornment={
          <InputAdornment position="end" style={{marginRight:'20px'}}>
            <Icon width={40} icon="fa-solid:language" />
          </InputAdornment>
        }
      >
        {['en','kh','de'].map(
          (l) => { 
            return (<MenuItem style={{display:l !== langLabel?'':'none'}} key={l} value={l} onClick={() => changeLanguage(l)} disableRipple> { labelLanguage(l)  } </MenuItem>);
          },
        )} 
      </Select>
    </FormControl>
    </>
  );
}