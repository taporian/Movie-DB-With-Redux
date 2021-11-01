import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from "./Navbar";
import Signin from "../pages/Signin";
import Home from "../pages/Home";
import { useSelector } from "react-redux";
import Signup from "../pages/Signup";
import CreateMovie from "../pages/CreateMovie";
import EditMovie from "../pages/EditMovie";
import { GlobalStyle } from "./styled/GlobalStyle.style";


export default function Routes(){
    const { token } = useSelector((state) => state.authenticationReducer );
      const access_token = localStorage.getItem("USER-TOKEN") != null;

     
    
    return (
        <>
                
                    
                    
                 <GlobalStyle/>
                     { access_token && <NavBar token={access_token} />}
                        <Switch>
                        <PrivateRoute path="/" component={Home} exact token={access_token}/>
                        <LoginRoute path="/signin" component={Signin} token={access_token} />
                        <Route path="/signup" component={Signup} token={access_token} />
                        <PrivateRoute path="/createmovie" component={CreateMovie} token={access_token} />  
                        <PrivateRoute path="/editmovie" component={EditMovie} token={access_token} />                          
                        </Switch>
                    
              
       
        </>
    )
}
function LoginRoute({ path, component: Component, token, ...props }) {
    return (
        <Route
            {...props}
            path={path}
            render={(props) =>
                token ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    );
}
function PrivateRoute({ path, component: Component, token, ...props }) {
    return (
        <Route
            {...props}
            path={path}
            render={(props) =>
                token ? <Component {...props} /> : <Redirect to="/signin" />
            }
        />
    );
}