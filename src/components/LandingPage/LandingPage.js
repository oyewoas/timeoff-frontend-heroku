import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import './LandingPage.css'
import { Link } from 'react-router-dom';
import timeoffImg from '../../assets/img/undraw_time_management_30iu.svg'
import access from '../../assets/img/undraw_real-time_sync_o57k.svg'
import feedback from '../../assets/img/undraw_messages1_9ah2.svg'
import flexible from '../../assets/img/undraw_bookmarks_r6up.svg'
// import calender from './undraw_calendar_dutt.svg'
import booking from '../../assets/img/undraw_booking_33fn.svg'



class LandingPage extends Component {
    render(){
        return(
            <div>
                <NavBar/>
                
                
                <header className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">

                            <div className="header-side1 left">
                                <h2 className="heading">TimeOff Management made easy</h2>
                                <p className="paragraph">
                                This is a simple employee absence management app which allows the employees of our company
                                request for absence from work and also get approval.
                                </p>
                                <Link className="header-side1-btn" to="/signup">SIGN UP FOR FREE</Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="">
                                <img src={timeoffImg} className=" img-fluid" alt="timeoffImg"/>
                            </div>
                        </div>

                    </div>
                </header>

                <main className="container-fluid">
                    <div className="text-center">
                        <h3 className="s-head">Features Highlight</h3>
                    </div>
                    <div className="row services">
                        <div className="col-lg-4">
                            <div className="text-center">
                                <img src={feedback} className="svg-feedback img-fluid" alt="Feedback"/>

                                <h5 className="s-heading">Quick Feedback</h5>
                                <p className="s-paragraph">
                                    Requests made through the Application, notifies the manger at that instance and at 
                                    constant intervals thereby the employees manager is able to respond and give a quick response 
                                    no matter how tight his/her schedule may be.
                                </p>
                            </div>
                        </div>
                        
                        <div className="col-lg-4">
                        <div className="text-center">
                        <img src={access} className="svg-access img-fluid" alt="Always Accessible"/>
                                <h5 className="s-heading">Always Accessible</h5>
                                <p className="s-paragraph">
                                    The Application is Accessible on any device, we deliberately concentrated on that
                                    so that the employees can use it even when they are not in the office, and as need arises
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                        <div className="text-center">
                    <img src={flexible} className="svg-flexible img-fluid" alt="timeoffImg"/>

                                <h5 className="s-heading">Simple and flexible</h5>
                                <p className="s-paragraph">
                                    The Application's interface was developed to be flexible and understandable, there is no Ambiguity
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                    <h3 className="s-head">About TimeOff Application</h3>
                    <p className="s-paragraph">
                    This App was developed so that our employees can easily request for some time off from work for
                    various reasons ranging from <i>vacations, leave of absence, health challenges, special occasions
                    among others </i>, each time off request by the employee is received by the manager who then 
                    approve, disapprove or modify the time off request details.<br/><br/>

                    As the culture of our company is, we emphasize on the convenience and wellbeing of our employees, therefore this app
                    helps reduce the stress of employees waiting for a long time before time off requests are approved, meanwhile also
                    helping the company to effectively and efficiently manage the details of employees whose time off request has been granted or yet to be granted.
                    </p>
                                    

                                    
                    </div>

                    <div className="text-center">
                        <img src={booking} className="svg-calender img-fluid" alt="timeoffImg"/>

                    </div>

                    <hr/>

                    <div className="text-center">
                    <h3 className="s-head">TimeOff Application Workflow</h3>
                    <p className = "ss-paragraph" > Employee registers, logs in and updates his/her profile, requests time off or revoke existing one.

                    The Manager gets a notification and decides about upcoming employees absence.

                    Absence is accounted. The Company and every other employees are kept updated.
                                    </p>

                    </div>
                    <hr/>
                    <div className="text-center start">
                        <Link  className="start-btn" to="/signup">START USING TimeOff Mgt App</Link>

                    </div>
                    <hr/>

                </main>
                <Footer/>
            </div>
        )
    }
};

export default LandingPage;