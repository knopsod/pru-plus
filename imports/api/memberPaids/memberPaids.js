import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Factory } from 'meteor/dburles:factory';

const MemberPaids = new Mongo.Collection('MemberPaids');
export default MemberPaids;

MemberPaids.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

MemberPaids.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

MemberPaids.schema = new SimpleSchema({
  no: {
    type: Number,
    label: 'The no of the memberPaid.',
  },
  name: {
    type: String,
    label: 'The name of the memberPaid.',
  },
  paids: {
    type: Array,
    label: 'The paids of the memberPaid.',
  },
});

MemberPaids.attachSchema(MemberPaids.schema);

Factory.define('document', MemberPaids, {
  no: () => 'Factory No',
  name: () => 'Factory Name',
  paids: () => 'Factory Paids',
});
