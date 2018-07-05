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
        <div>
          <div className="col-sm-2 text-center">ป-ด-ว</div>
          <div className="col-sm-3 text-center">รหัสผู้ส่ง</div>
          <div className="col-sm-1 text-center">เลข</div>
          <div className="col-sm-1 text-center">2ตัวบน</div>
          <div className="col-sm-1 text-center">2ตัวล่าง</div>
          <div className="col-sm-1 text-center">3ตัวบน</div>
          <div className="col-sm-1 text-center">3ตัวโต๊ด</div>
          <div className="col-sm-1 text-center">3ตัวล่าง</div>
        </div>
        {/* <div className="page-header clearfix">
          <h4 className="pull-left">Bets</h4>
          <Link to="/bets/new">
            <Button
              bsStyle="success"
              className="pull-right"
              >New Bet</Button>
          </Link>
        </div> */}
        <BetsList />
      </Col>
    </Row>
  </div>
);

export default Bets;
