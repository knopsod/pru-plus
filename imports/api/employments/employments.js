import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Factory } from 'meteor/dburles:factory';

const Employments = new Mongo.Collection('Employments');
export default Employments;

Employments.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Employments.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Employments.schema = new SimpleSchema({
  date: {
    type: String,
    label: 'The date of the employment.',
    optional: true,
  },
  startTime: {
    type: String,
    label: 'The start time of the employment.',
    optional: true,
  },
  endTime: {
    type: String,
    label: 'The end time of the employment.',
    optional: true,
  },
  title: {
    type: String,
    label: 'The title of the employment.',
    optional: true,
  },
  body: {
    type: String,
    label: 'The body of the employment.',
    optional: true,
  },
  userId: {
    type: String,
    label: 'The user ID of the employment.',
    optional: true,
  },
  employees: {
    type: Array,
    label: 'The employees of the employment.',
    optional: true,
  },
  'employees.$': Object,
  'employees.$.user': { type: Object, optional: true },
  'employees.$.user.emails': { type: Array, optional: true },
  'employees.$.user.emails.$': { type: Object, optional: true },
  'employees.$.user.emails.$.address': { type: String, optional: true },
  'employees.$.user.emails.$.verified': { type: Boolean, optional: true },
  'employees.$.user.profile': { type: Object, optional: true },
  'employees.$.user.profile.name': { type: Object, optional: true },
  'employees.$.user.profile.name.first': { type: String, optional: true },
  'employees.$.user.profile.name.last': { type: String, optional: true },
  'employees.$.user._id': { type: String, optional: true },
  'employees.$.allowed': { type: Boolean, optional: true },
});

Employments.attachSchema(Employments.schema);

Factory.define('employment', Employments, {
  date: () => 'Factory Date',
  startTime: () => 'Factory Start Time',
  endTime: () => 'Factory End Time',
  title: () => 'Factory Title',
  body: () => 'Factory Body',
  userId: () => 'Factory User ID',
  employees: () => 'Factory Employees',
});
