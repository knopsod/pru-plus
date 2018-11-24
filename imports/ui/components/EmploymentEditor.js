/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import employmentEditor from '../../modules/employment-editor.js';
import DatePicker from 'react-bootstrap-date-picker';
import TimePicker from 'react-bootstrap-time-picker';

export default class EmploymentEditor extends React.Component {
  componentDidMount() {
    employmentEditor({ component: this });
    setTimeout(() => { document.querySelector('[name="title"]').focus(); }, 0);
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
        <DatePicker name="date" dateFormat="YYYY-MM-DD" />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Time</ControlLabel>
        {/* https://www.npmjs.com/package/react-bootstrap-time-picker */}
        <TimePicker name="time" step={10} />
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
          <ControlLabel>Employees</ControlLabel>
          <ul>
            { employment && employment.employees.length ?
              employment.employees.map(({ user, allowed }) => <li key={user._id}>{`${user.profile.name.first} ${user.profile.name.last} ${allowed}`}</li>)
              : undefined
            }
          </ul>
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
