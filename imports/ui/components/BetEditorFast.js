/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { upsertBet } from '../../api/bets/methods.js';

export default class BetEditorFast extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const arr = e.target.value.split(/\r?\n/);
    console.log(arr);
  }

  render() {
    const ph = ``;
    return (<form>
      <FormGroup>
        <ControlLabel>Lucky day ;)</ControlLabel>
        <FormControl
          componentClass="textarea"
          name="bet"
          placeholder={ph}
          onChange={this.handleChange}
        />
      </FormGroup>
    </form>);
  }
}

BetEditorFast.propTypes = {
  bet: PropTypes.object,
};
