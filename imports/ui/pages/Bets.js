import React from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import BetEditor from '../components/BetEditor';
import BetsList from '../components/BetsList';

const Bets = () => (
  <div className="Bets">
    <Row>
      <Col xs={ 12 }>
        <BetEditor />
        <BetsList />
      </Col>
    </Row>
  </div>
);

export default Bets;
