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
    date: document.querySelector('[name="date"]').value.trim(),
    startTime: document.querySelector('[name="startTime"]').value.trim(),
    endTime: document.querySelector('[name="endTime"]').value.trim(),
    title: document.querySelector('[name="title"]').value.trim(),
    body: document.querySelector('[name="body"]').value.trim(),
  };

  if (employment && employment._id) {
    upsert._id = employment._id;
  } else {
    upsert.userId = Meteor.userId();
    console.log(Meteor.user());
    upsert.employer = Meteor.user();
    upsert.employees = [{ user: Meteor.user(), allowed: true }];
  }

  upsertEmployment.call(upsert, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.employmentEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push(`/employments/${response.insertedId || employment._id}`);
    }
  });
};

const validate = () => {
  $(component.employmentEditorForm).validate({
    rules: {
      date: {
        required: true,
      },
      startTime: {
        required: true,
      },
      endTime: {
        required: true,
      },
      title: {
        required: true,
      },
      body: {
        required: true,
      },
    },
    messages: {
      date: {
        required: 'Need a date in here.',
      },
      startTime: {
        required: 'Need a start time in here.',
      },
      endTime: {
        required: 'Need a end time in here.',
      },
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
