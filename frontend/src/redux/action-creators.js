import axios from "axios";
import {
    SIGN_IN_FAILURE,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_OUT_FAILURE,
    SIGN_OUT_REQUEST,
    SIGN_OUT_SUCCESS,

    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_FAILURE,
    FETCH_MOVIES_REQUEST,

    CREATE_MOVIES_SUCCESS,
    CREATE_MOVIES_FAILURE,
    CREATE_MOVIES_REQUEST,

    DELETE_MOVIES_SUCCESS,
    DELETE_MOVIES_FAILURE,
    DELETE_MOVIES_REQUEST,

    UPDATE_MOVIES_SUCCESS,
    UPDATE_MOVIES_FAILURE,
    UPDATE_MOVIES_REQUEST,

    FETCH_ONE_MOVIE_REQUEST,
    FETCH_ONE_MOVIE_SUCCESS,
    FETCH_ONE_MOVIE_FAILURE,

    FILTER_MOVIE_REQUEST,
    FILTER_MOVIE_SUCCESS,
    FILTER_MOVIE_FAILURE,

    EDIT_ON


} from './action-types';
import {toast} from "react-toastify";

import { URL } from "../components/URL";

// Sign up action creators

const signUpRequest = () =>{
    return{
        type: SIGN_UP_REQUEST,
    };
};

const signUpSuccess = (user) =>{
    return{
        type: SIGN_UP_SUCCESS,
        payload: {
            user
        }
    };
};

const signUpFailure = (error) =>{
    return {
        type: SIGN_UP_FAILURE,
        payload:error
    };
};
export const signUp = (user,history) =>{
    
    return async function (dispatch)  {
        dispatch(signUpRequest());
        try{
            const res = await axios({
                method:"post",
                url: URL+'/signUp',
                data: user,
                });
                const {data} = res.data;
               
                dispatch(signUpSuccess(data));
                history.push('/');
        }catch(error){
            if(error.response && error.response.status === 400){
                
                dispatch(signUpFailure(error.response.data));
           }else{
               dispatch(signUpFailure(error));
           }
        }
    };
};



//Sign in action creators

const signInRequest = () =>{
    return {
        type: SIGN_IN_REQUEST
    };
};

const signInSuccess = (token) =>{
    return {
        type: SIGN_IN_SUCCESS,
        payload:{
            token
        }
    };
};

const signInFailure = (error) =>{
 
    return {
        type: SIGN_IN_FAILURE,
        payload: error,
    };
};

export const signIn = (payload,history) =>{

    return async function (dispatch) {
    
        dispatch(signInRequest);
        try{
    
           const res= await axios({
                method:"POST",
                url: URL+"/signIn",
                data:payload,
                headers:{
                    "Content-type":"application/json",
                    "Accept":"application/json",
                }
            })           
               
            const {token} = res.data;
              
                localStorage.setItem("USER-TOKEN",token);
                dispatch(signInSuccess(token));
        }catch(error){
            if(error.response && error.response.status === 404){
                dispatch(signInFailure(error.response.data));
            
           }
           else{
               dispatch(signUpFailure(error));
           }
           
           
        }
        
    };
};


// sign out action creators

export const signOutRequest = () =>{
    return {
        type: SIGN_OUT_REQUEST,
    };
};

export const signOutSuccess = () =>{
    return {
      type: SIGN_OUT_SUCCESS,
    };
  };

export const signOutFailure = () =>{
    return {
        type: SIGN_OUT_FAILURE
    };
};

export const signOut = (history) =>{
    return function(dispatch){
        dispatch(signOutRequest());
        localStorage.clear();
        if(localStorage.getItem("USER-TOKEN")){
            dispatch(signOutFailure());
        }
        else{
            dispatch(signOutSuccess());
        }
    };
}


// fetch movies action creators

const fetchMoviesRequest = () =>{
    return{
        type: FETCH_MOVIES_REQUEST,
        payload: {
            loading: true
          }
    };
};

const fetchMoviesSuccess = (movieData) =>{
    
    return{
        type: FETCH_MOVIES_SUCCESS,
        payload: {
            movieData
        }
    };
};

