import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Typings from '../typings';

Meteor.publish('typings.list', (employmentId) => {
  check(employmentId, String);
  return Typings.find(
    { employmentId }
  );
});

Meteor.publish('typings.user.list', (employmentId, employeeId) => {
  check(employmentId, String);
  check(employeeId, String);
  return Typings.find(
    { employmentId, employeeId }
  );
});