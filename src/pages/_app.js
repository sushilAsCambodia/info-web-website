import Layout from '@/layouts'
import '@/styles/globals.css' 
import ThemConfiguration from '../config/themeConfiguration'; 
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import {store} from '../store/store';
export default function App({ Component, pageProps }) {
  return <>
    <Provider store={store}>
      <ThemeProvider theme={ThemConfiguration()}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  </>
}
