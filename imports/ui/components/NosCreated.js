import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Session } from 'meteor/session';
import container from '../../modules/container';
import PropTypes from 'prop-types';
import moment from 'moment';

class NosCreated extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createdDate: moment().toISOString(true).substring(0, 10),
    };

    this.props.Session.set('nosCreatedDate', moment().toISOString(true).substring(0, 10));

    this.handleCreatedDateChange = this.handleCreatedDateChange.bind(this);
  }

  handleCreatedDateChange(value) {
    const createdDate = value;
    this.setState({ 
      ...this.state,
      createdDate,
    });

    this.props.Session.set('nosCreatedDate', 
      createdDate.substring(0, 10));
  }

  render() {
    return (
      <form>
        <FormGroup>
          <DatePicker dateFormat="YYYY-MM-DD"
            name="createdDate" ref="createdDate"
            value={this.state.createdDate}
            onChange={this.handleCreatedDateChange}/>
        </FormGroup>
      </form>
    );
  }
}

NosCreated.propTypes = {
  Session: PropTypes.object,
};

export default container((props, onData) => {
  onData(null, { Session });
}, NosCreated);