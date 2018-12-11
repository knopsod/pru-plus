import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Employments from '../../api/employments/employments';
import container from '../../modules/container';
import { timeFromInt } from 'time-number';

const handleNav = _id => browserHistory.push(`/employments/${_id}`);

const EmploymentsList = ({ employments }) => (
  employments.length > 0 ? <ListGroup className="EmploymentsList">
    {employments.map(({ _id, date, startTime, endTime, title, employees }) => (
      <ListGroupItem key={ _id } 
      onClick={ () => handleNav(_id) }>
        { `${date.substr(0, 10)}, ${timeFromInt(startTime)}-${timeFromInt(endTime)} ${title} ` }<span className='pull-right'>{ `(ผู้พิมพ์ ${employees.filter(emp => emp.allowed).length} คน จากทั้งหมด ${employees.length} คน)` }</span>
      </ListGroupItem>
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No employments yet.</Alert>
);

EmploymentsList.propTypes = {
  employments: PropTypes.array,
};

export default container((props, onData) => {
  const subscription = Meteor.subscribe('employments.list', Meteor.userId());
  if (subscription.ready()) {
    const employments = Employments.find({ userId: Meteor.userId() }, { sort: { date: -1 } }).fetch();
    onData(null, { employments });
  }
}, EmploymentsList);
