import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './SignUpNavBar.css'

class SignUpNavBar extends Component {
    render(){
        return(
<nav className="navbar navbar-expand-lg fixed-top">
  <Link className="navbar-brand" to="/">TimeOff Mgt App</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
  <i className="fas fa-bars"></i>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item nav-items text-center padtb5">
        <Link className="nav-link" to="/">HOME</Link>
      </li>
      <li className="nav-item nav-items text-center padtb5">
        <Link className="nav-link" to="/login">LOGIN</Link>
      </li>
    </ul>
  </div>
</nav>
        )
    }
}

export default SignUpNavBar;