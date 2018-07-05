import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import MemberPaids from './memberPaids';
import rateLimit from '../../modules/rate-limit.js';

export const upsertMemberPaid = new ValidatedMethod({
  name: 'memberPaids.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    no: { type: Number, optional: true },
    name: { type: String, optional: true },
    paids: { type: Array, optional: true },
  }).validator(),
  run(document) {
    return MemberPaids.upsert({ _id: document._id },
      { $set: document });
  },
});

export const removeMemberPaid = new ValidatedMethod({
  name: 'memberPaids.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    MemberPaids.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertMemberPaid,
    removeMemberPaid,
  ],
  limit: 5,
  timeRange: 1000,
});
