import React from 'react';
import { Link } from 'react-router';
import { Jumbotron } from 'react-bootstrap';

const Index = () => (
  <div className="Index">
    <Jumbotron className="text-center">
      <h2>GodFather25</h2>
      <p><Link to="/nos" className="btn btn-success">Log In</Link></p>
      
    </Jumbotron>
  </div>
);

export default Index;
