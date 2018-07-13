import React from 'react';
import { FormControl } from 'react-bootstrap';

class NosRedTHead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      up2ROI: 70,
      down2ROI: 70,
      up3ROI: 400,
      down3ROI: 100,
      permuteROI: 100,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <thead>
        <tr>
          <th className="col-xs-2 col-sm-1 text-center" 
            style={{ verticalAlign: 'middle' }}
            rowSpan="3">ป-ด-ว</th>

          <th className="col-xs-1 col-sm-1 text-center" 
            style={{ verticalAlign: 'middle' }}
            rowSpan="3">เลข</th>

          <th className="col-xs-5 col-sm-5 text-center" 
            style={{ verticalAlign: 'middle' }}
            colSpan="5">อัตราจ่าย</th>
              
        </tr>

        <tr>
          <th className="col-xs-1 col-xs-offset-3 col-sm-1 col-sm-offset-2">
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
          
          <th className="col-xs-1 col-xs-offset-3 col-sm-1 col-sm-offset-2 text-center">2ตัวบน</th>
          <th className="col-xs-1 col-sm-1 text-center">2ตัวล่าง</th>
          <th className="col-xs-1 col-sm-1 text-center">3ตัวเต็ง</th>
          <th className="col-xs-1 col-sm-1 text-center">3ตัวโต๊ด</th>
          <th className="col-xs-1 col-sm-1 text-center">3ตัวล่าง</th>
        </tr>
      </thead>
    );
  }
}

export default NosRedTHead;