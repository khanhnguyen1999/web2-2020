import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect ,withRouter} from 'react-router-dom';
import {actSwitchMoved,actPostVerify} from '../../store/actions/transaction'


class Cverify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmInfo : {},
            token:'',
            error:true,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onBack = this.onBack.bind(this);
    }
    componentDidMount(){
        this.props.switchMovedOn();
        const { ifTransaction } = this.props;
        const { confirmInfo } = ifTransaction;
        this.setState({
            confirmInfo:confirmInfo,
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

       
        return <div className="alert alert-success mt-3" role="alert">
            <i style={{color: "red"}} className="fas fa-exclamation-triangle pr-2"></i>
                Token không chính xác
        </div>
    }
    render() {
        
        const { ifTransaction } = this.props;
        const { user } = this.props.currentUser;
        const { confirmInfo } = ifTransaction;
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
                <section className="blog_part section_padding section_transaction row">
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