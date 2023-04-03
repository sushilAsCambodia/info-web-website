import '@/styles/globals.css' 
import ThemConfiguration from '../config/themeConfiguration'; 
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import {store} from '../store/store';
import  '@/common/i18n';
import Layout from '@/layouts';
const App = ({ Component, pageProps }) => {
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
export default App;
