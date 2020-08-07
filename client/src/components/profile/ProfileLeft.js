import React,{useState,useEffect} from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import { actGetAccount} from '../../store/actions/account'
import { use } from 'passport';


function ProfileLeft(props) {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [account , setAccount] = useState();
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("currentUser"));
        props.getAccount(user.id)
        setAccount(props.account)
        console.log(props.account)
    },[])
    useEffect(()=>{
        setAccount(props.account)
        console.log(props.account)
    },[props.account])
    
    const showStatus =(StatusUser)=>{
        var signal = "primary";
        if(StatusUser === "LOCKED" || StatusUser === "UNVERIFIED"){
            signal ="danger";
        }
        else if (StatusUser === "PENDING" || StatusUser === "DENY"){
            signal = "warning"
        }
        return signal;
    }
    return (
        
        <div className="col-lg-6">
        <div className="card card-nav-tabs">
          <div className="card-header card-header-info">
            Your Infomation
          </div>
          <div className="card-body">
            <form>
              <fieldset disabled>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" defaultValue={user?user.email:''} />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Password</label>
                    <input type="password" className="form-control" id="inputPassword4" defaultValue={user?user.password:''} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress">Username</label>
                  <input type="text" className="form-control" id="inputAddress" defaultValue={user?user.username:''}/>
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress2">Account Number</label>
                  <input type="text" className="form-control" id="inputAddress2" defaultValue={account?account.accountNumber:''} />
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress2">ID Card Number</label>
                  <input type="text" className="form-control" id="inputAddress2" defaultValue={user?user.cardId:''} />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="inputCity">Status</label>
                    <div className="row justify-content-start">
                     
                      <div className="col-lg-3">
                        <span className={`badge badge-pill badge-${showStatus(account?account.status:'')}`}>{account?account.status:''}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
              <div className="row justify-content-center">
                <div className="form-group col-md-3 text-center">
                  <Link to="/change-password" className="btn btn-primary btn-round">Change Password</Link>
                </div>
                <div className="form-group col-md-3 text-center">
                  <a href="/request-lock" className="btn btn-warning btn-round">Request Lock Account</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
}
const mapStateToProps = state => {
    return {
        account : state.account,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getAccount : (userId)=>{
            dispatch(actGetAccount(userId))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProfileLeft)
