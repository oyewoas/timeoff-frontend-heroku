import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './DashBoardNavBar.css'

class DashBoardNavBar extends Component {
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
        <Link className="nav-link" to="/dashboard">DASHBOARD</Link>
      </li>
      <li className="nav-item nav-items text-center padtb5">
        <Link className="nav-link" to="/dashboard">CALENDER</Link>
      </li>
      <li className="nav-item nav-items text-center padtb5">
        <Link className="nav-link" to="/teamview">TEAM VIEW</Link>
      </li>
      <li className="nav-item dropdown text-center">
        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          SUPERVISION
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="#">wow</Link>
          <Link className="dropdown-item" to="#">action</Link>
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" to="#">here</Link>
        </div>
      </li>
      <li className="nav-item nav-items text-center padtb5">
        <Link className="nav-link btn-absence" to="/newabsence">NEW ABSENCE</Link>
      </li>  
      <li className="nav-item dropdown text-center">
        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img className="img-fluid svg-profilepic" src={this.props.data.profilepic} alt="profilepic"/>
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="#">{this.props.data.firstname}</Link>
          <Link className="dropdown-item" onClick={this.props.logOut} to='#'>Log Out</Link>
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" to="#">here</Link>
        </div>
      </li>
    </ul>
  </div>
</nav>
        )
    }
}

export default DashBoardNavBar;