import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import ItemSaving from './itemSaving1';
import {actFetchSavingAccount} from '../../store/actions/savingAccount';
import {inMoney} from '../../utils/fc';
import * as Config from '../../constants/Config'
import * as FC from '../../utils/fc';
import Button from '@material-ui/core/Button';


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
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 ml-auto mr-auto">
              <div className="card card-login text-center">
                <form className="form" method="POST">
                  <div className="card-header card-header-primary text-center">
                    <h4 className="card-title">Saving Account</h4>
                    <div className="social-line">
                      <div className="row m-3">
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
                              <p style={{color :"white"}} className="class-text">
                              {account&&account.accountNumber?account.accountNumber:''}
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
                              <p style={{color :"white"}} className="class-text">
                              {account?inMoney(account.balance):''}
                              <small style={{color :"yellow"}} className="muted-text">&nbsp;  VND</small>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                          <div className="row justify-content-center">
                            <div className="col-12">
                              <p className="card-text">
                                <b>Total </b>
                              </p>
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-12">
                              <p style={{color :"white"}} className="class-text">
                              {savingAccount?inMoney(this.sumMountSaving(savingAccount)):0}
                                <small style={{color :"yellow"}} className="muted-text">&nbsp;  VND</small>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                
                    <div className="mt-5">
                    <div class="table-responsive">
                        <table class="table">
                                <thead>
                            <tr>
                            <th scope="col" class="border-0 bg-light">
                                <div class="p-2 px-3 text-uppercase">FUND</div>
                            </th>
                         
                            <th scope="col" class="border-0 bg-light">
                                <div class="py-2 text-uppercase">OPEN DATE</div>
                            </th>
                            <th scope="col" class="border-0 bg-light">
                                <div class="py-2 text-uppercase">CLOSE DATE</div>
                            </th>
                         
                            <th scope="col" class="border-0 bg-light">
                                <div class="py-2 text-uppercase">INFORMATION</div>
                            </th>
                            <th scope="col" class="border-0 bg-light">
                                <div class="py-2 text-uppercase">FINALIZATION</div>
                            </th>
                            </tr>
                        </thead>
                        <tbody>



                    {this.showListSaving(savingAccount)}
                        </tbody>
                        </table>






                 
                       

                    </div>
                    </div>

                    <div className="form-group text-right">
                        <a onClick={this.onAddSaving} href="saving/addSaving" type="submit" className="mr-5 btn btn-primary">Them TKTK</a>
                    </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                   
                        <ItemSaving history={this.props.history} key={index} saving = {item}/>
                    
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
