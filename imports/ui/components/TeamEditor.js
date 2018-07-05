/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import teamEditor from '../../modules/team-editor.js';

export default class TeamEditor extends React.Component {
  componentDidMount() {
    teamEditor({ component: this });
    setTimeout(() => { document.querySelector('[name="name"]').focus(); }, 0);
  }

  render() {
    const { team } = this.props;
    return (<form
      ref={ form => (this.teamEditorForm = form) }
      onSubmit={ event => event.preventDefault() }
    >
      <FormGroup>
        <ControlLabel>Name</ControlLabel>
        <FormControl
          type="text"
          name="name"
          defaultValue={ team && team.name }
          placeholder="Team"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Manager</ControlLabel>
        <FormControl
          componentClass="textarea"
          name="manager"
          defaultValue={ team && team.manager }
          placeholder="Manager"
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        { team && team._id ? 'Save Change' : 'Add Document' }
      </Button>
    </form>);
  }
}

TeamEditor.propTypes = {
  team: PropTypes.object,
};
