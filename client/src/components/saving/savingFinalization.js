import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actGetSavingDetail ,actPostVerifyFinalization } from '../../store/actions/savingAccount';
import {dateTimeToDate,inMoney,inEmail} from '../../utils/fc';

class savingFinalization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account:{},
            saving: {},
            user : {},
            token:'',
            error:false,
        }
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        const { user } = this.props;
        this.setState({
            user : user.user,
        })
        this.props.getSavingById(id);
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if(nextProps && nextProps.savingAccount.id)
        {
            this.setState({
                saving : nextProps.savingAccount,
            })
        }
        else
        {
            const { history } = this.props;
            history.push('/savingAccount')
        }

    }

    showError = ()=>{
        return <div className="alert alert-success mt-3" role="alert">
            <i style={{color: "red"}} className="fas fa-exclamation-triangle pr-2"></i>
                Token không chính xác
        </div>
    }
    render() {
        const { saving , user } = this.state;
        return (
            <div>
                <section className="blog_part section_padding section_transaction row">
                    <div className="container container_transaction1 col-4">
                        <div className="modal-header">
                            <p className="heading lead">Tất toán</p>
                        </div>
                        {this.state.error===true ? this.showError():'das'}
                        <form method="POST" action className="mt-4 ">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Số tài khoản :</td>
                                        <td>&nbsp;  {saving?saving.accountNumber:''}</td>
                                    </tr>
                                    <tr>
                                        <td>Số tiền : </td>
                                        <td>&nbsp;  {saving?inMoney(saving.fund):''}</td>
                                    </tr>
                                    <tr>
                                        <td>Kỳ hạn : </td>
                                        <td>&nbsp;  {saving?saving.depositTerm:''} tháng</td>
                                    </tr>
                                    <tr>
                                        <td>Lãi xuất :</td>
                                        <td>&nbsp;  {saving?saving.interestRate:''}% &nbsp;/&nbsp;Năm</td>
                                    </tr>
                                    <tr>
                                        <td>Ngày mở :</td>
                                        <td>&nbsp;  {saving?dateTimeToDate(saving.openDate,0):''}</td>
                                    </tr>
                                    <tr>
                                        <td>Ngày đến hạn :</td>
                                        <td>&nbsp;  {saving?dateTimeToDate(saving.closeDate,0):''}</td>
                                    </tr>
                                </tbody></table>
                            <div className="form-group mt-3">
                                <label htmlFor="formGroupExampleInput">Nhập mã số &nbsp; (gửi qua Email: {user?inEmail(user.email):''} )</label>
                                <input onChange={this.onChangeToken} name="OTP" type="text" className="form-control" id="formGroupExampleInput" placeholder="VD : 0123" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Ghi chú</label>
                                <p className="ghichu">Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. <br />
                Donec sed odio operae, eu vulputate felis rhoncus.<br />
                Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis piros Afros. Petierunt uti sibi concilium totius Galliae in diem certam indicere. <br />
                                </p>
                            </div>
                            <div className="form-group text-right">
                                <button type="button" onClick={this.onGoBack} className="btn btn-primary  mr-3">Quay lại</button>
                                <button onClick={this.onSubmit} type="submit" className="btn btn-primary">Tất toán</button>
                            </div><br />
                        </form>
                    </div>
                </section>
            </div>
        )
    }
    onChangeToken = (e)=>{
        this.setState({
            token : e.currentTarget.value
        })
    }
    onSubmit = (e)=>{
        e.preventDefault();
        console.log(this.state.saving)
        console.log(this.state.token)
        const { saving , token } = this.state;
        const {id} =this.props.match.params;
        if(String(saving.token)===String(token.toUpperCase()))
        {
            console.log(this.state.account)
            this.props.postVerify({...this.state.saving})
            this.props.history.push('/savingAccount/'+id+'/result')
        }
        else
        {
            this.setState({
                error : true,
            })
        }
    }
    onGoBack = (e) =>{
        this.props.history.goBack();
    }
}
const mapStateToProps = state => {
    return {
        savingAccount: state.savingAccount,
        user:state.user,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getSavingById: (id) => {
            dispatch(actGetSavingDetail(id))
        },
        postVerify : (data)=>{
            dispatch(actPostVerifyFinalization(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(savingFinalization);
