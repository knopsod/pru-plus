/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { FormGroup, ControlLabel, FormControl, Button, Checkbox } from 'react-bootstrap';
import employmentEditor from '../../modules/employment-editor.js';
import DatePicker from 'react-bootstrap-date-picker';
import TimePicker from 'react-bootstrap-time-picker';
import moment from 'moment';

export default class EmploymentEditor extends React.Component {
  constructor(props) {
    super(props);

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.onToggle = this.onToggle.bind(this);

    this.state = { 
      date: moment().toISOString(true).substring(0, 10),
      formattedValue: '',
      startTime: 0,
      endTime: 0,
      toggleActive: false,
    };
  }

  componentDidMount() {
    employmentEditor({ component: this });
    setTimeout(() => { document.querySelector('[name="date"]').focus(); }, 0);

    const { employment } = this.props;
    if (employment) {
      const { date, startTime, endTime } = employment;
      this.setState({ date, startTime, endTime });
    }
  }

  handleDateChange(value, formattedValue) {
    this.setState({ date: value });
  }

  handleStartTimeChange(startTime) {
    this.setState({ startTime });
  }

  handleEndTimeChange(endTime) {
    this.setState({ endTime });
  }

  handleSwitch(elem, state) {
    console.log('handleSwitch. elem:', elem);
    console.log('name:', elem.props.name);
    console.log('new state:', state);
  }

  onToggle() {
    this.setState({ toggleActive: !this.state.toggleActive });
  }

  render() {
    const { employment } = this.props;
    return (<form
      ref={ form => (this.employmentEditorForm = form) }
      onSubmit={ event => event.preventDefault() }
    >
      <FormGroup>
        <ControlLabel>วันที่</ControlLabel>
        {/* https://www.npmjs.com/package/react-bootstrap-date-picker */}
        <DatePicker name="date" dateFormat="YYYY-MM-DD"
          onChange={this.handleDateChange} value={ this.state.date } />
      </FormGroup>
      <FormGroup>
        <ControlLabel>เวลาเริ่มต้น</ControlLabel>
        {/* https://www.npmjs.com/package/react-bootstrap-time-picker */}
        <TimePicker name="startTime" format={24}
          onChange={this.handleStartTimeChange} value={ this.state.startTime } />
      </FormGroup>
      <FormGroup>
        <ControlLabel>เวลาสิ้นสุด</ControlLabel>
        {/* https://www.npmjs.com/package/react-bootstrap-time-picker */}
        <TimePicker name="endTime" format={24}
          onChange={this.handleEndTimeChange} value={ this.state.endTime } />
      </FormGroup>
      <FormGroup>
        <ControlLabel>รายละเอียด เงื่อนไข ข้อกำหนด ฯลฯ โดยย่อ</ControlLabel>
        <FormControl
          type="text"
          name="title"
          defaultValue={ employment && employment.title }
          placeholder="ตัวอย่าง : มีทักษะพิมพ์สัมผัส จะพิจารณาเป็นพิเศษ"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>บันทึกช่วยจำ</ControlLabel>
        <FormControl
          componentClass="textarea"
          name="body"
          defaultValue={ employment && employment.body }
          placeholder="ตัวอย่าง : รับความเสี่ยงในวงเงิน 200,000 บาท (สองแสนบาทถ้วน), รับคน 5 คน, ส่งก่อนบ่าย 2 ครึ่ง (14:30 น.)"
        />
      </FormGroup>
      { employment ?
        <FormGroup>
          <ControlLabel>ผู้พิมพ์</ControlLabel>
          <ul>
            { employment && employment.employees.length ?
              employment.employees.map(({ userId, user, allowed }) =>
                <li key={user._id}>
                  <Checkbox defaultChecked={allowed} disabled={user._id === Meteor.userId()} value={userId}>
                    {`${user.profile.name.first} ${user.profile.name.last} (${user.emails[0].address})`} { allowed ? <span style={{ color: 'green' }}>อนุญาต</span> : <span style={{ color: 'red' }}>บล็อค</span> }
                  </Checkbox>
                </li>
              ) : undefined
            }
          </ul>
        </FormGroup>
        : undefined
      }
      <Button type="submit" bsStyle="success">
        { employment && employment._id ? 'Save Changes' : 'Add Employment' }
      </Button>
      <br />
      <br />
    </form>);
  }
}

EmploymentEditor.propTypes = {
  employment: PropTypes.object,
};
