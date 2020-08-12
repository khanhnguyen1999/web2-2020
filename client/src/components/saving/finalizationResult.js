import React , {useEffect} from 'react';
import {connect} from 'react-redux';
import {actDeleteConfirmInfo,actSwitchVerify} from '../../store/actions/transaction'
import Message from '../../components/message/Message'
function finalizationResult(props) {

    const onClickNext = ()=> {
        props.switchVerify();
        props.history.push('/savingAccount')
    }
    const onClickHome = ()=> {
        props.history.push('/home')
        
    }
    useEffect(()=>{
        return ()=>{
            props.switchVerify();
            props.deleteConfirmInfo();
        }
    },[])
    // useEffect(()=>{
    //     props.deleteConfirmInfo()
    // },[])
    return (
        <Message title={"Finalization"}  message={"Successful finalization"}  to={"/savingAccount"}  success={true} />
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
export default connect(null,mapDispatchToProps)(finalizationResult)
