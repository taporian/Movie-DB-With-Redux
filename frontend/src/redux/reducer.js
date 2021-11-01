import jwt from 'jsonwebtoken';


import{
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
    FETCH_MOVIES_REQUEST,
    FETCH_MOVIES_FAILURE,

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

export const isValidToken = (token) =>{
    let decoded = jwt.decode(token);
    return new Date(decoded.exp * 1000) > new Date() ? decoded : null;
};

export const toggleEditreducer = (state=true,action)=>{
    switch(action.type){
        case EDIT_ON:
            return !state;
         default:
            return state;
    }
}



const iniState ={
    currentUser: localStorage.getItem("USER-TOKEN")
        ? isValidToken(localStorage.getItem("USER-TOKEN"))
        : null,
    token: localStorage.getItem("USER-TOKEN")
        ? localStorage.getItem("USER-TOKEN")
        : null,
    error:"",
    loading: false,
    isAuthenticated: false,
    movieData:[],
   createMovieData:[],
   deleteMovie:[],
   movieDataOne:[],
   movieFilterData:[],
 
};
// FETCH ALL MOVIES

export const fetchMoviesReducer = (state=iniState,action) =>{
    switch(action.type){
        case FETCH_MOVIES_REQUEST:
            return{
                ...state,
                loading:false,
          
            };
        case FETCH_MOVIES_SUCCESS:
           
            return{
                ...state,
                loading:false,
                error:null,
              
                movieData:action.payload.movieData
            };
        case FETCH_MOVIES_FAILURE:
            return{
                ...state,
                loading:false,
                error: action.payload.error
            };
            default:
                return{...state};
    }
}

// FETCH ONE MOVIE

export const fetchOneMoviesReducer = (state=iniState,action) =>{
    switch(action.type){
        case FETCH_ONE_MOVIE_REQUEST:
            return{
                ...state,
                loading:false,
          
            };
        case FETCH_ONE_MOVIE_SUCCESS:
           
            return{
                ...state,
                loading:false,
                error:null,
              
                movieDataOne:action.payload.movieDataOne
            };
        case FETCH_ONE_MOVIE_FAILURE:
            return{
                ...state,
                loading:false,
                error: action.payload.error
            };
            default:
                return{...state};
    }
}


// Create Movie

export const createMoviesReducer = (state=iniState,action) =>{
    switch(action.type){
        case CREATE_MOVIES_REQUEST:
            return{
                ...state,
                loading:false,
          
            };
        case CREATE_MOVIES_SUCCESS:
            
            return{
                ...state,
                loading:false,
        
                error:null,
                createMovieData:action.payload.createMovieData
            };
        case CREATE_MOVIES_FAILURE:
            return{
                ...state,
                loading:false,
                error: action.payload.error
            };
            default:
                return{...state};
    }
}

// Delete Movie

export const deleteMoviesReducer = (state=iniState,action) =>{
    switch(action.type){
        case DELETE_MOVIES_REQUEST:
            return{
                ...state,
                loading:false,
          
            };
        case DELETE_MOVIES_SUCCESS:
           
            
            return{
                ...state,
                loading:false,
        
                error:null,
                deleteMovieData:action.payload.deleteMovieData
            };
        case DELETE_MOVIES_FAILURE:
            return{
                ...state,
                loading:false,
                error: action.payload.error
            };
            default:
                return{...state};
    }
}
//UPDATE MOVIE

export const updateMoviesReducer = (state=iniState,action) =>{
    switch(action.type){
        case UPDATE_MOVIES_REQUEST:
            return{
                ...state,
                loading:false,
          
            };
        case UPDATE_MOVIES_SUCCESS:
           
            
            return{
                ...state,
                loading:false,
        
                error:null,
                updateMovieData:action.payload.updateMovieData
            };
        case  UPDATE_MOVIES_FAILURE:
           
            return{
                ...state,
                loading:false,
                error: action.payload
            };
            default:
                return{...state};
    }
}

 
export const authenticationReducer = (state=iniState,action) =>{
    switch(action.type){
        case SIGN_IN_REQUEST:
        case SIGN_UP_REQUEST:
        case SIGN_OUT_REQUEST:
            return{
                ...state,
                loading: true,
                isAuthenticated:false,
            };
        case SIGN_IN_FAILURE:
        case SIGN_UP_FAILURE:
        case SIGN_OUT_FAILURE:
           
            return {
                ...state,
                loading: false,
                error: action.payload,
                currentUser: null,
                isAuthenticated: false,
            };
        case SIGN_UP_SUCCESS:
        case SIGN_IN_SUCCESS:
            return{
                ...state,
                loading:false,
                token: action.payload.token,
                currentUser: action.payload.user,
                isAuthenticated: true,
            };
        case SIGN_OUT_SUCCESS:
            localStorage.removeItem("USER-TOKEN");
            return{
                ...state,
                isAuthenticated:false,
                loading:false,
                currentUser:null,
                token:"",
            };
            default:
                return{state};
    }
};

// FETCH ONE MOVIE

export const filterMoviesReducer = (state=iniState,action) =>{
    switch(action.type){
        case FILTER_MOVIE_REQUEST:
            return{
                ...state,
                loading:false,
          
            };
        case FILTER_MOVIE_SUCCESS:
           
            return{
                ...state,
                loading:false,
                error:null,
              
                movieFilterData:action.payload.movieFilterData
            };
        case FILTER_MOVIE_FAILURE:
            return{
                ...state,
                loading:false,
                error: action.payload.error
            };
            default:
                return{...state};
    }
}



export default authenticationReducer;