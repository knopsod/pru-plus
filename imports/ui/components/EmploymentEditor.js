/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import employmentEditor from '../../modules/employment-editor.js';
import DatePicker from 'react-bootstrap-date-picker';
import TimePicker from 'react-bootstrap-time-picker';
// import Switch from 'react-bootstrap-switch';
// import Toggle from 'react-bootstrap-toggle';

export default class EmploymentEditor extends React.Component {
  constructor(props) {
    super(props);

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.onToggle = this.onToggle.bind(this);

    this.state = { 
      date: new Date().toISOString(),
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
        <ControlLabel>Date</ControlLabel>
        {/* https://www.npmjs.com/package/react-bootstrap-date-picker */}
        <DatePicker name="date" dateFormat="YYYY-MM-DD"
          onChange={this.handleDateChange} value={ this.state.date } />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Start time</ControlLabel>
        {/* https://www.npmjs.com/package/react-bootstrap-time-picker */}
        <TimePicker name="startTime" step={10} format={24}
          onChange={this.handleStartTimeChange} value={ this.state.startTime } />
      </FormGroup>
      <FormGroup>
        <ControlLabel>End time</ControlLabel>
        {/* https://www.npmjs.com/package/react-bootstrap-time-picker */}
        <TimePicker name="endTime" step={10} format={24}
          onChange={this.handleEndTimeChange} value={ this.state.endTime } />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <FormControl
          type="text"
          name="title"
          defaultValue={ employment && employment.title }
          placeholder="Oh, The Places You'll Go!"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Body</ControlLabel>
        <FormControl
          componentClass="textarea"
          name="body"
          defaultValue={ employment && employment.body }
          placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
        />
      </FormGroup>
      { employment ?
        <FormGroup>
          <ControlLabel>Employee{ employment.employees.length > 1 ? 's' : undefined }</ControlLabel>
          <ul>
            { employment && employment.employees.length ?
              employment.employees.map(({ user }) => <li key={user._id}>{`${user.profile.name.first} ${user.profile.name.last}`}</li>)
              : undefined
            }
          </ul>
          {/* <Switch onChange={(el, state) => this.handleSwitch(el, state)} name='test' /> */}
          {/* <Toggle
            onClick={this.onToggle}
            on={<h2>ON</h2>}
            off={<h2>OFF</h2>}
            active={this.state.toggleActive}
          /> */}
        </FormGroup>
        : undefined
      }
      <Button type="submit" bsStyle="success">
        { employment && employment._id ? 'Save Changes' : 'Add Employment' }
      </Button>
    </form>);
  }
}

EmploymentEditor.propTypes = {
  employment: PropTypes.object,
};
