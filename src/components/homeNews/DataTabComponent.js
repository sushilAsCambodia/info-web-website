import * as React from 'react';
import {
    Grid, 
    ListItem, 
    Typography, 
    List, 
  } from "@mui/material";
  import { useDispatch, useSelector } from 'react-redux';
import {getNewsByCategory} from '@/store/actions/newsActions'
import DataLoading from '../DataLoading';
import Router from "next/router";
import Empty from '../Empty';
import moment from 'moment/moment';
import utils from '@/common/utils';
const DataTabComponent = ({id,lang_id}) => {
    const {news} = useSelector((state) => state.news); 
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getNewsByCategory(
            {
                params: { lang_id:lang_id, category_id: id, take:10 },
                callback:(res) => {
                    console.log(res,'callback')
                    setLoading(false);
                }
            }
        ));
    },[id]);
    const [loading,setLoading] = React.useState(true);
    return <Grid sx={{height:'250px', overflowY:'auto', display:'flex', justifyContent:'center', alignItems:loading ? 'center' : 'start'}}>
        {
            loading ? <DataLoading/> :
            (
                <Grid item xs={12} sm={12} md={12} xl={12}>
                    {news && news.length ? news.map((sport,index) => {
                        return (
                            <List key={index} sx={{padding:0}} onClick={() => Router.push({pathname:'/newsCardDetails'})}>
                                <ListItem sx={{ padding:'10px',  borderBottom: '1px solid #D9D9D9;' }}>
                                    <Grid
                                        container
                                        sx={{ borderRadius: "5px",padding:0 }}
                                        boxShadow="none"
                                        display="flex"
                                        alignItems="end">
                                        <Grid item xs={3} display="flex">
                                            <img  src={sport.image ? sport.image?.path :'./assets/no-image.png'}
                                                onError={(e) => e.target.src = './assets/no-image.png'}
                                                width="100%"
                                                height="100%"
                                                style={{objectFit:"contain",borderRadius:'6px'}}/>
                                                <Grid item sx={{paddingLeft:'5px'}}>
                                                    <Typography fontWeight="600" fontSize="10px" dangerouslySetInnerHTML={{ __html: utils.subString(sport.description,100)}}></Typography>
                                                    <Typography textAlign="left" fontSize="11px !important" whiteSpace="nowrap">
                                                        {moment(sport.created_at).format(utils.formatDate)}
                                                    </Typography>
                                                </Grid>
                                        </Grid> 
                                    </Grid>
                                </ListItem> 
                            </List>
                        );
                    }) : <Empty/>}
                </Grid>
            )
        }
    </Grid>
};
export default DataTabComponent;