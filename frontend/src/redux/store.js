import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";

import {authenticationReducer, 
  fetchMoviesReducer,
  createMoviesReducer, 
  deleteMoviesReducer,
  toggleEditreducer ,
  fetchOneMoviesReducer,
  filterMoviesReducer,
  updateMoviesReducer} from "./reducer";

const createRootReducer = () =>
  combineReducers({
    authenticationReducer,
    fetchMoviesReducer,
    createMoviesReducer,
    deleteMoviesReducer,
    toggleEditreducer,
    updateMoviesReducer,
    fetchOneMoviesReducer,
    filterMoviesReducer

  });

const initState = {
  authenticationReducer: {
    currentUser: null,
    token: "",
    error: "",
    loading: false,
    isAuthenticated: false,
   
  },
  fetchMoviesReducer:{
    error:"",
    loading: false,
    movieData:[],
  
  },
  createMoviesReducer:{
    error:"",
    loading: false,
    createMovieData:[],
   
  },
  deleteMoviesReducer:{
    error:"",
    loading: false,
    deleteMovieData:[],
  },
  updateMoviesReducer:{
    error:"",
    loading: false,
    updateMovieData:[],
  },
  fetchOneMoviesReducer:{
    error:"",
    loading: false,
    movieDataOne:[],
  },
  filterMoviesReducer:{
    error:"",
    loading: false,
    movieDataOne:[],
  }


}

export default function makeStore(initialState = initState) {
  let composeEnhancers = compose;
  const middlewares = [thunk];

  if (process.env.NODE_ENV === "development") {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }
  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (module.hot) {
    module.hot.accept("./reducer", () => {
      const nextReducer = require("./reducer").default;
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}