import React from 'react';
import { Row, Col } from 'react-bootstrap';

import JobsAvailableList from '../components/JobsAvailableList';
import JobsPengingList from '../components/JobsPendingList';
import JobsOnHandList from '../components/JobsOnHandList';
import JobsDoneList from '../components/JobsDoneList';

const Jobs = () => (
  <div className="Jobs">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">หางาน</h4>
        </div>
        <span>คีย์ข้อมูล</span>
        <JobsOnHandList />
      </Col>
    </Row>
    {/* <Row>
      <Col xs={ 12 }>
        <span>ให้คะแนนงาน</span>
        <JobsDoneList />
      </Col>
    </Row> */}
    <Row>
      <Col xs={ 12 }>
        <span>รอการตอบรับ</span>
        <JobsPengingList />
      </Col>
    </Row>
    <Row>
      <Col xs={ 12 }>
        <span>งานใหม่</span>
        <JobsAvailableList />
      </Col>
    </Row>
  </div>
);

export default Jobs;
