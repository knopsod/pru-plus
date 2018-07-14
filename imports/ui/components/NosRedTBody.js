import React from 'react';
import { Session } from 'meteor/session';
import container from '../../modules/container';

const NosRedTBody = (props) => (
  <tbody>
    { props.nosReds.length > 0 ? props.nosReds.map((nosRed, index) => (<tr key={index}>
      <td className="col-xs-2 col-sm-1 text-center">{ nosRed.createdDate }</td>
      <td className="col-xs-1 col-sm-1 text-center" style={{ color: 'red' }}><b>{ nosRed.no }</b></td>

      <td className="col-xs-1 col-sm-1 text-center">{ nosRed.up2 ? nosRed.up2 : '' }</td>
      <td className="col-xs-1 col-sm-1 text-center">{ nosRed.down2 ? nosRed.down2 : '' }</td>
      <td className="col-xs-1 col-sm-1 text-center">{ nosRed.up3 ? nosRed.up3 : '' }</td>
      <td className="col-xs-1 col-sm-1 text-center">{ nosRed.permute ? nosRed.permute : '' }</td>
      <td className="col-xs-1 col-sm-1 text-center">{ nosRed.down3 ? nosRed.down3 : '' }</td>
    </tr>)) :
    (<tr>
      <td className="col-xs-2 col-sm-1 text-center">-</td>
      <td className="col-xs-1 col-sm-1 text-center" style={{ color: 'red' }}><b>-</b></td>

      <td className="col-xs-1 col-sm-1 text-center">-</td>
      <td className="col-xs-1 col-sm-1 text-center">-</td>
      <td className="col-xs-1 col-sm-1 text-center">-</td>
      <td className="col-xs-1 col-sm-1 text-center">-</td>
      <td className="col-xs-1 col-sm-1 text-center">-</td>
    </tr>)
    }
  </tbody>
);

export default container((props, onData) => {
  const nosReds = Session.get('nosReds') ? Session.get('nosReds') : [];
  console.log(nosReds);
  onData(null, { nosReds });
}, NosRedTBody);