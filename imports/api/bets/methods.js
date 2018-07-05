import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Bets from './bets';
import rateLimit from '../../modules/rate-limit.js';

export const upsertBet = new ValidatedMethod({
  name: 'bets.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    up2: { type: String, optional: true },
    down2: { type: String, optional: true },
  }).validator(),
  run(bet) {
    return Bets.upsert({ _id: bet._id },
      { $set: bet });
  },
});

export const removeBet = new ValidatedMethod({
  name: 'bets.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Bets.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertBet,
    removeBet,
  ],
  limit: 5,
  timeRange: 1000,
});
