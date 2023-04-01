import '@/styles/globals.css' 
import ThemConfiguration from '../config/themeConfiguration'; 
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import {store} from '../store/store';
import { appWithTranslation } from 'next-i18next'
const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page)
  return <>
    <Provider store={store}>
      <ThemeProvider theme={ThemConfiguration()}>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </Provider>
  </>
}
export default appWithTranslation(App);
