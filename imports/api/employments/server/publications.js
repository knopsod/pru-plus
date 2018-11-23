import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Employments from '../employments';

Meteor.publish('employments.list', (userId) => {
  check(userId, String);
  return Employments.find({ userId });
});

Meteor.publish('employments.view', (_id) => {
  check(_id, String);
  return Employments.find(_id);
});
