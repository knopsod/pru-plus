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
        <h2>Lotto Go Fast</h2>
      </p>
      <br />
      <hr />
      {hasUser ? 
        <p><Link to="/employ" className="btn btn-success">จ้างงาน</Link></p> :
        <p><Link to="/login" className="btn btn-success">จ้างงาน</Link></p>
      }      
      <hr />
      {hasUser ?
        <p><Link to="/job" className="btn btn-success">หางาน</Link></p> :
        <p><Link to="/login" className="btn btn-success">หางาน</Link></p>
      }
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

