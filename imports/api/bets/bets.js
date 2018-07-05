import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Factory } from 'meteor/dburles:factory';

const Bets = new Mongo.Collection('Bets');
export default Bets;

Bets.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Bets.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Bets.schema = new SimpleSchema({
  no: {
    type: String,
    label: 'The no of the bet.',
  },
  up2: {
    type: Number,
    label: 'The up2 of the bet.',
  },
  down2: {
    type: Number,
    label: 'The down2 of the bet.',
  },
  up3: {
    type: Number,
    label: 'The up3 of the bet.',
  },
  down3: {
    type: Number,
    label: 'The down3 of the bet.',
  },
  permute: {
    type: Number,
    label: 'The permute of the bet.',
  },
  createdAt: {
    type: Number,
    label: 'The createdAt of the bet.',
  },
  broker: {
    type: String,
    label: 'The broker of the bet.',
  },
  createdDate: {
    type: String,
    label: 'The created date of the bet.',
  },
});

Bets.attachSchema(Bets.schema);

Factory.define('bet', Bets, {
  no: () => 'Factory No',
  up2: () => 'Factory Up2',
  down2: () => 'Factory Down2',
  up3: () => 'Factory Up3',
  down3: () => 'Factory Down3',
  permute: () => 'Factory Permute',
  createdAt: () => 'Factory Created at',
  broker: () => 'Factory Broker',
  createdDate: () => 'Factory Created date',
});
