import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import Bets from '../../api/bets/bets';
import container from '../../modules/container';

const BetsUsersList = ({ users, recordTotal, allIncome }) => (
  users.length > 0 ? <Table className="BetsList" 
    striped bordered condensed hover>
    <thead>
      <tr>
        <th className="col-xs-1 col-sm-1 text-center"></th>
        <th className="col-xs-4 col-sm-4 text-center">ID</th>
        <th className="col-xs-3 col-sm-3 text-center">Email</th>
        <th className="col-xs-2 col-sm-2 text-center">Recorded</th>
        <th className="col-xs-2 col-sm-2 text-center">Recieved</th>
      </tr>
    </thead>
    <tbody>
      { users.map(({ _id, emails, record, userIncome }, index) => 
        { 
          return ( <tr key={ _id }>
            <td className="col-xs-1 col-sm-1 text-center">{ (index + 1) }</td>
            <td className="col-xs-4 col-sm-4 text-center">{ _id }</td>
            <td className="col-xs-3 col-sm-3 text-center">{
              Meteor.userId() === _id ? emails[0].address
                : emails[0].address.replace(/.{1,4}(?=\@.*?)/, '****')
            }</td>
            <td className="col-xs-2 col-sm-2 text-center">{ record }</td>
            <td className="col-xs-2 col-sm-2 text-center">{ userIncome }</td>
          </tr> )
        }
      )}
    </tbody>
    <tfoot>
      <tr>
        <td colSpan={3} style={{ textAlign: 'center'}}>รวม</td>
        <td style={{ textAlign: 'center', color: 'red' }}>{ recordTotal }</td>
        <td style={{ textAlign: 'center', color: 'red' }}>{ allIncome }</td>
      </tr>
    </tfoot>
  </Table> : <div />
  // <Alert bsStyle="warning">No bets yet.</Alert>
);

BetsUsersList.propTypes = {
  users: PropTypes.array,
};

export default container((props, onData) => { 
  const createdDate = Session.get('createdDate') ? Session.get('createdDate').substring(0, 10) : '';
  const insertedId = Session.get('insertedId') ? Session.get('insertedId') : '';
    
  const subscription = Meteor.subscribe('bets.list', createdDate);
  const usersSubscription = Meteor.subscribe('users.list');
  
  var recordTotal = 0;
  var allIncome = 0;

  if (subscription.ready() && usersSubscription.ready() ) {
    const bets = Bets.find({}, {sort: {createdAt: 1}}).fetch();
    const users = Meteor.users.find({}, {fields: {emails: 1, profile: 1}}).fetch();

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    const reducer = (acc, val) => acc + val.up2 + val.down2 + val.up3 + val.permute + val.down3;

    users.forEach( obj => {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
      let userBets = bets.length ? bets.filter(bet => bet.userId == obj._id) : [];

      obj.record = userBets.length;
      recordTotal += obj.record;

      obj.userIncome = userBets.length ? userBets.reduce(reducer, 0) : 0;
      allIncome += obj.userIncome;
    });

    console.log(users);
    
    if ( bets.length > 0 && insertedId !== '' ) {
      const bet = bets.find( obj => obj._id === insertedId );
      console.log(bet);
      Session.set('latestSessionBet', bet);
    }

    onData(null, { users, recordTotal, allIncome });
  }
}, BetsUsersList);
