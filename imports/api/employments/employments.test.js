/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { assert } from 'meteor/practicalmeteor:chai';
import Employments from './employments.js';

describe('Employments collection', function () {
  it('registers the collection with Mongo properly', function () {
    assert.equal(typeof Employments, 'object');
  });
});
