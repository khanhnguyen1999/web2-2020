import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./views/partials/navbar";

import Login from "./components/auth/login";
import Home from "./views/pages/home";
import Transaction from "./views/pages/transaction";
import Profile from "./views/pages/profile";
import Admin from "./components/admin/dashboard";
import Footer from "./views/partials/footer";

class App extends Component {
    // constructor(props) {
    //     super(props);

    //     // Bind Functions
    //     //
    // }

    render() {
        // console.log(this.state.currentUser);
        return (
            <Router>
                <>
                    <div className="login-page sidebar-collapse">
                        <Navbar />
                        <Switch>
                            <Route path="/" exact component={Home} />
                            {/* <Home />
                            </Route> */}
                            <Route path="/transaction" component={Transaction} />
                            {/* <Transaction />
                            </Route> */}
                            <Route path="/profile" component={Profile} />
                            {/* <Profile />
                            </Route> */}
                            <Route path="/login" component={Login} />
                            {/* <Login />
                            </Route> */}
                        </Switch>
                        <Footer />
                    </div>
                    <Route path="/admin" component={Admin} />
                    </>
            </Router>
        );
    }
}

export default App;
