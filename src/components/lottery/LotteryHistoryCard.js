
import { Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import utils from '@/common/utils';
import Image from "mui-image";
import moment from "moment/min/moment-with-locales";
import { useTranslation } from 'react-i18next';
const LotteryHistoryCard = ({lottery,icon,langkey}) => {
    const { i18n } = useTranslation();
    return (
        <Card>
            <CardHeader style={{ padding: '5px 5px', borderBottom: '1px solid #ddd' }} title={
                <Grid  container style={{ flexWrap: 'nowrap', alignItems: "center" }}>
                    <Grid item xs={10} style={{ fontSize: 12, color: '#8C8C8C' }}>
                        {lottery?.opendate && moment(lottery?.opendate).locale(utils.localChange(i18n.language)).format(utils.lotteryFormat)}
                    </Grid>
                </Grid>
            } />
            <CardContent style={{ padding:'10px 0px 10px 0px' }}>
                <Grid container style={{ position: 'relative', alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
                    <Typography component="span" style={{ background: '#FFE0D2', width: '37px', height: '24px' }}></Typography>
                    <Grid container style={{ position: 'absolute', alignItems: 'center', left: 20 }}>
                        <Grid className='mui-image-round' item style={{ margin: 2, textAlign: 'center', color: '#fff', padding: 1, width: 35, height: 35, borderRadius: '50%', border: '0.5px solid #DDDDDD', background: '#fff' }}>
                        <Image  alt="photo_upload" htmlFor="photo-upload" width={30} height={30} src={icon ? icon :'/assets/Lottery/superlotto-logo1.png'} sx={{borderRadius:"50px"}}/>
                        </Grid>
                        {
                            lottery && lottery.result_data && lottery.result_data.map((r,key) => {
                                return (
                                    <Grid item key={key}
                                        style={{ 
                                            margin: 2, 
                                            textAlign: 'center', 
                                            fontSize: 12, 
                                            color: '#fff', 
                                            padding: 1, 
                                            width: 20, 
                                            height: 20, 
                                            borderRadius: '50%', 
                                            background: r.color }}>
                                        {r.num}
                                    </Grid> 
                                );
                            })
                        }
                        
                    </Grid>
                </Grid>
            </CardContent>
           
        </Card>
    );
}
export default LotteryHistoryCard;