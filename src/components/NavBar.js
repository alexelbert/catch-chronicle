import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
      <Navbar className={styles.NavBar} expand="md" fixed="top">
        <Container>
          <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto text-left">
              <NavLink 
                exact
                className={styles.NavLink} 
                activeClassName={styles.Active}
                to="/" 
              >
                Home
              </NavLink>
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
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );

};

export default NavBar;