const fetchMoviesFailure = (error) =>{
    return {
        type: FETCH_MOVIES_FAILURE,
        payload:error
    };
};

export const fetchMovie = (payload) =>{
    
    return async function (dispatch) {
        dispatch(fetchMoviesRequest());
        try{
            const res = await axios({
                    method:"get",
                    url: URL+'/getallmovies',
                    data: payload,
                });
                const result = res.data;
              
                dispatch(fetchMoviesSuccess(result));
        }catch(err){
            if(err.response && err.response.status === 401){
                dispatch(signOut());
            };
                dispatch(fetchMoviesFailure(err));
        }
    };
};

// fetch ONE movie action creators

const fetchOneMoviesRequest = () =>{
    return{
        type: FETCH_ONE_MOVIE_REQUEST,
        payload: {
            loading: true
          }
    };
};

const fetchOneMoviesSuccess = (movieDataOne) =>{
    
    return{
        type: FETCH_ONE_MOVIE_SUCCESS,
        payload: 
            {movieDataOne}
        
    };
};

const fetchOneMoviesFailure = (error) =>{
    return {
        type: FETCH_ONE_MOVIE_FAILURE,
        payload:error
    };
};

export const fetchOneMovie = (movieDataOne) =>{
   
    return async function (dispatch) {
        dispatch(fetchOneMoviesRequest());
        try{
            const res = await axios({
                    method:"post",
                    url: URL+'/getonemovie',
                    data: movieDataOne,
                    headers:{
                        "Content-type":"application/json",
                        "Accept":"application/json",
                        Authorization:`Bearer ${localStorage.getItem("USER-TOKEN")}`
                    }
                });
                
                const result = res.data;
                dispatch(fetchOneMoviesSuccess(result));
              
                
        }catch(err){
            if(err.response && err.response.status === 401){
                dispatch(signOut());
            };
                dispatch(fetchOneMoviesFailure(err));
        }
    };
};

// create Movie action

const createMovieRequest = () =>{
    return{
        type: CREATE_MOVIES_REQUEST,
    };
};

const createMovieSuccess = (createMovieData) =>{
    return{
        type: CREATE_MOVIES_SUCCESS,
        payload: {
            createMovieData
        }
    };
};

const createMovieFailure = (error) =>{
   
    return {
        type: CREATE_MOVIES_FAILURE,
        payload:error
    };
};

export const createMovie =  (createMovieData) =>{
    return async function (dispatch) {
  
        dispatch(createMovieRequest());
    try{
       const response = await axios({
            method:"post",
            url: URL+'/addmovie',
            data: createMovieData,
            headers:{
                "Content-type":"application/json",
                "Accept":"application/json",
                Authorization:`Bearer ${localStorage.getItem("USER-TOKEN")}`
            }
        });
        const data = response.data;
        dispatch(fetchMovie()); 
            
        dispatch(createMovieSuccess(data));
       
        toast.success("The Movie "+data.data.title+" was created");
         
           
          
    }catch(error){
        if(error.response && error.response.status === 401){
            dispatch(signOut());
        };
        dispatch(createMovieFailure(error));
    }
     
    };
};


// Update Movie action

const updateMovieRequest = () =>{
    return{
        type: UPDATE_MOVIES_REQUEST,
    };
};

const updateMovieSuccess = (deleteMovieData) =>{
    return{
        type: UPDATE_MOVIES_SUCCESS,
        payload: {
            deleteMovieData
        }
    };
};

const updateMovieFailure = (error) =>{
  
    return {
        type: UPDATE_MOVIES_FAILURE,
        payload:error
    };
};

// export const updateMovie =  (updateMovieData) =>{
//     return async function (dispatch) {
//         dispatch(updateMovieRequest());
//     try{
//        const response = await axios({
//             method:"PUT",
//             url: URL+'/updatemovie',
//             data: updateMovieData,
//             headers:{
//                 Authorization:`Bearer ${localStorage.getItem("USER-TOKEN")}`
//             }
//         });
        
//             const {data} = response;
//             if(!data.success){
            
