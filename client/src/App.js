import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/auth/login/login";
import Home from "./components/home/home";
import Transaction from "./components/transaction/transaction";
import Profile from "./components/profile/profile";
// import Admin from "./components/admin/dashboard";
import Navbar from "./components/partials/navbar";
import Footer from "./components/partials/footer";

class App extends Component {
    render() {
        return (
            <Router>
                <>
                    <div className="login-page sidebar-collapse">
                        <Navbar />
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/transaction" component={Transaction} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/login" component={Login} />
                        </Switch>
                        <Footer />
                    </div>
                    {/* <Route path="/admin" component={Admin} /> */}
                    </>
            </Router>
        );
    }
}

export default App;
