import React from 'react';
import {withRouter} from 'react-router-dom';
import './App.css';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Routes from './components/Routes';

function App() {
  return (
    <div>
    <Routes/>
    <ToastContainer />
    </div>
  );
}

export default withRouter(App);
