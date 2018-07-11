import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import Bets from '../../api/bets/bets';
import container from '../../modules/container';

const NosList = (props) => (
  <div>
      NosList!! 
      <p>
        props.bets.length => {props.bets.length}
      </p>

      <p>
        props.nos.length => {props.nos.length}
      </p>
  </div>
);

NosList.propTypes = {
  bets: PropTypes.array,
  nos: PropTypes.array,
};

export default container((props, onData) => {
  const createdDate = Session.get('nosCreatedDate') ? 
    Session.get('nosCreatedDate').substring(0, 10) : '';
    
  const subscription = Meteor.subscribe('bets.list', createdDate);
  
  if (subscription.ready()) {
    const bets = Bets.find({}, {sort: {createdAt: -1}}).fetch();
    var nos = [];

    onData(null, { bets, nos });
  }
}, NosList);