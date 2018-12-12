import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
import Typings from './typings';
import rateLimit from '../../modules/rate-limit.js';

export const upsertTyping = new ValidatedMethod({
  name: 'typings.upsert',
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
    employmentId: { type: String, optional: true },
    employeeId: { type: String, optional: true },
    employee: { type: Object, optional: true },
    'employee.emails': { type: Array, optional: true },
    'employee.emails.$': { type: Object, optional: true },
    'employee.emails.$.address': { type: String, optional: true },
    'employee.emails.$.verified': { type: Boolean, optional: true },
    'employee.profile': { type: Object, optional: true },
    'employee.profile.name': { type: Object, optional: true },
    'employee.profile.name.first': { type: String, optional: true },
    'employee.profile.name.last': { type: String, optional: true },
    'employee._id': { type: String, optional: true },
  }).validator(),
  run(typing) {
    return Typings.upsert({ _id: typing._id },
      { $set: typing });
  },
});

export const removeTyping = new ValidatedMethod({
  name: 'typings.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Typings.remove(_id);
  },
});

var content = [];
for(var i = 0; i < 30; i++) {
  content.push('Content line ' + i);
}

export const generatePDF = new ValidatedMethod({
  name: 'typings.generatePDF',
  validate: new SimpleSchema({
    createdDate: { type: String, optional: true },
  }).validator(),
  run({ createdDate }) {
    const bets = Typings.find({ createdDate: createdDate }).fetch();
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
    upsertTyping,
    removeTyping,
  ],
  limit: 5,
  timeRange: 1000,
});
