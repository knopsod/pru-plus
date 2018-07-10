import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Bets from '../../api/bets/bets';
import { removeBet } from '../../api/bets/methods';
import NotFound from './NotFound';
import container from '../../modules/container';

const handleEdit = (_id) => {
  browserHistory.push(`/bets/${_id}/edit`);
};

const handleRemove = (_id) => {
  if (confirm('Are you sure? This is permanent!')) {
    removeBet.call({ _id }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Bet deleted!', 'success');
        browserHistory.push('/bets');
      }
    });
  }
};

const ViewBet = ({ bet }) => {
  return bet ? (
    <div className="ViewBet">
      <div className="page-header clearfix">
        <h4 className="pull-left">{ bet && bet.no }</h4>
        <ButtonToolbar className="pull-right">
          <ButtonGroup bsSize="small">
            <Button onClick={ () => handleEdit(bet._id) }>Edit</Button>
            <Button onClick={ () => handleRemove(bet._id) } className="text-danger">Delete</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      { bet && bet.no }
    </div>
  ) : <NotFound />;
};

ViewBet.propTypes = {
  bet: PropTypes.object,
};

export default container((props, onData) => {
  const betId = props.params._id;
  const subscription = Meteor.subscribe('bets.view', betId);

  if (subscription.ready()) {
    const bet = Bets.findOne(betId);
    onData(null, { bet });
  }
}, ViewBet);
