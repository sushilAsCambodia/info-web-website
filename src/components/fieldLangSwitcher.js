import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTranslation } from 'react-i18next';
import { Select,FormControl,InputLabel,InputAdornment,IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
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
    minWidth: 180,
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

export default function fieldLanguageSwitcher() {
  const {i18n} =  useTranslation();
  const [lang, setLang] = React.useState('')

  const [langLabel,setLangLabel] = React.useState('')

  React.useEffect(() => {
    if(typeof window !='undefined') {
      const lang = window.localStorage.getItem('lang') || 'en';
      setLang(lang);
    }else {
      setLang(i18n.language);
    }
  },[i18n.language])
  
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