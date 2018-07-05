/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';

import { upsertBet } from '../../api/bets/methods.js';

export default class BetEditorFast extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    var arr = e.target.value.split(/\r?\n/);
    console.log(arr);
    
    var upsert = {},
      no = '', 
      up2 = 0, down2 = 0, up3 = 0, down3 = 0, permute = 0, 
      createdAt = moment().valueOf();

    // up2
    if ( arr.length > 2 &&
      !isNaN( parseInt(arr[arr.length - 3]) ) && arr[arr.length - 3].length === 2 &&
      !isNaN( parseInt(arr[arr.length - 2]) ) &&
      arr[arr.length - 1] === ''
    ) {
      console.log('up2');
      no = arr[arr.length - 3];
      up2 = parseInt(arr[arr.length - 2]);
      e.target.value = '';
    }

    // up2+down2
    if ( arr.length > 1 &&
      _.includes( arr[arr.length - 2], '+' ) &&
      arr[arr.length - 2].split('+')[0].length === 2 &&
      !isNaN( arr[arr.length - 2].split('+')[0] ) &&
      !isNaN( arr[arr.length - 2].split('+')[1] )
    ) {
      console.log('up2+down2');
      no = arr[arr.length - 2].split('+')[0];
      up2 = parseInt( arr[arr.length - 2].split('+')[1] );
      down2 = parseInt( arr[arr.length - 2].split('+')[1] );
      e.target.value = '';
    }

    // down2
    if ( arr.length > 1 &&
      _.includes( arr[arr.length - 2], '-' ) &&
      arr[arr.length - 2].split('-')[0].length === 2 &&
      !isNaN( arr[arr.length - 2].split('-')[0] ) &&
      !isNaN( arr[arr.length - 2].split('-')[1] )
    ) {
      console.log('down2');
      no = arr[arr.length - 2].split('-')[0];
      down2 = parseInt( arr[arr.length - 2].split('-')[1] );
      e.target.value = '';
    }

    // up3
    if ( arr.length > 2 &&
      !isNaN( parseInt(arr[arr.length - 3]) ) && arr[arr.length - 3].length === 3 &&
      !isNaN( parseInt(arr[arr.length - 2]) ) &&
      arr[arr.length - 1] === ''
    ) {
      console.log('up3');
      no = arr[arr.length - 3];
      up3 = parseInt(arr[arr.length - 2]);
      e.target.value = '';
    }

    // up3+down3
    if ( arr.length > 1 &&
      _.includes( arr[arr.length - 2], '+' ) &&
      arr[arr.length - 2].split('+')[0].length === 3 &&
      !isNaN( arr[arr.length - 2].split('+')[0] ) &&
      !isNaN( arr[arr.length - 2].split('+')[1] )
    ) {
      console.log('up3+down3');
      no = arr[arr.length - 2].split('+')[0];
      up3 = parseInt( arr[arr.length - 2].split('+')[1] );
      down3 = parseInt( arr[arr.length - 2].split('+')[1] );
      e.target.value = '';
    }

    // permute
    if ( arr.length > 1 &&
      _.includes( arr[arr.length - 2], '*' ) &&
      arr[arr.length - 2].split('*')[0].length === 3&&
      !isNaN( arr[arr.length - 2].split('*')[0] ) &&
      !isNaN( arr[arr.length - 2].split('*')[1] )
    ) {
      console.log('permute');
      no = arr[arr.length - 2].split('*')[0];
      permute = parseInt( arr[arr.length - 2].split('*')[1] );
      e.target.value = '';
    }

    // down3
    if ( arr.length > 1 &&
      _.includes( arr[arr.length - 2], '-' ) &&
      arr[arr.length - 2].split('-')[0].length === 3&&
      !isNaN( arr[arr.length - 2].split('-')[0] ) &&
      !isNaN( arr[arr.length - 2].split('-')[1] )
    ) {
      console.log('down3');
      no = arr[arr.length - 2].split('-')[0];
      down3 = parseInt( arr[arr.length - 2].split('-')[1] );
      e.target.value = '';
    }

    if ( no !== '' ){
      upsert = { no, 
        up2, down2, up3, down3, permute, 
        createdAt };
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
        <ControlLabel></ControlLabel>
      </FormGroup>
      <FormGroup>
        <ControlLabel>12 12+ 12- 123 123+ 123* 123-</ControlLabel>
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
