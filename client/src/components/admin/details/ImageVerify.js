import React ,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {actAcceptUser,actDenytUser} from '../../../store/actions/admin';
import Alert from '@material-ui/lab/Alert';

function ImageVerify(props) {
    const {idCardPhoto,userId,account} = props;
    const [success,setSuccess] =useState();

    useEffect(()=>{
      setSuccess(null)
    },[props.date])
    const onAccept = e => {
      props.accept(userId);
      setSuccess(true);
    }

    const onDeny = e => {
      props.deny(userId);
      
    }

    const showAccept = (status) => {
      console.log(status)
      if(status==="PENDING"){
        return <a onClick={onAccept} className="btn btn-primary">Accept</a>
      }

      return ;
    }
    if(success===true){
      return (
        <Alert variant="filled" severity="success">
            Cap nhat thanh cong 
        </Alert>
      )
    }
    return (
        <div>
            <div className="row justify-content-center my-5">
                <div className="card mb-3">
                    <img src={idCardPhoto} className="card-img-top" alt="No Photo" />
                    <div className="card-body">
                       
                        
                        {showAccept(account.status)}
                        <a onClick={onDeny} className="btn btn-danger">Deny</a>
                </div>
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
