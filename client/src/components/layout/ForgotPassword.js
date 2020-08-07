import React ,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {actForgotPassword} from '../../store/actions/login';

function ForgotPassword(props) {
    const [username,setUsername] = useState('');
    const [error , setError ] =useState('');

    useEffect(()=>{
        if(props.user.successForgotPassword===true){
            setError("Vui long kiem tra Email")
        }
        if(props.user.successForgotPassword===false){
            setError("Username khong ton tai")
        }

    },[props.user])
    const onChange = (e)=>{
        setUsername(e.currentTarget.value)
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        if(username===''){
            setError("Ban chua dien thong tin")
        }
        else
        {
            props.postForgotPassword(username)
        }
        
    }
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
    return (

            <div className="login-page sidebar-collapse">

        <div className="page-header header-filter" style={{backgroundImage: 'url("../assets/img/bg7.jpg")', backgroundSize: 'cover', backgroundPosition: 'top center'}}>
        
          <div className="container">
          {error!==''?showMessage(error):''}
            <div className="row">
                
              <div className="col-lg-4 col-md-6 ml-auto mr-auto">
              
                <div className="card">
                  <form className="form" method="POST">
                    <div className="card-header card-header-primary text-center">
                      <h4 className="card-title mb-2">Find your account</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12 text-center">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="material-icons">account_circle</i>
                              </span>
                            </div>
                            <input onChange={onChange} autofocus type="text" id="data" name="data" className="form-control" placeholder="Email/Username/CardID" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer" style={{display: 'inherit'}}>
                      <div className="row">
                        <div className="col-12 text-center">
                          <button onClick={onSubmit} className="btn btn-primary btn-link btn-wd btn-lg">Find</button>
                        </div>
                      </div>
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
        user : state.user,
    }
    
}
const mapDispatchToProps = dispatch => {
    return {
        postForgotPassword : (username) =>{
            dispatch(actForgotPassword(username))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ForgotPassword)
