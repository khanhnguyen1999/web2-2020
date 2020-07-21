import React, { Component } from "react";

import Users from "./users";

class MainContent extends Component {
    render() {
        return (
            <div className="content">
                <div className="container-fluid">{/* <!-- your content here --> */}
                    <Users />
                </div>
            </div>
        );
    }
}

export default MainContent;
