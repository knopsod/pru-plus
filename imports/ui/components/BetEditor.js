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
        <ControlLabel>No</ControlLabel>
        <FormControl
          type="text"
          name="no"
          defaultValue={ bet && bet.no }
          placeholder="No"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Spend</ControlLabel>
        <FormControl
          componentClass="textarea"
          name="spend"
          defaultValue={ bet && ('' + bet.up2 + bet.down2 + bet.up3 + bet.down3 + bet.permute ) }
          placeholder="Spend"
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
