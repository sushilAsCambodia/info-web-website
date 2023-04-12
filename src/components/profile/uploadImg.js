import React,{useEffect,useState} from "react";
import {
    Button,
    Typography,
    FormControl,
    Grid,
    InputAdornment,
    OutlinedInput,
    Link,
    ListItem,
    ListItemText,
    ListItemIcon,
    List,
    Divider
} from "@mui/material";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ImgUpload =({
    onChange,
    src
  })=>
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload" >
        <img htmlFor="photo-upload" src={src}/>
      </div>
      <input id="photo-upload" type="file" onChange={onChange}/> 
    </label>
   

  
  const UploadImg =()=> {
    const {customer} = useSelector((state) => state.auth); 
    const [userName,setUsername] = useState((customer && customer.user_name? customer.user_name : ''));
    const {t} = useTranslation();
    const[file,setFile]=useState('')
    const[imagePreviewUrl,setImagePreviewUrl]=useState('https://github.com/OlgaKoplik/CodePen/blob/master/customer.jpg?raw=true')
    const photoUpload = (e) =>{
      e.preventDefault();
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        setFile(file)
        setImagePreviewUrl(reader.result)       
      }
      reader.readAsDataURL(file);
    }

  
      // drawer start 

    const [state, setState] = useState({bottom: false});
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };
    
    useEffect(() => {
      setUsername((customer && customer.user_name? customer.user_name : ''));
    },[customer])
    const list = (anchor) => (
      <Box
        sx={{ width: anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
      >
        <Typography className="drawerline"></Typography>
        <List sx={{padding:"70px 16px"}}>
        <ListItem  disablePadding sx={{paddingBottom:"10px"}}>
         <Grid item xs={12} sm={12} >
                <Typography fontWeight="bold" pb={1} textAlign="left">
                {t('nick_name')}
                </Typography>
              <FormControl
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: "15px",
                  marginBottom: "5px",
                }}
              >
                <OutlinedInput
                sx={{paddingRight:"10px"}}
                  name="Username"
                  placeholder={t('user_name')}
                  inputProps={{ maxLength: 16 }}
                  id="outlined-adornment-username"
                  type="text"
                  endAdornment={
                    <InputAdornment position="end">
                        <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    color: "white",
                    background:
                      "linear-gradient(90.04deg, #FF0000 0.04%, #FF6F31 99.97%);",
                    textTransform: 'capitalize'
                  }}
                  onClick={toggleDrawer('bottom', true)}
                >
                {t('save')}
                </Button>
                    </InputAdornment>
                  }
                />
              </FormControl>
          </Grid>
         </ListItem>
         <ListItem  disablePadding sx={{paddingBottom:"10px"}}>
         <Grid item xs={12} sm={12} >
                <Typography fontWeight="bold" pb={1} textAlign="left">
                {t('password')}
                </Typography>
              <FormControl
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: "15px",
                  marginBottom: "5px",
                }}
              >
                <OutlinedInput
                sx={{paddingRight:"10px"}}
                  name="password"
                  placeholder={t('user_name')}
                  inputProps={{ maxLength: 16 }}
                  id="outlined-adornment-password"
                  type="password"
                
                />
              </FormControl>
          </Grid>
         </ListItem>
         <ListItem  disablePadding sx={{paddingBottom:"10px"}}>
         <Grid item xs={12} sm={12} >
                <Typography fontWeight="bold" pb={1} textAlign="left">
                {t('confirm_password')}
                </Typography>
              <FormControl
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: "15px",
                  marginBottom: "5px",
                }}
              >
                <OutlinedInput
                sx={{paddingRight:"10px"}}
                  name="confirm_password"
                  placeholder={t('confirm_password')}
                  inputProps={{ maxLength: 16 }}
                  id="outlined-adornment-confirmpassword"
                  type="password"
                 
                />
              </FormControl>
          </Grid>
         </ListItem>
         <ListItem  disablePadding sx={{paddingBottom:"10px"}}>
         <Grid item xs={12} sm={12} >
             
         <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    color: "white",
                    background:
                      "linear-gradient(90.04deg, #FF0000 0.04%, #FF6F31 99.97%);",
                    textTransform: 'capitalize'
                  }}
                  onClick={toggleDrawer('bottom', true)}
                >
           {t('submit')}
                </Button>
          </Grid>
         </ListItem>
        </List>
       
      </Box>
    );

      return (
<>
        <Grid item  xs={12} textAlign="center">
            <form>
              <ImgUpload onChange={photoUpload} src={imagePreviewUrl}/>
              <Grid item xs={12} sm={12} >
                <Typography fontWeight="bold" pb={1} textAlign="left">
                {t('nick_name')}
                </Typography>
              <FormControl
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: "15px",
                  marginBottom: "5px",
                }}
              >
                <OutlinedInput
                sx={{paddingRight:"10px"}}
                  name="nickname"
                  placeholder={t('user_name')}
                  inputProps={{ maxLength: 16 }}
                  id="outlined-adornment-nickname"
                  type="text"
                  value={ userName }
                  onChange={(e) => setUsername(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                        <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    color: "white",
                    background:
                      "linear-gradient(90.04deg, #FF0000 0.04%, #FF6F31 99.97%);",
                    textTransform: 'capitalize'
                  }}
                  
                  onClick={toggleDrawer('bottom', true)}
                >
                 {t('edit')}
                </Button>
                    </InputAdornment>
                  }
                />
              </FormControl>
              </Grid>
              <Grid item>
              <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    marginTop:"20px",
                    color: "#000",
                    boxShadow:"none",
                    border:"0.5px solid #DDDDDD",
                    borderRadius:"10px",
                    background:
                    "linear-gradient(90.04deg, #E9E9E9 0.04%, #E9E9E9 99.97%);",
                    textTransform: 'capitalize'
                  }}
                  onClick={toggleDrawer('bottom', true)}
                >
                {t('change_password')}
                </Button>
              </Grid>
            </form>
          </Grid>

<Grid>
<Drawer anchor={'bottom'} open={state['bottom']} onClose={toggleDrawer('bottom', false)}>
        {list('bottom')}
</Drawer>
      
</Grid>
</>
      )
    
  }
  export default UploadImg;
  