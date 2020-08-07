import React,{useEffect,useState} from 'react';
import { connect } from 'react-redux';
import {actGetListTransaction} from '../../store/actions/transaction';
import {actGetAccount} from '../../store/actions/account';

function ProfileRight(props) {
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("currentUser"));
        props.getListTransaction(user.id);
        props.getAccount(user.id);
    },[])
    const listTransaction = props.transaction.listTransaction;
    const {data} =listTransaction;
    const account = props.account;
    console.log(account)
    const showListSaving = (listSaving,catelogy) => {
        console.log(listSaving)
        var result = null;
        if(catelogy===1)
        {
            if(listSaving && listSaving.length>0)
            {
                
                result = listSaving.map((item,index)=>{
                    if(item.accountNumber===account.accountNumber || item.beneficiaryAccount===account.accountNumber)
                    {
                        return (
                        
                            <div className="row">
                            <div className="col-md-2">
                            <p className="h4">****{ item.transactionID.slice(-7, -1) }</p>
                            </div>
                            <div className="col-md-2">
                            <p className="h4">
                                {item.amount}
                                <small className="muted-text">VND</small>
                            </p>
                            </div>
                            <div className="col-md-3">
                            <p className="h4">{item.accountNumber}</p>
                            </div>
                            <div className="col-md-3">
                            <p className="h4">{item.beneficiaryAccount }</p>
                            </div>
                            <div className="col-md-2">
                            <p className="h4">{ new Date(item.createdAt).toUTCString()}</p>
                            </div>
                        </div>
    
                        )
                    }
                    
                })
            }
        }
        if(catelogy===2)
        {
            if(listSaving && listSaving.length>0)
            {
                result = listSaving.map((item,index)=>{
                    if(item.accountNumber===account.accountNumber)
                    {
                        return (
                        
                            <div className="row">
                            <div className="col-md-2">
                            <p className="h4">****{ item.transactionID.slice(-7, -1) }</p>
                            </div>
                            <div className="col-md-2">
                            <p className="h4">
                                {item.amount}
                                <small className="muted-text">VND</small>
                            </p>
                            </div>
                            <div className="col-md-3">
                            <p className="h4">{item.accountNumber}</p>
                            </div>
                            <div className="col-md-3">
                            <p className="h4">{item.beneficiaryAccount }</p>
                            </div>
                            <div className="col-md-2">
                            <p className="h4">{ new Date(item.createdAt).toUTCString()}</p>
                            </div>
                        </div>
    
                        )
                    }
                    
                })
            }
        }
        if(catelogy===3)
        {
            if(listSaving && listSaving.length>0)
            {
                result = listSaving.map((item,index)=>{
                    if(item.beneficiaryAccount===account.accountNumber)
                    {
                        return (
                        
                            <div className="row">
                            <div className="col-md-2">
                            <p className="h4">****{ item.transactionID.slice(-7, -1) }</p>
                            </div>
                            <div className="col-md-2">
                            <p className="h4">
                                {item.amount}
                                <small className="muted-text">VND</small>
                            </p>
                            </div>
                            <div className="col-md-3">
                            <p className="h4">{item.accountNumber}</p>
                            </div>
                            <div className="col-md-3">
                            <p className="h4">{item.beneficiaryAccount }</p>
                            </div>
                            <div className="col-md-2">
                            <p className="h4">{ new Date(item.createdAt).toUTCString()}</p>
                            </div>
                        </div>
    
                        )
                    }
                    
                })
            }
        }
        

        return result;
    }


   
    return (

            <div className="col-lg-6">
        <div className="card card-nav-tabs">
          <div className="card-header card-header-primary">
            {/* colors: "header-primary", "header-info", "header-success", "header-warning", "header-danger" */}
            <div className="nav-tabs-navigation">
              <div className="nav-tabs-wrapper">
                <ul className="nav nav-tabs" data-tabs="tabs">
                  <li className="nav-item">
                    <a className="nav-link active" href="#all" data-toggle="tab">
                      <i className="material-icons">dehaze</i>
                      All
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#send" data-toggle="tab">
                      <i className="material-icons">south_west</i>
                      Send
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#recive" data-toggle="tab">
                      <i className="material-icons">north_east</i>
                      Recive
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="tab-content">
              <div className="tab-pane active" id="all">
                <div className="row">
                  <div className="col-md-2">
                    <label>ID</label>
                  </div>
                  <div className="col-md-2">
                    <label>Amount</label>
                  </div>
                  <div className="col-md-3">
                    <label>From</label>
                  </div>
                  <div className="col-md-3">
                    <label>To</label>
                  </div>
                  <div className="col-md-2">
                    <label>Time</label>
                  </div>
                </div>
                {/* For here*/}
                {showListSaving(data,1)}
                {/* Divider */}

                

                {/* End For here*/}

              </div>
              <div className="tab-pane" id="send">
                <div className="row">
                  <div className="col-md-3">
                    <label>ID</label>
                  </div>
                  <div className="col-md-3">
                    <label>Amount</label>
                  </div>
                  <div className="col-md-3">
                    <label>To</label>
                  </div>
                  <div className="col-md-3">
                    <label>Time</label>
                  </div>
                </div>
                {/* For here*/}
                {showListSaving(data,2)}
                {/* End For here*/}
              </div>
              <div className="tab-pane" id="recive">
                <div className="row">
                  <div className="col-md-3">
                    <label>ID</label>
                  </div>
                  <div className="col-md-3">
                    <label>Amount</label>
                  </div>
                  <div className="col-md-3">
                    <label>From</label>
                  </div>
                  <div className="col-md-3">
                    <label>Time</label>
                  </div>
                </div>
                {/* For here*/}
                {showListSaving(data,3)}
                {/* End For here*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

const mapStateToProps = state =>{
    return {
        transaction : state.transaction,
        account : state.account,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getListTransaction : (userId) => {
            dispatch(actGetListTransaction(userId))
        },
        getAccount : (userId) => {
            dispatch(actGetAccount(userId));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProfileRight);
