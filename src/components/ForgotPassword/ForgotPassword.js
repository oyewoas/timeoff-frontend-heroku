/* eslint-disable no-console */
import React, { Component } from 'react';
import FormValidator from '../FormValidator/FormValidator';
import axios from 'axios';
import {Link} from 'react-router-dom';
import toastr from 'toastr';
import env from '../../../src/env';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.validator = new FormValidator([
    { 
      field: 'email', 
      method: 'isEmpty', 
      validWhen: false, 
      message: 'Email is required' 
    },
    { 
      field: 'email',
      method: 'isEmail', 
      validWhen: true, 
      message: 'That is not a valid email.'
    }
]);


    this.state = {
        email: '',
        validation: this.validator.valid(),
      };
    
      this.submitted = false;
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;
    
    if (validation.isValid) {
    // handle actual form submission here
    
    try{
        const res = await axios.post(`${env.api}forgotpassword`, this.state);
        if (res){
            toastr.options.positionClass = "toast-top-center";
            toastr.success('Password Recovery Email Sent');
            this.form.reset();
        }
        console.log(res);
    } catch(err){
        toastr.options.positionClass = "toast-top-center";
        toastr.error('This Email not registered');
        this.form.reset();

    }
                
    } else {
        toastr.options.positionClass = "toast-top-center";
    
        toastr.warning('Cannot Log In User Make sure all fields are correctly filled');
    }
};

//     componentDidMount(){
//         const token = localStorage.getItem('token');

//         if (token) return this.props.history.push('/dashboard');
// };

  render() {
    let validation = this.submitted ?                         // if the form has been submitted at least once
    this.validator.validate(this.state) :   // then check validity every time we render
    this.state.validation;
    return (
      <div>
        <div className="container-fluid">
            <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
            <h1 className="text-center form-header pt-5">
            Forgot Password??
        </h1>
        <form ref={(el) => this.form = el}>
            <div className="form-group {validation.email.isInvalid && 'has-error'}">
                            <label htmlFor="email">Employee Email</label>
                            <input onChange={this.handleInputChange} type="email" name="email" className="form-control" id="email" placeholder="Enter email" />
                            <span className="help-block">{validation.email.message}</span>
                        
                        </div>

                        <div className="text-center">

                            <button onClick={this.handleFormSubmit} className="btn btn-primary">Send Password Reset Email</button>
                        </div>
                        <div className="text-center">
                            <p className="registered"> <Link to="/">Return Home</Link></p>
                        </div>
        </form>
        
            </div>
            <div className="col-md-3"></div>
            </div>
        </div>
        
      </div>
    );
  }
}

export default ForgotPassword;