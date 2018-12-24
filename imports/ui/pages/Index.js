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
        <span>โปรแกรมเจ้ามือหวย</span>
      </p>
      <p>
        <span style={{ fontSize: 16 }}>ช่วยคัดเลข/ตัดเลขได้เร็วที่สุด รวมผู้พิมพ์โพยหวยไว้มากที่สุด</span>
      </p>
      <br />
      <p><Link to="/employments" className="btn btn-primary btn-lg btn-block">จ้างงาน</Link></p>
      <hr style={{ width: 200 }} />
      <p><Link to="/jobs" className="btn btn-primary btn-lg btn-block">หางาน</Link></p>
      <br />
      <p>
        <span style={{ fontSize: 16 }}>ช่วยลดความเสี่ยง ช่วยหาคนทำงาน ไม่มีขั้นต่ำในการจ้าง (ยอด 1,000.- จ่าย 5.-)</span>
      </p>
      <p>
        <span style={{ fontSize: 16 }}>เลือกคนทำงานได้ง่าย ด้วยระบบคะแนน</span>
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

