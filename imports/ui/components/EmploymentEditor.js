/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import employmentEditor from '../../modules/employment-editor.js';

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
              employment.employees.map(({ userId, allowed }) => <li key={userId}>{`${userId} ${allowed}`}</li>)
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
