/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import moment from 'moment';

import { upsertBet } from '../../api/bets/methods.js';

export default class BetEditorFast extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const arr = e.target.value.split(/\r?\n/);
    
    var upsert = {}, 
      no = '', 
      up2 = 0, down2 = 0, up3 = 0, down3 = 0, permute = 0, createdAt = moment().valueOf();

    if ( arr.length > 2 &&
      !isNaN( parseInt(arr[arr.length - 3]) ) && arr[arr.length - 3].length === 2 &&
      !isNaN( parseInt(arr[arr.length - 2]) ) &&
      arr[arr.length - 1] === ''
    ) {
      no = arr[arr.length - 3];
      up2 = parseInt(arr[arr.length - 2]);
      e.target.value = '';
    }

    if ( arr.length > 2 &&
      !isNaN( parseInt(arr[arr.length - 3]) ) && arr[arr.length - 3].length === 3 &&
      !isNaN( parseInt(arr[arr.length - 2]) ) &&
      arr[arr.length - 1] === ''
    ) {
      no = arr[arr.length - 3];
      up3 = parseInt(arr[arr.length - 2]);
      e.target.value = '';
    }

    if ( no !== '' ){
      upsert = { no, up2, down2, up3, down3, permute, createdAt };
      console.log(upsert);
      upsertBet.call(upsert, (error, response) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Bet added', 'success');
        }
      });
    }
  }

  render() {
    return (<form>
      <FormGroup>
        <ControlLabel>Lucky day ;) 12 21+ 123 321+ 123++</ControlLabel>
        <FormControl
          componentClass="textarea"
          name="bet"
          onChange={this.handleChange}
        />
      </FormGroup>
    </form>);
  }
}

BetEditorFast.propTypes = {
  bet: PropTypes.object,
};
