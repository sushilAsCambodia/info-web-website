
import { Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import utils from '@/common/utils';
import moment from 'moment/moment';
import { useRouter } from 'next/router';
import Image from 'mui-image';
const LotteryCard = ({lottery}) => {
    const router = useRouter();
    const checkActive = (active_features,value) => {
        if(active_features && active_features !== '') {
            const arr = active_features.split(',');
            if(arr && arr.length > 0) {
                if(arr.includes(value)) return true;
            }
        }
        return false
    }
    const goToLotteryHistory = (lottery={}) => {
        const title = lottery?.translation?.translation + lottery?.latest_result?.issue;
        router.push({ pathname:'/lotteryHistory', query: { title:title, id: lottery.id } });
    }
    return (
        <Card>
            <CardHeader style={{ padding: '0 5px 0 5px', borderBottom: '1px solid #ddd' }} title={
                <Grid container style={{ flexWrap: 'nowrap', alignItems: "center" }}>
                    <Grid item xs={10} style={{ fontSize: 12, color: '#8C8C8C' }}>
                        {lottery?.latest_result?.opendate && moment(lottery?.latest_result?.opendate).format(utils.lotteryFormat)}
                    </Grid>
                    <Grid item xs={2} style={{ textAlign: 'right' }}>
                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.88331 12.6667L3.96665 7.98333L0.333313 4.83333L5.13331 4.41667L6.99998 0L8.86665 4.41667L13.6666 4.83333L10.0333 7.98333L11.1166 12.6667L6.99998 10.1833L2.88331 12.6667Z" fill="#F2DA00" />
                        </svg>
                    </Grid>
                </Grid>
            } />
            <CardContent style={{ padding: 5 }}>
                <Typography component="span" style={{ fontSize: 12, color: '#444444' }}>
                    {lottery?.translation?.translation} {lottery?.latest_result?.issue}
                </Typography>
                <Grid container style={{ position: 'relative', alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
                    <Typography component="span" style={{ background: '#FFE0D2', width: '37px', height: '24px' }}></Typography>
                    <Grid container style={{ position: 'absolute', alignItems: 'center', left: 20 }}>
                        <Grid className='mui-image-round' item style={{ margin: 2, textAlign: 'center', fontSize: 12, color: '#fff', padding: 1, width: 30, height: 30, borderRadius: '50%', border: '0.5px solid #DDDDDD', background: '#fff' }}>
                        <Image alt="photo_upload" htmlFor="photo-upload" width={30} height={30} src={lottery?.src ? lottery.src :'/assets/Lottery/superlotto-logo1.png'} sx={{borderRadius:"50px"}}/>

                        </Grid>
                        {
                            lottery && lottery.latest_result && lottery.latest_result.result_data && (
                                lottery.latest_result.result_data.map((r,key) => {
                                    return (
                                        <Grid key={key} item 
                                            style={{ 
                                                margin: 2, 
                                                textAlign: 'center', 
                                                fontSize: 12, 
                                                color: '#fff', 
                                                padding: 1, 
                                                width: 20, 
                                                height: 20,
                                                borderRadius: '50%',
                                                background: r.color 
                                            }}>
                                                {r.num}
                                        </Grid> 
                                    )
                                })
                            )
                        }
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions style={{ padding: 5, background:'#F8F8F8'}}>
                <Grid container style={{ flexWrap: 'nowrap', alignItems: "center" }}>
                    <Grid item xs={4} style={{ fontSize: '10px', color: '#8C8C8C', textAlign: 'left' }}>
                        { 
                            checkActive(lottery?.active_features,'Chart') && <span>Chart</span>
                        }
                    </Grid>
                    <Grid item xs={4} style={{ fontSize: '10px', color: '#8C8C8C', textAlign: 'center' }}>
                        { 
                            checkActive(lottery?.active_features,'PastResult') && <span onClick={() => goToLotteryHistory(lottery)}>History</span>
                        }
                    </Grid>
                    {
                       moment(lottery?.latest_result?.opendate).format(utils.formatDate) == moment().format(utils.formatDate) && (
                        <Grid item xs={4} style={{ fontSize: '10px', color: '#8C8C8C', textAlign: 'right' }}>
                            Today Result
                        </Grid>
                       )
                    }
                </Grid>
            </CardActions>
        </Card>
    );
}
export default LotteryCard;