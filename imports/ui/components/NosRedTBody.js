import React from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import container from '../../modules/container';

const NosRedTBody = (props) => (
  <tbody>
    { props.nosReds.length > 0 ? props.nosReds.map((nosRed, index) => (<tr key={index}>
      <td className="col-xs-2 col-sm-1 text-center">{ nosRed.createdDate }</td>
      <td className="col-xs-1 col-sm-1 text-center" style={{ color: 'red' }}>
        <b>{ nosRed.no }</b>
        { nosRed.no.length == 2 ? (<a style={{ color: 'red', textDecoration: 'none' }}> = {nosRed.up2Cutloss}x{nosRed.down2Cutloss}</a>) : '' }
        { nosRed.no.length == 3 ? (<a style={{ color: 'red', textDecoration: 'none' }}> = {nosRed.up3Cutloss}x{nosRed.permuteCutloss}</a>) : '' }
        { nosRed.no.length == 3 && nosRed.down3Cutloss ? (<a style={{ color: 'red', textDecoration: 'none' }}> + ({nosRed.down3Cutloss} ล่าง)</a>) : '' }
      </td>

      <td className="col-xs-1 col-sm-1 text-center">
        { nosRed.up2Cutloss > 0 ? (<a style={{ color: 'red', textDecoration: 'none' }}>{ nosRed.up2Cutloss }</a>) : '' }
        { nosRed.up2 ? '/' + nosRed.up2.toLocaleString() : '' }
      </td>
      <td className="col-xs-1 col-sm-1 text-center">
        { nosRed.down2Cutloss > 0 ? (<a style={{ color: 'red', textDecoration: 'none' }}>{ nosRed.down2Cutloss }</a>) : '' }
        { nosRed.down2 ? '/' + nosRed.down2.toLocaleString() : '' }
      </td>
      <td className="col-xs-1 col-sm-1 text-center">
        { nosRed.up3Cutloss > 0 ? (<a style={{ color: 'red', textDecoration: 'none' }}>{ nosRed.up3Cutloss }</a>) : '' }
        { nosRed.up3 ? '/' + nosRed.up3.toLocaleString() : '' }
      </td>
      <td className="col-xs-1 col-sm-1 text-center">
        { nosRed.permuteCutloss > 0 ? (<a style={{ color: 'red', textDecoration: 'none' }}>{ nosRed.permuteCutloss }</a>) : '' }
        { nosRed.permute ? '/' + nosRed.permute.toLocaleString() : '' }
      </td>
      <td className="col-xs-1 col-sm-1 text-center">
        { nosRed.down3Cutloss > 0 ? (<a style={{ color: 'red', textDecoration: 'none' }}>{ nosRed.down3Cutloss }</a>) : '' }
        { nosRed.down3 ? '/' + nosRed.down3.toLocaleString() : '' }
      </td>
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

NosRedTBody.propTypes = {
  nosReds: PropTypes.array,
};

export default container((props, onData) => {
  const nosReds = Session.get('nosReds') ? Session.get('nosReds') : [];
  onData(null, { nosReds });
}, NosRedTBody);
