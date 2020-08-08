import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { actGetSavingDetail ,actOnFinalization} from '../../store/actions/savingAccount';
import {dateTimeToDate,inMoney,inEmail} from '../../utils/fc';

class savingDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saving: {},
            user : {},
        }
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        console.log(id)
        const { user } = this.props;
        this.setState({
            user:user.user
        })
        this.props.getSavingById(id);
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        console.log(nextProps.savingAccount.userId)

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
    render() {
        const { saving , user } = this.state;
        const { id } = this.props.match.params;
        return (
            <div style={{backgroundImage: 'url("../assets/img/bg7.jpg")', backgroundSize: 'cover', backgroundPosition: 'top center'}}>


                    
                <section className="blog_part section_padding section_transaction row">
                    <div className="card container container_transaction1 col-4">
                        <div className="modal-header">
                            <p className="heading lead">Tài khoản tiết kiệm </p>
                        </div>
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
                            <div className="mt-5 form-group text-center">
                                <button type="button" onClick={this.onGoBack}className="btn btn-primary  mr-3">Quay lại</button>
                                <button onClick={this.onSubmitFinalization} type="submit" className="btn btn-primary">Tất toán</button>
                            </div><br />
                        </form>
                    </div>
                </section>


            </div>
        )
    }

    onGoBack = (e) =>{
        this.props.history.goBack();
    }
    onSubmitFinalization = (e)=>{
        e.preventDefault();
        this.props.onFinalization(this.state.user.id)
        this.props.history.push('/savingAccount/:'+this.props.match.params.id+'/finalization')
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
        onFinalization:(userId) =>{
            dispatch(actOnFinalization(userId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(savingDetail);
