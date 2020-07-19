import React, { Component } from "react";

import Navbar from "../partials/navbar";
import LoginForm from "../partials/loginForm";

class Login extends Component {
    render() {
        return (
            <div className="login-page sidebar-collapse">
                <Navbar />
                <div className="page-header header-filter" style={{ backgroundImage: "url('../assets/img/bg7.jpg')", backgroundSize: "cover", backgroundPosition: "top center" }}>
                    <LoginForm />
                </div>
            </div>
        );
    }
}

export default Login;
