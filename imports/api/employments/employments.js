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
  title: {
    type: String,
    label: 'The title of the employment.',
  },
  body: {
    type: String,
    label: 'The body of the employment.',
  },
  userId: {
    type: String,
    label: 'The user ID of the employment.',
  },
  employees: {
    type: Array,
    label: 'The employees of the employment.',
  },
  'employees.$': Object,
  'employees.$.userId': String,
  'employees.$.allowed': Boolean,
});

Employments.attachSchema(Employments.schema);

Factory.define('employment', Employments, {
  title: () => 'Factory Title',
  body: () => 'Factory Body',
  userId: () => 'Factory User ID',
  employees: () => 'Factory Employees',
});
