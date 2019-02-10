/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BetsUsersList from '../components/BetsUsersList';
import BetEditorFast from '../components/BetEditorFast';
import BetEditorFastMobile from '../components/BetEditorFastMobile';
import BetsReactTable from '../components/BetsReactTable';

const Bets = () => (
  <div className="Bets">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">ฝึกคีย์</h4>
        </div>
      </Col>
    </Row>
    <Row>
      <Col xsHidden sm={3} md={3}>
        <BetEditorFast />
      </Col>
      <Col xs={12} smHidden mdHidden lgHidden>
        <BetEditorFastMobile />
      </Col>
      <Col xs={12} sm={9} md={9}>
        <BetsReactTable />
        <br />
        <BetsUsersList />
      </Col>
    </Row>
  </div>
);

export default Bets;
