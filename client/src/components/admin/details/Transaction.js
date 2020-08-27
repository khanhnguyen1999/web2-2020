import React from 'react';

import {dateTimeToDate} from '../../../utils/fc';

function Transaction(props) {

    const {account,listTransaction} =props;
    const showListTransaction = (listTransaction,number)=>
    {
      var result = null;
      var newList=null;
      console.log("tr")
      console.log(listTransaction)
      if(number===0){
        newList=listTransaction;
      }
      else if(number===1) //taats ca
      {
          newList=listTransaction.filter((x)=>{
            return x.accountNumber === account.accountNumber;
          })
      }else if( number===2){
        newList=listTransaction.filter((x)=>{
          return x.beneficiaryAccount === account.accountNumber;
        })
      }

      if(newList.length === 0){
        return (
          <i>No transaction yet</i>
        )
      }
      result = newList.map(x =>{
        console.log(x)
        return (
          <div >
                 
          <ul className="list-group">
           
            <li className="list-group-item d-flex justify-content-between align-items-center">
             {x.amount} VND _ {x.content} _ {dateTimeToDate(x.createdAt)}
              
              <span className="badge badge-primary badge-pill">
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check2-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                  <path fillRule="evenodd" d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z" />
                </svg>
              </span>
            </li>
           
          </ul>
          
        </div>
        )
      })
      
      return result;
    }
    return (
        <div className="row justify-content-center my-5">
        <div className="col-md-12">
          {/*Tabs with icons on Card*/}
          <div className="card card-nav-tabs">
            <div className="card-header card-header-primary">
              {/* colors: "header-primary", "header-info", "header-success", "header-warning", "header-danger" */}
              <div className="nav-tabs-navigation">
                <div className="nav-tabs-wrapper">
                  <ul className="nav nav-tabs" data-tabs="tabs">
                    <li className="nav-item">
                      <a className="nav-link active" href="#all" data-toggle="tab">
                        {/* <i class="material-icons">face</i> */}
                        All
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#outcome" data-toggle="tab">
                        {/* <i class="material-icons">chat</i> */}
                        Outcome
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#income" data-toggle="tab">
                        {/* <i class="material-icons">build</i> */}
                        Income
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="tab-content text-center">

                <div className="tab-pane active" id="all">
                {showListTransaction(listTransaction,0)}
                </div>

                <div className="tab-pane" id="outcome">
                  {showListTransaction(listTransaction,1)}
                </div>

                <div className="tab-pane" id="income">
                  {showListTransaction(listTransaction,2)}
                </div>
              </div>
            </div>
          </div>
          {/*End Tabs with icons on Card*/}
          <div className="row my-3 justify-content-end">
            <div className="col-4">
              <a className="btn btn-light" href="/admin/users/<%= account.userId %>" role="button">Back</a>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Transaction
