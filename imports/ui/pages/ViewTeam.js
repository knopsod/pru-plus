import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Teams from '../../api/teams/teams';
import { removeTeam } from '../../api/teams/methods';
import NotFound from './NotFound';
import container from '../../modules/container';

const handleEdit = (_id) => {
  browserHistory.push(`/teams/${_id}/edit`);
};

const handleRemove = (_id) => {
  if (confirm('Are you sure? This is permanent!')) {
    removeTeam.call({ _id }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Team deleted!', 'success');
        browserHistory.push('/teams');
      }
    });
  }
};

const ViewTeam = ({ team }) => {
  return team ? (
    <div className="ViewTeam">
      <div className="page-header clearfix">
        <h4 className="pull-left">{ team && team.name }</h4>
        <ButtonToolbar className="pull-right">
          <ButtonGroup bsSize="small">
            <Button onClick={ () => handleEdit(team._id) }>Edit</Button>
            <Button onClick={ () => handleRemove(team._id) } className="text-danger">Delete</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      { team && team.manager }
    </div>
  ) : <NotFound />;
};

ViewTeam.propTypes = {
  team: PropTypes.object,
};

export default container((props, onData) => {
  const teamId = props.params._id;
  const subscription = Meteor.subscribe('teams.view', teamId);

  if (subscription.ready()) {
    const team = Teams.findOne(teamId);
    onData(null, { team });
  }
}, ViewTeam);
