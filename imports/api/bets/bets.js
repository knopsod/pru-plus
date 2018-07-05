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
  up2: {
    type: String,
    label: 'The up2 of the bet.',
  },
  down2: {
    type: String,
    label: 'The down2 of the bet.',
  },
  up3: {
    type: String,
    label: 'The up3 of the bet.',
  },
  down3: {
    type: String,
    label: 'The down3 of the bet.',
  },
  permute: {
    type: String,
    label: 'The permute of the bet.',
  },
});

Bets.attachSchema(Bets.schema);

Factory.define('bet', Bets, {
  up2: () => 'Factory Up2',
  down2: () => 'Factory Down2',
  up3: () => 'Factory Up3',
  down3: () => 'Factory Down3',
  permute: () => 'Factory Permute',
});
