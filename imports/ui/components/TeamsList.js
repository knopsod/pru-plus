import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Teams from '../../api/teams/teams';
import container from '../../modules/container';

const handleNav = _id => browserHistory.push(`/teams/${_id}`);

const TeamsList = ({ teams }) => (
  teams.length > 0 ? <ListGroup className="TeamsList">
    {teams.map(({ _id, name }) => (
      <ListGroupItem key={ _id } 
      onClick={ () => handleNav(_id) }>
        { name }
      </ListGroupItem>
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No teams yet.</Alert>
);

TeamsList.propTypes = {
  teams: PropTypes.array,
};

export default container((props, onData) => {
  const subscription = Meteor.subscribe('teams.list');
  if (subscription.ready()) {
    const teams = Teams.find().fetch();
    onData(null, { teams });
  }
}, TeamsList);
