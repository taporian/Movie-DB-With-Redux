
import reportWebVitals from './reportWebVitals';

  
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import makeStore from "./redux/store";

const store = makeStore();

const WithProvider = () => (
  <BrowserRouter>
  <Router>
  <Provider store={store}>
    <App />
  </Provider>
  </Router>
  </BrowserRouter>

);

ReactDOM.render(<WithProvider />, document.getElementById("root"));




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();