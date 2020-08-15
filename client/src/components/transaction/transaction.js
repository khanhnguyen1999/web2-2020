import React,{useEffect,useState,useRef} from 'react';
import { connect } from 'react-redux';
import {Redirect ,withRouter} from 'react-router-dom';
import {actGetInformation,actPostInformation,actSwitchMoved} from '../../store/actions/transaction'
import {actGetAccount} from '../../store/actions/account';
import * as Config from '../../constants/Config'
import * as FC from '../../utils/fc';
import Message from '../message/Message';


function transaction(props) {
    
    const [user,setUser] = useState(props.user);
    const [account,setAccount] = useState(null);
    const [listBank,setListBank] = useState(null);
    const [error,setError] = useState([]);

    const [beneficiaryAccountNumber,setBeneficiary] = useState("");
    const [amount,setAmount] = useState();
    const [content,setContent] = useState("");
    const [binBank,setBinBank] = useState('9704');


    useEffect(()=>{
        const {user} = props.user;
        setUser(user);
        props.getInformation(user.id);
        props.getAccount(user.id);
    },[])

    useEffect(() => {
        const {ifTransaction} = props;
        setAccount(ifTransaction.account)
        setListBank(ifTransaction.listBank)
        let arrError =[];
        if(Object.keys(ifTransaction.errors).length > 0)
        {
            for (var key in ifTransaction.errors.errors) 
            {
                arrError.push(ifTransaction.errors.errors[key].msg)
            }
        }
        setError(arrError)
        if(props.ifTransaction.confirmInfo.displayName)
        {
            const { confirmInfo} = props.ifTransaction;
            setBeneficiary(confirmInfo.beneficiaryAccountNumber)
            setAmount(parseInt(confirmInfo.amount,10));
            setContent(confirmInfo.content);
            setBinBank(confirmInfo.bin);
        }
    }, [props.ifTransaction])

    const onBeneficiaryChange = (event) => {
        setBeneficiary(event.currentTarget.value)
    }
    const onAmountChange = (event) => {
        setAmount(parseInt(event.currentTarget.value,10))
    }
    const onBankChange = (event) => {
        setBinBank(event.currentTarget.value)
    }
    const onContentChange = (event) => {
        setContent(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError([])
        if (!beneficiaryAccountNumber || !amount ||beneficiaryAccountNumber==="" || amount==="") {
            let aa ='vui long dien day du thong tin';
            setError([aa])
            console.log(error)
        }
        else
        {
            if(amount)
            {
                if(amount < 100000)
                {
                    let er ='so tien chuyen toi thieu 100.000 VND';
                    setError([er])
                }
                else
                {
                    const ct  = content === '' ? account.accountNumber + " " + user.displayName + " tới " + beneficiaryAccountNumber + ' số tiền : ' +amount: content;
                    setError([])
                    setContent(ct);
                    const variables = {
                        beneficiaryAccountNumber,
                        amount,
                        content:ct,
                        binBank,
                        account,
                        user,
                    }
                    props.postInformation(variables)
                }
            }
        }
       
    }
    const onClickCancel =(e)=>{
      e.preventDefault();
     props.history.push("/home")
    }
    const showError = (ListError)=>{
        let result = null;
        if(ListError.length > 0 )
        {
            result = ListError.map((error,index)=>{
                return <div key={index} className="alert alert-danger">
                <div className="container">
                  <div className="alert-icon">
                    <i className="material-icons">error_outline</i>
                  </div>
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true"><i className="material-icons">clear</i></span>
                  </button>
                  <b>Error Alert:</b> {error}
                </div>
              </div>

            })
        }
        return result;
    }
    const showListBank = (ListBank , selectBank)=>{
        let result = null;
        if(ListBank.length >0)
        {
            result = ListBank.map((bank,index)=>{
                if(bank.bin===selectBank)
                {
                    return(
                        <option key={index} selected value={bank.bin}>{bank.bankName}</option>
                    )
                }
                else{
                    return(
                        <option key={index}  value={bank.bin}>{bank.bankName}</option>
                    )
                }
                
            })
        }
        return result;
    }
    const {movedOn} = props.ifTransaction
    console.log(movedOn)
    if(account)
    {
      if(account.status !== "ACTIVE")
      {
        console.log(account)
        const mess = FC.checkStatus(account.status);
        console.log(mess)
        return (

            <Message history = {props.history} title={"TK CHUA KICH HOAT"} message={mess} to={"/verify"}/>

         
        )
      }
     
    }
   
    if(movedOn===true)
    {
        return <Redirect to="/transaction/verify"/>
    }
    return (
        <div className="page-header header-filter" style={{backgroundImage: 'url("../assets/img/bg7.jpg")', backgroundSize: 'cover', backgroundPosition: 'top center'}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 ml-auto mr-auto">
              <div className="card card-login text-center">
                <form className="form" method="POST">
                  <div className="card-header card-header-primary text-center">
                    <h4 className="card-title">Transaction</h4>
                    <div className="social-line">
                      <div className="row m-3">
                        <div className="col-lg-4 col-md-12">
                          <div className="row justify-content-center">
                            <div className="col-12">
                              <p className="card-text">
                                <b>Account Owner: </b>

                              </p>
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-12">
                              <p className="class-text">
                                {user.displayName}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                          <div className="row justify-content-center">
                            <div className="col-12">
                              <p className="card-text">
                                <b>Account Number: </b>
                              </p>
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-12">
                              <p className="class-text">
                                {account?account.accountNumber:''}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                          <div className="row justify-content-center">
                            <div className="col-12">
                              <p className="card-text">
                                <b>Balance: </b>
                              </p>
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-12">
                              <p className="class-text">
                              {account?FC.inMoney(account.balance):''}
                                <small className="muted-text">&nbsp;  VND</small>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Notification */}
                  {error? showError(error):''}
                  

                  {/* End Notification */}
                  {/* Main section */}
                  <div className="card-body">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          {/* <i class="material-icons">face</i> */}
                          Beneficiary Bank
                        </span>
                      </div>
                      <select onChange={onBankChange} className="form-control" name="bin">
                        {listBank? showListBank(listBank,Config.BIN_BANK_ROOT):''}
                      </select>
                    </div>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          Beneficiary Account
                        </span>
                      </div>
                      <input onChange={onBeneficiaryChange}  value={beneficiaryAccountNumber?beneficiaryAccountNumber:''}name="beneficiaryAccountNumber" type="text" className="form-control" />
                    </div>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          Amount
                        </span>
                      </div>
                      <input onChange={onAmountChange} value={amount?amount:''} name="amount" type="number" className="form-control" placeholder="50.000 - 50.000.000" />
                    </div>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          Content
                        </span>
                      </div>
                      <textarea onChange={onContentChange} name="content" className="form-control" defaultValue={""} />
                    </div>
                  </div>
                  {/* End Main section */}
                  <div className="card-footer" style={{display: 'inherit'}}>
                    <div className="text-center">
                      <button onClick={onClickCancel} type className="btn btn-danger btn-link btn-wd btn-lg">Cancel</button>
                      <button onClick={onSubmit} className="btn btn-primary btn-link btn-wd btn-lg">Confirm</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
const mapStateToProps = state =>{
    return {
        user:state.user,
        ifTransaction:state.transaction
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        getInformation : (id)=>{
          dispatch(actGetInformation(id));
        },
        postInformation : (data)=>{
          dispatch(actPostInformation(data))
        },
        switchMovedOn : () => {
          dispatch(actSwitchMoved())
        },
        getAccount : (userId)=>{
          dispatch(actGetAccount(userId))
        },
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(transaction))
