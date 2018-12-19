import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Users from './users';
import rateLimit from '../../modules/rate-limit.js';

export const upsertUser = new ValidatedMethod({
  name: 'users.upsert',
  validate: new SimpleSchema(
    {
      _id: { type: String, optional: true },
      profile: { type: Object, optional: true },
      'profile.name': { type: Object, optional: true },
      'profile.name.first': { type: String, optional: true },
      'profile.name.last': { type: String, optional: true },
      'profile.lineId': { type: String, optional: true },
    }
  ).validator(),
  run(user) {
    const _id = user._id;
    delete user._id;
    return Users.upsert({ _id },
      { $set: user });
  },
});

export const removeUser = new ValidatedMethod({
  name: 'users.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Users.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertUser,
    removeUser,
  ],
  limit: 5,
  timeRange: 1000,
});
