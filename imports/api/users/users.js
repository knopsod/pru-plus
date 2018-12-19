import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Factory } from 'meteor/dburles:factory';
import { Meteor } from 'meteor/meteor';

const Users = Meteor.users;
export default Users;

Users.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Users.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

// Users.schema = new SimpleSchema({
//   profile: {
//     type: Object,
//     label: 'The employer of the employment.',
//     optional: true,
//   },
//   'profile.name': { type: Object, optional: true },
//   'profile.name.first': { type: String, optional: true },
//   'profile.name.last': { type: String, optional: true },
//   'profile.lineId': { type: String, optional: true },
//   _id: { type: String, optional: true },
// });

// Users.attachSchema(Users.schema);

Factory.define('user', Users, {
  profile: () => 'Factory Profile',
  _id: () => 'Factory ID',
});
