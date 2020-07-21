import React, { Component } from "react";

import HomeHeader from "../partials/homeHeader";
import HomeBody from "../partials/homeBody";

class Home extends Component {
    render() {
        return (
            <div>
                <div className="page-header header-filter" style={{ backgroundImage: "url('../assets/img/profile_city.jpg')", backgroundSize: "cover", backgroundPosition: "top center" }}>
                    <HomeHeader />
                </div>
                <HomeBody />
            </div>
        );
    }
}

export default Home;
