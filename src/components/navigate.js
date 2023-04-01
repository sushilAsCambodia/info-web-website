import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { IconButton, Grid } from '@mui/material';

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default function Navigate(props) {
    const { title } = props
    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar sx={{background:'linear-gradient(90.08deg, #FF0000 0.08%, #FF6F31 99.94%)'}}>
                    <Toolbar>
                        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                            <Grid item xs={4}>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }} >
                                    <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.13716 0.700943L0.837158 7.00001L7.13716 13.2991L8.45528 11.9509L4.44185 7.93751H23.25V6.06251H4.44091L8.45528 2.04907L7.13716 0.700943Z" fill="white" />
                                    </svg>
                                </IconButton>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6" component="div" >
                                    {title}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                xs=8
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </React.Fragment>
    );
}