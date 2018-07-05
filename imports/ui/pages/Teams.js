import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import TeamsList from '../components/TeamsList';

const Teams = () => (
  <div className="Teams">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">Teams</h4>
          <Link to="/teams/new">
            <Button
              bsStyle="success"
              className="pull-right"
              >New Team</Button>
          </Link>
        </div>
        <TeamsList />
      </Col>
    </Row>
  </div>
);

export default Teams;
