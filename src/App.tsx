import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Main} from './components/Main';
import { Provider } from 'react-redux'
import store from './data/store'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
          <Main />
      </div>
    </Provider>
  );
}

export default App;
