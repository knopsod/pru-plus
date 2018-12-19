/* eslint-disable no-undef */

import { Bert } from 'meteor/themeteorchef:bert';
import { upsertUser } from '../api/users/methods.js';
import './validation.js';

let component;

const handleUpsert = () => {
  const { user } = component.props;
  const confirmation = user && user._id ? 'User updated!' : 'User added!';
  const upsert = {
    profile: {
      name: {
        first: document.querySelector('[name="firstName"]').value.trim(),
        last: document.querySelector('[name="lastName"]').value.trim(),
      },
      lineId: document.querySelector('[name="lineId"]').value.trim(),
    },
  };

  if (user && user._id) {
    upsert._id = user._id;
  }

  upsertUser.call(upsert, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      // component.profileEditorForm.reset();
      Bert.alert(confirmation, 'success');
      // browserHistory.push(`/profile`);
    }
  });
};

const validate = () => {
  $(component.profileEditorForm).validate({
    rules: {
      firstName: {
        required: true,
      },
      lastName: {
        required: true,
      },
      lineId: {
        required: true,
      },
    },
    messages: {
      firstName: {
        required: 'Need a first name.',
      },
      lastName: {
        required: 'Need a last name.',
      },
      lineId: {
        required: 'Need a LINE ID.',
      },
    },
    submitHandler() { handleUpsert(); },
  });
};

export default function profileEditor(options) {
  component = options.component;
  validate();
}
