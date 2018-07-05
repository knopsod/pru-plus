import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import MemberPaids from '../memberPaids';

Meteor.publish('memberPaids.list', () => MemberPaids.find());

Meteor.publish('memberPaids.view', (_id) => {
  check(_id, String);
  return MemberPaids.find(_id);
});
