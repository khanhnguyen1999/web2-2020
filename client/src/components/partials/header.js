import React from "react";

function Header() {

    const menus = [
        {
            name: 'Home',
            to: '/home',
            exact: true
        },
        {
            name: 'TRANSACTON',
            to: '/transacton',
            exact: false
        },
        {
            name: 'PROFILE',
            to: '/profile',
            exact: false
        },
        {
            name: 'ADMIN',
            to: '/admin',
            exact: false,
        },
        {
            name: 'LOGOUT',
            to: '/logout',
            exact: false,
        },
      
        
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
    const showMenus = (menus) => {
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
    return (
        <div>
            <nav
                className="navbar navbar-color-on-scroll navbar-transparent fixed-top navbar-expand-lg"
                color-on-scroll={100}
            >
                <div className="container">
                    <div className="navbar-translate">
                        <a
                            className="navbar-brand"
                            href="https://demos.creative-tim.com/material-kit/index.html"
                        >
                            17Tek
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="sr-only">Toggle navigation</span>
                            <span className="navbar-toggler-icon" />
                            <span className="navbar-toggler-icon" />
                            <span className="navbar-toggler-icon" />
                        </button>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            {showMenus(menus)}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
    
}

export default Header;
