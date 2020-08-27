import React,{useState} from 'react';
import Alert from '@material-ui/lab/Alert';
import {connect} from  'react-redux';

import {actAddUserAmount} from '../../../store/actions/admin';

function Tranfer(props) {
    const [amount,setAmount]= useState('');
    const [success,setSuccess]= useState();
    const [error,setError]= useState();

    const {user} = props;
    
    const showMessage = ()=>{
        return (
            <Alert variant="filled" severity="success">
                Nop tien thanh cong 
            </Alert>
        )
    }
    const showError = (error)=> {
        return (
            <Alert severity="info">{error}</Alert>
        )
    }
    const onSelect = (e)=>{
        setSuccess(false)
    }

    const onChangeAmount = (e) => {
        setAmount(e.currentTarget.value);
    }

    const onClick = (e) => {
        if(!amount || amount==='' || parseInt(amount)<100000)
        {
            setError("Amount > 100.000 VND")
        }
        else
        {
            e.preventDefault();
            props.addUserAmount(user.id,amount)
            setSuccess(true)
            setError(null)
            setAmount('')
        }
       
    }
    return (
        <div className="row justify-content-center ">
        <div className="col-md-10">
          {/* Users */}
          
          <div className="row justify-content-center ">
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                    {success===true?showMessage():''}
                    {error?showError(error):''}

                  <form method="POST">
                    <div className="form-group">
                      <label htmlFor="amount">Amount</label>
                      <input onChange={onChangeAmount} onSelect={onSelect} value={amount} type="number"  className="form-control" id="amount" name="amount" placeholder="100000 VND" />
                    </div>
                    <a className="btn btn-light" href="/admin/users/<%= user.id %>" role="button">Cancel</a>
                    <a onClick={onClick} className="btn btn-primary">Submit</a>
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
          
          {/* End Users */}
        </div>
      </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        addUserAmount : (userId,amount) => {
            dispatch(actAddUserAmount(userId,amount))
        }
    }
}
export default connect(null,mapDispatchToProps)(Tranfer)
