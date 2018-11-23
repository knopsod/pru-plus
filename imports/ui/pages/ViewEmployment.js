import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Employments from '../../api/employments/employments';
import { removeEmployment } from '../../api/employments/methods';
import NotFound from './NotFound';
import container from '../../modules/container';

const handleEdit = (_id) => {
  browserHistory.push(`/employments/${_id}/edit`);
};

const handleRemove = (_id) => {
  if (confirm('Are you sure? This is permanent!')) {
    removeEmployment.call({ _id }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Employment deleted!', 'success');
        browserHistory.push('/employments');
      }
    });
  }
};

const ViewEmployment = ({ employment }) => {
  return employment ? (
    <div className="ViewEmployment">
      <div className="page-header clearfix">
        <h4 className="pull-left">{ employment && employment.title }</h4>
        <ButtonToolbar className="pull-right">
          <ButtonGroup bsSize="small">
            <Button onClick={ () => handleEdit(employment._id) }>Edit</Button>
            <Button onClick={ () => handleRemove(employment._id) } className="text-danger">Delete</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      { employment && employment.body }
      <ul>
        { employment && employment.employees.length ?
          employment.employees.map(({ userId, allowed }) => <li key={userId}>{`${userId} ${allowed}`}</li>)
          : undefined
        }
      </ul>
    </div>
  ) : <NotFound />;
};

ViewEmployment.propTypes = {
  employment: PropTypes.object,
};

export default container((props, onData) => {
  const employmentId = props.params._id;
  const subscription = Meteor.subscribe('employments.view', employmentId);

  if (subscription.ready()) {
    const employment = Employments.findOne(employmentId);
    onData(null, { employment });
  }
}, ViewEmployment);