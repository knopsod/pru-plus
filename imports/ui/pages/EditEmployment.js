import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Employments from '../../api/employments/employments';
import EmploymentEditor from '../components/EmploymentEditor';
import NotFound from './NotFound';
import container from '../../modules/container';
import { timeFromInt } from 'time-number';

const EditEmployment = ({ employment }) => (employment ? (
  <div className="EditEmployment">
    <h4 className="page-header">Editing "{ employment.date.substr(0, 10) }, { timeFromInt(employment.startTime) }-{ timeFromInt(employment.endTime) }"</h4>
    <EmploymentEditor employment={ employment }/>
  </div>
) : <NotFound />);

EditEmployment.propTypes = {
  employment: PropTypes.object,
};

export default container((props, onData) => {
  const employmentId = props.params._id;
  const subscription = Meteor.subscribe('employments.view', employmentId);

  if (subscription.ready()) {
    const employment = Employments.findOne(employmentId);
    onData(null, { employment });
  }
}, EditEmployment);
