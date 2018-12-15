/* eslint-disable max-len */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.js';
import Documents from '../../ui/pages/Documents.js';
import NewDocument from '../../ui/pages/NewDocument.js';
import EditDocument from '../../ui/pages/EditDocument.js';
import ViewDocument from '../../ui/pages/ViewDocument.js';
import Index from '../../ui/pages/Index.js';
import Login from '../../ui/pages/Login.js';
import NotFound from '../../ui/pages/NotFound.js';
import RecoverPassword from '../../ui/pages/RecoverPassword.js';
import ResetPassword from '../../ui/pages/ResetPassword.js';
import Signup from '../../ui/pages/Signup.js';

import MemberPaids from '../../ui/pages/MemberPaids.js';

import Teams from '../../ui/pages/Teams.js';
import NewTeam from '../../ui/pages/NewTeam.js';
import EditTeam from '../../ui/pages/EditTeam.js';
import ViewTeam from '../../ui/pages/ViewTeam.js';

import Bets from '../../ui/pages/Bets.js';
import NewBet from '../../ui/pages/NewBet.js';
import EditBet from '../../ui/pages/EditBet.js';
import ViewBet from '../../ui/pages/ViewBet.js';

import Nos from '../../ui/pages/Nos';

import Employments from '../../ui/pages/Employments';
import NewEmployment from '../../ui/pages/NewEmployment';
import EditEmployment from '../../ui/pages/EditEmployment';
import ViewEmployment from '../../ui/pages/ViewEmployment';

import Jobs from '../../ui/pages/Jobs';

import Profile from '../../ui/pages/Profile';

import Typings from '../../ui/pages/Typings';

const authenticate = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="index" component={ Index } />
        <Route name="documents" path="/documents" component={ Documents } onEnter={ authenticate } />
        <Route name="newDocument" path="/documents/new" component={ NewDocument } onEnter={ authenticate } />
        <Route name="editDocument" path="/documents/:_id/edit" component={ EditDocument } onEnter={ authenticate } />
        <Route name="viewDocument" path="/documents/:_id" component={ ViewDocument } onEnter={ authenticate } />

        <Route name="login" path="/login" component={ Login } />
        <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route name="signup" path="/signup" component={ Signup } />

        <Route name="member-paids" path="/member-paids" component={ MemberPaids } />

        <Route name="teams" path="/teams" component={ Teams } onEnter={ authenticate } />
        <Route name="newTeam" path="/teams/new" component={ NewTeam } onEnter={ authenticate } />
        <Route name="editTeam" path="/teams/:_id/edit" component={ EditTeam } onEnter={ authenticate } />
        <Route name="viewTeam" path="/teams/:_id" component={ ViewTeam } onEnter={ authenticate } />

        <Route name="bets" path="/bets" component={ Bets } onEnter={ authenticate } />
        <Route name="newBet" path="/bets/new" component={ NewBet } onEnter={ authenticate } />
        <Route name="editBet" path="/bets/:_id/edit" component={ EditBet } onEnter={ authenticate } />
        <Route name="viewBet" path="/bets/:_id" component={ ViewBet } onEnter={ authenticate } />

        <Route name="nos" path="/nos" component={ Nos } onEnter={ authenticate } />

        <Route name="employments" path="/employments" component={ Employments } onEnter={ authenticate } />
        <Route name="newEmployments" path="/employments/new" component={ NewEmployment } onEnter={ authenticate } />
        <Route name="editEmployments" path="/employments/:_id/edit" component={ EditEmployment } onEnter={ authenticate } />
        <Route name="viewEmployments" path="/employments/:_id" component={ ViewEmployment } onEnter={ authenticate } />

        <Route name="jobs" path="/jobs" component={ Jobs } onEnter={ authenticate } />

        <Route name="user" path="/user/:_id" component={ NotFound } />

        <Route name="profile" path="/profile" component={ Profile } onEnter={ authenticate } />

        <Route name="typing" path="/typing/:_id" component={ Typings } onEnter={ authenticate } />

        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root'),
  );
});
