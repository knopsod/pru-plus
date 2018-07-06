/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';
import DatePicker from 'react-bootstrap-date-picker';

import { upsertBet } from '../../api/bets/methods.js';

export default class BetEditorFast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createdDate: moment().toISOString(),
      broker: '007'
    };

    this.handleCreatedDateChange = this.handleCreatedDateChange.bind(this);
    this.handleBrokerChange = this.handleBrokerChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleCreatedDateChange(value) {
    const createdDate = value;
    this.setState({ 
      ...this.state,
      createdDate
    })
  }

  handleBrokerChange(e) {
    const broker = e.target.value;
    this.setState({
      ...this.state,
      broker
    });
  }

  handleChange(e) {
    var arr = e.target.value.split(/\r?\n/);
    console.log(arr);
    
    var upsert = {},
      no = '', 
      up2 = 0, down2 = 0, up3 = 0, down3 = 0, permute = 0, 
      createdAt = moment().valueOf(), broker = this.state.broker, createdDate = this.state.createdDate.substr(0, 10);

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

    // up3+permute
    if ( arr.length > 1 &&
      _.includes( arr[arr.length - 2], '+' ) &&
      arr[arr.length - 2].split('+')[0].length === 3 &&
      !isNaN( arr[arr.length - 2].split('+')[0] ) &&
      !isNaN( arr[arr.length - 2].split('+')[1] )
    ) {
      console.log('up3+down3');
      no = arr[arr.length - 2].split('+')[0];
      up3 = parseInt( arr[arr.length - 2].split('+')[1] );
      permute = parseInt( arr[arr.length - 2].split('+')[1] );
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
        createdAt, broker, createdDate };
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
        <DatePicker dateFormat="YYYY-MM-DD" name="createdDate" ref="createdDate"
          value={this.state.createdDate}
          onChange={this.handleCreatedDateChange}/>
      </FormGroup>
      <FormGroup>
        <ControlLabel>รหัสผู้ส่ง</ControlLabel>
        <FormControl type="text" name="broker" ref="broker"
          value={this.state.broker}
          onChange={this.handleBrokerChange}/>
      </FormGroup>
      <FormGroup>
        <ControlLabel>บันทึก</ControlLabel>
        <FormControl
          componentClass="textarea"
          name="bet"
          onChange={this.handleChange}
        />
      </FormGroup>
      <div className="row">
        <div className="col-sm-2">45[ENTER]10[ENTER]</div>
        <div className="col-sm-1">45บน</div>
        <div className="col-sm-2">10 บาท</div>
      </div>
      
      <div className="row">
        <div className="col-sm-2">45+10[ENTER]</div>
        <div className="col-sm-1">45</div>
        <div className="col-sm-2">10x10 บาท</div>
      </div>
      
      <div className="row">
        <div className="col-sm-2">45-10[ENTER]</div>
        <div className="col-sm-1">45ล่าง</div>
        <div className="col-sm-2">10 บาท</div>
      </div>
      
      <div className="row">
        <div className="col-sm-2">456[ENTER]10[ENTER]</div>
        <div className="col-sm-1">456บน</div>
        <div className="col-sm-2">10 บาท</div>
      </div>
      
      <div className="row">
        <div className="col-sm-2">456+10[ENTER]</div>
        <div className="col-sm-1">456</div>
        <div className="col-sm-2">10x10 บาท</div>
      </div>
      
      <div className="row">
        <div className="col-sm-2">456*10[ENTER]</div>
        <div className="col-sm-1">456โต๊ด</div>
        <div className="col-sm-2">10 บาท</div>
      </div>
      
      <div className="row">
        <div className="col-sm-2">456-10[ENTER]</div>
        <div className="col-sm-1">456ล่าง</div>
        <div className="col-sm-2">10 บาท</div>
      </div>
      
    </form>);
  }
}

BetEditorFast.propTypes = {
  bet: PropTypes.object,
};
