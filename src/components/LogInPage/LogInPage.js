import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import {Link} from 'react-router-dom';
import adduser from '../../assets/img/undraw_add_user_ipe3.svg';
import FormValidator from '../FormValidator/FormValidator';
import LogInNavBar from '../LogInNavBar/LogInNavBar';
import './LogInPage.css';
import axios from 'axios';
import toastr from 'toastr';
import env from '../../../src/env';


class LogInPage extends Component {
    constructor(props){
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
    },
    { 
      field: 'password', 
      method: 'isEmpty', 
      validWhen: false, 
      message: 'Password is required'
    },
]);

  this.state = {
    email: '',
    password: '',
    validation: this.validator.valid(),
    successmessage: '',
    errormessage: '',
    toDashboard: false,
  };

  this.submitted = false;

  



}

passwordMatch = (confirmation, state) => (state.password === confirmation)

handleInputChange = event => {
    event.preventDefault();

    this.setState({
        [event.target.name]: event.target.value,
    });
}



handleFormSubmit = async (event) => {
event.preventDefault();

const validation = this.validator.validate(this.state);
this.setState({ validation });
this.submitted = true;

if (validation.isValid) {
// handle actual form submission here

try{
    const res = await axios.post(`${env.api}user/signin`, this.state);
    const token = res.data.data.token;

    localStorage.setItem('token', token);

    this.props.history.push('/dashboard');
    console.log(res);

} catch(err){
    toastr.options.positionClass = "toast-top-center";
    toastr.error('Invalid Credentials, try again');
}



// refreshPage(5000);
            
} else {
    toastr.options.positionClass = "toast-top-center";

	toastr.warning('Cannot Log In User Make sure all fields are correctly filled');
}
};



componentDidMount(){
    const token = localStorage.getItem('token');

    if (token) return this.props.history.push('/dashboard');
}

    render(){
        let validation = this.submitted ?                         // if the form has been submitted at least once
        this.validator.validate(this.state) :   // then check validity every time we render
        this.state.validation;
        return(
            <div>
                <LogInNavBar />
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-sm-6 svg-img">
                        <img src={adduser} className="img-fluid" alt="timeoffImg"/>
                    </div>
                    <div className="col-sm-6 form">
                    <h2 className="err-success text-center">{this.state.errormessage}</h2>
					<h2 className="err-success text-center">{this.state.successmessage}</h2>
                    <form action="" method="">
                        <div className="text-center">
                            <h5 className="form-header">Log In</h5>
                        </div>
                        
                        <div className="form-group {validation.email.isInvalid && 'has-error'}">
                            <label htmlFor="email">Employee Email</label>
                            <input onChange={this.handleInputChange} type="email" name="email" className="form-control" id="email" placeholder="Enter email" />
                            <span className="help-block">{validation.email.message}</span>
                        
                        </div>
                        <div className="form-group {validation.password.isInvalid && 'has-error'}">
                            <label htmlFor="password">Password</label>
                            <input type="password"  onChange={this.handleInputChange} name="password" className="form-control" id="password" placeholder="Password" />
                            <span className="help-block">{validation.password.message}</span>
                        
                        </div>
                        <div className="text-center">

                            <button onClick={this.handleFormSubmit} className="btn btn-primary">LOGIN</button>
                        </div>
                        <div className="text-right">
                            <p className="registered"> <Link to="/forgotpassword">Forgot Password?</Link></p>
                        </div>
                    </form>
                    </div>
                    </div>
                    </div>
                    <Footer/>
                    </div>
        )
    }
}

export default LogInPage;