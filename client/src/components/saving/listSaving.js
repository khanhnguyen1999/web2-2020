import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import ItemSaving from './itemSaving';
import {actFetchSavingAccount} from '../../store/actions/savingAccount';
import {inMoney} from '../../utils/fc';


export class listSaving extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user : {},
            account : {},
            savingAccount :[],
        }
    }

    componentDidMount(){
        const {user} = this.props.user; 
        this.setState({
            user:user,
        })
        this.props.fetchInformation(user.id)
    }

    componentWillReceiveProps (nextProps){
        
        if(nextProps && nextProps.savingAccount.savingAccount){
            this.setState({
                user:nextProps.user,
                account:nextProps.savingAccount.account,
                savingAccount : nextProps.savingAccount.savingAccount,
            })
        }
    }

    render() {
        var {user,account,savingAccount} = this.state;
        return (
            <div className="page-header header-filter" style={{backgroundImage: 'url("../assets/img/bg7.jpg")', backgroundSize: 'cover', backgroundPosition: 'top center'}}>
                {/* <section className="blog_part section_padding section_transaction list-saving row"> */}
                    <div className="container container_transaction1 col-6">
                        <div className="modal-header">
                            <p className="heading lead">Tài khoản tiết kiệm </p>
                        </div>
                        <div className=" p-4 transaction_profile listsaving mt-2">
                            <div className="itemInformation">
                                <div className="task-profile-saving">
                                    <p><i className="fas fa-address-card" />Số tài khoản</p>
                                </div>
                                <span>{account&&account.accountNumber?account.accountNumber:''}</span>
                            </div>
                            <div className="itemInformation">
                                <div className="task-profile-saving">
                                    <p><i className="fas fa-dollar-sign" />Số tiền khả dụng</p>
                                </div>
                                <span>{account&&account.balance?inMoney(account.balance):''} VND</span>
                            </div>
                            <div className="itemInformation">
                                <div className="task-profile-saving">
                                    <p><i className="fa fa-money" aria-hidden="true" />Số tiền TKTK</p>
                                </div>
                                <span>{savingAccount?inMoney(this.sumMountSaving(savingAccount)):0} VND</span>
                            </div>
                        </div>
                        <div >
                            {this.showListSaving(savingAccount)}
                            {/* <ItemSaving/>
                            <ItemSaving/> */}
                        </div>

                        <form method="GET" className="mt-4 ">
                            <div className="form-group text-right">
                                <a onClick={this.onAddSaving} href="saving/addSaving" type="submit" className="btn btn-primary">Them TKTK</a>
                            </div><br />
                        </form>
                    </div>
                {/* </section> */}
            </div >
        )
    }
    onAddSaving =(e)=>{
        e.preventDefault();
        this.props.history.push('/addsaving')
    }
    sumMountSaving = (savingAccount)=>{
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

    showListSaving = (listSaving)=>{
        var result = null;
        if(listSaving.length > 0)
        {
            result = listSaving.map((item,index)=>{
                return (
                    <Link to={'/savingAccount/' + item.id} key={index}>
                        <ItemSaving key={index} saving = {item}/>
                    </Link>
                )
            })
        }

        return result;
    }
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
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(listSaving))
