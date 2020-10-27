import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Main} from './components/Main';
import { Provider } from 'react-redux'
import store from './data/store'
import theme from './theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
          <MuiThemeProvider theme={theme}>
              <CssBaseline >
                <Main />
              </CssBaseline>
          </MuiThemeProvider>
      </div>
    </Provider>
  );
}

export default App;
