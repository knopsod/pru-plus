/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button, Row, Col } from 'react-bootstrap';
import profileEditor from '../../modules/profile-editor.js';

export default class EmploymentEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    profileEditor({ component: this });
    setTimeout(() => { document.querySelector('[name="firstName"]').focus(); }, 0);
  }

  render() {
    const { user } = this.props;
    return (<form
      ref={ form => (this.profileEditorForm = form) }
      onSubmit={ event => event.preventDefault() }
    >
      <Row>
        <Col xs={ 6 } sm={ 6 }>
          <FormGroup>
            <ControlLabel>ชื่อ</ControlLabel>
            <FormControl
              type="text"
              name="firstName"
              defaultValue={ user && user.profile.name.first }
              placeholder="ชื่อ"
            />
          </FormGroup>
        </Col>
        <Col xs={ 6 } sm={ 6 }>
          <FormGroup>
            <ControlLabel>นามสกุล</ControlLabel>
            <FormControl
              type="text"
              name="lastName"
              defaultValue={ user && user.profile.name.last }
              placeholder="นามสกุล"
            />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <ControlLabel>LINE ID</ControlLabel>
        <FormControl
          type="text"
          name="lineId"
          defaultValue={ user && user.profile.lineId }
          placeholder="LINE ID"
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        { user && user._id ? 'Save Changes' : 'Add Employment' }
      </Button>
    </form>);
  }
}

EmploymentEditor.propTypes = {
  employment: PropTypes.object,
};
