/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';
import { generatePDF } from '../../api/bets/methods';
import container from '../../modules/container';

const handleGeneratePDF = (createdDate) => {
  generatePDF.call({ createdDate }, (error) => {
    if (error) {
      
    } else {
      window.open(Meteor.absoluteUrl() + `xlsx/${Meteor.userId()}.txt`);
    }
  });
}

const betsPDFButton = ({ createdDate }) => (<div>
  <Button bsStyle="primary"
    onClick={() => handleGeneratePDF(createdDate)}>Export</Button>
</div>);

export default container((props, onData) => { 
  const createdDate = Session.get('createdDate') ? Session.get('createdDate').substring(0, 10) : '';

  onData(null, { createdDate });
}, betsPDFButton);