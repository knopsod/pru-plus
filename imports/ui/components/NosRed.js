import React from 'react';
import NosRedTHead from './NosRedTHead';
import NosRedTBody from './NosRedTBody';
import NosRedTFoot from './NosRedTFoot';
import { Table } from 'react-bootstrap';

const NosRed = (props) => (
  <div>
    <Table className="NosRed"
      striped bordered condensed hover>
      <NosRedTHead />
      <NosRedTBody />
      <NosRedTFoot />
    </Table>
  </div>
);

export default NosRed;