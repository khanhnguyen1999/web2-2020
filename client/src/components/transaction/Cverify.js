import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect ,withRouter} from 'react-router-dom';
import {actSwitchMoved,actPostVerify} from '../../store/actions/transaction';
import * as FC from '../../utils/fc'


class Cverify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmInfo : {},
            token:'',
            error:true,
            account:{},
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onBack = this.onBack.bind(this);
    }
    componentWillMount(){
        this.props.switchMovedOn();
        const { ifTransaction } = this.props;
        const { confirmInfo } = ifTransaction;
        const {account} = ifTransaction;
        this.setState({
            confirmInfo:confirmInfo,
            account:account,
        })
    }
    onChange = (e) => {
        this.setState({
            token: e.target.value,
        });
    }
    onSubmit(e){
        e.preventDefault();
        const { ifTransaction } = this.props;
        const { confirmInfo } = ifTransaction;
        console.log(confirmInfo.token+"   "+this.state.token)
        console.log(typeof confirmInfo.token+"   "+typeof this.state.token)
        if(String(confirmInfo.token)===String(this.state.token.toUpperCase()))
        {
            this.props.postVerify({...confirmInfo,...this.props.ifTransaction.account})
            // this.props.history.push("/transaction/result")
        }
        else
        {
            this.setState({
                token:'',
                error:false,
            })
        }

    }
    onBack(e){
        // this.props.deleteConfirmInfo();
        this.props.history.push('/transaction');
    }
    showError = ()=>{

        return (
            <div className="alert alert-danger">
            <div className="container">
            <div className="alert-icon">
                <i className="material-icons">error_outline</i>
            </div>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true"><i className="material-icons">clear</i></span>
            </button>
            <b>Error Alert:</b> Token không chính xác
            </div>
        </div>)
    }
    render() {
        
        const { ifTransaction } = this.props;
        const { user } = this.props.currentUser;
        console.log(user)
        const { confirmInfo ,account} = ifTransaction;
        const {error,token} = this.state;
        const {virify} = this.props.ifTransaction;
        console.log("vr"+ virify)
        console.log(confirmInfo)
        if(!confirmInfo){
            this.props.history.push("/transaction")
        }
        if(virify===true)
        {
            console.log("aaaaaaaaaaa")
            this.props.history.push("/transaction/result")
        }
        return (

          <div className=" header-filter" style={{backgroundImage: 'url("../assets/img/bg7.jpg")', backgroundSize: 'cover', backgroundPosition: 'top center'}}>
          <section className="blog_part section_padding section_transaction row">
              <div style={{backgroundColor: "rgba(150,255,255,0.8)"}} className="card container container_transaction1 col-6">
                  <div className="modal-header">
                      <p className="heading lead">Transaction </p>
                  </div>
                  {error===true?"":this.showError()}
                  <form method="POST" className="mt-4 ">
                      <div className="card" >
                          <table className="col6" style={{transform: "translateX(-3%)"}}>
                              <tbody>
                                  <tr>
                                    <td>Sender : </td>
                                    <td> &nbsp;   {user?user.displayName:''}</td>
                                  </tr>

                                  <tr>
                                      <td>Account Number :</td>
                                      <td>&nbsp;  {ifTransaction?ifTransaction.account.accountNumber:''}</td>
                                  </tr>

                                  <tr>
                                      <td>Amount : </td>
                                      <td>&nbsp;  {confirmInfo?confirmInfo.amount:''} VND</td>
                                  </tr>
                                  <tr>
                                      <td>Amount in words : </td>
                                      <td style={{maxWidth: "160px"}}>&nbsp;  {confirmInfo?confirmInfo.amount?FC.inWords(confirmInfo.amount):'':''} </td>
                                  </tr>
                                  <tr>
                                      <td>Beneficiary Account :</td>
                                      <td>&nbsp;  {confirmInfo?confirmInfo.beneficiaryAccountNumber:''} </td>
                                  </tr>
                                  <tr>
                                      <td>Beneficiary Name :</td>
                                      <td>&nbsp;  {confirmInfo?confirmInfo.displayName:''}</td>
                                  </tr>
                                  <tr>
                                      <td>Content :</td>
                                      <td>{confirmInfo?confirmInfo.content:''}</td>
                                  </tr>

                                  <tr>
                                      <td>Fee :</td>
                                      <td>{confirmInfo?confirmInfo.totalFee:''} &nbsp; VND</td>
                                  </tr>
                              </tbody></table>
                      </div>
                      <p className="heading lead mt-4">Thông tin giao dịch </p>
                      <div className="card mt-2">
                          <table className="col6">
                              <tbody><tr>
                                  <td>Mã giao dịch : </td>
                                  <td> &nbsp;   {confirmInfo?confirmInfo.transactionID:''}</td>
                              </tr>
                                  <tr>
                                      <td>Thời gian : </td>
                                      <td>&nbsp;  {confirmInfo?confirmInfo.now:''}</td>
                                  </tr>
                                  <tr>
                                      <td>Mã xác thực gửi qua email :</td>
                                      <td>&nbsp;  {user?FC.inEmail(user.email):''}</td>
                                  </tr>
                              </tbody></table>
                          <div className="form-group mt-3">
                              <label htmlFor="formGroupExampleInput">Nhập mã số &nbsp; (gửi qua Email)</label>
                              <input onChange={this.onChange} name="OTP" type="text" className="form-control" id="formGroupExampleInput" placeholder="VD : 0123" />
                          </div>
                          <div className="form-group text-right">
                              <button type="button" onClick={this.onBack} className="btn btn-primary  mr-3">Quay lại</button>
                              <button onClick={this.onSubmit} type="submit" className="btn btn-primary">Xác Nhận</button>
                          </div>
                      </div>
                      <br />
                  </form>
              </div>
          </section>
      </div>
                
            
        );
    }
}

const mapStateToProps = state => {
    return {
        ifTransaction : state.transaction,
        currentUser : state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        switchMovedOn : () => {
            dispatch(actSwitchMoved())
        },
        postVerify : (data) =>{
            dispatch(actPostVerify(data))
        }
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Cverify));