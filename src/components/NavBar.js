import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };


  const addCatchIcon = (
    <NavLink 
      exact
      className={styles.NavLink} 
      activeClassName={styles.Active}
      to="/catches/create" 
    >
      Add Catch
    </NavLink>
  );
  
  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        Feed
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/mycatches"
      >
        My Catches
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/liked"
      >
        Liked
      </NavLink>
      <NavLink 
        exact
        className={styles.NavLink} 
        to="/" 
        onClick={handleSignOut}
      >
        Sign Out
      </NavLink>
      <NavLink 
        exact
        className={styles.NavLink} 
        to={`/profiles/${currentUser?.profile_id}`} 
      >
        <Avatar src={currentUser?.profile_picture} height={40} />
      </NavLink>
    </>
  );
  
  const loggedOutIcons = (
    <>
      <NavLink 
        exact
        className={styles.NavLink} 
        activeClassName={styles.Active}
        to="/signin" 
      >
        Sign In
      </NavLink>
      <NavLink 
        exact
        className={styles.NavLink} 
        activeClassName={styles.Active}
        to="/signup" 
      >
        Sign Up
      </NavLink>
    </>
  );
    
  return (
      <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
        <Container>
          <NavLink to="/">
          <Navbar.Brand className={styles.Brand}>
            <img src={logo} alt="logo" height="45" />
            <span className={`d-none d-md-inline ${styles.BrandText}`}>Catch Chronicle</span>
          </Navbar.Brand>
          </NavLink>
          {currentUser && addCatchIcon}
          <Navbar.Toggle 
            ref={ref}
            onClick={() => setExpanded(!expanded)} 
            aria-controls="basic-navbar-nav" 
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto text-right">
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );

};

export default NavBar;