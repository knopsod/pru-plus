/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BetsList from '../components/BetsList';
import BetsUsersList from '../components/BetsUsersList';
import BetEditorFast from '../components/BetEditorFast';
import BetsReactTable from '../components/BetsReactTable';

const Bets = () => (
  <div className="Bets">
    <Row>
      <Col xs={3} sm={3} md={3}>
        <div className="page-header clearfix">
          <BetEditorFast />
        </div>
      </Col>
      <Col xs={9} sm={9} md={9}>
        <div className="page-header clearfix">
          {/* <BetsList /> */}
          <BetsReactTable />
          <br />
          <BetsUsersList />
        </div>
      </Col>
    </Row>
  </div>
);

export default Bets;
