import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import Bets from '../../api/bets/bets';
import container from '../../modules/container';

const handleNav = _id => browserHistory.push(`/bets/${_id}`);

const BetsList = ({ bets }) => (
  bets.length > 0 ? <ListGroup className="BetsList">      
    {bets.map(({ _id, no, up2, down2, up3, down3, permute, createdDate, broker }) => (
      <ListGroupItem key={ _id } 
      onClick={ () => handleNav(_id) }>
        <div className="col-xs-2 col-sm-2 text-center">{ createdDate }</div>
        <div className="col-xs-2 col-sm-2 text-center">{ broker }</div>
        <div className="col-xs-2 col-sm-2 text-center"><b>{ no }</b></div>
        <div className="col-xs-1 col-sm-1 text-center">{ up2 === 0 ? '' : up2 }</div>
        <div className="col-xs-1 col-sm-1 text-center">{ down2 === 0 ? '' : down2 }</div>
        <div className="col-xs-1 col-sm-1 text-center">{ up3 === 0 ? '' : up3 }</div>
        <div className="col-xs-1 col-sm-1 text-center">{ permute === 0 ? '' : permute }</div>
        <div className="col-xs-1 col-sm-1 text-center">{ down3 === 0 ? '' : down3 }</div>
      </ListGroupItem>
    ))}
  </ListGroup> : <div />
  // <Alert bsStyle="warning">No bets yet.</Alert>
);

BetsList.propTypes = {
  bets: PropTypes.array,
};

export default container((props, onData) => {
  const subscription = Meteor.subscribe('bets.list');
  if (subscription.ready()) {
    const bets = Bets.find({}, {sort: {createdAt: -1}}).fetch();

    if (bets.length > 0) {
      Session.set('latestBet', bets[0]);
      console.log(Session.get('latestBet'));
    }

    onData(null, { bets });
  }
}, BetsList);
