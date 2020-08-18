import React from 'react';
import { withRouter } from 'react-router-dom';

function Message(props) {
    const {title , message , to , success } = props;
    const onClickHome = (e)=>{
        let to  ='/home';
        if(props.to){
            to = props.to
        }
        console.log(to)
        props.history.push(to)
    }
    return (
        <div className="page-header header-filter" style={{backgroundImage: 'url("/assets/img/bg7.jpg")', backgroundSize: 'cover', backgroundPosition: 'top center'}}>
            <div className="container">
              <div className="text-center">
              <div className="card modal-dialog modal-notify modal-success" role="document">
                    <div className="modal-content">

                        {/*Header*/}
                        <div className="modal-header">
                            <p style={{color:"black"}} className="heading lead">{title}</p>
                        </div>
                        <div className="modal-body">
                            <div className="text-center">

                                <i className={success?"fas fa-check fa-4x mb-3 animated rotateIn":'fas fa-exclamation-circle fa-4x mb-3 animated rotateIn'} />
                                <p style={{color:"black"}}>{message}</p>
                            </div>
                            
                        </div>

                        { /*Footer*/ }
                        <div className="modal-footer justify-content-center">
                            <a style={{color:"black"}} type="button" onClick={onClickHome}  className="btn btn-outline-success waves-effect" data-dismiss = "modal">OK</a>
                        </div>
                    </div>

                </div>
              </div>
        </div>
        </div>
    )
}

export default withRouter(Message)
