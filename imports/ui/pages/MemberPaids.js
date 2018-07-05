import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import MemberPaidsList from '../components/MemberPaidsList';
import { upsertMemberPaid } from '../../api/memberPaids/methods.js';

const MemberPaids = () => (
  <div>
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">ยอดซื้อของสมาชิก</h4>

          <Button
            bsStyle="success"
            className="pull-right"
            onClick={() =>
              upsertMemberPaid.call(
                { name: '', paids: [] },
                (error, response) => {
                  console.log(error);
                  console.log(response);
                })}
            >เพิ่มสมาชิก</Button>
        </div>
        <MemberPaidsList />
      </Col>
    </Row>
  </div>
);

export default MemberPaids;
