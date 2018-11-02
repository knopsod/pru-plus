import React from 'react';
import { browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name.first} ${name.last}` : '';
};

const AuthenticatedNavigation = () => (
  <div>
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
        <NavItem eventKey={ 5 } href="/nos">หางาน</NavItem>
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
      <NavDropdown eventKey={ 3 } title={ userName() } id="basic-nav-dropdown">
        <MenuItem eventKey={ 3.1 } onClick={ handleLogout }>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

export default AuthenticatedNavigation;
