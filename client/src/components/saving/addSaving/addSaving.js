import React,{useState,useEffect} from 'react';
import {connect}from 'react-redux';
import {Redirect} from 'react-router-dom'
import{actFetchSavingAccount,actPostInformationAddSaving} from '../../../store/actions/savingAccount';
import {inMoney} from '../../../utils/fc'

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
                        accountNumber,
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

        <div>
            <section className="blog_part section_padding section_transaction">
        <div className="container container_transaction">
          <div className=" p-4 transaction_profile">
            <div className="task-profile">
              <p><i className="fas fa-address-card" />Số tài khoản : <span>{account?account.accountNumber:''}</span></p>
            </div>
            <div className="task-profile">
              <p><i className="fas fa-dollar-sign" />Số dư : <span>{account?inMoney(account.balance):0} VND</span></p>
            </div>
            <div className="task-profile">
              <p><i className="fas fa-dollar-sign" />Số dư TKTK: <span>{savingAccount?inMoney(sumMountSaving(savingAccount)):''} VND</span></p>
            </div>
          </div>
          {error?showError(error):''}
          <form method="POST" className="mt-4">
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
              <input onChange={onChangeAmount} name="amountSaving" type="number" className="form-control" id="formGroupExampleInput2" placeholder="Tối thiểu 3.000.000" />
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
                Donec sed odio operae, eu vulputate felis rhoncus.<br />
                Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis piros Afros. Petierunt uti sibi concilium totius Galliae in diem certam indicere. <br />
              </p>
            </div>
            <div className="form-group  text-right">
              <a  onClick={onCancel} type="button" className="btn btn-primary  mr-3">Hủy</a>
              <button onClick={onSubmit} type="submit" className="btn btn-primary">Tiếp tục</button>
            </div><br />
          </form>
        </div>
      </section>
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
