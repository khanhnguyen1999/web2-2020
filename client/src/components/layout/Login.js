import React,{useState,useEffect} from 'react';
import { Route , withRouter ,Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {actPostLogin} from '../../store/actions/login';

function Login(props) {
    const [userName,setUserName] = useState('');
    const [password,setPassword] =useState('');
    const [error,setError] =useState('');

    useEffect(()=>{
        console.log(props.user)
        if(props.user.successLogin===true){
            props.history.push('/home')
        }
        if(props.user.successLogin===false)
        {
            setError("Username hoac Password khong chinh xac")
        }
        
    },[props.user])
    const onChangeUserName = e => {
        setUserName(e.currentTarget.value);
    }

    const onChangePassword = e => {
        setPassword(e.currentTarget.value);
    }

    const onSubmit =(e)=>{
        e.preventDefault();
        if(userName==="" || password===""){
            setError("Vui long dien day du thong tin")
        }
        else
        {
            props.postLogin({userName,password})
        }

    }

    const showError = (error)=>{
        return (
            <div className="alert alert-danger">
                <div className="container">
                    <div className="alert-icon">
                        <i className="material-icons">error_outline</i>
                    </div>
                    <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">
                            <i className="material-icons">clear</i>
                        </span>
                    </button>
                    <b>Error Alert:</b> {error}
                </div>
            </div>
        );
    }
    
    return (
        <div className="page-header header-filter" style={{backgroundImage: 'url("../assets/img/bg7.jpg")', backgroundSize: 'cover', backgroundPosition: 'top center'}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 ml-auto mr-auto">
              <div className="card card-login">
                <form className="form" method="POST">
                  <div className="card-header card-header-primary text-center">
                    <h4 className="card-title">Login</h4>
                    <div className="social-line">
                      <a href="#pablo" className="btn btn-just-icon btn-link">
                        <i className="fa fa-facebook-square" />
                      </a>
                      <a href="#pablo" className="btn btn-just-icon btn-link">
                        <i className="fa fa-twitter" />
                      </a>
                      <a href="#pablo" className="btn btn-just-icon btn-link">
                        <i className="fa fa-google-plus" />
                      </a>
                    </div>
                  </div>
                  <p className="description text-center">Or Be Classical</p>

                    {error!==""?showError(error):''}

                  <div className="card-body">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="material-icons">account_circle</i>
                        </span>
                      </div>
                      <input type="text" name="username" onChange={onChangeUserName} className="form-control" placeholder="Email..." />
                    </div>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="material-icons">lock_outline</i>
                        </span>
                      </div>
                      <input type="password" name="password" onChange={onChangePassword} className="form-control" placeholder="Password..." />
                    </div>
                    

                   
                    <div className="row"></div>
                      <div className="col-12 text-center">
                        <Link to="/forgot-password" className="btn btn-danger btn-link">Forgotten account?</Link>
                      </div>
                    </div>
                  
                  <div className="footer text-center">
                    {/* <a href="#pablo" class="btn btn-primary btn-link btn-wd btn-lg">Get Started</a> */}
                    <button onClick={onSubmit} className="btn btn-primary btn-link btn-wd btn-lg">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
const mapStateToProps = state => {
    return {
        user : state.user,
    }
}

const mapDistchToProps = dispatch =>{
    return {
        postLogin : (data)=>{
            dispatch(actPostLogin(data))
        }
    }
}
export default withRouter(connect(mapStateToProps,mapDistchToProps)(Login))
