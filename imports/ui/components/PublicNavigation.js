import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';
/*
const PublicNavigation = () => (
  <Nav pullRight>
    <LinkContainer to="signup">
      <NavItem eventKey={ 1 } href="/signup">Sign Up</NavItem>
    </LinkContainer>
    <LinkContainer to="login">
      <NavItem eventKey={ 2 } href="/login">Log In</NavItem>
    </LinkContainer>
  </Nav>
);
*/
const PublicNavigation = () => (
  <div>
    <Nav>
      {/* <LinkContainer to="/bets">
        <NavItem eventKey={ 2 } href="/bets">บันทึก</NavItem>
      </LinkContainer> */}
      <LinkContainer to="/nos">
        <NavItem eventKey={ 2 } href="/nos">รวมยอด</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <LinkContainer to="signup">
        <NavItem eventKey={ 1 } href="/signup">Sign Up</NavItem>
      </LinkContainer>
      <LinkContainer to="login">
        <NavItem eventKey={ 2 } href="/login">Log In</NavItem>
      </LinkContainer>
    </Nav>
  </div>
);

export default PublicNavigation;
