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
});

Bets.attachSchema(Bets.schema);

Factory.define('bet', Bets, {
  up2: () => 'Factory Up2',
  down2: () => 'Factory Down2',
});
