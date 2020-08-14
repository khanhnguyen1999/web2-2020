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
        const { confirmInfo ,account} = ifTransaction;
        const {error,token} = this.state;
        const {virify} = this.props.ifTransaction;
        console.log("vr"+ virify)
        if(virify===true)
        {
            console.log("aaaaaaaaaaa")
            this.props.history.push("/transaction/result")
        }
        return (

            <div>
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
                                {user?user.dislayName:''}
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
                                <small className="muted-text">VND</small>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Notification */}
                  
                  {error===true?"":this.showError()}
                 
                  {/* End Notification */}
                  {/* Main section */}
                  <div className="card-body" >
                    <div className="row " style={{transform: "translateX(80px)"}}>
                      <div className="col-4">
                        <div className="row text-right">
                          <div className="col-12">
                            <p className="h4">Sender:</p>
                          </div>
                          <div className="col-12">
                            <p className="h4">Account Number:</p>
                          </div>
                          <div className="col-12">
                            <p className="h4">Amount:</p>
                          </div>
                          <div className="col-12">
                            <p className="h4">Beneficiary Account:</p>
                          </div>
                          <div className="col-12">
                            <p className="h4">Beneficiary Name:</p>
                          </div>
                          <div className="col-12">
                            <p className="h4">Content:</p>
                          </div>
                          <div className="col-12">
                            <p className="h4">Fee:</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-8">
                        <div className="row text-left">
                          <div className="col-12">
                            <p className="h4">&nbsp; {user?user.displayName:''}</p>
                          </div>
                          <div className="col-12">
                            <p className="h4">&nbsp;  {ifTransaction?ifTransaction.account.accountNumber:''}</p>
                          </div>
                          <div className="col-12">
                            <p className="h4">
                                &nbsp;  {confirmInfo?confirmInfo.amount:''}
                              <small className="text-muted">VND</small>
                            </p>
                          </div>
                          <div className="col-12">
                            <p className="h4">&nbsp;  {confirmInfo?confirmInfo.beneficiaryAccountNumber:''}</p>
                          </div>
                          <div className="col-12">
                            <p className="h4">&nbsp;  {confirmInfo?confirmInfo.displayName:''}</p>
                          </div>
                          <div className="col-12">
                            <p className="h4">&nbsp;  {confirmInfo?confirmInfo.content:''}</p>
                          </div>
                          <div className="col-12">
                            <p className="h4">
                            &nbsp; {confirmInfo?confirmInfo.totalFee:''}
                              <small className="text-muted">VND</small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          OTP
                        </span>
                      </div>
                      <input onChange={this.onChange} name="OTP" type="text" className="form-control" />
                    </div>
                  </div>
                  {/* End Main section */}
                  <div className="card-footer" style={{display: 'inherit'}}>
                    <div className="text-center">
                      <button onClick={this.onBack} type className="btn btn-danger btn-link btn-wd btn-lg">Bank</button>
                      <button onClick={this.onSubmit} className="btn btn-primary btn-link btn-wd btn-lg">Confirm</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
                {/* <section className="blog_part section_padding section_transaction row">
                    <div className="container container_transaction1 col-4">
                        <div className="modal-header">
                            <p className="heading lead">Chuyển khoản </p>
                        </div>
                        {error===true?"":this.showError()}
                        <form onSubmit={this.onSubmit} method="POST" className="mt-4 ">
                            <table>
                                <tbody><tr>
                                    <td>Người gửi : </td>
                                    <td>&nbsp; {user.displayName}</td>
                                </tr>
                                    <tr>
                                        <td>Số tài khoản :</td>
                                        <td>&nbsp;  {ifTransaction.account.accountNumber}</td>
                                    </tr>
                                    <tr>
                                        <td>Số tiền : </td>
                                        <td>&nbsp;  {confirmInfo.amount}</td>
                                    </tr>
                                    <tr>
                                        <td>stk thụ hưởng : </td>
                                        <td>&nbsp;  {confirmInfo.beneficiaryAccountNumber}</td>
                                    </tr>
                                    <tr>
                                        <td>Người thụ hưởng :</td>
                                        <td>&nbsp;  {confirmInfo.displayName}</td>
                                    </tr>
                                    <tr>
                                        <td>Nội dung :</td>
                                        <td>&nbsp;  {confirmInfo.content}</td>
                                    </tr>
                                    <tr>
                                        <td>Phí :</td>
                                        <td>&nbsp; {confirmInfo.totalFee} VND</td>
                                    </tr>
                                </tbody></table>
                            <div className="form-group mt-3">
                                <label htmlFor="formGroupExampleInput">Nhập mã số &nbsp; (gửi qua Email)</label>
                                <input name="OTP" value={token} onChange={this.onChange} type="text" className="form-control" id="formGroupExampleInput" placeholder="VD : 0123" />
                            </div>
                            <div className="form-group text-right">
                                <button type="button" onClick={this.onBack} className="btn btn-primary  mr-3">Quay lại</button>
                                <button type="submit"  className="btn btn-primary">Xác Nhận</button>
                            </div><br />
                        </form>
                    </div>
                </section> */}
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