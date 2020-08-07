import React from "react";

function Footer() {
    return (
        <div>
            <section>
            <footer className="footer footer-default">
                <div className="container">
                    <nav className="float-left">
                        <ul>
                            <li>
                                <a href="#">About</a>
                            </li>
                            <li>
                                <a href="#">Contact</a>
                            </li>
                            <li>
                                <a href="#">Feedback</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="copyright float-right">
                        © , made with <i className="material-icons">favorite</i>{" "}
                        by
                        <a href="#" target="blank">
                            Mie
                        </a>
                        .
                    </div>
                </div>
            </footer>
            </section>
        </div>
    );
}

export default Footer;
