import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {actSwitchMovedAddSaving,actPostVerifyAddSaving} from '../../../store/actions/savingAccount'
import {inEmail,inWords,inMoney} from '../../../utils/fc'

class addSavingVerify extends Component {
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
        const { savingAccount } = this.props;
        const { confirmInfo } = savingAccount;
        this.setState({
            confirmInfo:confirmInfo,
        })
    }
    componentWillReceiveProps(nextProps)
    {
        console.log(nextProps)
        if(nextProps && nextProps.savingAccount.confirmInfo.token)
        {
            this.setState({
                confirmInfo:nextProps.savingAccount.confirmInfo
            })
        }
        else
        {
            const { history } = this.props;
            history.push('/addsaving')
        }
    }
    onChange = (e) => {
        this.setState({
            token: e.target.value,
        });
    }
    onSubmit(e){
        e.preventDefault();
        const { confirmInfo } = this.state;
        console.log(confirmInfo.token+"   "+this.state.token)
        console.log(typeof confirmInfo.token+"   "+typeof this.state.token)
        if(String(confirmInfo.token)===String(this.state.token.toUpperCase()))
        {
            console.log("thanh coong")
            this.props.postVerifyAddSaving({...confirmInfo})
            this.po
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
        this.props.history.push("/addsaving");
    }
    showError = ()=>{
        return <div className="alert alert-success mt-3" role="alert">
            <i style={{color: "red"}} className="fas fa-exclamation-triangle pr-2"></i>
                Token không chính xác
        </div>
    }
    render() {
        const { confirmInfo} = this.state;
        console.log(this.props.user)
        const { user} = this.props.user;
        const {error,token} = this.state;
        const {virify} = this.props.savingAccount;
        console.log("vr"+ virify)
        if(virify===true)
        {
            this.props.history.push("/addsaving/result")
        }
        return (
            <div className=" header-filter" style={{backgroundImage: 'url("../assets/img/bg7.jpg")', backgroundSize: 'cover', backgroundPosition: 'top center'}}>
                <section className="blog_part section_padding section_transaction row">
                    <div style={{backgroundColor: "rgba(150,255,255,0.8)"}} className="card container container_transaction1 col-6">
                        <div className="modal-header">
                            <p className="heading lead">Tài khoản tiết kiệm </p>
                        </div>
                        {error===true?"":this.showError()}
                        <form method="POST" className="mt-4 ">
                            <div className="card" >
                                <table className="col6" style={{transform: "translateX(10%)"}}>
                                    <tbody><tr>
                                        <td>Chủ tài khoản : </td>
                                        <td> &nbsp;   {user?user.displayName:''}</td>
                                    </tr>
                                        <tr>
                                            <td>Số tài khoản :</td>
                                            <td>&nbsp;  {confirmInfo?confirmInfo.accountNumber:''}</td>
                                        </tr>
                                        <tr>
                                            <td>Số tiền : </td>
                                            <td>&nbsp;  {confirmInfo.amount?confirmInfo.amount:''} VND</td>
                                        </tr>
                                        <tr>
                                            <td>Số tiền bằng chữ : </td>
                                            <td>&nbsp;  {confirmInfo.amount?inWords(confirmInfo.amount):''} </td>
                                        </tr>
                                        <tr>
                                            <td>Kỳ hạn :</td>
                                            <td>&nbsp;  {confirmInfo.depositTerm?confirmInfo.depositTerm:''} Tháng</td>
                                        </tr>
                                        <tr>
                                            <td>Lãi xuất :</td>
                                            <td>&nbsp;  {confirmInfo.interestRate?confirmInfo.interestRate:''}% / Năm</td>
                                        </tr>
                                        <tr>
                                            <td>Hình thức trả lãi :</td>
                                            <td>&nbsp; {confirmInfo.type ?confirmInfo.type:''} </td>
                                        </tr>
                                    </tbody></table>
                            </div>
                            <p className="heading lead mt-4">Thông tin giao dịch </p>
                            <div className="card mt-2">
                                <table className="col6">
                                    <tbody><tr>
                                        <td>Mã giao dịch : </td>
                                        <td> &nbsp;   {confirmInfo?confirmInfo.ran:''}</td>
                                    </tr>
                                        <tr>
                                            <td>Thời gian : </td>
                                            <td>&nbsp;  {confirmInfo?confirmInfo.now:''}</td>
                                        </tr>
                                        <tr>
                                            <td>Mã xác thực gửi qua email :</td>
                                            <td>&nbsp;  {user?inEmail(user.email):''}</td>
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
        )
    }
}
const mapStateToProps = state => {
    return {
        savingAccount : state.savingAccount,
        user : state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        switchMovedOn : () => {
            dispatch(actSwitchMovedAddSaving())
        },
        postVerifyAddSaving : (data) =>{
            dispatch(actPostVerifyAddSaving(data))
        }
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(addSavingVerify));
