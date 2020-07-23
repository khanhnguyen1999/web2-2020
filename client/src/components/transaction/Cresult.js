import React , {useEffect} from 'react';
import {connect} from 'react-redux';
import {actDeleteConfirmInfo,actSwitchVerify} from '../../store/actions/transaction'
function Cresult(props) {

    const onClickNext = ()=> {
        props.switchVerify();
        props.history.push('/transaction')
    }
    const onClickHome = ()=> {
        props.history.push('/home')
    }
    useEffect(()=>{
        props.deleteConfirmInfo()
        // return ()=>{
        //     console.log("un cpn")
        //     props.switchVerify();
        //     props.history.push('/transaction')
        // }
    },[])
    return (
        <div>
            <section className="blog_part section_padding section_transaction2 col-4">
                <div className="modal-dialog modal-notify modal-success" role="document">
                    <div className="modal-content">

                        {/*Header*/}
                        <div className="modal-header">
                            <p className="heading lead">Chuyển khoản thành công</p>
                        </div>
                        <div className="modal-body">
                            <div className="text-center">
                                <i className="fas fa-check fa-4x mb-3 animated rotateIn" />
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit iusto nulla aperiam
                                blanditiis ad consequatur in dolores culpa, dignissimos, eius non possimus fugiat.
                                Esse ratione fuga, enim, ab officiis totam.</p>
                            </div>
                        </div>

                        { /*Footer*/ }
                        <div className="modal-footer justify-content-center">
                            <a type="button" onClick={onClickNext} className="btn btn-success">Tiếp tục chuyển khoản <i className="far fa-gem ml-1 white-text" /></a>
                            <a type="button" onClick={onClickHome}  className="btn btn-outline-success waves-effect" data-dismiss="modal">No, thanks</a>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}
const mapDispatchToProps = dispatch =>{
    return {
        deleteConfirmInfo : ()=>{
            dispatch(actDeleteConfirmInfo())
        },
        switchVerify : ()=>{
            dispatch(actSwitchVerify())
        }
    }
}
export default connect(null,mapDispatchToProps)(Cresult)
