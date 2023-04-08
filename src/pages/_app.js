import {useEffect} from 'react';

import '@/styles/globals.css' 
import ThemConfiguration from '../config/themeConfiguration'; 
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import {store} from '../store/store';
import  '@/common/i18n';
import Layout from '@/layouts';
import { useTranslation } from 'react-i18next';
const App = ({ Component, pageProps }) => {
  const {i18n} =  useTranslation();
  useEffect(() => {
    if(typeof window !='undefined') {
      const lang = window.localStorage.getItem('lang') || 'en';
      i18n.changeLanguage(lang);
    }
  },[])
  return <>
    <Provider store={store}>
      <ThemeProvider theme={ThemConfiguration()}>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
      </ThemeProvider>
    </Provider>
  </>
}
export default App;
