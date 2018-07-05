/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import betEditor from '../../modules/bet-editor.js';

export default class BetEditor extends React.Component {
  componentDidMount() {
    betEditor({ component: this });
    setTimeout(() => { document.querySelector('[name="up2"]').focus(); }, 0);
  }

  render() {
    const { bet } = this.props;
    return (<form
      ref={ form => (this.betEditorForm = form) }
      onSubmit={ event => event.preventDefault() }
    >
      <FormGroup>
        <ControlLabel>Up2</ControlLabel>
        <FormControl
          type="text"
          name="up2"
          defaultValue={ bet && bet.up2 }
          placeholder="Up2"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Down2</ControlLabel>
        <FormControl
          componentClass="textarea"
          name="down2"
          defaultValue={ bet && bet.down2 }
          placeholder="Down2"
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        { bet && bet._id ? 'Save Change' : 'Add Document' }
      </Button>
    </form>);
  }
}

BetEditor.propTypes = {
  bet: PropTypes.object,
};
