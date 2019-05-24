import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './index.css';
import './assets/styles/normalize.css';
import App from './App';
import SignUpPage from './components/SignUpPage/SignUpPage'
import LogInPage from './components/LogInPage/LogInPage'
import NotFound from './components/NotFound/NotFound'
import DashBoard from './components/DashBoard/DashBoard';
import AbsenceForm from './components/AbsenceForm/AbsenceForm';
import * as serviceWorker from './serviceWorker';
import TeamView from './components/TeamView/TeamView';
import ConfirmEmail from './components/ConfirmEmail/ConfirmEmail';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';

const routing = (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LogInPage} />
          <Route path="/dashboard" component={DashBoard} />
          <Route path="/newabsence" component={AbsenceForm} />
          <Route path="/teamview" component={TeamView} />
          <Route path="/confirm/:id" component={ConfirmEmail} />
          <Route path="/forgotpassword" component={ForgotPassword} />


          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
