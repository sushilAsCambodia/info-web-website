import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTranslation } from 'react-i18next';
import { Select,FormControl,InputLabel,InputAdornment,IconButton } from '@mui/material';
import { Icon } from '@iconify/react';


export default function FieldLanguageSwitcher() {
  const {i18n} =  useTranslation();
  const [lang, setLang] = React.useState('')

  const [langLabel,setLangLabel] = React.useState(i18n ? i18n.language:'en')
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log("lang:::",event.target.value)
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
  console.log("lang:::",langLabel)
  console.log("il8n:::",i18n)
  return (
    <>
    <FormControl sx={{ minWidth: 120 }} 
    // size="small"
    fullWidth
    >
      <InputLabel id="demo-select-small">Language</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={langLabel}
        label="Language"
        onChange={handleClick}
        style={{paddingRight:"30px"}}
        endAdornment={
            <InputAdornment position="end" paddingRight="10px">
              <Icon width={40} icon="fa-solid:language" />
            </InputAdornment>
          }
      >
        {['en','kh','de'].map(
            (l) => {
                if(l!==lang) {
                  return (<MenuItem key={l} value={l} onClick={() => changeLanguage(l)} disableRipple> { labelLanguage(l)  } </MenuItem>);
                }
            },
        )} 
      </Select>
    </FormControl>
    </>
  );
}