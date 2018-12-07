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
        { `${date.substr(0, 10)}, ${timeFromInt(startTime)}-${timeFromInt(endTime)} ${title} ` }<span className='pull-right'>{ `(${employees && employees.length} employee${employees && employees.length > 1 ? 's': ''})` }</span>
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
    const employments = Employments.find().fetch();
    onData(null, { employments });
  }
}, EmploymentsList);
