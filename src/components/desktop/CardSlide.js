import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
export default function CardSlice(props) {
    const { image = {}, year } = props;
    const langKey = useSelector((state) => state && state.load_language && state.load_language.language);

    return (
        <>
            {
                (image && Object.keys(image).length) &&
                <Paper sx={{ margin: '5px' }} elevation={0}  >
                    <Card sx={{ display: 'flex', width: 248, height: 90.54, padding: '7px',boxShadow:'inherit',border:'1px solid #ddd' }}>
                        <CardMedia
                            component="img" 
                            image={image.original}
                            draggable="false"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 auto', textAlign: 'start', padding: '8px 0px 0 8px' }}>
                                {/* <Typography component="div" sx={{ fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '125px' }}>
                                    {image?.album_name || 'N/A'}
                                </Typography> */}
                                <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ fontSize: '12px', whiteSpace: 'nowrap' }}>
                                    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.30133 10.657C1.01597 10.657 0.771606 10.5553 0.568225 10.3519C0.364844 10.1485 0.263327 9.90432 0.263673 9.61931V2.35571C0.263673 2.07035 0.365363 1.82599 0.568744 1.6226C0.772125 1.41922 1.01632 1.31771 1.30133 1.31805H1.82016V0.786253C1.82016 0.639252 1.86997 0.518192 1.96958 0.423073C2.0692 0.327955 2.19233 0.280396 2.33899 0.280396C2.48599 0.280396 2.6093 0.330203 2.70891 0.429818C2.80853 0.529433 2.85816 0.652568 2.85782 0.799224V1.31805H7.00844V0.786253C7.00844 0.639252 7.05825 0.518192 7.15787 0.423073C7.25748 0.327955 7.38062 0.280396 7.52727 0.280396C7.67427 0.280396 7.79758 0.330203 7.8972 0.429818C7.99681 0.529433 8.04645 0.652568 8.0461 0.799224V1.31805H8.56493C8.85029 1.31805 9.09465 1.41974 9.29803 1.62312C9.50142 1.8265 9.60293 2.0707 9.60259 2.35571V9.61931C9.60259 9.90466 9.5009 10.149 9.29752 10.3524C9.09414 10.5558 8.84994 10.6573 8.56493 10.657H1.30133ZM1.30133 9.61931H8.56493V4.43102H1.30133V9.61931ZM1.30133 3.39337H8.56493V2.35571H1.30133V3.39337Z" fill="#8C8C8C" />
                                    </svg>
                                    &nbsp;
                                    {year && moment(year).format('yyyy')}
                                </Typography>
                                <Grid
                                    sx={{
                                        textAlign: 'center',
                                        color: "white",
                                        background: "linear-gradient(90.04deg, #FF0000 0.04%, #FF6F31 99.97%);",
                                        textTransform: "capitalize",
                                        fontSize: '8px',
                                        borderRadius: '10px',
                                        padding: '5px',
                                        width: '77px'
                                    }}>
                                      {langKey && langKey.lates_issue} {image.issue}
                                </Grid>
                            </CardContent>
                        </Box>
                    </Card>
                </Paper>
            }
            <style>
                {
                    `
                        .custom-original-wrapper .image-gallery-thumbnail{
                            width: 248px;
                            height: 90.54px;
                        }
                        .custom-original-wrapper .image-gallery-thumbnails{
                            overflow:inherit
                        }
                        .card-desktop-slice > .MuiButtonBase-root:first-child{
                            position: absolute;
                            top: 50%;
                            z-index: 9;
                            left: 15px;
                            transform: translate(-50%, -50%);
                        }
                        .card-desktop-slice > .MuiButtonBase-root:last-child {
                            position: absolute;
                            top: 50%;
                            z-index: 9;
                            right: -28px;
                            transform: translate(-50%, -50%);
                        }
                        .card-desktop-slice > .MuiButtonBase-root svg {
                            background: #FF6F31;
                            border-radius:50%;
                            color:#fff;
                        }
                    `
                }
            </style>
        </>
    );
}