import '@/styles/globals.css' 
import ThemConfiguration from '../config/themeConfiguration'; 
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import {store} from '../store/store';
import  '@/common/i18n';
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
export default App;
