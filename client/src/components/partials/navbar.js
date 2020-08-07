import React,{useState,useEffect} from "react";
import {Route,Link} from "react-router-dom";
import {connect} from 'react-redux';
import {actLogout}  from '../../store/actions/login';
import { withRouter } from "react-router-dom";
import user from "../../store/reducers/user";

function Navbar(props) {
    const [user,setUser] = useState();
    useEffect(()=>{
        const {user} = props.user;
        setUser(user);
    })
    const menus = [
        {
            name: 'Home',
            to: '/home',
            exact: true
        },
        {
            name: 'TRANSACTON',
            to: '/transaction',
            exact: false
        },
        {
            name: 'SAVING',
            to: '/savingAccount',
            exact: false,
        },
        {
            name: 'PROFILE',
            to: '/profile',
            exact: false
        },
        {
            name: 'ADMIN',
            to: '/admin',
            exact: false
        },

      
        
    ];
    const menus1 = [
        {
            name: 'Home',
            to: '/home',
            exact: true
        },
        {
            name: 'LOGIN',
            to: '/login',
            exact: true
        },
        {
            name: 'REGISTER',
            to: '/register',
            exact: false
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

    const showLogout = ()=>{
        return(
            <li className="nav-item">
                <a className="nav-link" onClick={onCLickLogout}>LOGOUT </a>
            </li>
        )
    }
    const onCLickLogout = ()=> {
        props.logout();
        props.history.push('/')
    }
    return (

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
                            {user?showMenus(menus):showMenus(menus1)}

                            {user?showLogout():''}
                        </ul>
                    </div>
                </div>
            </nav>

    );
    
}
const mapStateToProps = state => {
    return{
        user : state.user,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        logout : ()=>{
            dispatch(actLogout())
        }
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Navbar));
