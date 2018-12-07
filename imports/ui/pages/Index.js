import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Jumbotron } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import container from '../../modules/container';

const Index = ({ hasUser }) => (
  <div className="Index">
    <Jumbotron className="text-center" 
      style={{ 
        height: '64rem',
        paddingTop: '8rem',
      }}>
      <p>
        <span>Lotto Go Fast</span>
      </p>
      <br />
      <hr />
      <p><Link to="/employments" className="btn btn-success">จ้างงาน</Link></p>
      <hr />
      <p><Link to="/jobs" className="btn btn-success">หางาน</Link></p>
      <hr />
    </Jumbotron>
  </div>
);

Index.propTypes = {
  hasUser: PropTypes.object,
};

export default container((props, onData) => {
  onData(null, { hasUser: Meteor.user() });
}, Index);

