import React from 'react';
import { browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import Employments from '../../api/employments/employments';
import container from '../../modules/container';
import moment from 'moment';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name.first} ${name.last}` : '';
};

const AuthenticatedNavigation = ({ employments }) => (
  <div>
    <Nav>
      {/* <LinkContainer to="/documents">
        <NavItem eventKey={ 2 } href="/documents">Documents</NavItem>
      </LinkContainer>
      <LinkContainer to="/teams">
        <NavItem eventKey={ 2 } href="/teams">Teams</NavItem>
      </LinkContainer> */}
      <LinkContainer to="/employments">
        <NavItem eventKey={ 4 } href="/employments">จ้างงาน</NavItem>
      </LinkContainer>
      <LinkContainer to="/jobs">
        <NavItem eventKey={ 5 } href="/jobs">หางาน({ employments.length })</NavItem>
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
        <MenuItem eventKey={ 3.1 } href="/profile">โปรไฟล์</MenuItem>
        <MenuItem eventKey={ 3.2 } onClick={ handleLogout }>ออกจากระบบ</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

AuthenticatedNavigation.propTypes = {
  employments: PropTypes.array,
};

export default container((props, onData) => {
  const now = moment().toISOString(true).substring(0, 10); // send now with format 'YYYY-MM-DD'
  const subscription = Meteor.subscribe('employments.available.list', now);
  if (subscription.ready()) {
    const employments = Employments.find(
      { date: { $gte: now } },
      { sort: { date: -1 } }
    ).fetch();

    onData(null, { employments });
  }
}, AuthenticatedNavigation);
