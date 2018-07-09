import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Bets from '../bets';

Meteor.publish('bets.list', (value) => {
  check(value, String);
  return Bets.find({ createdDate: value });
});

Meteor.publish('bets.view', (_id) => {
  check(_id, String);
  return Bets.find(_id);
});
