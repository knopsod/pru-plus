import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Bets from '../bets';

Meteor.publish('bets.list', () => Bets.find());

Meteor.publish('bets.view', (_id) => {
  check(_id, String);
  return Bets.find(_id);
});
