import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
import Bets from './bets';
import rateLimit from '../../modules/rate-limit.js';

export const upsertBet = new ValidatedMethod({
  name: 'bets.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    no: { type: String, optional: true },
    up2: { type: Number, optional: true },
    down2: { type: Number, optional: true },
    up3: { type: Number, optional: true },
    down3: { type: Number, optional: true },
    permute: { type: Number, optional: true },
    createdAt: { type: Number, optional: true },
    broker: { type: String, optional: true },
    percent: { type: Number, optional: true },
    fee: { type: Number, optional: true },
    income: { type: Number, optional: true },
    createdDate: { type: String, optional: true },
    email: { type: String, optional: true },
    userId: { type: String, optional: true },
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

var content = [];
for(var i = 0; i < 30; i++) {
    content.push('Content line ' + i);
}

export const generatePDF = new ValidatedMethod({
  name: 'bets.generatePDF',
  validate: new SimpleSchema({
    createdDate: { type: String, optional: true },
  }).validator(),
  run({ createdDate }) {
    const bets = Bets.find({ createdDate: createdDate }).fetch();
    console.log(bets);

    const fs = require('fs')

    const content = 'Some content!'

    try {
      if (!fs.existsSync(process.env.PWD + '/public/xlsx')){
        fs.mkdirSync(process.env.PWD + '/public/xlsx');
      }
      const data = fs.writeFile(
        process.env.PWD + `/public/xlsx/${Meteor.userId()}.txt`, 
        content);
      //file written successfully
    } catch (err) {
      console.error(err);
    }
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
