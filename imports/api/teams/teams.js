import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Factory } from 'meteor/dburles:factory';

const Teams = new Mongo.Collection('Teams');
export default Teams;

Teams.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Teams.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Teams.schema = new SimpleSchema({
  name: {
    type: String,
    label: 'The name of the team.',
  },
  manager: {
    type: String,
    label: 'The manager of the team.',
  },
});

Teams.attachSchema(Teams.schema);

Factory.define('team', Teams, {
  name: () => 'Factory Name',
  manager: () => 'Factory Manager',
});
