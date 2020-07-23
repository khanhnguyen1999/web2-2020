import React, { Component } from "react";

import Navbar from "./navbar";
import Sidebar from "./sidebar";
import MainContent from "./mainContent";

class Dashboard extends Component {
    render() {
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
