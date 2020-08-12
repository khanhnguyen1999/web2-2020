import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import Alert from '@material-ui/lab/Alert';

import {actEditUserProfile,actResetAdmin} from '../../../store/actions/admin';
import account from '../../../store/reducers/account';
import user from '../../../store/reducers/user';

function EditProfile(props) {
    const{user} = props;

    const [email,setEmail] =useState(user.email);
    const [username,setUsername] =useState(user.username);
    const [displayName,setDisplayName] =useState(user.displayName);
    const [cardId,setCardId] =useState(user.cardId);

    const [success,setSuccess] = useState();
    const [listError,setListError] = useState();
    const [error,setError] = useState();

    useEffect(()=>{
      const {errorEditProfile} = props.admin;
      if(errorEditProfile){
        setListError(errorEditProfile);
      }
      if(errorEditProfile === null){
        setListError(null);
      }
    },[props.admin])

    useEffect(()=>{
      props.resetAdmin();
      return ()=>{
        props.resetAdmin();
      }
    },[])
    useEffect(()=>{
      props.resetAdmin();
    },[props.date])

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
            
        }
    }

    const showError = (error)=>{
        return (
            <Alert severity="info">{error}</Alert>
        )
    }

    const showListError = (ListError) => {
      let result = null;
      if(ListError.length > 0 )
      {
          result = ListError.map((error,index)=>{
            console.log(error.msg)
            return <Alert  severity="info">{error.msg}</Alert>

          })
      }
      return result;
  }
    if(listError===true)
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

                  {listError?showListError(listError):''}
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
const mapStateToProps = state => {
   return {
     admin : state.admin,
   }
}
const mapDispatchToProps = dispatch => {
    return{
        editUserProfile : (userId,data)=>{
            dispatch(actEditUserProfile(userId,data))
        },
        resetAdmin : () => {
          dispatch(actResetAdmin())
        },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EditProfile)
