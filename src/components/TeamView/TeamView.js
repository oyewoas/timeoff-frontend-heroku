import React, { Component } from 'react'
import DashBoardNavBar from '../DashBoardNav/DashBoardNavBar'
import profile from '../../assets/img/undraw_profile_pic_ic5t.svg'
import './TeamView.css'
import Footer from '../Footer/Footer';
import {Table} from 'react-bootstrap';




class TeamView extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: {
                firstname: 'Ayooluwa',
                lastname: 'Oyewo',
                profilepic: profile,
                department: 'Software Engineering',
                date: new Date().toDateString(),
                days: 5,
                status: 'Approved',
                from: new Date(2017, 6, 31).toDateString(),
                to: new Date(2017, 7, 31).toDateString(),
                timeofftypes: [
                  'Holiday', 
                  'Maternity Leave', 
                  'Paternity Leave', 
                  'Sick Leave (Up to 10 Days)'
              ],
                manager: 'Mayowa'
              }
        }
    }

    render(){
        const timeOffTypes = this.state.data.timeofftypes;
        let offTypes = timeOffTypes.map( (type, index) => 
            <p key={index}> {type} </p>

        );
        return(
            <div>
                <DashBoardNavBar data={this.state.data}/>
            <div className="container-fluid main">
                <div className="row text-center">
                    <div className="col-md-12 ">
                    <img className="img-fluid profilepic" src={this.state.data.profilepic} alt="profilepic"/>
                        <h1 className="heading1"> Hi <span> {this.state.data.manager} </span> you are Welcome</h1>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="heading2">Leave Request to Approve</h2>
                    </div>
                </div>
                <Table responsive>
  <thead>
    <tr>
      <th>Employee</th>
      <th>Department</th>
      <th>Date Of Request</th>
      <th>Leave Dates</th>
      <th>Type</th>
      <th>Days</th>
      <th></th>
      <th></th>

    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{this.state.data.firstname} {this.state.data.lastname}</td>
      <td>{this.state.data.department}</td>
      <td>{this.state.data.date}</td>
      <td>From {this.state.data.from} to {this.state.data.to}</td>
      <td>{offTypes[0]}</td>
      <td>{this.state.data.days}</td>
      <td><button type="button" class="btn btn-warning">Reject</button></td>
      <td><button type="button" class="btn btn-success">Approve</button></td>


    </tr>
    <tr>
    <td>{this.state.data.firstname} {this.state.data.lastname}</td>
      <td>{this.state.data.department}</td>
      <td>{this.state.data.date}</td>
      <td>From {this.state.data.from} to {this.state.data.to}</td>
      <td>{offTypes[1]}</td>
      <td>{this.state.data.days}</td>
      <td><button type="button" class="btn btn-warning">Reject</button></td>
      <td><button type="button" class="btn btn-success">Approve</button></td>


    </tr>
    <tr>
    <td>{this.state.data.firstname} {this.state.data.lastname}</td>
      <td>{this.state.data.department}</td>
      <td>{this.state.data.date}</td>
      <td>From {this.state.data.from} to {this.state.data.to}</td>
      <td>{offTypes[2]}</td>
      <td>{this.state.data.days}</td>
      <td><button type="button" class="btn btn-warning">Reject</button></td>
      <td><button type="button" class="btn btn-success">Approve</button></td>
     
    </tr>
  </tbody>
</Table>
<div className="row">
                    <div className="col-md-12">
                        <h2 className="heading2">All Leaves</h2>
                    </div>
                </div>
                <Table responsive>
  <thead>
    <tr>
      <th>Type</th>
      <th>Deducted</th>
      <th>Dates</th>
      <th>Approved by</th>
      <th></th>
      <th>Status</th>
      

    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Holiday</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>{this.state.data.manager}</td>
      <td><i class="fas fa-trash-alt delete"></i></td>
      <td>{this.state.data.status}</td>
      

    </tr>
    <tr>
      <td>Sick Leave</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>{this.state.data.manager}</td>
      <td><i class="fas fa-trash-alt delete"></i></td>
      <td>{this.state.data.status}</td>
      


    </tr>
    <tr>
      <td>Holiday</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>{this.state.data.manager}</td>
      <td><i class="fas fa-trash-alt delete"></i></td>
      <td>{this.state.data.status}</td>
      

    </tr>
  </tbody>
</Table>
            </div>

            <Footer/>
            </div>
            
        )
    }
}
export default TeamView;