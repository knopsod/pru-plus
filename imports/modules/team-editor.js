/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertTeam } from '../api/teams/methods.js';
import './validation.js';

let component;

const handleUpsert = () => {
  const { team } = component.props;
  const confirmation = team && team._id ? 'Team updated!' : 'Team added!';
  const upsert = {
    name: document.querySelector('[name="name"]').value.trim(),
    manager: document.querySelector('[name="manager"]').value.trim(),
  };

  if (team && team._id) upsert._id = team._id;

  upsertTeam.call(upsert, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.teamEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push(`/teams/${response.insertedId || team._id}`);
    }
  });
};

const validate = () => {
  $(component.teamEditorForm).validate({
    rules: {
      name: {
        required: true,
      },
      manager: {
        required: true,
      },
    },
    messages: {
      name: {
        required: 'Need a name of team here.',
      },
      manager: {
        required: 'This is manager.',
      },
    },
    submitHandler() { handleUpsert(); },
  });
};

export default function teamEditor(options) {
  component = options.component;
  validate();
}
