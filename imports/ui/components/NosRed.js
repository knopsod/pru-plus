import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Table, FormControl } from 'react-bootstrap';
import container from '../../modules/container';

class NosRed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      up2ROI: 70,
      down2ROI: 70,
      up3ROI: 400,
      permuteROI: 100,
      down3ROI: 100,
    };

    this.props.Session.set('up2ROI', 70);
    this.props.Session.set('down2ROI', 70);
    this.props.Session.set('up3ROI', 400);
    this.props.Session.set('permuteROI', 100);
    this.props.Session.set('down3ROI', 100);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });

    this.props.Session.set(event.target.name, event.target.value);
  }

  render() {
    return (
      <div>
        <Table className="NosRed"
          striped bordered condensed hover>
          <thead>
            <tr>
              <th className="col-xs-2 col-sm-1 text-center" style={{ verticalAlign: 'middle' }} rowSpan="3">
                ป-ด-ว</th>

              <th className="col-xs-1 col-sm-1 text-center" style={{ verticalAlign: 'middle' }} rowSpan="3">
                เบอร์ตัดออก</th>

              <th className="col-xs-5 col-sm-5 text-center" style={{ verticalAlign: 'middle' }} colSpan="5">
                อัตราจ่าย</th>

            </tr>

            <tr>
              <th className="col-xs-1 col-xs-offset-3 col-sm-1 col-sm-offset-3">
                <FormControl type="number" style={{ textAlign: 'right', color: 'red' }}
                  name="up2ROI"
                  value={this.state.up2ROI}
                  onChange={this.handleChange} />
              </th>
              <th className="col-xs-1 col-sm-1">
                <FormControl type="number" style={{ textAlign: 'right', color: 'red' }}
                  name="down2ROI"
                  value={this.state.down2ROI}
                  onChange={this.handleChange} />
              </th>
              <th className="col-xs-1 col-sm-1">
                <FormControl type="number" style={{ textAlign: 'right', color: 'red' }}
                  name="up3ROI"
                  value={this.state.up3ROI}
                  onChange={this.handleChange} />
              </th>
              <th className="col-xs-1 col-sm-1">
                <FormControl type="number" style={{ textAlign: 'right', color: 'red' }}
                  name="permuteROI"
                  value={this.state.permuteROI}
                  onChange={this.handleChange} />
              </th>
              <th className="col-xs-1 col-sm-1">
                <FormControl type="number" style={{ textAlign: 'right', color: 'red' }}
                  name="down3ROI"
                  value={this.state.down3ROI}
                  onChange={this.handleChange} />
              </th>
            </tr>

            <tr>
              
              <th className="col-xs-1 col-xs-offset-3 col-sm-1 col-sm-offset-3 text-center">2บน</th>
              <th className="col-xs-1 col-sm-1 text-center">2ล่าง</th>
              <th className="col-xs-1 col-sm-1 text-center">3ตรง</th>
              <th className="col-xs-1 col-sm-1 text-center">3โต๊ด</th>
              <th className="col-xs-1 col-sm-1 text-center">3ล่าง</th>
            </tr>
          </thead>

          <tbody>
            { this.props.nosReds.map((nosRed, index) => (<tr key={index}>
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
            </tr>))}
          </tbody>

          <tfoot>
            <tr>
              <td style={{ textAlign: 'center'}}>รวม</td>
              <td style={{ textAlign: 'center', color: 'red' }}>{ this.props.nosTotal }</td>
              <td colSpan={5}></td>
            </tr>
          </tfoot>
        </Table>
      </div>
    );
  }
}

NosRed.propTypes = {
  Session: PropTypes.object,
  nosReds: PropTypes.array,
  nosTotal: PropTypes.number,
};

export default container((props, onData) => {
  const nosReds = Session.get('nosReds') ? Session.get('nosReds') : [];
  let nosTotal = 0;

  for (let i = 0; i < nosReds.length; i++) {
    nosTotal += 0 + nosReds[i].up2Cutloss + nosReds[i].down2Cutloss +
      nosReds[i].up3Cutloss + nosReds[i].permuteCutloss + nosReds[i].down3Cutloss;
  }

  onData(null, { Session, nosReds, nosTotal });
}, NosRed);
