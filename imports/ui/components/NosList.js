import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import Bets from '../../api/bets/bets';
import container from '../../modules/container';
import { Table, Alert } from 'react-bootstrap';

const NosList = (props) => (
  props.nos.filter(obj => obj.up2 || obj.down2 || obj.up3 || obj.permute || obj.down3).length > 0 ? <Table className="NosList"
    striped bordered condensed hover>
    <thead>
      <tr>
        <th className="col-xs-1 col-sm-1 text-center" style={{ verticalAlign: 'middle' }}
          rowSpan={2}>ป-ด-ว</th>
        <th className="col-xs-1 col-sm-1 text-center" style={{ verticalAlign: 'middle' }}
          rowSpan={2}>เบอร์</th>

        <th className="col-xs-1 col-xs-offset-3 col-sm-1 col-sm-offset-3 text-center" colSpan={5} style={{ color: 'red' }}>
          { props.allTotal.toLocaleString() } .-
        </th>

        <th className="col-xs-1 col-sm-1 text-center" rowSpan={2} style={{ verticalAlign: 'middle' }}>
          <strong style={{ color: 'red' }}>{ props.allIncome.toLocaleString() } .- </strong> 
          <br />
          (หัก % แล้ว)
        </th>
      </tr>

      <tr>
        <th className="col-xs-1 col-xs-offset-3 col-sm-1 col-sm-offset-3 text-center">2บน <strong style={{ color: 'red' }}>{ props.up2Total.toLocaleString() } .-</strong></th>
        <th className="col-xs-1 col-sm-1 text-center">2ล่าง <strong style={{ color: 'red' }}>{ props.down2Total.toLocaleString() } .-</strong></th>
        <th className="col-xs-1 col-sm-1 text-center">3ตรง <strong style={{ color: 'red' }}>{ props.up3Total.toLocaleString() } .-</strong></th>
        <th className="col-xs-1 col-sm-1 text-center">3โต๊ด <strong style={{ color: 'red' }}>{ props.permuteTotal.toLocaleString() } .-</strong></th>
        <th className="col-xs-1 col-sm-1 text-center">3ล่าง <strong style={{ color: 'red' }}>{ props.down3Total.toLocaleString() } .-</strong></th>
      </tr>

    </thead>
    <tbody>
      { props.nos.filter(obj => obj.up2 || obj.down2 || obj.up3 || obj.permute || obj.down3).map((no, index) => (
        <tr key={index}>
          <td className="col-xs-1 col-sm-1 text-center">{ no.createdDate }</td>
          <td className="col-xs-1 col-sm-1 text-center"><b>{ no.no }</b></td>

          <td className="col-xs-1 col-sm-1 text-center">{ no.up2 > 0 ? no.up2.toLocaleString() : '' }</td>
          <td className="col-xs-1 col-sm-1 text-center">{ no.down2 > 0 ? no.down2.toLocaleString() : '' }</td>
          <td className="col-xs-1 col-sm-1 text-center">{ no.up3 > 0 ? no.up3.toLocaleString() : '' }</td>
          <td className="col-xs-1 col-sm-1 text-center">{ no.permute > 0 ? no.permute.toLocaleString() : '' }</td>
          <td className="col-xs-1 col-sm-1 text-center">{ no.down3 > 0 ? no.down3.toLocaleString() : '' }</td>

          <td className="col-xs-1 col-sm-1 text-center">{ no.income > 0 ? no.income.toLocaleString() : '' }</td>
        </tr>
      )) }
    </tbody>
  </Table> : <Alert bsStyle="warning">No sum total yet.</Alert>
);

NosList.propTypes = {
  up2Total: PropTypes.number,
  down2Total: PropTypes.number,
  up3Total: PropTypes.number,
  permuteTotal: PropTypes.number,
  down3Total: PropTypes.number,
  allTotal: PropTypes.number,
  allIncome: PropTypes.number,
  bets: PropTypes.array,
  nos: PropTypes.array,
};

