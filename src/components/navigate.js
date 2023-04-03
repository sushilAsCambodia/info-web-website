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
    const { title, lead='', tail='' } = props;
    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar sx={{background:'linear-gradient(90.08deg, #FF0000 0.08%, #FF6F31 99.94%)'}}>
                    <Toolbar>
                        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                            <Grid item xs={4}>
                                {lead}
                            </Grid>
                            <Grid item xs={4} textAlign="center">
                                <Typography variant="h6" component="div" >
                                    {title}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} textAlign="end">
                                {tail}
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </React.Fragment>
    );
}