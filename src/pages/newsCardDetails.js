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
import { Image } from "mui-image";
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
                    params: {},
                    callback:(res) => {
                        console.log('');
                    }
                })
            )
        }
    },[dispatch,id]);
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
                                <Grid item xs={12} sm={12} md={12} xl={12} padding="0px" >
                                    <Grid item xs={12} paddingTop="21px">
                                        <Typography fontWeight='550' lineHeight="16px"  fontSize="14px" color="#000000">
                                            {newsDetail.title || ''}
                                        </Typography>
                                        <Typography color="#8C8C8C" paddingTop="11px" lineHeight="14px" fontSize="12px">{moment(newsDetail.created_at).format(utils.formatDate)}</Typography>
                                    </Grid>
                                    <Grid item xs={12} paddingTop="8px"   >
                                        <Image 
                                            src={newsDetail.image?.path}
                                            onError={(e) => e.target.src = '/assets/no-image.png'}
                                            alt={newsDetail.title || ''}
                                            width="100%" 
                                            height="200px" 
                                            objectFit="fill !important"
                                            style={{objectFit:"fill !important", borderRadius:'6px'}}
                                        />
                                        <Typography color="#444444" className="imageWidth"     textAlign="justify" lineHeight="14.06px" paddingTop="24px" pb={4} fontSize="14px" dangerouslySetInnerHTML={{ __html: newsDetail.description || '' }}></Typography>
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