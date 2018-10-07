/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Grid, Row, Col, Table } from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';
import DatePicker from 'react-bootstrap-date-picker';
import container from '../../modules/container';

import { upsertBet, removeBet } from '../../api/bets/methods.js';

class BetEditorFast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createdDate: moment().toISOString(true).substring(0, 10),
      broker: '',
      betMessage: '',
    };

    this.props.Session.set('createdDate', moment().toISOString(true).substring(0, 10));

    this.handleCreatedDateChange = this.handleCreatedDateChange.bind(this);
    this.handleBrokerChange = this.handleBrokerChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleCreatedDateChange(value) {
    const createdDate = value;
    this.setState({ 
      ...this.state,
      createdDate,
    });

    this.props.Session.set('createdDate', createdDate.substring(0, 10));
  }

  handleBrokerChange(e) {
    const broker = e.target.value;
    this.setState({
      ...this.state,
      broker,
    });
  }

  handleChange(e) {
    const betMessage = e.target.value;
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
      createdDate = this.state.createdDate.substr(0, 10),
      userId = Meteor.userId();

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

    // up2
    if ( arr.length > 1 &&
      _.includes( arr[arr.length - 2], '+' ) &&
      arr[arr.length - 2].split('+')[0].length === 2 &&
      !isNaN( parseInt( arr[arr.length - 2].split('+')[0] ) ) &&
      !isNaN( parseInt( arr[arr.length - 2].split('+')[1] ) )
    ) {
      console.log('up2');
      no = arr[arr.length - 2].split('+')[0];
      up2 = parseInt( arr[arr.length - 2].split('+')[1] );
    }

    // down2
    if ( arr.length > 1 &&
      _.includes( arr[arr.length - 2], '-' ) &&
      arr[arr.length - 2].split('-')[0].length === 2 &&
      !isNaN( parseInt( arr[arr.length - 2].split('-')[0] ) ) &&
      !isNaN( parseInt( arr[arr.length - 2].split('-')[1] ) )
    ) {
      console.log('down2');
      no = arr[arr.length - 2].split('-')[0];
      down2 = parseInt( arr[arr.length - 2].split('-')[1] );
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

    // up3
    if ( arr.length > 1 &&
      _.includes( arr[arr.length - 2], '+' ) &&
      arr[arr.length - 2].split('+')[0].length === 3 &&
      !isNaN( parseInt( arr[arr.length - 2].split('+')[0] ) ) &&
      !isNaN( parseInt( arr[arr.length - 2].split('+')[1] ) )
    ) {
      console.log('up3');
      no = arr[arr.length - 2].split('+')[0];
      up3 = parseInt( arr[arr.length - 2].split('+')[1] );
    }

    // permute
    if ( arr.length > 1 &&
      _.includes( arr[arr.length - 2], '*' ) &&
      arr[arr.length - 2].split('*')[0].length === 3 &&
      !isNaN( parseInt( arr[arr.length - 2].split('*')[0] ) ) &&
      !isNaN( parseInt( arr[arr.length - 2].split('*')[1] ) )
    ) {
      console.log('permute');
      no = arr[arr.length - 2].split('*')[0];
      permute = parseInt( arr[arr.length - 2].split('*')[1] );
    }

    // down3
    if ( arr.length > 1 &&
      _.includes( arr[arr.length - 2], '-' ) &&
      arr[arr.length - 2].split('-')[0].length === 3 &&
      !isNaN( parseInt( arr[arr.length - 2].split('-')[0] ) ) &&
      !isNaN( parseInt( arr[arr.length - 2].split('-')[1] ) )
    ) {
      console.log('down3');
      no = arr[arr.length - 2].split('-')[0];
      down3 = parseInt( arr[arr.length - 2].split('-')[1] );
    }

    // if arr.len > 1 && arr[arr.len - 1] == '' &&
      // arr[arr.len - 2].include('+') && arr[arr.len - 2].include('-') &&
      // arr[arr.len - 2](0...before(+)).len == 2 && !isNaN(arr[arr.len - 2](0...before(+))) &&
      // !isNaN(arr[arr.len - 2](after(+)...before(-))) &&
      // !isNaN(arr[arr.len - 2](after(-)...end))
    if ( arr.length > 1 && arr[arr.length - 1] === '' &&
      _.includes( arr[arr.length - 2], '+' ) && _.includes( arr[arr.length - 2], '-' ) 
    ) {
      const nPlus2 = arr[arr.length - 2].indexOf('+');
      const nMinus2 = arr[arr.length - 2].indexOf('-');

      if ( arr[arr.length - 2].substring(0, nPlus2).length === 2 && 
        !isNaN(arr[arr.length - 2].substring(0, nPlus2)) &&
        !isNaN(arr[arr.length - 2].substring(nPlus2 + 1, nMinus2)) &&
        !isNaN(arr[arr.length - 2].substring(nMinus2 + 1))
      ) {
        no = arr[arr.length - 2].substring(0, nPlus2);
        up2 = parseInt( arr[arr.length - 2].substring(nPlus2 + 1, nMinus2) );
        down2 = parseInt( arr[arr.length - 2].substring(nMinus2 + 1) );
      }
    }

    // if arr.len > 1 && arr[arr.len - 1] == '' &&
      // arr[arr.len - 2].include('+') && arr[arr.len - 2].include('*') &&
      // arr[arr.len - 2](0...before(+)).len == 3 && !isNaN(arr[arr.len - 2](0...before(+))) &&
      // !isNaN(arr[arr.len - 2](after(+)...before(*))) &&
      // !isNaN(arr[arr.len - 2](after(*)...end))
    if ( arr.length > 1 && arr[arr.length - 1] === '' &&
      _.includes( arr[arr.length - 2], '+' ) && _.includes( arr[arr.length - 2], '*' ) 
    ) {
      const nPlus3 = arr[arr.length - 2].indexOf('+');
      const nPermute = arr[arr.length - 2].indexOf('*');

      if ( arr[arr.length - 2].substring(0, nPlus3).length === 3 && 
        !isNaN(arr[arr.length - 2].substring(0, nPlus3)) &&
        !isNaN(arr[arr.length - 2].substring(nPlus3 + 1, nPermute)) &&
        !isNaN(arr[arr.length - 2].substring(nPermute + 1))
      ) {
        no = arr[arr.length - 2].substring(0, nPlus3);
        up3 = parseInt( arr[arr.length - 2].substring(nPlus3 + 1, nPermute) );
        permute = parseInt( arr[arr.length - 2].substring(nPermute + 1) );
      }
    }

    // no2+latestSpend
    if ( arr.length > 2 &&
      arr[arr.length - 3].length === 2 &&
      !isNaN( parseInt( arr[arr.length - 3] ) ) &&
      arr[arr.length - 2] === "" &&
      arr[arr.length - 1] === ""
    ) {
      console.log('no2+latestSpend');

      if ( this.props.Session.get('latestSessionBet').up3 > 0 || 
        this.props.Session.get('latestSessionBet').down3 > 0 ||
        this.props.Session.get('latestSessionBet').permute > 0
      ) {
        return;
      } else {
        no = arr[arr.length - 3];
        up2 = this.props.Session.get('latestSessionBet').up2;
        down2 = this.props.Session.get('latestSessionBet').down2;
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

      if ( this.props.Session.get('latestSessionBet').up2 > 0 ||
        this.props.Session.get('latestSessionBet').down2 > 0 
      ) {
        return;
      } else {
        no = arr[arr.length - 3];
        up3 = this.props.Session.get('latestSessionBet').up3;
        down3 = this.props.Session.get('latestSessionBet').down3;
        permute = this.props.Session.get('latestSessionBet').permute;
      }
    }

    if ( no !== '' ) {
      upsert = { no, 
        up2, 
        down2, 
        up3, 
        down3, 
        permute, 
        createdAt, 
        broker, 
        createdDate,
        userId,
      };
      console.log(upsert);

      upsertBet.call(upsert, (error, response) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Bet added', 'success');

          this.insertedId = response.insertedId;
          this.props.Session.set('insertedId', response.insertedId);
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
        <DatePicker dateFormat="YYYY-MM-DD" 
          name="createdDate" ref="createdDate"
          value={this.state.createdDate}
          onChange={this.handleCreatedDateChange}/>
      </FormGroup>
      <FormGroup>
        <ControlLabel>หมายเลขบิล</ControlLabel>
        <FormControl type="text" name="broker" 
          ref="broker"
          value={this.state.broker}
          onChange={this.handleBrokerChange}/>
      </FormGroup>

      <FormGroup>
        <ControlLabel>พิมพ์</ControlLabel>
        <FormControl
          componentClass="textarea"
          type="number"
          name="bet"
          style={this.state.betMessage.length > 0 ? yellowStyle : redStyle}
          bsSize="large"
          value={this.state.betMessage}
          onChange={this.handleChange}
        />
      </FormGroup>

      <Table bordered condensed hover
        >
        <thead>
          <tr>
            <th>ตัวอย่าง</th>
            <th>พิมพ์</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>45 = 10x10 (บนxล่าง)</td>
            <td>45<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong>10<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
          <tr>
            <td>45 = 10 (บน) หรือ 45 = 10x0</td>
            <td>45+10<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
          <tr>
            <td>45 = 10 (ล่าง) หรือ 45 = 0x10</td>
            <td>45-10<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
          <tr>
            <td>45 = 10x5 (บนxล่าง)</td>
            <td>45+10-5<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
          <tr>
            <td>78 = ซื้อด้วยราคาล่าสุด</td>
            <td>78<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong><strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
          <tr>
            <td colSpan={2}></td>
          </tr>
          <tr>
            <td>456 = 10x10 (บนxโต๊ด)</td>
            <td>456<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong>10<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
          <tr>
            <td>456 = 10 (บน) หรือ 456 = 10x0</td>
            <td>456+10<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
          <tr>
            <td>456 = 10 (โต๊ด) หรือ 456 = 0x10</td>
            <td>456*10<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
          <tr>
            <td>456 = 10x5 (บนxโต๊ด)</td>
            <td>456+10*5<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
          <tr>
            <td>456 = 10 (ล่าง)</td>
            <td>456-10<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
          <tr>
            <td>789 = ซื้อด้วยราคาล่าสุด</td>
            <td>789<strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong><strong style={{ color: 'red', fontSize: 12 }}>[Enter]</strong></td>
          </tr>
        </tbody>
      </Table>
    </form>);
  }
}

BetEditorFast.propTypes = {
  Session: PropTypes.object,
};

export default container((props, onData) => {
  onData(null, { Session });
}, BetEditorFast);