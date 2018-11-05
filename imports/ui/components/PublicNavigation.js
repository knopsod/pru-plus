import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const PublicNavigation = () => (<div>
  <Nav>
    {/* <LinkContainer to="/documents">
      <NavItem eventKey={ 2 } href="/documents">Documents</NavItem>
    </LinkContainer>
    <LinkContainer to="/teams">
      <NavItem eventKey={ 2 } href="/teams">Teams</NavItem>
    </LinkContainer> */}
    <LinkContainer to="/employ">
      <NavItem eventKey={ 4 } href="/employ">จ้าง</NavItem>
    </LinkContainer>
    <LinkContainer to="/job">
      <NavItem eventKey={ 5 } href="/job">หางาน</NavItem>
    </LinkContainer>
    <NavDropdown eventKey={ 6 } title="เริ่มต้น" id="begin-nav-dropdown">
      <LinkContainer to="/bets">
        <MenuItem eventKey={ 6.1 } href="/bets">ฝึกคีย์</MenuItem>
      </LinkContainer>
      <LinkContainer to="/nos">
        <MenuItem eventKey={ 6.2 } href="/nos">ตัวอย่างตัดออก</MenuItem>
      </LinkContainer>
    </NavDropdown>
  </Nav>
  <Nav pullRight>
    <LinkContainer to="signup">
      <NavItem eventKey={ 1 } href="/signup">Sign Up</NavItem>
    </LinkContainer>
    <LinkContainer to="login">
      <NavItem eventKey={ 2 } href="/login">Log In</NavItem>
    </LinkContainer>
  </Nav>
</div>);

/*
const PublicNavigation = () => (
  <div>
    <Nav>
      <LinkContainer to="/bets">
        <NavItem eventKey={ 2 } href="/bets">บันทึก</NavItem>
      </LinkContainer>
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
*/
export default PublicNavigation;
