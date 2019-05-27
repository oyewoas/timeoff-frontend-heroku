import React, { Component } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import profile from '../../assets/img/undraw_profile_pic_ic5t.svg';
import env from '../../../src/env';
import { css } from '@emotion/core';
import DashBoardNavBar from "../DashBoardNav/DashBoardNavBar";
import {ClipLoader} from "react-spinners";
import dateformat from 'dateformat';
import FormValidator from "../FormValidator/FormValidator";

const override = css`
    display: block;
    margin-top: 250px;
    border-color: red;
`;

 class EditForm extends Component {
  constructor(props) {
    super(props);
    this.onChangeLeaveType = this.onChangeLeaveType.bind(this);
    this.onChangeReason = this.onChangeReason.bind(this);
    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

      this.validator = new FormValidator([
          {
              field: 'type_of_leave',
              method: 'isEmpty',
              validWhen: false,
              message: 'Type Of Leave is required'
          },

          {
              field: 'from',
              method: 'isEmpty',
              validWhen: false,
              message: 'Desired Start Date is required'
          },
          {
              field: 'to',
              method: 'isEmpty',
              validWhen: false,
              message: 'Desired End Date is required'
          },

          {
              field: 'reason',
              method: 'isEmpty',
              validWhen: false,
              message: 'Reason For Absence Request is required'
          },


      ]);
    this.state = {
        from: '',
      to: '',
        days: `${0} Day`,
      type_of_leave:'',
      reason:'',
        loading: true,

      data: {
        timeofftypes: [
            'Holiday',
            'Maternity Leave',
            'Paternity Leave',
            'Sick Leave (Up to 10 Days)'
        ],
          profilepic: profile,
          validation: this.validator.valid(),


      }
    };

    this.from = new Date().toISOString().split('T')[0];
    this.date = new Date();
    this.plusOneDay = this.date.setDate(this.date.getDate() + 1);
    this.to = new Date(this.plusOneDay).toISOString().split('T')[0];

  }

     async componentDidMount() {

         try{
             const token = localStorage.getItem('token');

             if(!token) return this.props.history.push('/login');

             const res = await axios.get(`${env.api}user/leave/edit/${this.props.match.params.leaveId}`, {
                 headers: {
                     Authorization: `Bearer ${token}`,
                 }
             });

             this.setState({
                 loading: false,
                 type_of_leave: res.data.data.leave.type_of_leave,
                 from: res.data.data.leave.from,
                 to: res.data.data.leave.to,
                 reason: res.data.data.leave.reason,
             });

             console.log(res.data.data);
         }catch(err){
             console.log(err.response);
             if(localStorage.getItem('token'))
                 localStorage.removeItem('token');

             this.props.history.push('/login');

         }

     }

  onChangeLeaveType(e) {
    this.setState({
      type_of_leave: e.target.value
    });
  }


     onChangeFrom(e) {
    this.setState({
      from: e.target.value
    })
  }
  onChangeReason(e) {
    this.setState({
      reason: e.target.value
    })
  }
  onChangeTo(e) {
    this.setState({
      to: e.target.value
    })
  }

onSubmit = async(e) => {
    e.preventDefault();
    const obj = {
      type_of_leave: this.state.type_of_leave,
      from: this.state.from,
      to: this.state.to,
      reason: this.state.reason,

    };

    try{
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
      };
        const res = await axios.put(`${env.api}user/leave/update/${this.props.match.params.leaveId}`, obj, {headers: headers} );
        toastr.options.positionClass = "toast-top-center";

        if(res){
          setTimeout(() =>

            toastr.success('New Absence Successfully Updated'), 2000)
          }
        this.props.history.push('/dashboard');
        console.log(res);

      } catch(err){
      toastr.error('An Error Occured, try again')

      }
  };

  render() {
      if(this.state.loading ) return <div className="text-center">
          <ClipLoader
              css={override}
              sizeUnit={"px"}
              size={150}
              color={'#123abc'}
              loading={this.state.loading}
          />
      </div>;
      const fromDate = new Date(this.state.from);
      const toDate = new Date(this.state.to);

      const GetDays = (fromDate, toDate) => {
          if ( toDate > fromDate){
              const oneDay = 24*3600*1000;
              const duration = Math.round(Math.abs((fromDate - toDate)/(oneDay)));
              return `${duration} Day(s)`;
          }
      };
      const durationDays = GetDays(fromDate, toDate);

    const timeOffTypes = this.state.data.timeofftypes;
    let offTypes = timeOffTypes.map( (type, index) =>
        <option value={type} key={index}> {type} </option>

    );
    return (
        <div>
            <DashBoardNavBar data={this.state.data} logOut = {this.logOut}/>
            <div className='container-fluid'>
                <div className="row mt-5 pt-5">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
            <form onSubmit={this.onSubmit}>
            <div className="text-center">
                    <h5 className="form-header text-center">Update New Absence</h5>
                  </div>
                    <div className="form-group ">
                      <label htmlFor="type_of_leave"> Type Of Leave</label>
                      <select onChange={this.onChangeLeaveType} id="type_of_leave" name="type_of_leave"
                       className="form-control">
                        <option value>{this.state.type_of_leave}</option>
                        {offTypes}
                      </select>
                  </div>
                  <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor="from">From</label>
                    <input min={this.from} type="date"  value={dateformat(this.state.from, 'isoDate' )}
                      onChange={this.onChangeFrom} name="from" className="form-control" id="from" placeholder="From" />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="to">To</label>
                    <input min={this.to} type="date"  value={dateformat(this.state.to, 'isoDate' )}
                      onChange={this.onChangeTo} name="to" className="form-control" id="to" placeholder="To" />
                  </div>
                      <div className="form-group  col-md-4">
                          <label htmlFor="duration">Duration</label>
                          <input type="text" name="duration" value={durationDays} className=" form-control"  id="duration" placeholder="Duration" disabled readOnly/>

                      </div>
                  </div>

                <div className="form-group">
                    <label htmlFor="reason">Reason For Leave</label>
                    <textarea rows="6" type="date"  value={this.state.reason}
                      onChange={this.onChangeReason} name="reason" className="form-control" id="reason" placeholder="Reason For Leave" />
                  </div>


                  <button  type="submit" className="btn btn-primary">UPDATE</button>
            </form>
                    </div>
                    <div className="col-md-3"></div>

                </div>
            </div>

        </div>
    )
  }
}

export default EditForm;
