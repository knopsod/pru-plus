/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class BetEditor extends React.Component {
  render() {
    const ph = `12
10

21+
10

123
10

321+
10

123++
10`;

    return (<div className="page-header clearfix">
      <form>
        <FormGroup>
          <ControlLabel>Lucky day ;)</ControlLabel>
          <FormControl
            componentClass="textarea"
            name="bet"
            placeholder={ph}
          />
        </FormGroup>
      </form>
    </div>);
  }
}

BetEditor.propTypes = {
  bet: PropTypes.object,
};