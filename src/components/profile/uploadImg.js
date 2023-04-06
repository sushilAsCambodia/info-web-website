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

const ImgUpload =({
    onChange,
    src
  })=>
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload" >
        <img for="photo-upload" src={src}/>
      </div>
      <input id="photo-upload" type="file" onChange={onChange}/> 
    </label>
   

  
  const UploadImg =()=> {
   

    const[file,setFile]=useState('')
    const[imagePreviewUrl,setImagePreviewUrl]=useState('https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true')

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
                Nick Name
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
                  placeholder="Username"
                  inputProps={{ maxLength: 16 }}
                  id="outlined-adornment-password"
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
                Save
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
                Password
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
                  placeholder="Username"
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
                Confirm Password
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
                  placeholder="Username"
                  inputProps={{ maxLength: 16 }}
                  id="outlined-adornment-password"
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
           Submit
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
                Nick Name
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
                  placeholder="Username"
                  inputProps={{ maxLength: 16 }}
                  id="outlined-adornment-password"
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
                 Edit
                </Button>
                    </InputAdornment>
                  }
                />
              </FormControl>
              </Grid>
              <Grid item fullWidth>
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
                Change Password
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
  