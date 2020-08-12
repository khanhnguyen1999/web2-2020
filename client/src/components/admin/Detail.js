import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {inMoney} from '../../utils/fc';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom'
import { withRouter } from "react-router-dom";

import {actGetUserTransaction ,actLockUser} from '../../store/actions/admin';
import callApi from '../../utils/apiCaller';


import Transaction from './details/Transaction';
import Tranfer from './details/Tranfer';
import EditProfile from './details/EditProfile';
import ImageVerify from './details/ImageVerify';
function Detail(props) {
    const [listUser,setListUser] = useState();
    const [account,setAccount] = useState();
    const [user,setUser] = useState();
    const [chose,setChose] = useState();
    const [random,setRandom] = useState();
    const [listTransaction,setListTransaction] = useState();
    const userId = props.match.params.id;

    useEffect(()=>{
        const {listUser} = props.admin
        setListUser(listUser)  
        if(listUser.length>0) 
        {
            listUser.map(item => {
                if(parseInt(userId)===item.userId)
                {
                    setAccount(item);
                    const {user} = item;
                    setUser(user)
                }
            })
        }
    },[])

    useEffect(()=>{
        const { accountUser}= props.admin;
        if(accountUser){
            const {user} = accountUser;
            setUser(user);
            setAccount(accountUser);
        }
    },[props.admin])

    const showButton = (status) => {
        if(status==="LOCKED"){
            return(
                <div>
                <button onClick={onClickLock} className="card-link btn btn-danger">Unlock</button>
                <button onClick={onClickTransaction} className="card-link btn btn-info">Transaction</button>
                    <button onClick={onClickEditProfile} className="card-link btn btn-warning">Modify</button>
                    </div>
            )
        }else if(status==="ACTIVE"){
            return(
                <div>
                    <button onClick={onClickLock} className="card-link btn btn-danger">Lock</button>
                    <button onClick={onClickTransfer} className="card-link btn btn-primary">Transfer</button>
                    <button onClick={onClickTransaction} className="card-link btn btn-info">Transaction</button>
                    <button onClick={onClickEditProfile} className="card-link btn btn-warning">Modify</button>
                </div>
            )
        }else if(status==="UNVERIFIED"){
            return ''
        }else if(status==="PENDING" && user.idCardPhoto)
        {
           return <button onClick={onClickVerify} className="card-link btn btn-warning">Verify</button>
        }
        return '';
    
    }
    const onClickTransaction = (e)=>{
        setChose(null)
        setChose("transaction")
        callApi(`admin/users/${user.id}`,"GET",'')
        .then(res => {
            console.log(res.data)
            setListTransaction(res.data)
        })
    }

    const onClickTransfer = (e)=>{
        setListTransaction(null)
        setChose("tranfer")
    }

    const onClickEditProfile = (e)=>{
        console.log("chaa")
        setRandom(Math.random())
        setListTransaction(null)
        setChose("editProfile")
    }

    const onClickLock = e => {
        setListTransaction(null)
        setChose("lock")
        props.lockUser(userId)
    }

    const onClickListUser = (e)=>{
        props.history.goBack();
    }

    const onClickVerify = (e)=>{
        setListTransaction(null)
        setChose("verify")
    }

    const onClickViewPhoto = e => {
        setListTransaction(null)
        setChose("verify")
    }


    const showChose = (chose,random)=>{
        if(chose==="tranfer"){
            return <Tranfer user={user} />
        }else if(chose==="editProfile"){
            return <EditProfile date={random} user={user}/>
        }else if(chose==="verify"){
           
            return <ImageVerify idCardPhoto = {user.idCardPhoto} userId={user.id}/>
        }
        return '';
    }
    if(window.location.pathname=="/admin"){
        return <Redirect to="/admin" />
    }
    return (
        <div className="row justify-content-center my-5">
           
        <div className="col-md-10">
            <Button  variant="outlined" color="primary" onClick={onClickListUser}>
                List User   
            </Button>
          {/* Users */}
            {account&&user&&listUser ?
            <div className="row justify-content-center ">
                <div className="col-10">
                <div className="card">
                    <div className="card-body">
                    <h5 className="card-title">{user?user.displayName:''}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{user?user.username:''}</h6>
                    <p className="card-text">{user?user.email:''}</p>
                    <p className="card-text">Balance: {account?inMoney(account.balance):''} VND</p>
                    <p className="card-text">Status: {account?account.accountNumber:''}</p>
                    <p className="card-text">CardId: {user?user.cardId?user.cardId:'Not cardId':''}</p>
                    <p className="card-text">IdCardPhoto: {user?user.idCardPhoto?<Button variant="contained" onClick={onClickViewPhoto}>View</Button>:'Not Photo':''}</p>
    
                    {showButton(account.status)}

                    </div>
                </div>
                </div>
            </div>
            :''}

            {listTransaction? <Transaction listTransaction={listTransaction} account={account} /> :''}
            {chose?showChose(chose,random):''}
          {/* If user is needing verification */}
  
          {/* <div className="row justify-content-center my-5">
            <div className="card mb-3">
              <img src={user?user.idCardPhoto?user.idCardPhoto:'':''} className="card-img-top" alt="No Photo" />
              <div className="card-body">
                <a href="/admin/users/<%= user.id %>/verify-accept" className="btn btn-primary">Accept</a>
                <a href="/admin/users/<%= user.id %>/verify-deny" className="btn btn-danger">Deny</a>
              </div>
            </div>
          </div>

  
          <div className="row my-3 justify-content-end">
            <div className="col-4">
              <a className="btn btn-light" href="/admin/users" role="button">Back</a>
            </div>
          </div> */}
          {/* End Users */}
        </div>
      </div>
    )
}
const mapStateToProps = state => {
    return {
        admin : state.admin,
    }
}
const mapDitchToProps = dispatch => {
    return {
        getUserTransaction : (userId)=>{
            dispatch(actGetUserTransaction(userId))
        },
        lockUser : (userId) => {
            dispatch(actLockUser(userId))
        }
    }
}
export default withRouter(connect(mapStateToProps,mapDitchToProps)(Detail))
