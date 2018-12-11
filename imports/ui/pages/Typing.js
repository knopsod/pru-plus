/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TypingUserTyped from '../components/TypingUserTyped';
import TypingEditorFast from '../components/TypingEditorFast';
import TypingReactTable from '../components/TypingReactTable';

const employmentBets = () => (
  <div className="EmploymentBets">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">ทำงาน</h4>
        </div>
      </Col>
    </Row>
    <Row>
      <Col xs={3} sm={3} md={3}>
        <TypingEditorFast />
      </Col>
      <Col xs={9} sm={9} md={9}>
        <TypingReactTable />
        <br />
        <TypingUserTyped />
      </Col>
    </Row>
  </div>
);

export default employmentBets;
