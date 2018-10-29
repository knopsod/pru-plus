import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Table } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Bert } from 'meteor/themeteorchef:bert';
import Bets from '../../api/bets/bets';
import { removeBet } from '../../api/bets/methods';
import container from '../../modules/container';
import moment from 'moment';
import ReactTable from 'react-table';

import "react-table/react-table.css";

const handleRemove = (_id) => {
  if (confirm('Are you sure? This is permanent!')) {
    removeBet.call({ _id }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Bet deleted!', 'success');
        browserHistory.push('/bets');
      }
    });
  }
};

const BetsReactTable = ({ bets }) => (
  bets.length > 0 ? <ReactTable
    data={bets}
    columns={[
      {
        id: "row",
        Cell: (row) => (1 + row.index),
        maxWidth: 48,
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: "ป-ด-ว",
        accessor: "createdAt",
        minWidth: 145,
        Cell: ({ original: { createdAt } }) => (moment(createdAt).format('YYYY-MM-DD HH:mm:ss')),
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: "ฉบับที่",
        accessor: "broker",
        maxWidth: 72,
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: "เบอร์",
        accessor: "no",
        maxWidth: 48,
        style: {
          textAlign: 'center',
          fontWeight: 'bold',
        },
      },
      {
        maxWidth: 72,
        Cell: ({ original: { up2, down2, up3, permute, down3 } }) => {
          if (up2 && !down2 && !up3 && !permute && !down3) return 'บน';
          else if (!up2 && down2 && !up3 && !permute && !down3) return 'ล่าง';
          else if (up2 && down2 && !up3 && !permute && !down3) return '' + up2 + 'x' + down2;
          else if (!up2 && !down2 && up3 && !permute && !down3) return 'ตรง';
          else if (!up2 && !down2 && !up3 && permute && !down3) return 'โต๊ด';
          else if (!up2 && !down2 && !up3 && !permute && down3) return 'ล่าง';
          else if (!up2 && !down2 && up3 && permute && !down3) return '' + up3 + 'x' + permute;
          return '';
        },
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: "2บน",
        accessor: "up2",
        maxWidth: 72,
        Cell: ({ original: { up2 } }) => (up2 || undefined),
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: "2ล่าง",
        accessor: "down2",
        maxWidth: 72,
        Cell: ({ original: { down2 } }) => (down2 || undefined),
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: "3ตรง",
        accessor: "up3",
        maxWidth: 72,
        Cell: ({ original: { up3 } }) => (up3 || undefined),
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: "3โต๊ด",
        accessor: "permute",
        maxWidth: 72,
        Cell: ({ original: { permute } }) => (permute || undefined),
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: "3ล่าง",
        accessor: "down3",
        maxWidth: 72,
        Cell: ({ original: { down3 } }) => (down3 || undefined),
        style: {
          textAlign: 'center',
        },
      },
      {
        Cell: ({ original: { _id, userId } }) => (
          Meteor.userId() === userId ?
            <button className="btn btn-xs btn-danger"
              onClick={() => handleRemove(_id)}>Remove</button>
            : undefined
        ),
        style: {
          textAlign: 'center',
        },
      }
    ]}
    defaultPageSize={10}
    className="-striped -highlight"
  /> : <div />
);

BetsReactTable.propTypes = {
  bets: PropTypes.array,
};

export default container((props, onData) => { 
  const createdDate = Session.get('createdDate') ? Session.get('createdDate').substring(0, 10) : '';
  const insertedId = Session.get('insertedId') ? Session.get('insertedId') : '';
    
  const subscription = Meteor.subscribe('bets.list', createdDate);
  
  if (subscription.ready()) {
    const bets = Bets.find({}, {sort: {createdAt: 1}}).fetch();
    
    if ( bets.length > 0 && insertedId !== '' ) {
      const bet = bets.find( obj => obj._id === insertedId );
      console.log(bet);
      Session.set('latestSessionBet', bet);
    }

    onData(null, { bets });
  }
}, BetsReactTable);
