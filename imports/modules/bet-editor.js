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
    up2: document.querySelector('[name="up2"]').value.trim(),
    down2: document.querySelector('[name="down2"]').value.trim(),
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
      up2: {
        required: true,
      },
      down2: {
        required: true,
      },
    },
    messages: {
      up2: {
        required: 'Need a up2 of bet here.',
      },
      down2: {
        required: 'This is down2.',
      },
    },
    submitHandler() { handleUpsert(); },
  });
};

export default function betEditor(options) {
  component = options.component;
  validate();
}
