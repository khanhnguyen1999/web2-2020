import React from 'react'

function Footer() {
    return (
        <div>
            <section className="footer-area section_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-2 col-sm-4 mb-4 mb-xl-0 single-footer-widget">
                            <h4>Top Products</h4>
                            <ul>
                                <li><a href="#">Managed Website</a></li>
                                <li><a href="#">Manage Reputation</a></li>
                                <li><a href="#">Power Tools</a></li>
                                <li><a href="#">Marketing Service</a></li>
                            </ul>
                        </div>
                        <div className="col-xl-2 col-sm-4 mb-4 mb-xl-0 single-footer-widget">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><a href="#">Jobs</a></li>
                                <li><a href="#">Brand Assets</a></li>
                                <li><a href="#">Investor Relations</a></li>
                                <li><a href="#">Terms of Service</a></li>
                            </ul>
                        </div>
                        <div className="col-xl-2 col-sm-4 mb-4 mb-xl-0 single-footer-widget">
                            <h4>Features</h4>
                            <ul>
                                <li><a href="#">Jobs</a></li>
                                <li><a href="#">Brand Assets</a></li>
                                <li><a href="#">Investor Relations</a></li>
                                <li><a href="#">Terms of Service</a></li>
                            </ul>
                        </div>
                        <div className="col-xl-2 col-sm-4 mb-4 mb-xl-0 single-footer-widget">
                            <h4>Resources</h4>
                            <ul>
                                <li><a href="#">Guides</a></li>
                                <li><a href="#">Research</a></li>
                                <li><a href="#">Experts</a></li>
                                <li><a href="#">Agencies</a></li>
                            </ul>
                        </div>
                        <div className="col-xl-4 col-sm-8 col-md-8 mb-4 mb-xl-0 single-footer-widget">
                            <h4>Newsletter</h4>
                            <p>You can trust us. we only send promo offers,</p>
                            <div className="form-wrap" id="mc_embed_signup">
                                <form target="_blank" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&id=92a4423d01" method="get" className="form-inline">
                                    <input className="form-control" name="EMAIL" placeholder="Your Email Address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Your Email Address '" required type="email" />
                                    <button className="click-btn btn btn-default text-uppercase btn_2">subscribe</button>
                                    <div style={{ position: 'absolute', left: '-5000px' }}>
                                        <input name="b_36c4fd991d266f23781ded980_aefe40901a" tabIndex={-1} defaultValue type="text" />
                                    </div>
                                    <div className="info" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="copyright_part">
                <div className="container">
                    <div className="row align-items-center">
                        <p className="footer-text m-0 col-lg-8 col-md-12">{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                Đồ án cuối kỳ về internet banking của nhóm <i className="ti-heart" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">17Tez</a>
                            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}</p>
                        <div className="col-lg-4 col-md-12 text-center text-lg-right footer-social">
                            <a href="#"><i className="ti-facebook" /></a>
                            <a href="#"> <i className="ti-twitter" /> </a>
                            <a href="#"><i className="ti-instagram" /></a>
                            <a href="#"><i className="ti-skype" /></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
