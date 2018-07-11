import React from 'react';
import { Row, Col } from 'react-bootstrap';

import NosList from '../components/NosList';
import NosCreated from '../components/NosCreated';
import NosRed from '../components/NosRed';

const Nos = () => (
  <div className="Nos">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">รวมยอด</h4>
        </div>
        <NosCreated />
        <NosRed />
        <NosList />
      </Col>
    </Row>
  </div>
);

export default Nos;