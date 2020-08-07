import React from "react";

function Landing() {
    
    return (
        <div>
            <div className="landing-page sidebar-collapse">
                <div
                    className="page-header header-filter"
                    data-parallax="true"
                    style={{
                        backgroundImage:
                            'url("../assets/img/profile_city.jpg")',
                    }}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h1 className="title">
                                    Your Story Starts With Us.
                                </h1>
                                <h4>
                                    Every landing page needs a small description
                                    after the big bold title, that's why we
                                    added this text here. Add here all the
                                    information that can make you or your
                                    product create the first impression.
                                </h4>
                                <br />
                                <a
                                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                    target="_blank"
                                    className="btn btn-danger btn-raised btn-lg"
                                >
                                    {" "}
                                    <i className="fa fa-play" /> Watch video{" "}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main main-raised">
                    <div className="container">
                        <div className="section text-center">
                            <div className="row">
                                <div className="col-md-8 ml-auto mr-auto">
                                    <h2 className="title">
                                        Let's talk product
                                    </h2>
                                    <h5 className="description">
                                        This is the paragraph where you can
                                        write more details about your product.
                                        Keep you user engaged by providing
                                        meaningful information. Remember that by
                                        this time, the user is curious,
                                        otherwise he wouldn't scroll to get
                                        here. Add a button if you want the user
                                        to see more.
                                    </h5>
                                </div>
                            </div>
                            <div className="features">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="info">
                                            <div className="icon icon-info">
                                                <i className="material-icons">
                                                    chat
                                                </i>
                                            </div>
                                            <h4 className="info-title">
                                                Free Chat
                                            </h4>
                                            <p>
                                                Divide details about your
                                                product or agency work into
                                                parts. Write a few lines about
                                                each one. A paragraph describing
                                                a feature will be enough.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="info">
                                            <div className="icon icon-success">
                                                <i className="material-icons">
                                                    verified_user
                                                </i>
                                            </div>
                                            <h4 className="info-title">
                                                Verified Users
                                            </h4>
                                            <p>
                                                Divide details about your
                                                product or agency work into
                                                parts. Write a few lines about
                                                each one. A paragraph describing
                                                a feature will be enough.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="info">
                                            <div className="icon icon-danger">
                                                <i className="material-icons">
                                                    fingerprint
                                                </i>
                                            </div>
                                            <h4 className="info-title">
                                                Fingerprint
                                            </h4>
                                            <p>
                                                Divide details about your
                                                product or agency work into
                                                parts. Write a few lines about
                                                each one. A paragraph describing
                                                a feature will be enough.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section text-center">
                            <h2 className="title">Here is our team</h2>
                            <div className="team">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="team-player">
                                            <div className="card card-plain">
                                                <div className="col-md-6 ml-auto mr-auto">
                                                    <img
                                                        src="../assets/img/faces/avatar.jpg"
                                                        alt="Thumbnail Image"
                                                        className="img-raised rounded-circle img-fluid"
                                                    />
                                                </div>
                                                <h4 className="card-title">
                                                    Gigi Hadid
                                                    <br />
                                                    <small className="card-description text-muted">
                                                        Model
                                                    </small>
                                                </h4>
                                                <div className="card-body">
                                                    <p className="card-description">
                                                        You can write here
                                                        details about one of
                                                        your team members. You
                                                        can give more details
                                                        about what they do. Feel
                                                        free to add some{" "}
                                                        <a href="#">links</a>{" "}
                                                        for people to be able to
                                                        follow them outside the
                                                        site.
                                                    </p>
                                                </div>
                                                <div className="card-footer justify-content-center">
                                                    <a
                                                        href="#pablo"
                                                        className="btn btn-link btn-just-icon"
                                                    >
                                                        <i className="fa fa-twitter" />
                                                    </a>
                                                    <a
                                                        href="#pablo"
                                                        className="btn btn-link btn-just-icon"
                                                    >
                                                        <i className="fa fa-instagram" />
                                                    </a>
                                                    <a
                                                        href="#pablo"
                                                        className="btn btn-link btn-just-icon"
                                                    >
                                                        <i className="fa fa-facebook-square" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="team-player">
                                            <div className="card card-plain">
                                                <div className="col-md-6 ml-auto mr-auto">
                                                    <img
                                                        src="../assets/img/faces/christian.jpg"
                                                        alt="Thumbnail Image"
                                                        className="img-raised rounded-circle img-fluid"
                                                    />
                                                </div>
                                                <h4 className="card-title">
                                                    Christian Louboutin
                                                    <br />
                                                    <small className="card-description text-muted">
                                                        Designer
                                                    </small>
                                                </h4>
                                                <div className="card-body">
                                                    <p className="card-description">
                                                        You can write here
                                                        details about one of
                                                        your team members. You
                                                        can give more details
                                                        about what they do. Feel
                                                        free to add some{" "}
                                                        <a href="#">links</a>{" "}
                                                        for people to be able to
                                                        follow them outside the
                                                        site.
                                                    </p>
                                                </div>
                                                <div className="card-footer justify-content-center">
                                                    <a
                                                        href="#pablo"
                                                        className="btn btn-link btn-just-icon"
                                                    >
                                                        <i className="fa fa-twitter" />
                                                    </a>
                                                    <a
                                                        href="#pablo"
                                                        className="btn btn-link btn-just-icon"
                                                    >
                                                        <i className="fa fa-linkedin" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="team-player">
                                            <div className="card card-plain">
                                                <div className="col-md-6 ml-auto mr-auto">
                                                    <img
                                                        src="../assets/img/faces/kendall.jpg"
                                                        alt="Thumbnail Image"
                                                        className="img-raised rounded-circle img-fluid"
                                                    />
                                                </div>
                                                <h4 className="card-title">
                                                    Kendall Jenner
                                                    <br />
                                                    <small className="card-description text-muted">
                                                        Model
                                                    </small>
                                                </h4>
                                                <div className="card-body">
                                                    <p className="card-description">
                                                        You can write here
                                                        details about one of
                                                        your team members. You
                                                        can give more details
                                                        about what they do. Feel
                                                        free to add some{" "}
                                                        <a href="#">links</a>{" "}
                                                        for people to be able to
                                                        follow them outside the
                                                        site.
                                                    </p>
                                                </div>
                                                <div className="card-footer justify-content-center">
                                                    <a
                                                        href="#pablo"
                                                        className="btn btn-link btn-just-icon"
                                                    >
                                                        <i className="fa fa-twitter" />
                                                    </a>
                                                    <a
                                                        href="#pablo"
                                                        className="btn btn-link btn-just-icon"
                                                    >
                                                        <i className="fa fa-instagram" />
                                                    </a>
                                                    <a
                                                        href="#pablo"
                                                        className="btn btn-link btn-just-icon"
                                                    >
                                                        <i className="fa fa-facebook-square" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section section-contacts">
                            <div className="row">
                                <div className="col-md-8 ml-auto mr-auto">
                                    <h2 className="text-center title">
                                        Work with us
                                    </h2>
                                    <h4 className="text-center description">
                                        Divide details about your product or
                                        agency work into parts. Write a few
                                        lines about each one and contact us
                                        about any further collaboration. We will
                                        responde get back to you in a couple of
                                        hours.
                                    </h4>
                                    <form className="contact-form">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="bmd-label-floating">
                                                        Your Name
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="bmd-label-floating">
                                                        Your Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label
                                                htmlFor="exampleMessage"
                                                className="bmd-label-floating"
                                            >
                                                Your Message
                                            </label>
                                            <textarea
                                                type="email"
                                                className="form-control"
                                                rows={4}
                                                id="exampleMessage"
                                                defaultValue={""}
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 ml-auto mr-auto text-center">
                                                <button className="btn btn-primary btn-raised">
                                                    Send Message
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Landing;
