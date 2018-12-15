import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import container from '../../modules/container';

import ProfileEditor from '../components/ProfileEditor';
import NotFound from './NotFound';

const profile = ({ user }) => (user ? (
  <div className="Profile">
    <h4 className="page-header">โปรไฟล์</h4>
    <ProfileEditor user={ user }/>
  </div>
) : <NotFound />);

profile.propTypes = {
  user: PropTypes.object,
}

export default container((props, onData) => {
  const user = Meteor.user();

  onData(null, { user });
}, profile);

