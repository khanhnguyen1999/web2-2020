import React, { Component } from "react";

class LoginForm extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6 ml-auto mr-auto">
                        <div className="card card-login">
                            <form className="form" method="" action="">
                                <div className="card-header card-header-primary text-center">
                                    <h4 className="card-title">Login</h4>
                                    <div className="social-line">
                                        <a href="#pablo" className="btn btn-just-icon btn-link">
                                            <i className="fa fa-facebook-square"></i>
                                        </a>
                                        <a href="#pablo" className="btn btn-just-icon btn-link">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                        <a href="#pablo" className="btn btn-just-icon btn-link">
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                                    </div>
                                </div>
                                <p className="description text-center">Or Be Classical</p>
                                <div className="card-body">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="material-icons">mail</i>
                                            </span>
                                        </div>
                                        <input type="email" className="form-control" placeholder="Email..." />
                                    </div>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="material-icons">lock_outline</i>
                                            </span>
                                        </div>
                                        <input type="password" className="form-control" placeholder="Password..." />
                                    </div>
                                </div>
                                <div className="footer text-center">
                                    <a href="#pablo" className="btn btn-primary btn-link btn-wd btn-lg">
                                        Get Started
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;
