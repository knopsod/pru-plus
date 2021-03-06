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
    date: document.querySelector('[name="date"]').value.substr(0, 10),
    startTime: parseInt(document.querySelector('[name="startTime"]').value),
    endTime: parseInt(document.querySelector('[name="endTime"]').value),
    title: document.querySelector('[name="title"]').value.trim(),
    body: document.querySelector('[name="body"]').value.trim(),
  };

  if (employment && employment._id) {
    upsert._id = employment._id;
    upsert.employees = employment.employees;

    const checkedboxs = document.querySelectorAll('input[type="checkbox"]');
    checkedboxs.forEach(
      (val, index) => {
        upsert.employees[index].allowed = val.checked;
      }
    );
  } else {
    upsert.userId = Meteor.userId();
    upsert.employer = Meteor.user();
    upsert.employees = [
      { 
        userId: Meteor.userId(),
        user: Meteor.user(),
        allowed: true,
        feedbackLeft: false,
        feedbackReceived: false,
        employerComment: '',
        employeeComment: '',
      }
    ];
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
        required: 'Need a title in here, please.',
      },
      body: {
        required: 'Need a memo in here, please.',
      },
    },
    submitHandler() { handleUpsert(); },
  });
};

export default function employmentEditor(options) {
  component = options.component;
  validate();
}
