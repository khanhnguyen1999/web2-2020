import React ,{useEffect}from 'react';
import { withRouter,Redirect } from "react-router-dom";
import {connect} from 'react-redux';

import {actGetAllUser} from '../../store/actions/admin';
function Admin1(props) {


    useEffect(()=>{
        console.log("admin1111")
    })
    
    const onGetIn =(e)=>{
      e.preventDefault();
      console.log("get");
      props.history.push("/admin/management");
    }
    const onGetInUser = (e)=> {
      e.preventDefault();
      console.log("get");
      // props.getAllUser();
      props.history.push("/admin/users")
    }

    return (
      <div className="row justify-content-center my-5">
        <div className="col-md-6">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card text-center shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">User Management</h5>
                  <p className="card-text">Find user, lock account and more.</p>
                  <button onClick={onGetInUser} className="btn btn-light">Get in</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card text-center shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">Account Management</h5>
                  <p className="card-text">Authorization user information.</p>
                  <button onClick={onGetIn} className="btn btn-light">Get in</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUser : ()=>{
      dispatch(actGetAllUser());
    }
  }
}
export default withRouter(connect(null,mapDispatchToProps)(Admin1))
