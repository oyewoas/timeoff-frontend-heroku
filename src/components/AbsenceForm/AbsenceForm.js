import React, { Component } from 'react';
import FormValidator from '../FormValidator/FormValidator'
import DashBoardNavBar from '../DashBoardNav/DashBoardNavBar'
import profile from '../../assets/img/undraw_profile_pic_ic5t.svg'
import  './AbsenceForm.css'
import Footer from '../Footer/Footer';
import axios from 'axios';
import toastr from 'toastr';
import env from '../../../src/env';





class AbsenceForm extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.cancelFormSubmit = this.cancelFormSubmit.bind(this);

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
            data: {
              firstname: 'Ayooluwa',
              profilepic: profile,
              timeofftypes: [
                'Holiday', 
                'Maternity Leave', 
                'Paternity Leave', 
                'Sick Leave (Up to 10 Days)'
            ],
            },
            
            from:'',
            type_of_leave:'',
            to: '',
            reason: '',
						validation: this.validator.valid(),
						successmessage: '',
            errormessage: '',
            fromgreaterthanto: '',
            days: `${0} Day`,
          }
      
          this.submitted = false;
          this.from = new Date().toISOString().split('T')[0];
          this.date = new Date();
          this.plusOneDay = this.date.setDate(this.date.getDate() + 1);
          this.to = new Date(this.plusOneDay).toISOString().split('T')[0];



  
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

       setTimeout(() => this.setState({ loading: false, user: res.data.data }), 3000);
       console.log(res.data.data) 

    }catch(err){
        console.log(err.response);
        if(localStorage.getItem('token'))
            localStorage.removeItem('token');
        
        this.props.history.push('/login');

    }
   
}

		  
		passwordMatch = (confirmation, state) => (state.password === confirmation)

    
    
		handleInputChange = event => {
      event.preventDefault();
      const toDate = new Date(document.getElementById("to").value);
      const fromDate = new Date(document.getElementById("from").value);

      const GetDays = (fromDate, toDate) => {
        if ( toDate > fromDate){
        const duration = parseInt((toDate - fromDate) / (24 * 3600 * 1000));
        this.setState({ fromgreaterthanto: ""});

          return `${duration} Day(s)`;
          // console.log(duration)
        } else {
          this.setState({ fromgreaterthanto: "The To Date must be greater than the From date"})
        }
      }

    const durationDays = GetDays(fromDate, toDate);
  
	
			this.setState({
				[event.target.name]: event.target.value, days: durationDays
      });
      

    }
    cancelFormSubmit = event => {
			event.preventDefault();
			this.setState({
				[event.target.value]: '', successmessage: 'New Absence Creation cancelled', errormessage: ''
      });

      document.getElementById("form").reset();

		}
 
    


  handleFormSubmit = async(event) => {
        event.preventDefault();
        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;
    
        if (validation.isValid) {
          try{
            const token = localStorage.getItem('token');
            const headers = {
              Authorization: `Bearer ${token}`,
          }
            const res = await axios.post(`${env.api}user/leave`, this.state, {headers: headers} );
            toastr.options.positionClass = "toast-top-center";
            
            if(res){
              setTimeout(() =>

                toastr.success('New Absence Successfully Created'), 2000)
              }
            this.props.history.push('/dashboard');
            console.log(res);
        
          } catch(err){
          toastr.error('An Error Occured, try again')

          }
          
        } else {
          toastr.options.positionClass = "toast-top-center"

          toastr.warning('Cannot Create New Response Make sure all fields are correctly filled')
          
        }
        
        
  }
  render() {
    const timeOffTypes = this.state.data.timeofftypes;
        let offTypes = timeOffTypes.map( (type, index) => 
            <option value={type} key={index}> {type} </option>

        );
        let validation = this.submitted ?                         // if the form has been submitted at least once
        this.validator.validate(this.state) :   // then check validity every time we render
        this.state.validation 

        console.log(this.from)
        console.log(this.to)

        


    return (
      <div>
        <DashBoardNavBar data={this.state.data} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="form">
              <h2 className="err-success text-center">{this.state.errormessage}</h2>
										<h2 className="err-success text-center">{this.state.successmessage}</h2>

                <form id="form">
                  <div className="text-center">
                    <h5 className="form-header text-center">Create New Absence</h5>

                  </div>
                    <div className="form-group ">
                      <label htmlFor="type_of_leave"> Type Of Leave</label>
                      <select onChange={this.handleInputChange} id="type_of_leave" name="type_of_leave" className="form-control">
                        <option value>Choose Leave Type</option>
                        {offTypes}
                      </select>
                      <span className="help-block">{validation.type_of_leave.message}</span>
                    
                    
                  </div>
                  <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor="from">From</label>
                    <input onChange={this.handleInputChange} min={this.from} type="date" name="from" className="form-control" id="from" placeholder="From" />
                    <span className="help-block">{validation.from.message}</span>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="to">To</label>
                    <input onChange={this.handleInputChange} min={this.to} type="date" name="to" className="form-control" id="to" placeholder="To" />
                    <span className="help-block">{validation.to.message}</span>
                  </div>
                  <div className="form-group  col-md-4">
                    <label htmlFor="duration">Duration</label>
                    <input onChange={this.handleInputChange}  type="text" name="duration" value={this.state.days} className=" form-control"  id="duration" placeholder="Duration" disabled readOnly/>
                    <span className="help-block">{this.state.fromgreaterthanto}</span>
                    
                  </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="reason">Reason For Leave</label>
                    <textarea onChange={this.handleInputChange} rows="6" type="date" name="reason" className="form-control" id="reason" placeholder="Reason For Leave" />
                    <span className="help-block">{validation.reason.message}</span>
                  </div>
                  
                  
                  <button onClick={this.handleFormSubmit} type="submit" className="btn btn-primary">CREATE</button>
                  <button onClick={this.cancelFormSubmit} type="submit" className="btn btn-info">CANCEL</button>

                </form>







              </div>
            </div>
            <div className="col-md-2"></div>

          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default AbsenceForm;