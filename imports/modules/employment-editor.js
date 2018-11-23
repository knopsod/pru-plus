/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertEmployment } from '../api/employments/methods.js';
import './validation.js';

let component;

const handleUpsert = () => {
  const { employment } = component.props;
  const confirmation = employment && employment._id ? 'Employment updated!' : 'Employment added!';
  const upsert = {
    title: document.querySelector('[name="title"]').value.trim(),
    body: document.querySelector('[name="body"]').value.trim(),
    userId: Meteor.userId(),
    employees: [
      { userId: Meteor.userId(), allowed: true },
    ],
  };

  if (employment && employment._id) upsert._id = employment._id;

  upsertEmployment.call(upsert, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.employmentEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push(`/employments/${response.insertedId || employment._id}/edit`);
    }
  });
};

const validate = () => {
  $(component.employmentEditorForm).validate({
    rules: {
      title: {
        required: true,
      },
      body: {
        required: true,
      },
    },
    messages: {
      title: {
        required: 'Need a title in here, Seuss.',
      },
      body: {
        required: 'This thneeds a body, please.',
      },
    },
    submitHandler() { handleUpsert(); },
  });
};

export default function employmentEditor(options) {
  component = options.component;
  validate();
}