//                  dispatch(updateMovieFailure(data.msg));
//                  return false
//             }
           
//             dispatch(fetchMovie());   
//             dispatch(updateMovieSuccess(data));
//     }catch(error){
//         if(error.response && error.response.status === 401){
//             dispatch(signOut());
//         };
//         dispatch(updateMovieFailure(error));
//     }
     
//     };
// };

export const updateMovie =  async (updateMovieData,dispatch) =>{

        dispatch(updateMovieRequest());
    try{
       const response = await axios({
            method:"PUT",
            url: URL+'/updatemovie',
            data: updateMovieData,
            headers:{
                Authorization:`Bearer ${localStorage.getItem("USER-TOKEN")}`
            }
        });
        
            const {data} = response;
            if(!data.success){
                
                 dispatch(updateMovieFailure(data.msg));
                
                 return false
            }
            else{
                dispatch(fetchMovie());   
                dispatch(updateMovieSuccess(data));
                console.log("Update Movie",data);
                toast.success(data.message);
                return true
            }
           
          
    }catch(error){
        if(error.response && error.response.status === 401){
            dispatch(signOut());
        };
       
        dispatch(updateMovieFailure(error));
    }
     
    
};

// Delete Movie action

const deleteMovieRequest = () =>{
    return{
        type: DELETE_MOVIES_REQUEST,
    };
};

const deleteMovieSuccess = (deleteMovieData) =>{
    return{
        type: DELETE_MOVIES_SUCCESS,
        payload: {
            deleteMovieData
        }
    };
};

const deleteMovieFailure = (error) =>{
    return {
        type: DELETE_MOVIES_FAILURE,
        payload:error
    };
};

export const deleteMovie =  (deleteMovieData) =>{
    return async function (dispatch) {
        dispatch(deleteMovieRequest());
    try{
       const response = await axios({
            method:"DELETE",
            url: URL+'/deletemovie',
            data: deleteMovieData,
            headers:{
                Authorization:`Bearer ${localStorage.getItem("USER-TOKEN")}`
            }
        });
        
            const {data} = response;
            dispatch(fetchMovie()); 
            toast.success(data.message);
            dispatch(deleteMovieSuccess(data));
    }catch(error){
        if(error.response && error.response.status === 401){
            dispatch(signOut());
        };
       
        dispatch(deleteMovieFailure(error));
    }
     
    };
};

//Action Toggle Edit
const toggleEditSuccess = (editData) =>{
    return{
        type: EDIT_ON,
        payload: {
            editData
        }
    };
};
export const toggleEditTrue = () =>{
    return{
        type: EDIT_ON,
      
    };
};


export const toggleEdit = (editData) =>{
          
           
    return async function(dispatch){
        try{
        dispatch(fetchOneMovie(editData));
         dispatch(toggleEditSuccess())
         dispatch(fetchMovie());
        }
        catch(error){

        }
    }
};

// Filter movie action creators

const filterMoviesRequest = () =>{
    return{
        type: FILTER_MOVIE_REQUEST,
        payload: {
            loading: true
          }
    };
};

const filterMoviesSuccess = (movieFilterData) =>{
    
    return{
        type: FILTER_MOVIE_SUCCESS,
        payload: 
            {movieFilterData}
        
    };
};

const filterMoviesFailure = (error) =>{
    return {
        type: FILTER_MOVIE_FAILURE,
        payload:error
    };
};

export const filterMovie = (movieFilterData) =>{
   
    return async function (dispatch) {
        dispatch(filterMoviesRequest());
        try{
            const res = await axios({
                    method:"post",
                    url: URL+'/searchmovie',
                    data: movieFilterData,
                    headers:{
                        "Content-type":"application/json",
                        "Accept":"application/json",
                        Authorization:`Bearer ${localStorage.getItem("USER-TOKEN")}`
                    }
                });
                
                const result = res.data.data;
                  
              
                dispatch(filterMoviesSuccess(result));
        }catch(err){
            if(err.response && err.response.status === 401){
            dispatch(signOut());
        };
                dispatch(filterMoviesFailure(err));
        }
    };
};


