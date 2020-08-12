import React ,{useState} from 'react';
import {connect} from 'react-redux';
import {actAcceptUser,actDenytUser} from '../../../store/actions/admin';

function ImageVerify(props) {
    const {idCardPhoto,userId} = props;

    const onAccept = e => {
      props.accept(userId);
    }

    const onDeny = e => {
      props.deny(userId);
    }

    return (
        <div>
            <div className="row justify-content-center my-5">
                <div className="card mb-3">
                    <img src={idCardPhoto} className="card-img-top" alt="No Photo" />
                    <div className="card-body">
                        <a onClick={onAccept} className="btn btn-primary">Accept</a>
                        <a onClick={onDeny} className="btn btn-danger">Deny</a>
                </div>
            </div>
          </div>

  
          <div className="row my-3 justify-content-end">
            <div className="col-4">
              <a className="btn btn-light" href="/admin/users" role="button">Back</a>
            </div>
          </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => {
  return {
    accept : (userId)=>{
      dispatch(actAcceptUser(userId))
    },
    deny : (userId) => {
      dispatch(actDenytUser(userId))
    },
  }
}
export default connect(null,mapDispatchToProps)(ImageVerify)
