import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import MemberPaids from '../../api/memberPaids/memberPaids';
import container from '../../modules/container';

class MemberPaidsList extends Component {
  constructor( props ) {
    super( props );
  }
  render() {
    return (
      <div>MemberPaidsList!!</div>
    );
  }
};

MemberPaidsList.propTypes = {
  memberPaids: PropTypes.array,
};

export default container((props, onData) => {
  const subscription = Meteor.subscribe('memberPaids.list');
  if (subscription.ready()) {
    const memberPaids = MemberPaids.find().fetch();
    console.log(memberPaids);
    onData(null, { memberPaids });
  }
}, MemberPaidsList);
