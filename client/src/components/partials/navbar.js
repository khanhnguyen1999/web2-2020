import React,{useState,useEffect} from "react";
import {Route,Link} from "react-router-dom";
import {connect} from 'react-redux';
import {actLogout}  from '../../store/actions/login';
import { withRouter } from "react-router-dom";
import user from "../../store/reducers/user";
import Button from '@material-ui/core/Button';

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
        
    ];
    const menusNotActive = [
        {
            name: 'Home',
            to: '/home',
            exact: true
        },
        {
            name: 'PROFILE',
            to: '/profile',
            exact: false
        },    
        
    ];
    const menusAdmin = [
        {
            name: 'Home',
            to: '/home',
            exact: true
        },
        {
            name: 'ADMIN',
            to: '/admin',
            exact: false,
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
    const showNavbar = (user)=>{
        if(user.role==="user"){
            if(user.status === "ACTIVE")
            {
                return showMenus(menus)
            }
            else{
                return showMenus(menusNotActive)
            }
        }else if(user.role === "admin")
        {
            return showMenus(menusAdmin)
        }
    }

    const showButtonVerify = (user) => {
        if(user.role==="user" && !user.idCardPhoto){
            if(user.status==="PENDING")
            {
                return (<Button  variant="contained" color="secondary">
                        PENDING
                    </Button>)
            }else if(user.status==="LOCKED")
            {
                return (<Button  variant="contained" color="secondary">
                        LOCKED
                    </Button>)
            }else if (user.status==="DENIED")
            {
                return (<Button onClick={onClickVerify} variant="contained" color="secondary">
                            DENIED
                        </Button>)
            }
            return (<Button onClick={onClickVerify} variant="contained" color="secondary">
                        Verify
                    </Button>)
        }
    }

    const onCLickLogout = ()=> {
        props.logout();
        props.history.push('/')
    }
    const onClickVerify =(e)=>{
        props.history.push('/verify')
    }
    console.log("assasasa")
    console.log(user)
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
                            {user?showButtonVerify(user):''}
                            {/* {user&&!user.idCardPhoto&&user.role!=="admin"?<Button onClick={onClickVerify} variant="contained" color="secondary">
                            Verify
                            </Button>:''} */}
                            {user?showNavbar(user):''}
                            {/* {user?user.role==="user"?showMenus(menus):showMenus(menusAdmin):showMenus(menus1)} */}

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
