/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TypingsUserTyped from '../components/TypingsUserTyped';
import TypingsEditorFast from '../components/TypingsEditorFast';
import TypingsReactTable from '../components/TypingsReactTable';

const typings = (props) => {
  const employmentId = props.params._id;

  return (<div className="EmploymentBets">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">ทำงาน</h4>
        </div>
      </Col>
    </Row>
    <Row>
      <Col xs={3} sm={3} md={3}>
        <TypingsEditorFast employmentId={employmentId} />
      </Col>
      <Col xs={9} sm={9} md={9}>
        <TypingsReactTable />
        <br />
        <TypingsUserTyped />
      </Col>
    </Row>
  </div>);
};

export default typings;
