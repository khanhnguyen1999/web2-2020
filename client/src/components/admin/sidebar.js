import React, { Component } from "react";

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar" data-color="purple" data-background-color="white">
                {/* <!--
                    Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

                    Tip 2: you can also add an image using data-image tag
                    --> */}
                <div className="logo">
                    <a href="/#" className="simple-text logo-normal">
                        17Tek
                    </a>
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/#0">
                                <i className="material-icons">dashboard</i>
                                <p>Dashboard</p>
                            </a>
                        </li>
                        {/* <!-- your sidebar here --> */}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;
