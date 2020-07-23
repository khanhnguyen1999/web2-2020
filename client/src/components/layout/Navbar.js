import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

const menus = [
    {
        name: 'Home',
        to: '/home',
        exact: true
    },
    {
        name: 'About',
        to: '/about',
        exact: false
    },
    {
        name: 'Blog',
        to: '/blog',
        exact: false
    },
    {
        name: 'Page',
        to: '/page',
        exact: false
    },
    {
        name: 'Saving',
        to: '/saving',
        exact: false
    },
    {
        name: 'Transaction',
        to: '/transaction',
        exact: false
    },
    {
        name: 'Logout',
        to: '/logout',
        exact: false
    }
    
    
];

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => {
                var active = match ? 'active' : '';
                return (
                    <li className="nav-item">
                        <Link className="nav-link" to={to}>{label} </Link>
                    </li>
                );
            }}
        />
    );
};

class Menu extends Component {
    render() {
        return (
            <div className="container">
                <div className="row align-items-center">
                <div className="col-lg-8 col-xl-8">
                    <nav className="navbar navbar-expand-lg navbar-light">
                    <a className="navbar-brand" href="index.html"> <img src="./image/main/logo.png" style={{width: '141px', height: '50px'}} alt="logo" /> </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse main-menu-item justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            {this.showMenus(menus)}
                        </ul>
                    </div>
                    </nav>
                </div>
                </div>
            </div>
        );
    }

    showMenus = (menus) => {
        var result = null;
        if(menus.length > 0){
            result = menus.map((menu, index) => {
                return (
                    <MenuLink 
                        key={index}
                        label={menu.name}
                        to={menu.to}
                        activeOnlyWhenExact={menu.exact}
                    />
                );
            });
        }
        return result;
    }

}

export default Menu;
