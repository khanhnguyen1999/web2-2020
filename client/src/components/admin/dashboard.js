import React, { Component } from "react";

import Navbar from "./navbar";
import Sidebar from "./sidebar";
import MainContent from "./mainContent";

class Dashboard extends Component {
    render() {
        const currentUser = localStorage.getItem("currentUser");
        console.log(currentUser);
        return (
            <div className="wrapper">
                <Sidebar />
                <div className="main-panel">
                    <Navbar />
                    <MainContent />
                </div>
            </div>
        );
    }
}

export default Dashboard;
