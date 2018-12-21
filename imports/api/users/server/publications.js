import { Meteor } from 'meteor/meteor';

Meteor.publish('users.list', () => {
  return Meteor.users.find({});
});

Meteor.publish('users.view', (_id) => {
  check(_id, String);
  return Meteor.users.find(_id);
});
