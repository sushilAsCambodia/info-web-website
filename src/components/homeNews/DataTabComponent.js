import * as React from 'react';
import {
    Grid, 
    ListItem, 
    Typography, 
    List, 
  } from "@mui/material";
  import { useDispatch, useSelector } from 'react-redux';
import {getSportByCategory} from '@/store/reducers/sport'
import DataLoading from '../DataLoading';
import Router from "next/router";
const DataTabComponent = ({id}) => {
    const {sports} = useSelector((state) => state.sport); 
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getSportByCategory(
            {
                params: { fake:true,id: id },
                callback:(res) => {
                    console.log(res,'callback')
                    setLoading(false);
                }
            }
        ));
    },[]);
    const [loading,setLoading] = React.useState(true);
    return <Grid sx={{height:loading ? '250px' : 'auto', overflowY:'auto', display:'flex', justifyContent:'center', alignItems:loading ? 'center' : 'start'}}>
        {
            loading ? <DataLoading/> :
            (
                <Grid item xs={12} sm={12} md={12} xl={12}>
                    {sports.map((sport,index) => {
                        return (
                            <List key={index} sx={{padding:0}} onClick={() => Router.push("/newsCardDetails")}>
                                <ListItem sx={{ padding:'10px',  borderBottom: '1px solid #D9D9D9;' }} >
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{borderRadius: "5px",padding:0 }}
                                        boxShadow="none"
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Grid item xs={3} display="flex" alignItems="center">
                                            <img
                                                src="./assets/NewsJourney/tabcard1.png"
                                                width="80px"
                                                height="55px"
                                            />
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Grid
                                                item
                                                xs={12}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="space-between"
                                            >
                                                <Grid item>
                                                    <Typography fontWeight="600" fontSize="10px">The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...</Typography>
                                                    <Typography textAlign="left" fontSize="11px !important">
                                                        15/04/2023
                                                    </Typography>
                                                </Grid>
    
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </ListItem> 
                            </List>
                        );
                    })}
                </Grid>
            )
        }
    </Grid>
};
export default DataTabComponent;