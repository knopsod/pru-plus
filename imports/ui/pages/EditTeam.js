import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Teams from '../../api/teams/teams';
import TeamEditor from '../components/TeamEditor';
import NotFound from './NotFound';
import container from '../../modules/container';

const EditTeam = ({ team }) => (team ? (
  <div className="EditTeam">
    <h4 className="page-header">Editing "{ team.name }"</h4>
    <TeamEditor team={ team } />
  </div>
) : <NotFound />);

EditTeam.propTypes = {
  team: PropTypes.object,
};

export default container((props, onData) => {
  const teamId = props.params._id;
  const subscription = Meteor.subscribe('teams.view', teamId);

  if (subscription.ready()) {
    const team = Teams.findOne(teamId);
    onData(null, { team });
  }
}, EditTeam);
