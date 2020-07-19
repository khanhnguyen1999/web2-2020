import React, { Component } from "react";

import Navbar from "../partials/navbar";
import HomeHeader from "../partials/homeHeader";
import HomeBody from "../partials/homeBody";

class Home extends Component {
    render() {
        return (
            <div className="login-page sidebar-collapse">
                <Navbar />
                <div className="page-header header-filter" style={{ backgroundImage: "url('../assets/img/profile_city.jpg')", backgroundSize: "cover", backgroundPosition: "top center" }}>
                    <HomeHeader />
                </div>
                <HomeBody />
            </div>
        );
    }
}

export default Home;
