import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Jumbotron } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import container from '../../modules/container';

const Index = ({ user }) => (
  <div className="Index">
    <Jumbotron className="text-center"
      style={{
        height: '48rem',
        paddingTop: '5rem',
      }}>
      <p>
        <span>โปรแกรมเจ้ามือเงินล้าน</span>
      </p>
      <p>
        <span style={{ fontSize: 16 }}>คัดเลข/ตัดเลขได้เร็ว</span>
      </p>
      <br />
      <p><Link to="/employments" className="btn btn-primary btn-lg btn-block">จ้างงาน</Link></p>
      <hr style={{ width: 200 }} />
      <p><Link to="/jobs" className="btn btn-primary btn-lg btn-block">หางาน</Link></p>
      <br />
      <p>
        <span style={{ fontSize: 16 }}>ลดความเสี่ยง คำนวณค่าแรงตามเปอร์เช็นต์ของยอดขาย(0.5%)</span>
      </p>
      <p>
        <span style={{ fontSize: 16 }}>เลือกคนทำงานได้ง่ายด้วยระบบคะแนน</span>
      </p>
    </Jumbotron>
  </div>
);

Index.propTypes = {
  user: PropTypes.object,
};

export default container((props, onData) => {
  onData(null, { user: Meteor.user() });
}, Index);

