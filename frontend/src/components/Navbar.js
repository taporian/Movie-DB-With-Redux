import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/action-creators";
import {Nav,Logo,NavDropDown,Menu,MenuLink} from './styled/Navbar.style'

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.authenticationReducer);
  const handleSignOut = () => {
    dispatch(signOut(history));
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Nav>
      <Logo href="/">
        Movie<span>&nbsp;List </span>
      </Logo>
      <NavDropDown onClick={() => setIsOpen(!isOpen)}>
        <span />
        <span />
        <span />
      </NavDropDown>
      <Menu isOpen={isOpen}>
        <MenuLink href="/">Home</MenuLink>
        <MenuLink href="/createmovie">Create Movies</MenuLink>
        <MenuLink href="/editmovie">Edit Movies</MenuLink>
        <MenuLink href="/signup">Sign Up</MenuLink>
   
        {currentUser !== null ? (
        
        <MenuLink href="/" onClick={handleSignOut}>{currentUser}Sign Out</MenuLink>
        ) : (
        <MenuLink href="/signin">Sign In</MenuLink>
        )}
      
       
      </Menu>
    </Nav>
  );
};

export default Navbar;