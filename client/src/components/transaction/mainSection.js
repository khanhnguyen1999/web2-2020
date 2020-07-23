import React, { Component } from "react";

import MainBody from "./mainBody";

class MainSection extends Component {
    render() {
        return (
            <div>
                <div className="page-header header-filter" data-parallax="true" style={{ backgroundImage: "url('assets/img/bg3.jpg')", }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 ml-auto mr-auto">
                                <div className="brand text-center">
                                    <h1>Your title here</h1>
                                    <h3 className="title text-center">Subtitle</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <MainBody />
            </div>
        );
    }
}

export default MainSection;