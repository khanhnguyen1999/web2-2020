import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import {actGetUserByEmail,actPostCheckToken,actPostChangePassword,actResetStateUser} from '../../store/actions/login';
import Message from '../../components/message/Message';
import {  withRouter } from 'react-router-dom';


function ChangePassword(props) {
    const [user,setUser] = useState();
    const [currentPassword,setCurrentPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [successPostChange,setSuccessPostChange] = useState(null);
    const [error,setError] = useState(null);
    useEffect(()=>{
      let { email ,token } = props.match.params;
      if(email)
      {
        props.getUser(email)
        props.postCheckToken({email,token})
      }
      return ()=>{
        props.resetStateUser();
      }
    },[])

    const onChangeCurrentPass = (e)=>{
      setCurrentPassword(e.currentTarget.value);
    }

    const onChangeNewPass = (e)=>{
      setNewPassword(e.currentTarget.value);
    }

    const onChangeConfirmPass = (e)=>{
      setConfirmPassword(e.currentTarget.value);
    }

    useEffect(()=>{

      const{user} = props.user;
      console.log(props.user)
      console.log(props.user.successPostChange)
      console.log(user)
      setError(props.user.errorPostChange)
      setUser(user)
      setSuccessPostChange(props.user.successPostChange)
      console.log(props.user.errorPostChange)
    },[props.user])



    const { email , token } = props.match.params;

    const showMessage = (error)=>{

      return (<div className="row justify-content-center">
          <div className="col-lg-8 col-md-6">
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
          </div>
      </div>)
  }

  const showError1 = (ListError)=>{
    let result = null;
    console.log(ListError)
    if(ListError.length > 0 )
    {
        result = ListError.map((error,index)=>{
          console.log(error)
            return <div key={index} className="alert alert-danger">
            <div className="container">
              <div className="alert-icon">
                <i className="material-icons">error_outline</i>
              </div>
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true"><i className="material-icons">clear</i></span>
              </button>
              <b>Error Alert:</b> {error.msg}
            </div>
          </div>

        })
    }
    return result;
}

  const onSubmit =(e) => {
    e.preventDefault();
    if(email)
    {
      console.log("llll")
      console.log(user)
      props.postChangePassword({user,newPassword,confirmPassword})
    }
    else{
      props.postChangePassword({user,currentPassword,newPassword,confirmPassword})
    }
  }

  const onCancel = e => {
    props.history.push("/home")
  }
  if(successPostChange === true)
  {
    console.log("chuyen")
    return <Message title={"CHANGE PASSWORD"} message ={"Thay doi mat khau thanh cong "} to={"/login"} success={true}/>
  }
    return (
        <div className="login-page sidebar-collapse">
        <div className="page-header header-filter" style={{backgroundImage: 'url("/assets/img/bg7.jpg")', backgroundSize: 'cover', backgroundPosition: 'top center'}}>
          <div className="container">
            {props.user?props.user.successCheckToken===false?showMessage("Token khong hinh xac"):'':''}
            {error?showError1(error):''}
            <div className="row">
              <div className="col-lg-4 col-md-6 ml-auto mr-auto">
                <div className="card card-login">
                  <form className="form" method="POST">
                    <div className="card-header card-header-primary text-center">
                      <h4 className="card-title">
                        {email? "Recover Account" : "Change Password"}
                       </h4>
                    </div>
                    <div className="card-body">
                      {/* Main section */}
                      {!email?
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="material-icons">vpn_key</i>
                          </span>
                        </div>
                        <input onChange={onChangeCurrentPass} name="currentPassword" type="password" className="form-control" placeholder="Current Password" />
                      </div>:''}
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="material-icons">vpn_key</i>
                          </span>
                        </div>
                        <input onChange={onChangeNewPass} name="newPassword" type="password" className="form-control" placeholder="New Password" />
                      </div>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="material-icons">vpn_key</i>
                          </span>
                        </div>
                        <input onChange={onChangeConfirmPass} name="confirmPassword" type="password" className="form-control" placeholder="Confirm New Password" />
                      </div>
                      {/* End Main section */}
                    </div>
                    <div className="footer text-center">
                      <a onClick={onCancel} className="btn btn-primary btn-link btn-wd btn-lg">Cancel</a>
                      <button onClick={onSubmit} className="btn btn-primary btn-link btn-wd btn-lg">Confirm</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
const mapStateToProps = state =>{
  return {
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser : (email)=>{
      dispatch(actGetUserByEmail(email))
    },
    postCheckToken : (data)=>{
      dispatch(actPostCheckToken(data))
    },
    postChangePassword : (data) => {
      dispatch(actPostChangePassword(data))
    },
    resetStateUser : ()=>{
      dispatch(actResetStateUser())
    }
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ChangePassword));
