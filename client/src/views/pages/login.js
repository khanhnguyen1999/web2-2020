import React, { Component } from "react";

import LoginNavbar from "../partials/navbarLogin";
import LoginForm from "../partials/loginForm";

class Login extends Component {
    render() {
        return (
            <div className="login-page sidebar-collapse">
                <LoginNavbar />
                <div className="page-header header-filter" style={{ backgroundImage: "url('../assets/img/bg7.jpg')", backgroundSize: "cover", backgroundPosition: "top center" }}>
                    <LoginForm />
                </div>
            </div>
        );
    }
}

export default Login;
