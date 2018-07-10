import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert, Table } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import Bets from '../../api/bets/bets';
import container from '../../modules/container';

const handleNav = _id => browserHistory.push(`/bets/${_id}`);

const BetsList = ({ bets }) => (
  bets.length > 0 ? <Table className="BetsList" striped bordered condensed hover>
    <thead>
      <tr>
        <th className="col-xs-1 col-sm-1 text-center" />
        <th className="col-xs-2 col-sm-2 text-center">ป-ด-ว</th>
        <th className="col-xs-2 col-sm-2 text-center">ผู้ส่ง</th>
        <th className="col-xs-1 col-sm-1 text-center">เลข</th>
        <th className="col-xs-1 col-sm-1 text-center" />

        <th className="col-xs-1 col-sm-1 text-center">2ตัวบน</th>
        <th className="col-xs-1 col-sm-1 text-center">2ตัวล่าง</th>
        <th className="col-xs-1 col-sm-1 text-center">3ตัวเต็ง</th>
        <th className="col-xs-1 col-sm-1 text-center">3ตัวโต๊ด</th>
        <th className="col-xs-1 col-sm-1 text-center">3ตัวล่าง</th>
      </tr>
    </thead>
    <tbody>
      { bets.map(({ _id, no, up2, down2, up3, down3, permute, createdDate, broker }) => 
        { 
          var typeOfNo = '';

          if ( up2 > 0 && down2 === 0 && up3 === 0 && down3 === 0 && permute === 0 ) typeOfNo = 'บน';
          if ( up2 === 0 && down2 > 0 && up3 === 0 && down3 === 0 && permute === 0 ) typeOfNo = 'ล่าง';
          if ( up2 > 0 && down2 > 0 && up3 === 0 && down3 === 0 && permute === 0 ) typeOfNo = '' + up2 + 'x' + down2;
          if ( up2 === 0 && down2 === 0 && up3 > 0 && down3 === 0 && permute === 0 ) typeOfNo = 'เต็ง';
          if ( up2 === 0 && down2 === 0 && up3 === 0 && down3 === 0 && permute > 0 ) typeOfNo = 'โต๊ด';
          if ( up2 === 0 && down2 === 0 && up3 === 0 && down3 > 0 && permute === 0 ) typeOfNo = 'ล่าง';
          if ( up2 === 0 && down2 === 0 && up3 > 0 && down3 === 0 && permute > 0 ) typeOfNo = '' + up3 + 'x' + permute;

          return ( <tr key={ _id } 
          onClick={ () => handleNav(_id) }>
          <td className="col-xs-1 col-sm-1 text-center" style={{ fontSize: 10 }}>{ _id }</td>
          <td className="col-xs-2 col-sm-2 text-center">{ createdDate }</td>
          <td className="col-xs-2 col-sm-2 text-center">{ broker }</td>
          <td className="col-xs-1 col-sm-1 text-center"><b>{ no }</b></td>
          <td className="col-xs-1 col-sm-1 text-center">{ typeOfNo }</td>

          <td className="col-xs-1 col-sm-1 text-center">{ up2 === 0 ? '' : up2 }</td>
          <td className="col-xs-1 col-sm-1 text-center">{ down2 === 0 ? '' : down2 }</td>
          <td className="col-xs-1 col-sm-1 text-center">{ up3 === 0 ? '' : up3 }</td>
          <td className="col-xs-1 col-sm-1 text-center">{ permute === 0 ? '' : permute }</td>
          <td className="col-xs-1 col-sm-1 text-center">{ down3 === 0 ? '' : down3 }</td>
        </tr> )}
      )}
    </tbody>
  </Table> : <div />
  // <Alert bsStyle="warning">No bets yet.</Alert>
);

BetsList.propTypes = {
  bets: PropTypes.array,
};

export default container((props, onData) => { 
  const createdDate = Session.get('createdDate') ? Session.get('createdDate').substring(0, 10) : '';
  const insertedId = Session.get('insertedId') ? Session.get('insertedId') : '';
    
  const subscription = Meteor.subscribe('bets.list', createdDate);
  
  if (subscription.ready()) {
    const bets = Bets.find({}, {sort: {createdAt: -1}}).fetch();
    
    if ( bets.length > 0 && insertedId !== '' ) {
      const bet = bets.find( obj => obj._id === insertedId );
      console.log(bet);
      Session.set('latestSessionBet', bet);
    }

    onData(null, { bets });
  }
}, BetsList);
