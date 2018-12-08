import React from 'react';
import { Row, Col } from 'react-bootstrap';

import JobsAvailableList from '../components/JobsAvailableList';
import JobsOnHandList from '../components/JobsOnHandList';
import JobsDoneList from '../components/JobsDoneList';

const Jobs = () => (
  <div className="Jobs">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">Jobs</h4>
        </div>
        <span>Available</span>
        <JobsAvailableList />
      </Col>
    </Row>
    <Row>
      <Col xs={ 12 }>
        <span>Pending</span>
      </Col>
    </Row>
    <Row>
      <Col xs={ 12 }>
        <span>On-hand</span>
        <JobsOnHandList />
      </Col>
    </Row>
    <Row>
      <Col xs={ 12 }>
        <span>Done</span>
        <JobsDoneList />
      </Col>
    </Row>
  </div>
);

export default Jobs;
