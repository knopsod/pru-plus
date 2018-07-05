import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Bets from '../../api/bets/bets';
import container from '../../modules/container';

const handleNav = _id => browserHistory.push(`/bets/${_id}`);

const BetsList = ({ bets }) => (
  bets.length > 0 ? <ListGroup className="BetsList">
    {bets.map(({ _id, up2 }) => (
      <ListGroupItem key={ _id } 
      onClick={ () => handleNav(_id) }>
        { up2 }
      </ListGroupItem>
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No bets yet.</Alert>
);

BetsList.propTypes = {
  bets: PropTypes.array,
};

export default container((props, onData) => {
  const subscription = Meteor.subscribe('bets.list');
  if (subscription.ready()) {
    const bets = Bets.find().fetch();
    onData(null, { bets });
  }
}, BetsList);
