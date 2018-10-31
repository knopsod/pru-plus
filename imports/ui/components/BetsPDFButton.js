/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import Bets from '../../api/bets/bets';
import container from '../../modules/container';
import { CSVLink } from 'react-csv';

const headers = [
  { label: "ลำดับที่", key: "lineNo" },
  { label: "เบอร์", key: "no" },
  { label: "2บน", key: "up2" },
  { label: "2บน", key: "down2" },
  { label: "3ตรง", key: "up3" },
  { label: "3โต๊ด", key: "permute" },
  { label: "3ล่าง", key: "down3" },
];

const betsPDFButton = ({ bets }) => {
  return (<div>
    <CSVLink data={bets} headers={headers} filename={"LottoGoFast.csv"}
      className="btn btn-primary">
      Export
    </CSVLink>
  </div>)
};

betsPDFButton.propTypes = {
  bets: PropTypes.array,
};

export default container((props, onData) => { 
  const createdDate = Session.get('createdDate') ? Session.get('createdDate').substring(0, 10) : '';
  const insertedId = Session.get('insertedId') ? Session.get('insertedId') : '';

  const subscription = Meteor.subscribe('bets.list', createdDate);

  if (subscription.ready()) {
    const bets = Bets.find({}, {sort: {createdAt: 1}}).fetch();
    
    if ( bets.length > 0 && insertedId !== '' ) {
      const bet = bets.find( obj => obj._id === insertedId );
      console.log(bet);
      Session.set('latestSessionBet', bet);
    }

    bets.forEach((obj, index) => {
      obj.lineNo = index + 1;
    });

    onData(null, { bets });
  }
}, betsPDFButton);