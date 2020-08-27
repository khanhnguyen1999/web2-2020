import React,{useState,useEffect} from 'react';
import {connect}from 'react-redux';
import {Redirect} from 'react-router-dom'
import{actFetchSavingAccount,actPostInformationAddSaving} from '../../../store/actions/savingAccount';
import {inMoney} from '../../../utils/fc';
import TextField from '@material-ui/core/Button';

function addSaving(props) {

    const [user,setUser] = useState();
    const [account,setAccount] = useState();
    const [savingAccount,setSavingAccount] = useState();
    const [error,setError] = useState([]);

    const [depositTerm,setDepositTerm] = useState(1);
    const [amount,setAmount] = useState();
    const [type,setType] =useState(1);

    useEffect(()=>{
        setUser(props.user.user)
        console.log(props.user)
        props.fetchInformation(props.user.user.id)
    },[])

    
    useEffect(()=>{
        const {savingAccount} = props;
        setAccount(props.savingAccount.account);
        setSavingAccount(props.savingAccount.savingAccount)
        // setError(props.savingAccount.errors)
        console.log(props.savingAccount.errors)
        let arrError =[];
        if(Object.keys(savingAccount.errors).length > 0)
        {
            for (var key in savingAccount.errors.errors) 
            {
                arrError.push(savingAccount.errors.errors[key].msg)
            }
        }
        setError(arrError)
    },[props.savingAccount])

    const onChangeDepositTerm = (e)=>{
        setDepositTerm(e.currentTarget.value)
    }
    const onChangeAmount = (e)=>{
        setAmount(e.currentTarget.value)
    }
    const onChangeType = (e)=>{
        setType(e.currentTarget.value)
    }
    
    const sumMountSaving = (savingAccount)=>{
        console.log(savingAccount)
        var result=0;
        if(savingAccount && savingAccount.length>0)
        {
            savingAccount.map((saving,index)=>{
                result = result + saving.fund;
            })
        }
        return result;
    }
    const onCancel = ()=>{
        props.history.push('/savingAccount')
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        const userId = account.userId;
        setError([])
        if (!amount || amount==="") {
            let aa ='vui long dien day du thong tin';
            setError([aa])
            console.log(error)
        }
        if(amount)
            {
                if(amount < 1000000)
                {
                    let er ='so gui toi thieu 1.000.000 VND';
                    setError([er])
                }
                else
                {
                    setError([])
                    const accountNumber = account.accountNumber;
                    const variables = {
                        amount,
                        depositTerm,
                        type,
                        accountNumber:accountNumber,
                        user,
                    }
                    props.postInformationAddSaving(variables)
                }
            }
    }
    const showError = (ListError)=>{
        let result = null;
        console.log(ListError)
        if(ListError.length > 0 )
        {
            result = ListError.map((error,index)=>{
                return <div key={index} className="alert alert-success mt-3" role="alert">
                <i style={{color: "red"}} className="fas fa-exclamation-triangle pr-2"></i>
                    {error}
                </div> 
            })
        }
        return result;
    }
    const {movedOn} = props.savingAccount
    console.log(movedOn)
    if(movedOn===true)
    {
        return <Redirect to="/addsaving/verify"/>
    }
    return (
        <div className="page-header header-filter" style={{backgroundImage: 'url("../assets/img/bg7.jpg")', backgroundSize: 'cover', backgroundPosition: 'top center'}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 ml-auto mr-auto">
              <div className="card card-login ">
                <form className="form" method="POST">
                  <div className="card-header card-header-primary text-center">
                    <h4 className="card-title">Add Saving Account</h4>
                    <div className="social-line">
                      <div className="row m-3">
                        <div className="col-lg-4 col-md-12">
                          <div className="row justify-content-center">
                            <div className="col-12">
                              <p className="card-text">
                                <b> Account Number: </b>

                              </p>
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-12">
                              <p style={{color :"white"}} className="class-text">
                              {account?account.accountNumber:''}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                          <div className="row justify-content-center">
                            <div className="col-12">
                              <p className="card-text">
                                <b>Balance </b>
                              </p>
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-12">
                              <p style={{color :"white"}} className="class-text">
                              {account?inMoney(account.balance):0} 
                              <small style={{color:"yellow"}} className="muted-text">&nbsp;  VND</small>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                          <div className="row justify-content-center">
                            <div className="col-12">
                              <p  className="card-text">
                                <b>Total </b>
                              </p>
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-12">
                              <p style={{color :"white"}} className="class-text">
                              {savingAccount?inMoney(sumMountSaving(savingAccount)):''}
                                <small style={{color:"yellow"}} className="muted-text">&nbsp;  VND</small>
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
                  
                    <div className="mt-4 p-4">

                    <div className="form-group mb-3 ">
              <label htmlFor="formGroupExampleInput">Kỳ hạn gửi</label>
              <select onChange={onChangeDepositTerm} name="depositTerm" className="custom-select" id="inputGroupSelect02">
                <option selected value={1}>1 Month</option>
                <option value={3}>3 Month</option>
                <option value={6}>6 Month</option>
                <option value={9}>9 Month</option>
                <option value={12}>12 Month</option>
                <option value={24}>24 Month</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Số tiền gửi</label>
              <input onChange={onChangeAmount} name="amountSaving" type="number" className="form-control" id="formGroupExampleInput2" placeholder="Tối thiểu 1.000.000" />
            </div>

            <div className="form-group mb-3 ">
              <label htmlFor="formGroupExampleInput">Hình thức trả lãi</label>
              <select onChange={onChangeType} name="HinhThuc" className="custom-select" id="inputGroupSelect02">
                <option selected value={1}>Lãi nhập gốc</option>
                <option value={2}>Lãi trả vào TK tiền gửi thanh toán khi đến hạn trả lãi</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Ghi chú</label>
              <p className="ghichu">Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. <br />
               
              </p>
            </div>
            <div className="form-group  text-right">
              <a  onClick={onCancel} type="button" className="btn btn-primary  mr-3">Hủy</a>
              <button onClick={onSubmit} type="submit" className="btn btn-primary">Tiếp tục</button>
            </div><br />
                    </div>

                  {/* End Main section */}

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
        savingAccount : state.savingAccount,
        user : state.user,
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        fetchInformation :(userId)=> dispatch(actFetchSavingAccount(userId)),
        postInformationAddSaving : (data)=>{
            dispatch(actPostInformationAddSaving(data))
        },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(addSaving);
