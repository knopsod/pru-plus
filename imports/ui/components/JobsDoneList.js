import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Employments from '../../api/employments/employments';
import container from '../../modules/container';
import { timeFromInt } from 'time-number';
import moment from 'moment';
import { browserHistory } from 'react-router';

const handleNav = (employerId) => {
  browserHistory.push(`/users/${employerId}`);
};

const JobsDoneList = ({ employments }) => (
  employments.length > 0 ? <ListGroup className="EmploymentsList">
    {employments.map(({ _id, date, startTime, endTime, title, employer }) => (
      <ListGroupItem key={ _id } 
      onClick={ () => handleNav(employer._id) }>
        { `${date.substr(0, 10)}, ${timeFromInt(startTime)}-${timeFromInt(endTime)}, ${title}, by : ${employer.profile.name.first} ${employer.profile.name.last.substr(0, 1)}.` }<a className="btn btn-link btn-xs pull-right">ให้คะแนน</a>
      </ListGroupItem>
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No employments yet.</Alert>
);

JobsDoneList.propTypes = {
  employments: PropTypes.array,
};

export default container((props, onData) => {
  const now = moment().toISOString(true).substring(0, 10); // send now with format 'YYYY-MM-DD'
  const subscription = Meteor.subscribe('employments.done.list', now, Meteor.userId());
  if (subscription.ready()) {
    const employments = Employments.find(
      { date: { $lt: now }, employees: { $elemMatch: { userId: Meteor.userId(), allowed: true } } },
      { sort: { date: -1 } }
    ).fetch();
    onData(null, { employments });
  }
}, JobsDoneList);
