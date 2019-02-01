import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Typings from '../../api/typings/typings';
import { removeTyping } from '../../api/typings/methods';
import container from '../../modules/container';
import moment from 'moment';
import ReactTable from 'react-table';

import "react-table/react-table.css";

const handleRemove = (_id) => {
  if (confirm('Are you sure? This is permanent!')) {
    removeTyping.call({ _id }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Typing deleted!', 'success');
        // browserHistory.push('/bets');
      }
    });
  }
};

const TypingsReactTable = ({ typings }) => (
  typings.length > 0 ? <ReactTable
    data={typings}
    columns={[
      {
        id: "row",
        Cell: (row) => (<div>{ 1 + row.index }</div>),
        maxWidth: 48,
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: 'ป-ด-ว',
        accessor: 'createdAt',
        minWidth: 145,
        Cell: ({ original: { createdAt } }) => (<div>{ moment(createdAt).format('YYYY-MM-DD HH:mm:ss') }</div>),
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
        Cell: ({ original: { up2 } }) => (<div>{ up2 || undefined }</div>),
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: '2ล่าง',
        accessor: 'down2',
        maxWidth: 64,
        Cell: ({ original: { down2 } }) => (<div>{ down2 || undefined }</div>),
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: '3ตรง',
        accessor: 'up3',
        maxWidth: 64,
        Cell: ({ original: { up3 } }) => (<div>{ up3 || undefined }</div>),
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: '3โต๊ด',
        accessor: 'permute',
        maxWidth: 64,
        Cell: ({ original: { permute } }) => (<div>{ permute || undefined }</div>),
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: '3ล่าง',
        accessor: 'down3',
        maxWidth: 64,
        Cell: ({ original: { down3 } }) => (<div>{ down3 || undefined }</div>),
        style: {
          textAlign: 'center',
        },
      },
      {
        Cell: ({ original: { _id, employeeId } }) => (
          Meteor.userId() === employeeId ?
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

TypingsReactTable.propTypes = {
  typings: PropTypes.array,
};

const TypingsReactTableCell = ({ typings }) => (
  typings.length > 0 ? <ReactTable
    data={typings}
    columns={[
      {
        id: "row",
        Cell: (row) => (<div>{ 1 + row.index }</div>),
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

TypingsReactTableCell.propTypes = {
  typings: PropTypes.array,
};

export default container((props, onData) => { 
  const employmentId = props.employmentId;
  const employeeId = Meteor.userId();

  const subscription = Meteor.subscribe('typings.user.list', employmentId, employeeId);

  if (subscription.ready()) {
    const typings = Typings.find({ employmentId, employeeId }, { sort: { createdAt: 1 } }).fetch();

    onData(null, { typings });
  }
}, TypingsReactTable);
