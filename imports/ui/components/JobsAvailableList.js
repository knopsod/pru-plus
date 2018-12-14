import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Employments from '../../api/employments/employments';
import container from '../../modules/container';
import { timeFromInt } from 'time-number';
import moment from 'moment';

import { upsertEmployment } from '../../api/employments/methods';

const handleNav = (_id, employees) => {
  console.log(Meteor.user());
  if (employees.filter(emp => emp.userId === Meteor.userId()).length){
    return;
  } else {
    const upsert = {
      _id,
      employees: [
        ...employees,
        {
          userId: Meteor.userId(),
          user: Meteor.user(),
          allowed: false,
          feedbackLeft: false,
          feedbackReceived: false,
        },
      ],
    };

    upsertEmployment.call(upsert, (error, response) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Joining...', 'success');
      }
    });
  }
};

const JobsAvailableList = ({ employments }) => (
  employments.length > 0 ? <ListGroup className="EmploymentsList">
    {employments.map(({ _id, date, startTime, endTime, title, employer, employees }) => (
      <ListGroupItem key={ _id } 
      onClick={ () => handleNav(_id, employees) }>
        { `${date.substr(0, 10)}, ${timeFromInt(startTime)}-${timeFromInt(endTime)}, Title : ${title}, by : ${employer.profile.name.first} ${employer.profile.name.last.substr(0, 1)}.` }<a className="btn btn-link btn-xs pull-right">ร่วมงาน</a>
      </ListGroupItem>
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No employments yet.</Alert>
);

JobsAvailableList.propTypes = {
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
}, JobsAvailableList);
