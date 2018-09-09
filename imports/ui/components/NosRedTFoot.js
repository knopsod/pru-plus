import React from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import container from '../../modules/container';

const nosRedTFoot = (props) => {
  return (
    <tfoot>
      <tr>
        <td style={{ textAlign: 'center'}}>รวม</td>
        <td style={{ textAlign: 'center', color: 'red' }}>{ props.nosTotal }</td>
        <td colSpan={5}></td>
      </tr>
    </tfoot>
  );
}

nosRedTFoot.propTypes = {
  nosTotal: PropTypes.number,
};

export default container((props, onData) => {
  const nosReds = Session.get('nosReds') ? Session.get('nosReds') : [];
  var nosTotal = 0;

  for (var i = 0; i < nosReds.length; i++) {
    nosTotal += 0 + nosReds[i].up2Cutloss + nosReds[i].down2Cutloss + 
      nosReds[i].up3Cutloss + nosReds[i].permuteCutloss + nosReds[i].down3Cutloss;
  }

  onData(null, { nosTotal });
}, nosRedTFoot);
