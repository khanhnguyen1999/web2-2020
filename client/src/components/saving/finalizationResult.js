import React , {useEffect} from 'react';
import {connect} from 'react-redux';
import {actDeleteConfirmInfo,actSwitchVerify} from '../../store/actions/transaction';
import {actSwitchVerifyFina} from '../../store/actions/savingAccount';
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
            props.switchVerifyFina();
            props.deleteConfirmInfo();
        }
    },[])
    // useEffect(()=>{
    //     props.deleteConfirmInfo()
    // },[])
    
    if(!props.savingAccount.verifyFina)
    {
         props.history.push('/savingAccount')
    }
    return (
        <Message title={"Finalization"}  message={"Successful finalization"}  to={"/savingAccount"}  success={true} />
    )
}
const mapStateToProps = state => {
    return {
        savingAccount: state.savingAccount,
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        deleteConfirmInfo : ()=>{
            dispatch(actDeleteConfirmInfo())
        },
        switchVerifyFina : ()=>{
            dispatch(actSwitchVerifyFina())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(finalizationResult)
