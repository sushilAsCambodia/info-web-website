import { red,blue } from '@mui/material/colors';
import {  createTheme } from '@mui/material/styles';
const ThemConfiguration = () => {
    return createTheme({
        components: {
          // Name of the component
          MuiButton: {
            styleOverrides: {
              // Name of the slot
              root: {
                // Some CSS
                fontSize: '1rem',
                color:'#000'
              },
            },
            variants: [
              // {
              //   props: { variant: 'outlined' },
              //   style: {
              //     textTransform: 'none',
              //     border: `1px solde ${blue[500]}`,
              //   },
              // },
              {
                props: { variant: 'dashed' },
                style: {
                  textTransform: 'none',
                  border: `2px dashed ${blue[500]}`,
                },
              },
              {
                props: { variant: 'dashed', color: 'secondary' },
                style: {
                  border: `4px dashed ${red[500]}`,
                },
              },
            ],
          },
        },
        palette: {
          primary: {
            // light: will be calculated from palette.primary.main,
            main: '#283593',
            alertBorderColor:'#64b5f6',
            alertBackgroundColor:'#9dd3ff36',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
          },
          secondary: {
            light: '#0066ff',
            main: '#ef6c00',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
          },
          // Provide every color token (light, main, dark, and contrastText) when using
          // custom colors for props in Material UI's components.
          // Then you will be able to use it like this: `<Button color="custom">`
          // (For TypeScript, you need to add module augmentation for the `custom` value)
          custom: {
            light: '#ffa726',
            main: '#f57c00',
            dark: '#ef6c00',
            contrastText: 'rgba(0, 0, 0, 0.87)',
          },
          // Used by `getContrastText()` to maximize the contrast between
          // the background and the text.
          contrastThreshold: 3,
          // Used by the functions below to shift a color's luminance by approximately
          // two indexes within its tonal palette.
          // E.g., shift from Red 500 to Red 300 or Red 700.
          tonalOffset: 0.2,
        },
      });
};
export default ThemConfiguration;