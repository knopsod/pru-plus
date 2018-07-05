import React from 'react';
import { Link } from 'react-router';
import { Jumbotron } from 'react-bootstrap';

const Index = () => (
  <div className="Index">
    <Jumbotron className="text-center">
      <h2>โปรแกรมร้านค้าชุมชนพัฒนา</h2>
      <p><Link to="/member-paids" className="btn btn-success">เข้าโปรแกรม</Link></p>
      <p>เข้าถึงง่าย ใช้สะดวก ลดความผิดพลาด ประหยัดเวลา เพิ่มประสิทธิภาพการบริหาร</p>
      <p>พัฒนาจาก Open Source ไลเซนส์ MIT สามารถคัดลอกและนำไปใช้ภายใต้ไลเซนส์นี้</p>;
      <p><a className="btn btn-success" href="https://github.com/themeteorchef/base"
      role="button">GitHub: themeteorchef/base</a></p>
      <p><a className="btn btn-success" href="https://github.com/knopsod/pattana-coop"
      role="button">GitHub: knopsod/pattana-coop</a></p>
      <p style={ { fontSize: '16px', color: '#aaa' } }>Currently at v4.15.0</p>
    </Jumbotron>
  </div>
);

export default Index;
