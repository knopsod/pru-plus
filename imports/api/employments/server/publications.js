import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Employments from '../employments';

Meteor.publish('employments.list', (userId) => {
  check(userId, String);
  return Employments.find(
    { userId },
    { sort: { date: -1 } }
  );
});

Meteor.publish('employments.view', (_id) => {
  check(_id, String);
  return Employments.find(_id);
});

Meteor.publish('employments.available.list', (now) => {
  check(now, String);
  return Employments.find(
    { date: { $gte: now } },
    { sort: { date: -1 } }
  );
});

Meteor.publish('employments.pending.list', (now, userId) => {
  check(now, String);
  check(userId, String);
  return Employments.find(
    { date: { $gte: now }, employees: { $elemMatch: { userId, allowed: false } } },
    { sort: { date: -1 } }
  );
});

Meteor.publish('employments.onHand.list', (now, userId) => {
  check(now, String);
  check(userId, String);
  return Employments.find(
    { date: { $gte: now }, employees: { $elemMatch: { userId, allowed: true } } },
    { sort: { date: -1 } }
  );
});

Meteor.publish('employments.done.list', (now, userId) => {
  check(now, String);
  check(userId, String);
  return Employments.find(
    { date: { $lt: now }, employees: { $elemMatch: { userId, allowed: true } } },
    { sort: { date: -1 } }
  );
});
