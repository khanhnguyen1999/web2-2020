import React, { Component } from "react";
import Axios from "axios";

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        // State
        this.state = {
            username: "",
            password: "",
            redirectSignal: false,
        };

        // Bind functions
        //
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const url = "http://localhost:9000/login";

        const user = {
            username: this.state.username,
            password: this.state.password,
        };

        await Axios.post(url, user)
            .then((res) => {
                console.log(res);
                this.setState({
                    redirectSignal: res.data.redirectSignal,
                });
            })
            .catch((err) => {
                console.error(err);
            });
    };

    redirectTo(signal) {
        if (signal) {
            return <Redirect to="/" />
        } else {
            return <Redirect to="/login" />
        }
    }

    render() {
        return (
            <div className="container">
                {/* <Container> */}
                <div className="row">
                    {/* <Row> */}
                    <div className="col-lg-4 col-md-6 ml-auto mr-auto">
                        {/* <Col lg={4} md={6} className="ml-auto mr-auto"> */}
                        <div className="card card-login">
                            {/* <Card className="card-login"> */}
                            <form className="form" onSubmit={this.handleSubmit}>
                                {/* <Form onSubmit={this.handleSubmit}> */}
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
                                {/* <p className="description text-center">Or Be Classical</p> */}
                                <div className="card-body">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="material-icons">account_circle</i>
                                            </span>
                                        </div>
                                        <input onChange={this.handleChange} name="username" type="text" className="form-control" placeholder="Username..." />
                                    </div>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="material-icons">lock_outline</i>
                                            </span>
                                        </div>
                                        <input onChange={this.handleChange} name="password" type="password" className="form-control" placeholder="Password..." />
                                    </div>
                                </div>
                                <div className="footer text-center">
                                    <button className="btn btn-primary btn-link btn-wd bnt-lg" type="submit" value="login">
                                        Login
                                    </button>
                                    <p className="description text-center">
                                        Or
                                        <a href="/#"> Register</a>
                                    </p>
                                </div>
                            </form>
                            {/* </Form>
                        </Card> */}
                        </div>
                        {/* </Col> */}
                    </div>
                    {/* </Row> */}
                </div>
                {/* </Container> */}
            </div>
        );
    }
}

export default LoginForm;
