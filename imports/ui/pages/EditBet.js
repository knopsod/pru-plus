import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Bets from '../../api/bets/bets';
import BetEditor from '../components/BetEditor';
import NotFound from './NotFound';
import container from '../../modules/container';

const EditBet = ({ bet }) => (bet ? (
  <div className="EditBet">
    <h4 className="page-header">Editing "{ bet.up2 }"</h4>
    <BetEditor bet={ bet } />
  </div>
) : <NotFound />);

EditBet.propTypes = {
  bet: PropTypes.object,
};

export default container((props, onData) => {
  const betId = props.params._id;
  const subscription = Meteor.subscribe('bets.view', betId);

  if (subscription.ready()) {
    const bet = Bets.findOne(betId);
    onData(null, { bet });
  }
}, EditBet);
