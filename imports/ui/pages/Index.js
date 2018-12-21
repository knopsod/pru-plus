import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Jumbotron } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import container from '../../modules/container';

const Index = ({ user }) => (
  <div className="Index">
    <Jumbotron className="text-center"
      style={{
        height: '48rem',
        paddingTop: '8rem',
        paddingBottom: '8rem',
      }}>
      <p>
        <span>Lotto Go Fast</span>
      </p>
      <br />
      <p><Link to="/employments" className="btn btn-primary btn-lg btn-block">จ้างงาน</Link></p>
      <hr style={{ width: 200 }} />
      <p><Link to="/jobs" className="btn btn-primary btn-lg btn-block">หางาน</Link></p>
    </Jumbotron>
  </div>
);

Index.propTypes = {
  user: PropTypes.object,
};

export default container((props, onData) => {
  onData(null, { user: Meteor.user() });
}, Index);

