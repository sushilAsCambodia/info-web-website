import React from "react";
import {
    Button,
    Typography,
    FormControl,
    Grid,
    InputAdornment,
    OutlinedInput,
} from "@mui/material";

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
   

  
  export default  class UploadImg extends React.Component {
    state = {
      file: '',
      imagePreviewUrl: 'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true',
     
    }

    photoUpload = e =>{
      e.preventDefault();
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
      reader.readAsDataURL(file);
    }

    render() {
      const {imagePreviewUrl} = this.state;
      return (
        <Grid item  xs={12} textAlign="center">
            <form>
              <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl}/>
             
              <Grid item xs={12} sm={12} >
                <Typography fontWeight="bold" pb={1} textAlign="left">
                  Username
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
                 
                >
                Change Password
                </Button>
              </Grid>
            </form>
              </Grid>
      )
    }
  }
  