import React,{useEffect,useState,useRef} from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import {actGetInformation,actPostInformation,actSwitchMoved} from '../../store/actions/transaction'
import * as Config from '../../constants/Config'


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
    const showError = (ListError)=>{
        let result = null;
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
    const showListBank = (ListBank , selectBank)=>{
        let result = null;
        if(ListBank.length >0)
        {
            result = ListBank.map((bank,index)=>{
                if(bank.nameBank===selectBank)
                {
                    return(
                        <option key={index} selected value={bank.bin}>{bank.nameBank}</option>
                    )
                }
                else{
                    return(
                        <option key={index}  value={bank.bin}>{bank.nameBank}</option>
                    )
                }
                
            })
        }
        return result;
    }
    const {movedOn} = props.ifTransaction
    console.log(movedOn)
    if(movedOn===true)
    {
        return <Redirect to="/transaction/verify"/>
    }
    return (
        
        <div>
            <section className="blog_part section_padding section_transaction">
                <div className="container container_transaction">
                <div className=" p-4 transaction_profile">
                    <div className="task-profile">
                    <p><i className="fas fa-user" />Chủ tài khoản : <span>{user.displayName}</span></p>
                    </div>
                    <div className="task-profile">
                    <p><i className="fas fa-address-card" />Số tài khoản : <span>{account?account.accountNumber:''}</span></p>
                    </div>
                    <div className="task-profile">
                    <p><i className="fas fa-dollar-sign" />Số dư : <span>{account?account.balance:''} VND</span></p>
                    </div>
                </div>
                {error? showError(error):''}
                <form method="POST" className="mt-4">
                    <div className="form-group mb-3 ">
                    <label htmlFor="formGroupExampleInput">Ngân hàng</label>
                    <select onChange={onBankChange} name="bin" className="custom-select" id="inputGroupSelect02">
                        {listBank? showListBank(listBank,binBank):''}
                    </select>
                    </div>
                    <div className="form-group">
                    <label htmlFor="formGroupExampleInput">Số tài khoản hưởng thụ</label>
                    <input onChange={onBeneficiaryChange} value={beneficiaryAccountNumber?beneficiaryAccountNumber:''} name="beneficiaryAccountNumber" type="number" className="form-control" id="formGroupExampleInput" placeholder="VD : 0123456789" />
                    </div>
                    <div className="form-group">
                    <label htmlFor="amount">Số tiền</label>
                    <input onChange={onAmountChange} value={amount?amount:''} name="amount" type="number" className="form-control" id="amount" placeholder="50.000 - 5.000.000" />
                    </div>
                    <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Nội dung</label>
                    <textarea onChange={onContentChange} name="content" className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                    </div>
                    <div className="form-group  text-right">
                    <button type="button" className="btn btn-primary  mr-3">Hủy</button>
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
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(transaction)
