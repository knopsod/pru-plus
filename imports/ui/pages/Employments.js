import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import EmploymentsList from '../components/EmploymentsList';

const Employments = () => (
  <div className="Employments">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">จ้างงาน</h4>
          <Link to="/employments/new">
            <Button
              bsStyle="success"
              className="pull-right"
            >สร้างใหม่</Button>
          </Link>
        </div>
        <EmploymentsList />
      </Col>
    </Row>
  </div>
);

export default Employments;
