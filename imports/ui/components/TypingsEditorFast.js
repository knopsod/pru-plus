/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Table } from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';
import container from '../../modules/container';
import { timeFromInt } from 'time-number';

import Employments from '../../api/employments/employments';
import { upsertTyping } from '../../api/typings/methods.js';

class TypingsEditorFast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      broker: '',
      percent: 20,
      fee: 0.5,
      betMessage: '',
    };

    this.handleBrokerChange = this.handleBrokerChange.bind(this);
    this.handlePercentChange = this.handlePercentChange.bind(this);
    this.handleChangeV2 = this.handleChangeV2.bind(this);
  }

  handleBrokerChange(e) {
    const broker = e.target.value;
    this.setState({
      ...this.state,
      broker,
    });
  }

  handlePercentChange(e) {
    const percent = Number(e.target.value);
    this.setState({
      ...this.state,
      percent,
    });
  }

  handleChangeV2(e) {
    const value = e.target.value;
    this.decodeValue(value);
  }

  decodeValue(value) {
    const betMessage = value;
    this.setState({
      ...this.state,
      betMessage,
    });

    const arr = betMessage.split(/\r?\n/);
    console.log(arr);
    
    var upsert = {};

    var no = '', 
      up2 = 0, 
      down2 = 0, 
      up3 = 0, 
      down3 = 0, 
      permute = 0;

    const createdAt = moment().valueOf(), 
      broker = this.state.broker, 
      percent = this.state.percent,
      fee = this.state.fee,
      createdDate = this.props.employment.date,
      employmentId = this.props.employmentId,
      employeeId = Meteor.userId();

    const employee = { 
      emails: Meteor.user().emails,
      profile: Meteor.user().profile,
      _id: Meteor.user()._id,
    };

    if ( arr.length > 1 && 
      ( _.includes( arr[arr.length - 2], '+' ) || 
        _.includes( arr[arr.length - 2], '-' ) ||
        _.includes( arr[arr.length - 2], '*' )
      ) 
    ) {
      var strBet = arr[arr.length - 2];
      strBet = strBet.replace(/\+/, ' +');
      strBet = strBet.replace(/-/, ' -');
      strBet = strBet.replace(/\*/, ' *');
      console.log(strBet);
      
      var splitBets = strBet.split(' ');
      console.log(splitBets);

      if (splitBets[0].length === 2 || splitBets[0].length === 3) {
        no = splitBets[0];
      }

      for (let i = 1; i < splitBets.length; i++) {
        switch (splitBets[i].charAt(0)) {
          case '+':
            if (splitBets[0].length === 2) up2 = parseInt(splitBets[i].slice(1));
            if (splitBets[0].length === 3) up3 = parseInt(splitBets[i].slice(1));
            break;

          case '-':
            if (splitBets[0].length === 2) down2 = parseInt(splitBets[i].slice(1));
            if (splitBets[0].length === 3) down3 = parseInt(splitBets[i].slice(1));
            break;

          case '*':
            if (splitBets[0].length === 3) permute = parseInt(splitBets[i].slice(1));
            break;
        
          default:
            break;
        }
      }
    }

    // up2+down2
    if ( arr.length > 2 &&
      !isNaN( parseInt(arr[arr.length - 3]) ) && arr[arr.length - 3].length === 2 &&
      !isNaN( parseInt(arr[arr.length - 2]) ) &&
      arr[arr.length - 1] === ''
    ) {
      console.log('up2+down2');
      no = arr[arr.length - 3];
      up2 = down2 = parseInt(arr[arr.length - 2]);
    }

    // up3+permute
    if ( arr.length > 2 &&
      !isNaN( parseInt(arr[arr.length - 3]) ) && arr[arr.length - 3].length === 3 &&
      !isNaN( parseInt(arr[arr.length - 2]) ) &&
      arr[arr.length - 1] === ''
    ) {
      console.log('up3+down3');
      no = arr[arr.length - 3];
      up3 = permute = parseInt(arr[arr.length - 2]);
    }

    // no2+latestSpend
    if ( arr.length > 2 &&
      arr[arr.length - 3].length === 2 &&
      !isNaN( parseInt( arr[arr.length - 3] ) ) &&
      arr[arr.length - 2] === "" &&
      arr[arr.length - 1] === ""
    ) {
      console.log('no2+latestSpend');

      if ( this.props.Session.get('latestSessionTyping').up3 > 0 || 
        this.props.Session.get('latestSessionTyping').down3 > 0 ||
        this.props.Session.get('latestSessionTyping').permute > 0
      ) {
        return;
      } else {
        no = arr[arr.length - 3];
        up2 = this.props.Session.get('latestSessionTyping').up2;
        down2 = this.props.Session.get('latestSessionTyping').down2;
      }
    }

    // no3+latestSpend
    if ( arr.length > 2 &&
      arr[arr.length - 3].length === 3 &&
      !isNaN( parseInt( arr[arr.length - 3] ) ) &&
      arr[arr.length - 2] === "" &&
      arr[arr.length - 1] === ""
    ) {
      console.log('no3+latestSpend');

      if ( this.props.Session.get('latestSessionTyping').up2 > 0 ||
        this.props.Session.get('latestSessionTyping').down2 > 0 
      ) {
        return;
      } else {
        no = arr[arr.length - 3];
        up3 = this.props.Session.get('latestSessionTyping').up3;
        down3 = this.props.Session.get('latestSessionTyping').down3;
        permute = this.props.Session.get('latestSessionTyping').permute;
      }
    }

    if ( no !== '' ) {
      upsert = { 
        no, 
        up2, 
        down2, 
        up3, 
        down3, 
        permute, 
        createdAt, 
        broker, 
        percent,
        fee,
        income: ((100 - (percent + 0.5)) / 100) * (up2 + down2 + up3 + down3 + permute),
        createdDate,
        employmentId,
        employeeId,
        employee,
      };
      console.log(upsert);

      upsertTyping.call(upsert, (error, response) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Typing added', 'success');

          this.insertedId = response.insertedId;
          this.props.Session.set('latestSessionTyping', upsert);
        }
      });

      this.setState({
        ...this.state,
        betMessage: '',
      });
    }

  }

  render() {

    const yellowStyle = { minHeight: 150, maxHeight: 225, fontSize: 48, borderColor: 'yellow', borderWidth: 2 };
    const redStyle = { minHeight: 150, maxHeight: 225, fontSize: 48, borderColor: 'red', borderWidth: 2 };

    return (<form>      
      <FormGroup>
        <ControlLabel>ป-ด-ว</ControlLabel>
        <h4>{this.props.employment.date} {timeFromInt(this.props.employment.startTime)}-{timeFromInt(this.props.employment.endTime)}</h4>
      </FormGroup>

      <FormGroup>
        <ControlLabel>ใบที่</ControlLabel>
        <FormControl type="text" name="broker" 
          ref="broker"
          value={this.state.broker}
          onChange={this.handleBrokerChange}/>
      </FormGroup>

      <FormGroup>
        <ControlLabel>% ผู้ส่ง (ไม่รวมค่าพิมพ์ +{ this.state.fee }%)</ControlLabel>
        <FormControl type="number" name="percent" 
          ref="percent" min={ 0 } max={ 99 }
          value={this.state.percent}
          onChange={this.handlePercentChange}/>
      </FormGroup>

      <FormGroup>
        <ControlLabel>เบอร์</ControlLabel>
        <FormControl
          componentClass="textarea"
          type="number"
          name="bet"
          style={this.state.betMessage.length > 0 ? yellowStyle : redStyle}
          bsSize="large"
          value={this.state.betMessage}
          onChange={this.handleChangeV2}
        />
      </FormGroup>

      <Table bordered condensed hover
        >
        <thead>
          <tr>
            <th>ตัวอย่าง</th>
            <th>คีย์</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>45 = 100 บน</td>
            <td>45+100<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
          <tr>
            <td>45 = 100 ล่าง</td>
            <td>45-100<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
          <tr>
            <td>45 = 100x50 บนxล่าง</td>
            <td>45+100-50<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
          <tr>
            <td>45 = 100x100 บนxล่าง เท่ากัน</td>
            <td>45<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong>100<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
          <tr>
            <td>67 = ราคาเดิม</td>
            <td>67<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong><strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
          <tr>
            <td>456 = 100 บน</td>
            <td>456+100<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
          <tr>
            <td>456 = 100 ล่าง</td>
            <td>456-100<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
          <tr>
            <td>456 = 100 โต๊ด</td>
            <td>456*100<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
          <tr>
            <td>456 = 100x50 บนxโต๊ด</td>
            <td>456+100*50<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
          <tr>
            <td>456 = 100x100 บนxโต๊ด เท่ากัน</td>
            <td>456<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong>100<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
          <tr>
            <td>789 = ราคาเดิม</td>
            <td>789<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong><strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} style={{textAlign: 'center'}}>+ บน, - ล่าง, * โต๊ด</td>
          </tr>
        </tfoot>
      </Table>
    </form>);
  }
}

TypingsEditorFast.propTypes = {
  Session: PropTypes.object,
  employmentId: PropTypes.string,
  employment: PropTypes.object,
};

export default container((props, onData) => {
  const employmentId = props.employmentId;
  const subscription = Meteor.subscribe('employments.view', employmentId);

  if (subscription.ready()) {
    const employment = Employments.findOne(employmentId);
    onData(null, { employment, Session });
  }
}, TypingsEditorFast);