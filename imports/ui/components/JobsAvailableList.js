import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Employments from '../../api/employments/employments';
import container from '../../modules/container';
import { timeFromInt } from 'time-number';

const handleNav = _id => browserHistory.push(`/employments/${_id}`);

const JobsAvailableList = ({ employments }) => (
  employments.length > 0 ? <ListGroup className="EmploymentsList">
    {employments.map(({ _id, date, startTime, endTime, title, employer }) => (
      <ListGroupItem key={ _id } 
      onClick={ () => handleNav(_id) }>
        { `${date.substr(0, 10)}, ${timeFromInt(startTime)}-${timeFromInt(endTime)}, Title : ${title}, by : ${employer.profile.name.first} ${employer.profile.name.last.substr(0, 1)}.` }<a className="btn btn-link btn-xs pull-right">Request</a>
      </ListGroupItem>
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No employments yet.</Alert>
);

JobsAvailableList.propTypes = {
  employments: PropTypes.array,
};

export default container((props, onData) => {
  const now = new Date().toISOString().substr(0, 10); // send now with format 'YYYY-MM-DD'
  const subscription = Meteor.subscribe('employments.available.list', now);
  if (subscription.ready()) {
    const employments = Employments.find({ date: { '$gte': now } }, { sort: { date: -1 } }).fetch();
    onData(null, { employments });
  }
}, JobsAvailableList);