import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Employments from './employments';
import rateLimit from '../../modules/rate-limit.js';

export const upsertEmployment = new ValidatedMethod({
  name: 'employments.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    lottoDate: { type: Date, optional: true },
    title: { type: String, optional: true },
    body: { type: String, optional: true },
    userId: { type: String, optional: true },
    employees: { type: Array, optional: true },
    'employees.$': { type: Object, optional: true },
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
  }).validator(),
  run(employment) {
    return Employments.upsert({ _id: employment._id },
      { $set: employment });
  },
});

export const removeEmployment = new ValidatedMethod({
  name: 'employments.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Employments.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertEmployment,
    removeEmployment,
  ],
  limit: 5,
  timeRange: 1000,
});
