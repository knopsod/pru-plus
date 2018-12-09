import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Employments from '../../api/employments/employments';
import container from '../../modules/container';
import { timeFromInt } from 'time-number';

import { upsertEmployment } from '../../api/employments/methods';

const handleNav = (_id, employees) => {
  const upsert = {
    _id,
    employees: [
      ...employees.filter(emp => emp.userId !== Meteor.userId()),
    ],
  };

  upsertEmployment.call(upsert, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert('Joining cancelled', 'success');
    }
  });
};

const JobsPendingList = ({ employments }) => (
  employments.length > 0 ? <ListGroup className="EmploymentsList">
    {employments.map(({ _id, date, startTime, endTime, title, employer, employees }) => (
      <ListGroupItem key={ _id }
      onClick={ () => handleNav(_id, employees) }>
        { `${date.substr(0, 10)}, ${timeFromInt(startTime)}-${timeFromInt(endTime)}, Title : ${title}, by : ${employer.profile.name.first} ${employer.profile.name.last.substr(0, 1)}.` }<a className="btn btn-link btn-xs pull-right">ยกเลิก</a>
      </ListGroupItem>
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No employments yet.</Alert>
);

JobsPendingList.propTypes = {
  employments: PropTypes.array,
};

export default container((props, onData) => {
  const now = new Date().toISOString().substr(0, 10); // send now with format 'YYYY-MM-DD'
  const subscription = Meteor.subscribe('employments.onHand.list', now, Meteor.userId());
  if (subscription.ready()) {
    const employments = Employments.find(
      { date: { $gte: now }, employees: { $elemMatch: { userId: Meteor.userId(), allowed: false } } },
      { sort: { date: -1 } }
    ).fetch();

    onData(null, { employments });
  }
}, JobsPendingList);