export default container((props, onData) => {
  const createdDate = Session.get('nosCreatedDate') ? 
    Session.get('nosCreatedDate').substring(0, 10) : '';

  const up2ROI = Session.get('up2ROI') ? Session.get('up2ROI') : 1;
  const down2ROI = Session.get('down2ROI') ? Session.get('down2ROI') : 1;
  const up3ROI = Session.get('up3ROI') ? Session.get('up3ROI') : 1;
  const permuteROI = Session.get('permuteROI') ? Session.get('permuteROI') : 1;
  const down3ROI = Session.get('down3ROI') ? Session.get('down3ROI') : 1;
  console.log(up2ROI, down2ROI, up3ROI, permuteROI, down3ROI);

  const subscription = Meteor.subscribe('bets.list', createdDate);

  var nos = [],
    nosReds = [];

  var no = '';

  var up2 = 0,
    down2 = 0,
    up3 = 0,
    permute = 0,
    down3 = 0;

  var income = 0;

  var up2Total = 0,
    down2Total = 0,
    up3Total = 0,
    down3Total = 0,
    permuteTotal = 0;

  var allTotal = 0;

  var allIncome = 0;

  var up2Cutloss = 0,
    down2Cutloss = 0,
    up3Cutloss = 0,
    permuteCutloss = 0,
    down3Cutloss = 0;

  if (subscription.ready()) {
    const bets = Bets.find({}, { sort: { createdAt: -1 } }).fetch();

    for (let i = 0; i < 100; i++) {
      no = String(i);

      up2 = 0;
      down2 = 0;

      income = 0;

      no = no.length < 2 ? '0' + no : no;

      for (let j = 0; j < bets.length; j++) {
        if (no === bets[j].no) {
          up2 += bets[j].up2;
          down2 += bets[j].down2;

          income += bets[j].income;
        }
      }

      up2Total += up2;
      down2Total += down2;

      allTotal += (up2 + down2);

      allIncome += income;

      nos.push({ createdDate, no, up2, down2, up3: 0, down3: 0, permute: 0, income });
    }


    for (let i = 0; i < 1000; i++) {
      no = String(i);

      up3 = 0;
      down3 = 0;
      permute = 0;

      income = 0;

      no = no.length < 2 ? '00' + no : no;
      no = no.length < 3 ? '0' + no : no;

      for (let j = 0; j < bets.length; j++) {
        if (no === bets[j].no) {
          up3 += bets[j].up3;
          down3 += bets[j].down3;
          permute += bets[j].permute;

          income += bets[j].income;
        }
      }

      up3Total += up3;
      down3Total += down3;
      permuteTotal += permute;

      allTotal += (up3 + down3 + permute);

      allIncome += income;

      nos.push({ createdDate, no, up2: 0, down2: 0, up3, down3, permute, income });
    }


    for (let i = 0; i < nos.length; i++) {
      if (nos[i].up2 * up2ROI > allIncome ||
        nos[i].down2 * down2ROI > allIncome ||
        nos[i].up3 * up3ROI > allIncome ||
        nos[i].permute * permuteROI > allIncome ||
        nos[i].down3 * down3ROI > allIncome)
      {
        up2Cutloss = nos[i].up2 * up2ROI > allIncome ?
          nos[i].up2 - Math.floor(allIncome / up2ROI) : 0;
        down2Cutloss = nos[i].down2 * down2ROI > allIncome ?
          nos[i].down2 - Math.floor(allIncome / down2ROI) : 0;
        up3Cutloss = nos[i].up3 * up3ROI > allIncome ?
          nos[i].up3 - Math.floor(allIncome / up3ROI) : 0;
        permuteCutloss = nos[i].permute * permuteROI > allIncome ?
          nos[i].permute - Math.floor(allIncome / permuteROI) : 0;
        down3Cutloss = nos[i].down3 * down3ROI > allIncome ?
          nos[i].down3 - Math.floor(allIncome / down3ROI) : 0;

        nosReds.push({
          createdDate: nos[i].createdDate,
          no: nos[i].no,
          up2: nos[i].up2,
          down2: nos[i].down2,
          up3: nos[i].up3,
          permute: nos[i].permute,
          down3: nos[i].down3,
          up2Cutloss,
          down2Cutloss,
          up3Cutloss,
          permuteCutloss,
          down3Cutloss,
          risk: (nos[i].up2 * up2ROI) + (nos[i].down2 * down2ROI) +
            (nos[i].up3 * up3ROI) + (nos[i].permute * permuteROI) + (nos[i].down3 * down3ROI),
        });
      }
    }

    Session.set('nosReds', nosReds);

    onData(null, { nos, up2Total, down2Total, up3Total, permuteTotal, down3Total, allTotal, allIncome });
  }
}, NosList);
