import * as React from 'react';
import {
    Grid, 
    ListItem, 
    Typography, 
    List, 
    Box,
    Button
  } from "@mui/material";
  import { useDispatch, useSelector } from 'react-redux';
import {getNewsByCategory,getNextNewsByCategory} from '@/store/actions/newsActions'
import DataLoading from '../DataLoading';
import Router from "next/router";
import Empty from '../Empty';
import moment from 'moment/moment';
import utils from '@/common/utils';
const rowsPerPage = 10;
const DataTabComponent = ({id,lang_id}) => {
    const {news} = useSelector((state) => state.news); 
    const [page, setPage] = React.useState(1);
    const [showLoadMore, setShowLoadMore] = React.useState(false);
    const dispatch = useDispatch();
    React.useEffect(() => {
        getData(1);
    },[id]);
    const [loading, setLoading] = React.useState(true);
    const [loadingMore,setLoadingMore] = React.useState(false);
    // get more news by category
    const loadMore = (p) => {
        setLoadingMore(true);
        dispatch(getNextNewsByCategory(
            {
                params: { lang_id: lang_id, category_id: id, rowsPerPage: rowsPerPage, page: p },
                callback:(res) => {
                    setLoading(false);
                    setLoadingMore(false);
                    const {status_code,data} = res;
                    if([200,201,202,203,204].includes(status_code)) {
                        const currentPage = data?.current_page;
                        const lastPage = data?.last_page;
                        if(data.next_page_url) {
                            const url = new URL(data.next_page_url);
                            const params = url.searchParams;
                            const to = params.get('page');
                            if(currentPage < lastPage) {
                                setPage(to);
                                setShowLoadMore(true);
                            }else {
                                setShowLoadMore(false);
                            }
                        }else {
                            setShowLoadMore(false);
                        }
                    }
                }
            }
        ));
    }
    // get news data
    const getData = (p) => {
        dispatch(getNewsByCategory(
            {
                params: { lang_id: lang_id, category_id: id, rowsPerPage: rowsPerPage, page: p },
                callback:(res) => {
                    setLoading(false);
                    const {status_code,data} = res;
                    if([200,201,202,203,204].includes(status_code)) {
                        const currentPage = data?.current_page;
                        const lastPage = data?.last_page;
                        if(data.next_page_url) {
                            const url = new URL(data.next_page_url);
                            const params = url.searchParams;
                            const to = params.get('page');
                            if(currentPage < lastPage) {
                                setPage(to);
                                setShowLoadMore(true);
                            }else {
                                setShowLoadMore(false);
                            }
                        }else {
                            setShowLoadMore(false);
                        }
                        
                    }
                }
            }
        )); 
    }
    return <Grid sx={{position:'relative', height:news && news.length > 2 ? 'auto' : 'auto', overflowY:'auto', display:'flex', justifyContent:'center', alignItems:loading ? 'center' : 'start'}}>
        {
            loading ? <DataLoading size={30}/> :
            (
                <Grid item xs={12} sm={12} md={12} xl={12}>
                 <List  sx={{padding:'5px'}} >

                    {news && news.length ? news.map((sport,index) => {
                        return (
                                <ListItem key={index} sx={{ padding:'0px',  borderBottom: '1px solid #D9D9D9;' }} onClick={() => Router.push({pathname:'/newsCardDetails',query:{news_id:sport.id}})}>
                                    <Grid
                                        container
                                        sx={{ borderRadius: "5px",paddingTop:'10px' ,paddingBottom:'10px' }}
                                        boxShadow="none"
                                        display="flex"
                                        alignItems="start">
                                        <Grid item xs={3}>
                                            <img src={sport.image ? sport.image?.path :'./assets/no-image.png'}
                                                onError={(e) => e.target.src = './assets/no-image.png'}
                                                width="100%"
                                                height="50px"
                                                style={{objectFit:"cover",borderRadius:'6px'}}/>
                                        </Grid> 
                                        <Grid item xs={9}>
                                            <Grid item sx={{paddingLeft:'5px'}}>
                                                <Box fontWeight="400" fontFamily="sans-serif" fontSize="10px" dangerouslySetInnerHTML={{ __html: utils.subString(sport.title,140)}}></Box>
                                                <Typography marginTop="3px" textAlign="left" color="#8C8C8C" fontSize="10px !important" whiteSpace="nowrap">
                                                    {moment(sport.created_at).format(utils.formatDate)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </ListItem> 
                        );
                    }) : <Empty/>}
                     </List>
                </Grid>
            )
        }
        {showLoadMore && <Typography component="span" sx={{position:'absolute',bottom:0}} onClick={() => loadMore(page)}>{loadingMore?<DataLoading size={20}/>:<Button style={{fontSize:9}}>More</Button>}</Typography>}
    </Grid>
};
export default DataTabComponent;