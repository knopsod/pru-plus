/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import BetsList from '../components/BetsList';
import BetEditorFast from '../components/BetEditorFast';

const Bets = () => (
  <div className="Bets">
    <Row>
      <Col xs={3} sm={3} md={3}>
        <div className="page-header clearfix">
          <BetEditorFast />
        </div>
      </Col>
      <Col xs={9} sm={9} md={9}>
        <div>
          <BetsList />
        </div>
      </Col>
    </Row>
  </div>
);

export default Bets;
