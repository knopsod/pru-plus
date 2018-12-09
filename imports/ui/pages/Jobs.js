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
        <span>งานใหม่</span>
        <JobsAvailableList />
      </Col>
    </Row>
    <Row>
      <Col xs={ 12 }>
      <span>รอการตอบรับ</span>
        <JobsPengingList />
      </Col>
    </Row>
    <Row>
      <Col xs={ 12 }>
        <span>ตอบรับแล้ว</span>
        <JobsOnHandList />
      </Col>
    </Row>
    <Row>
      <Col xs={ 12 }>
        <span>งานสิ้นสุด รอให้คะแนน</span>
        <JobsDoneList />
      </Col>
    </Row>
  </div>
);

export default Jobs;
