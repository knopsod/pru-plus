/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertBet } from '../api/bets/methods.js';
import './validation.js';

let component;

const handleUpsert = () => {
  const { bet } = component.props;
  const confirmation = bet && bet._id ? 'Bet updated!' : 'Bet added!';
  const upsert = {
    no: document.querySelector('[name="no"]').value.trim(),
    spend: document.querySelector('[name="spend"]').value.trim(),
  };

  if (bet && bet._id) upsert._id = bet._id;

  upsertBet.call(upsert, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.betEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push(`/bets/${response.insertedId || bet._id}`);
    }
  });
};

const validate = () => {
  $(component.betEditorForm).validate({
    rules: {
      no: {
        required: true,
      },
      spend: {
        required: true,
      },
    },
    messages: {
      no: {
        required: 'Need a no of bet here.',
      },
      spend: {
        required: 'This is spend.',
      },
    },
    submitHandler() { handleUpsert(); },
  });
};

export default function betEditor(options) {
  component = options.component;
  validate();
}
