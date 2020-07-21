import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./views/partials/navbar";

import Login from "./views/pages/login";
import Home from "./views/pages/home";
import Transaction from "./views/pages/transaction";
import Profile from "./views/pages/profile";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="login-page sidebar-collapse">
                        <Navbar />
                        <Switch>
                            <Route path="/" exact component={Home}>
                                <Home />
                            </Route>
                            <Route path="/transaction" component={Transaction}>
                                <Transaction />
                            </Route>
                            <Route path="/profile" component={Profile}>
                                <Profile />
                            </Route>
                            <Route path="/login" component={Login}>
                                <Login />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
