/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import BetsList from '../components/BetsList';
import BetEditorFast from '../components/BetEditorFast';

const Bets = () => (
  <div className="Bets">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <BetEditorFast />
        </div>
        <div className="page-header clearfix">
          <h4 className="pull-left">Bets</h4>
          <Link to="/bets/new">
            <Button
              bsStyle="success"
              className="pull-right"
              >New Bet</Button>
          </Link>
        </div>
        <BetsList />
      </Col>
    </Row>
  </div>
);

export default Bets;
