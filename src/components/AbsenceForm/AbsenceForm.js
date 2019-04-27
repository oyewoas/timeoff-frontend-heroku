import React, { Component } from 'react';
import FormValidator from '../FormValidator/FormValidator'

import DashBoardNavBar from '../DashBoardNav/DashBoardNavBar'
import profile from '../../assets/img/undraw_profile_pic_ic5t.svg'
import  './AbsenceForm.css'
import Footer from '../Footer/Footer';
import moment from 'moment'


class AbsenceForm extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.cancelFormSubmit = this.cancelFormSubmit.bind(this);

        this.validator = new FormValidator([
            { 
                field: 'type', 
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
            type:'',
            to: '',
            reason: '',
						validation: this.validator.valid(),
						successmessage: '',
            errormessage: '',
            fromgreaterthanto: '',
            days: `${0} Day`,
          }
      
          this.submitted = false;

          this.from = moment()
          this.todate =  moment()
          this.to = moment(this.todate).add(1, 'days');
      



  
		}
		  
		passwordMatch = (confirmation, state) => (state.password === confirmation)

    
    
		handleInputChange = event => {
      event.preventDefault();
      const toDate = new Date(document.getElementById("to").value);
      const fromDate = new Date(document.getElementById("from").value);

      const GetDays = (fromDate, toDate) => {
        if ( toDate > fromDate){
        const duration = parseInt((toDate - fromDate) / (24 * 3600 * 1000));
        this.setState({ fromgreaterthanto: ""})

          return `${duration} Days`;
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
      const refreshPage = (timeoutPeriod) => {
        let refresh = "location.reload(true)";
        setTimeout( refresh ,timeoutPeriod);
      }

			this.setState({
				[event.target.value]: '', successmessage: 'New Absence Creation cancelled', errormessage: ''
      });

      document.getElementById("form").reset();
      refreshPage(5000);

		}
 
    


    handleFormSubmit = event => {
        event.preventDefault();
				const refreshPage = (timeoutPeriod) => {
					let refresh = "location.reload(true)";
					setTimeout( refresh ,timeoutPeriod);
			  }
        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;
    
        if (validation.isValid) {
					// handle actual form submission here
					this.setState({
						successmessage: 'New Absence Created successfully',errormessage: ''
					})
					refreshPage(5000);
					alert('Registered successfully')
					
        } else {
					this.setState({
						errormessage: 'Cannot Create New Response Make sure all fields are correctly filled', successmessage: ''
					})
					// alert('Cannot Create User Make sure all fields are correctly filled')
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
                      <label htmlFor="type"> Type Of Leave</label>
                      <select onChange={this.handleInputChange} id="type" name="type" className="form-control">
                        <option value>Choose Leave Type</option>
                        {offTypes}
                      </select>
                      <span className="help-block">{validation.type.message}</span>
                    
                    
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