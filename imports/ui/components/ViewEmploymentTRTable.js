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

const ViewEmploymentTRTable = ({ typings }) => (
  typings.length > 0 ? <ReactTable
    data={typings}
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
        Header: 'ผู้พิมพ์',
        accessor: 'employeeId',
        Cell: ({ original: { employee } }) => (employee && `${employee.profile.name.first} ${employee.profile.name.last}`),
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: 'Email',
        accessor: 'employee',
        Cell: ({ original: { employee } }) => (employee && employee.emails[0].address),
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: 'ป-ด-ว',
        accessor: 'createdAt',
        minWidth: 145,
        maxWidth: 150,
        Cell: ({ original: { createdAt } }) => (moment(createdAt).format('YYYY-MM-DD HH:mm:ss')),
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
        Header: '2บน',
        accessor: 'up2',
        maxWidth: 64,
        Cell: ({ original: { up2 } }) => (up2 || undefined),
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: '2ล่าง',
        accessor: 'down2',
        maxWidth: 64,
        Cell: ({ original: { down2 } }) => (down2 || undefined),
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: '3ตรง',
        accessor: 'up3',
        maxWidth: 64,
        Cell: ({ original: { up3 } }) => (up3 || undefined),
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: '3โต๊ด',
        accessor: 'permute',
        maxWidth: 64,
        Cell: ({ original: { permute } }) => (permute || undefined),
        style: {
          textAlign: 'center',
        },
      },
      {
        Header: '3ล่าง',
        accessor: 'down3',
        maxWidth: 64,
        Cell: ({ original: { down3 } }) => (down3 || undefined),
        style: {
          textAlign: 'center',
        },
      },
    ]}
    defaultPageSize={10}
    className="-striped -highlight"
  /> : <Alert bsStyle="warning">No bets yet.</Alert>
);

ViewEmploymentTRTable.propTypes = {
  typings: PropTypes.array,
};

export default container((props, onData) => { 
  const employmentId = props.employmentId;

  const subscription = Meteor.subscribe('typings.list', employmentId);

  if (subscription.ready()) {
    const typings = Typings.find({ employmentId }, { sort: { createdAt: 1 } }).fetch();

    onData(null, { typings });
  }
}, ViewEmploymentTRTable);
