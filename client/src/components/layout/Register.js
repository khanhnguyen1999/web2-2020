import React ,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {actPostRegister,actResetStateUser} from '../../store/actions/login';
import Error from '../message/Error';
import Message from '../message/Message';

function Register(props) {
    const [displayName,setDisplayName] = useState('');
    const [username,setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [error,setError] = useState();
    const [listError,setListError] = useState();
    const [success,setSuccess] = useState();

    useEffect(()=>{
        const{user} =props;
        console.log(user.successPostRegister)
        if(user.successPostRegister===true){
            setSuccess(true);

        }
        else{
            setSuccess(false);
            setListError(user.errorPostRegister)
        }
    },[props.user])
    useEffect(()=>{
        return ()=>{
            console.log("reset user")
            props.resetUser();
        }
    },[])

    const onChangeDisplayName = (e)=> {
        setDisplayName(e.currentTarget.value)
    }
    const onChangeUserName = (e)=> {
        setUserName(e.currentTarget.value)
    }
    const onChangeEmail = (e)=> {
        setEmail(e.currentTarget.value)
    }
    const onChangePassword = (e)=> {
        setPassword(e.currentTarget.value)
    }
    const onChangeConfirm = (e)=> {
        setConfirmPassword(e.currentTarget.value)
    }

    const onSubmit = e => {
        e.preventDefault();
        if(displayName===""||username===""||email===""||password===""||confirmPassword==="")
        {
            setError("Vui long dien day du tong tin")
        }
        else
        {
            props.postRegister({displayName,username,email,password,confirmPassword})
        }
    }

    const showError = (ListError)=>{
        let result = null;
        console.log(ListError)
        if(ListError.length > 0 )
        {
            result = ListError.map((error,index)=>{
              console.log(error)
                return <Error msg={error.msg}/>
    
            })
        }
        return result;
    }
    if(success===true){
        return <Message title ={"Register"} message={"Tao tai khoan thanh cong"} to={"/login"} success={true}/>
    }
    return (
        <div className="page-header header-filter" style={{backgroundImage: 'url("../assets/img/bg7.jpg")', backgroundSize: 'cover', backgroundPosition: 'top center'}}>
        <div className="container">
            {error?<Error msg={error}/>:''}
            {listError?showError(listError):''}
          <div className="row">
            <div className="col-lg-4 col-md-6 ml-auto mr-auto">
              <div className="card card-login">
                <form className="form" method="POST">
                  <div className="card-header card-header-primary text-center">
                    <h4 className="card-title mb-2">Register</h4>
                  </div>
                  <div className="card-body">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="material-icons">account_circle</i>
                        </span>
                      </div>
                      <input onChange={onChangeDisplayName} type="text" name="displayName" className="form-control" placeholder="Your fullname..." />
                    </div>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="material-icons">account_circle</i>
                        </span>
                      </div>
                      <input onChange={onChangeUserName} type="text" name="username" className="form-control" placeholder="Username..." />
                    </div>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="material-icons">email</i>
                        </span>
                      </div>
                      <input onChange={onChangeEmail} type="text" name="email" className="form-control" placeholder="Email..." />
                    </div>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="material-icons">lock_outline</i>
                        </span>
                      </div>
                      <input onChange={onChangePassword} type="password" name="password" className="form-control" placeholder="Password..." />
                    </div>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="material-icons">lock_outline</i>
                        </span>
                      </div>
                      <input onChange={onChangeConfirm} type="password" name="confirmPassword" className="form-control" placeholder="Confirm password..." />
                    </div>
                  </div>
                  <div className="card-footer text-center" style={{display: 'inherit'}}>
                    <button onClick={onSubmit} className="btn btn-primary btn-link btn-wd btn-lg">Sign Up</button>
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
        user:state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        postRegister : (data)=> {
            dispatch(actPostRegister(data))
        },
        resetUser : ()=>{
            dispatch(actResetStateUser())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Register)
