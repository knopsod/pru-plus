import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Typings from '../../api/typings/typings';
import container from '../../modules/container';

const TypingsUserTyped = ({ users, recordTotal, allIncome }) => (
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

TypingsUserTyped.propTypes = {
  users: PropTypes.array,
  recordTotal: PropTypes.number,
  allIncome: PropTypes.number,
};

export default container((props, onData) => { 
  const employmentId = props.employmentId;
    
  const subscription = Meteor.subscribe('typings.list', employmentId);
  const usersSubscription = Meteor.subscribe('users.list');
  
  var recordTotal = 0;
  var allIncome = 0;

  if (subscription.ready() && usersSubscription.ready()) {
    const typings = Typings.find({ employmentId }, { sort: { createdAt: 1 } }).fetch();
    const users = Meteor.users.find({ _id: Meteor.userId() }, { fields: { emails: 1, profile: 1 } }).fetch();

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    const reducer = (acc, val) => acc + val.up2 + val.down2 + val.up3 + val.permute + val.down3;

    users.forEach( obj => {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
      let userTypings = typings.length ? typings.filter(typing => typing.employeeId == obj._id) : [];

      obj.record = userTypings.length;
      recordTotal += obj.record;

      obj.userIncome = userTypings.length ? userTypings.reduce(reducer, 0) : 0;
      allIncome += obj.userIncome;
    });

    console.log(users);
    
    onData(null, { users, recordTotal, allIncome });
  }
}, TypingsUserTyped);
