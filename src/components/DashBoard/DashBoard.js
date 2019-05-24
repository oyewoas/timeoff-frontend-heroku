import React, { Component } from 'react';
import DashBoardNavBar from '../DashBoardNav/DashBoardNavBar';
import profile from '../../assets/img/undraw_profile_pic_ic5t.svg';
import './DashBoard.css';
import axios from 'axios';
import toastr from 'toastr';
import { Calendar } from 'react-calendar';
import { css } from '@emotion/core';
import Footer from '../Footer/Footer'
import {Table} from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import env from '../../../src/env';

const override = css`
    display: block;
    margin-top: 250px;
    border-color: red;
`;


class DashBoard extends Component {


    constructor(props){
        super(props);
        this.navigationView = this.navigationView.bind(this);
        this.onClickMore = this.onClickMore.bind(this);
        this.onChange = this.onChange.bind(this);
        this.displayMonth = this.displayMonth.bind(this);
        this.removeOnClickMore = this.removeOnClickMore.bind(this);
        this.logOut = this.logOut.bind(this);



        this.state = {
            data:{
                firstname : 'Ayooluwa',
                profilepic: profile,
                daysremaining: 10,
                daysavailable: 21,
                timeofftypes: [
                    'Holiday', 
                    'Maternity Leave', 
                    'Paternity Leave', 
                    'Sick Leave (Up to 10 Days)'
                ],
                manager: 'Mr Mayowa',
                department: 'Software Development',
                status: {
                    approved:'Approved',
                    reject:'Reject'
                },
            },
            dates: {
                january: new Date(2019, 0, 1),
                february: new Date(2019, 1, 1),
                march: new Date(2019, 2, 1),
                april: new Date(2019, 3, 1),
                may: new Date(2019, 4, 1),
                june: new Date(2019, 5, 1),
                july: new Date(2019, 6, 1),
                august: new Date(2019, 7, 1),
                september: new Date(2019, 8, 1),
                october: new Date(2019, 9, 1),
                november: new Date(2019, 10, 1),
                december: new Date(2019, 11, 1),
            
        },
        toggleclass: false,
        eachmonth: '',
        startdate: new Date(2019, 0, 1),
        loading: true,
        user: null,
        leaves: null


    };


    

}

async componentDidMount() {

    try{
        const token = localStorage.getItem('token');

        if(!token) return this.props.history.push('/login');

        const res = await axios.get(`${env.api}user/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });


        
        const leaves = await axios.get(`${env.api}user/leave`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

       setTimeout(() => this.setState({ loading: false, user: res.data.data, leaves: leaves.data.data }), 3000);
       toastr.options.positionClass = "toast-top-center";
       setTimeout(() =>
        toastr.success('Welcome to your dashboard'), 3000
        );

       console.log(res.data.data) 
       console.log(leaves.data.data.user) 


    }catch(err){
        console.log(err.response);
        if(localStorage.getItem('token'))
            localStorage.removeItem('token');
        
        this.props.history.push('/login');

    }
   
}


    navigationView = ({ date, view, label }) => `Current view: ${view}, date: ${date.toLocaleDateString()}`;

    onChange = date => this.setState({ january: this.state.dates.january, february:this.state.dates.february, march:this.state.dates.march, 
        april: this.state.dates.april, may: this.state.dates.april, june: this.state.dates.june, july: this.state.dates.july, august: this.state.dates.august, 
        september: this.state.dates.september, october: this.state.dates.october, november: this.state.dates.november, december: this.state.dates.december })


    displayMonth = () => {
        const monthObj = this.state.dates;
        let monthArray = Object.values(monthObj)
     //    this.setState({toggleclass: !this.state.toggleclass})

        let eachMonth = monthArray.map((month, index) => {
        
        if(month !== this.state.dates.january && month !== this.state.dates.february && month !== this.state.dates.march
         && month !== this.state.dates.april){
         return (
         
         <div className="col-md-3 calender" key={index}>
            <Calendar navigationView={this.navigationView} maxDetail="month" value={month} onClick={this.onChange}/>
 
         </div>)

         
             
         } 
             
     });
     return eachMonth;
     

    }    
        onClickMore = event => {
           const eachMonth = this.displayMonth()
        
            this.setState({eachmonth: eachMonth})
              this.setState((prevState) => ({
                toggleclass: !prevState.toggleclass
              })
            );
        
 };

    removeOnClickMore = event => {
       
           
            this.setState((prevState) => ({
                toggleclass: !prevState.toggleclass, eachmonth:!prevState.eachmonth 
              })
            );
    
    }

    logOut() {
        localStorage.removeItem('token');
        this.props.history.push('/login');
       toastr.options.positionClass = "toast-top-center";

        toastr.success('Logged Out Successfully')
    }



    render(){
        

        if(this.state.loading ) return <div className="text-center">
                <ClipLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={'#123abc'}
                loading={this.state.loading}
            />
      </div>


        const timeOffTypes = this.state.data.timeofftypes;
        let offTypes = timeOffTypes.map( (type, index) => 
            <li key={index}> {type} </li>

        );

        const leaveList = this.state.leaves.user.slice(0, 4)
        console.log(leaveList);
        let leaves = leaveList.map( leave =>
                    // eslint-disable-next-line no-unused-expressions
                    <tr key={leave._id}>
                        <td>{leave.type_of_leave}</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>{this.state.data.manager}</td>
                        <td><i className="fas fa-trash-alt delete"></i></td>
                        <td>{leave.status}</td>
                    </tr>

        )
        
       


        return(
            <div>
                <DashBoardNavBar data={this.state.data} logOut = {this.logOut}/>

                <div className="container-fluid">
                    <div className="text-center">
                        <img className="img-fluid svg-profile" src={this.state.data.profilepic} alt="profilepic"/>
                        <h1 className="profname">Welcome <span >{this.state.user.first_name}</span> </h1>
                    </div>
                </div>
                <div className="container-fluid">
                <hr/>
                    <div className="row">
                        <div className="col-sm-12 section-head">
                            <h5 className="head">Statistics</h5>
                        </div>
                    </div>
                    <hr/>
                    <div className="row section-content">
                        <div className="col-sm-3 text-center">
                        <h5 className="stat-headings text-center">Remaining Days</h5>
                            <hr/>
                            <p className="days-remain">{this.state.data.daysremaining}</p>
                            <hr/>
                            <p className="days-available">Days remaining out of {this.state.data.daysavailable} available days.</p>
                        </div>
                        <div className="col-sm-3">
                            <h5 className="stat-headings text-center">Used So Far</h5>
                            <hr/>
                            <ul className="list">
                                <li>Holiday: <span>10</span></li>
                                <li>Sick Leave: <span>1 out of 10</span></li>
                            </ul>
                        </div>
                        <div className="col-sm-3">
                            <h5 className="stat-headings text-center">Available Types</h5>
                            <hr/>

                            <ul className="list">
                                {offTypes}    
                            </ul>
                        </div>
                        <div className="col-sm-3">
                        <h5 className="stat-headings text-center">Details</h5>
                            <hr/>
                        <ul className="list">
                        <li>Manager: <span>{this.state.user.manager}</span></li>
                        <li>Department: <span>{this.state.user.department}</span></li>
                        </ul>
                        </div>
                    </div>
                    <hr/>

                    <div className="row">
                        <div className="col-sm-12 section-head">
                            <h5 className="head">Calender</h5>
                        </div>
                        
                    </div>

                    <div className="row">
                        <div className="text-center col-md-12">
                            <h1 className="stat-headings">Upcoming Months <span><button onClick={this.state.toggleclass ? this.removeOnClickMore : this.onClickMore} type="button" id="button" className="btn btn-light">{this.state.toggleclass ? 'Less...' : 'More...'}</button></span></h1>
                        </div>
                    </div>
                    <div className=" ">
                    <div className=" row">
                    <div className="col-sm-3 calender">
                    <Calendar navigationView={this.navigationView} maxDetail="month" value={this.state.dates.january} onClick={this.onChange}/>

                    </div>
                    <div className="col-sm-3 calender">
                    <Calendar navigationView={this.navigationView} maxDetail="month" value={this.state.dates.february} onClick={this.onChange}/>

                    </div>
                    <div className="col-sm-3 calender">
                    <Calendar navigationView={this.navigationView} maxDetail="month" value={this.state.dates.march} onClick={this.onChange}/>

                    </div>
                    <div className="col-sm-3 calender">
                    <Calendar navigationView={this.navigationView} maxDetail="month" value={this.state.dates.april} onClick={this.onChange}/>

                    </div>
                    
                    </div>

                    </div>

                    <div className="">
                        <div  id="monthsdisplay" className="row ">
                        {this.state.eachmonth}
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-12 section-head">
                            <h5 className="head">All Absences</h5>
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
    
      {leaves}
   
  </tbody>
</Table>
                    
                </div>
                <Footer/>
            </div>

        )
    }
}

export default DashBoard;