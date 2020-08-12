import React,{useState} from 'react';
import {connect} from 'react-redux';
import Alert from '@material-ui/lab/Alert';

import {actEditUserProfile} from '../../../store/actions/admin';
import account from '../../../store/reducers/account';
import user from '../../../store/reducers/user';

function EditProfile(props) {
    const{user} = props;

    const [email,setEmail] =useState(user.email);
    const [username,setUsername] =useState(user.username);
    const [displayName,setDisplayName] =useState(user.displayName);
    const [cardId,setCardId] =useState(user.cardId);

    const [success,setSuccess] = useState();
    const [error,setError] = useState();


    const onChangeEmail = e => {
        setEmail(e.currentTarget.value);
    }

    const onChangeUsername = e =>{
        setUsername(e.currentTarget.value);
    }

    const onChangeDisplayName =e => {
        setDisplayName(e.currentTarget.value)
    }

    const onChangeCardId = e => {
        setCardId(e.currentTarget.value)
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        if(email==='' || username==='' || displayName==='' || cardId===''||
        !email || !username || !displayName || !cardId){
            setError("Vui long dien day du thong tin")
        }
        else{
            const data ={
                email,
                username,
                displayName,
                cardId,
            }
            console.log(data)
            props.editUserProfile(user.id,data)
            setSuccess(true)
        }
    }

    const showError = (error)=>{
        return (
            <Alert severity="info">{error}</Alert>
        )
    }
    if(success==true)
    {
        return (
            <Alert variant="filled" severity="success">
                Cap nhat thanh cong 
            </Alert>
        )
    }
    return (
        <div className="row justify-content-center ">
        <div className="col-md-10">
          {/* Users */}
         
          <div className="row justify-content-center ">
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                    {error?showError(error):''}
                  <form method="POST">
                    <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <input onChange={onChangeEmail} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" defaultValue={user?user.email:''} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input onChange={onChangeUsername} type="text" className="form-control" id="username" name="username" defaultValue={user?user.username:''} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="displayName">Display name</label>
                      <input onChange={onChangeDisplayName} type="text" className="form-control" id="displayName" name="displayName" defaultValue={user?user.displayName:''} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cardId">Card ID</label>
                      <input onChange={onChangeCardId} type="number" className="form-control" id="cardId" name="cardId" defaultValue={user?user.cardId?user.cardId:'':''} />
                    </div>
                    
                    <button onClick={onSubmit} className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return{
        editUserProfile : (userId,data)=>{
            dispatch(actEditUserProfile(userId,data))
        }
    }
}
export default connect(null,mapDispatchToProps)(EditProfile)
