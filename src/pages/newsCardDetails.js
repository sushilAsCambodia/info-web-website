import React, { useEffect, useState } from "react";
import { 
    Typography, 
    Grid, 
} from "@mui/material";
import Router from "next/router";
import { getNewsById } from "@/store/actions/newsActions";
import { useDispatch,useSelector } from "react-redux";
import DataLoading from "@/components/DataLoading";
import DataNotFound from "@/components/DataNotFound";
import utils from "@/common/utils";
import moment from "moment/moment";
const NewsCardDetails = () => {
    const {loading, newsDetail = {}} = useSelector((state) => state.news);
    const router = Router;
    const {query} = router;
    const id = query?.news_id||undefined;
    const dispatch = useDispatch();
    useEffect(() => {
        if(id) {
            dispatch(
                getNewsById({
                    id,
                    params:{},
                    callback:(res) => {
                        console.log(res,'callback');
                    }
                })
            )
        }
    },[id]);
    return (
        <>
            {
                loading ? <DataLoading/> : (
                     <>
                        {
                            Object.keys(newsDetail).length > 0 ? <Grid
                            container
                            alignItems="flex-start"
                            justifyContent="center"
                            padding="0px 16px" >
                            <Grid
                                item
                                xs={12}
                                container
                                alignContent="flex-start"
                                alignItems="center"
                                overflow="auto">
                                <Grid item xs={12} sm={12} md={12} xl={12} padding="0px">
                                    <Grid item xs={12} paddingTop="15px">
                                        <Typography fontSize="14px" color="#000000">
                                            {newsDetail.title || ''}
                                        </Typography>
                                        <Typography color="#8C8C8C" pt={1} fontSize="12px">{moment(newsDetail.created_at).format(utils.formatDate)}</Typography>
                                    </Grid>
                                    <Grid item xs={12} paddingTop="10px">
                                        <img 
                                            src={newsDetail.image?.path}
                                            onError={(e) => e.target.src = '/assets/no-image.png'}
                                            alt={newsDetail.title || ''}
                                            width="100%" 
                                            height="189px" 
                                            style={{objectFit:'cover', borderRadius:'6px'}}
                                        />
                                        <Typography  color="#444444" textAlign="justify" pt={2} pb={4} fontSize="12px" dangerouslySetInnerHTML={{ __html: newsDetail.description || '' }}></Typography>
                                    </Grid>
    
                                </Grid>
    
                            </Grid>
                        </Grid> : <DataNotFound/>
                        }
                     </>
                    
                )
            }
        </>
    )
};
export default NewsCardDetails;