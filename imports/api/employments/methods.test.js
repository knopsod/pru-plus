/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import Employments from './employments.js';
import { upsertEmployment, removeEmployment } from './methods.js';

describe('Employments methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('inserts a employment into the Employments collection', function () {
    upsertEmployment.call({
      title: 'You can\'t arrest me, I\'m the Cake Boss!',
      body: 'They went nuts!',
    });

    const getEmployment = Employments.findOne({ title: 'You can\'t arrest me, I\'m the Cake Boss!' });
    assert.equal(getEmployment.body, 'They went nuts!');
  });

  it('updates a employment in the Employments collection', function () {
    const { _id } = Factory.create('employment');

    upsertEmployment.call({
      _id,
      title: 'You can\'t arrest me, I\'m the Cake Boss!',
      body: 'They went nuts!',
    });

    const getEmployment = Employments.findOne(_id);
    assert.equal(getEmployment.title, 'You can\'t arrest me, I\'m the Cake Boss!');
  });

  it('removes a employment from the Employments collection', function () {
    const { _id } = Factory.create('employment');
    removeEmployment.call({ _id });
    const getEmployment = Employments.findOne(_id);
    assert.equal(getEmployment, undefined);
  });
});
