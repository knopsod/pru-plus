import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Factory } from 'meteor/dburles:factory';

const Typings = new Mongo.Collection('Typings');
export default Typings;

Typings.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Typings.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Typings.schema = new SimpleSchema({
  no: {
    type: String,
    label: 'The no of the typing.',
    optional: true,
  },
  up2: {
    type: Number,
    label: 'The up2 of the typing.',
    optional: true,
  },
  down2: {
    type: Number,
    label: 'The down2 of the typing.',
    optional: true,
  },
  up3: {
    type: Number,
    label: 'The up3 of the typing.',
    optional: true,
  },
  down3: {
    type: Number,
    label: 'The down3 of the typing.',
    optional: true,
  },
  permute: {
    type: Number,
    label: 'The permute of the typing.',
    optional: true,
  },
  createdAt: {
    type: Number,
    label: 'The createdAt of the typing.',
    optional: true,
  },
  broker: {
    type: String,
    label: 'The broker of the typing.',
    optional: true,
  },
  percent: {
    type: Number,
    label: 'The percent of the typing.',
    optional: true,
  },
  fee: {
    type: Number,
    label: 'The fee of the typing.',
    optional: true,
  },
  income: {
    type: Number,
    label: 'The income of the typing.',
    optional: true,
  },
  createdDate: {
    type: String,
    label: 'The created date of the typing.',
    optional: true,
  },
  employmentId: {
    type: String,
    label: 'The user ID of the typing.',
    optional: true,
  },
  employeeId: {
    type: String,
    label: 'The user ID of the typing.',
    optional: true,
  },
});

Typings.attachSchema(Typings.schema);

Factory.define('typing', Typings, {
  no: () => 'Factory No',
  up2: () => 'Factory Up2',
  down2: () => 'Factory Down2',
  up3: () => 'Factory Up3',
  down3: () => 'Factory Down3',
  permute: () => 'Factory Permute',
  createdAt: () => 'Factory Created at',
  broker: () => 'Factory Broker',
  percent: () => 'Factory Percent',
  fee: () => 'Factory Fee',
  income: () => 'Factory Income',
  createdDate: () => 'Factory Created date',
  employmentId: () => 'Factory User ID',
  employeeId: () => 'Factory User ID',
});
