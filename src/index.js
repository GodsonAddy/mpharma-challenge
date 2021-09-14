import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { unstable_createMuiStrictModeTheme as createTheme } from '@material-ui/core';
import {ThemeProvider} from '@material-ui/core';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import { configureStore } from './store';

const { store, persistor } = configureStore();

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
    ].join(',')
  },
  palette: {
    primary: {
      main: '#D93B30'
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

