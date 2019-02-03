import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Alert } from 'react-bootstrap';
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
        Cell: (row) => (<div>{1 + row.index}</div>),
        maxWidth: 48,
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: 'ป-ด-ว',
        accessor: 'createdAt',
        minWidth: 145,
        Cell: ({ original: { createdAt } }) => (<div>{moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>),
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: 'ใบที่',
        accessor: 'broker',
        maxWidth: 84,
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: 'เบอร์',
        accessor: 'no',
        maxWidth: 48,
        style: {
          textAlign: 'center',
          fontWeight: 'bold',
        },
      },
      {
        Header: '%',
        accessor: 'percent',
        maxWidth: 32,
        style: {
          textAlign: 'center'
        },
      },
      {
        maxWidth: 96,
        Cell: ({ original: { up2, down2, up3, permute, down3 } }) => {
          if (up2 && !down2 && !up3 && !permute && !down3) return <div>บน</div>;
          else if (!up2 && down2 && !up3 && !permute && !down3) return <div>ล่าง</div>;
          else if (up2 && down2 && !up3 && !permute && !down3) return <div>{`${up2}x${down2}`}</div>;
          else if (!up2 && !down2 && up3 && !permute && !down3) return <div>ตรง</div>;
          else if (!up2 && !down2 && !up3 && permute && !down3) return <div>โต๊ด</div>;
          else if (!up2 && !down2 && !up3 && !permute && down3) return <div>ล่าง</div>;
          else if (!up2 && !down2 && up3 && permute && !down3) return <div>{`${up3}x${permute}`}</div>;
          return undefined;
        },
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: '2บน',
        accessor: 'up2',
        maxWidth: 64,
        Cell: ({ original: { up2 } }) => (<div>{up2 || undefined}</div>),
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: '2ล่าง',
        accessor: 'down2',
        maxWidth: 64,
        Cell: ({ original: { down2 } }) => (<div>{down2 || undefined}</div>),
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: '3ตรง',
        accessor: 'up3',
        maxWidth: 64,
        Cell: ({ original: { up3 } }) => (<div>{up3 || undefined}</div>),
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: '3โต๊ด',
        accessor: 'permute',
        maxWidth: 64,
        Cell: ({ original: { permute } }) => (<div>{permute || undefined}</div>),
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: '3ล่าง',
        accessor: 'down3',
        maxWidth: 64,
        Cell: ({ original: { down3 } }) => (<div>{down3 || undefined}</div>),
        style: {
          textAlign: 'center',
        },
      },
      {
        Cell: ({ original: { _id, userId } }) => (
          Meteor.userId() === userId ?
            <button className="btn btn-xs btn-danger"
              onClick={() => handleRemove(_id)}>X</button>
            : undefined
        ),
        maxWidth: 48,
        style: {
          textAlign: 'center',
        },
      }
    ]}
    defaultPageSize={10}
    className="-striped -highlight"
  /> : <Alert bsStyle="warning">No bets yet.</Alert>
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
