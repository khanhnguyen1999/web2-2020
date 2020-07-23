import React, { Component } from "react";

import LoginForm from "./loginForm";

class Login extends Component {
    render() {
        return (
            <div className="page-header header-filter" style={{ backgroundImage: "url('../assets/img/bg7.jpg')", backgroundSize: "cover", backgroundPosition: "top center" }}>
                <LoginForm />
            </div>
        );
    }
}

export default Login;
