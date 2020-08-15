import React , {useEffect} from 'react';
import {connect} from 'react-redux';
import {actDeleteConfirmInfoAddSaving,actSwitchVerifyAddSaving,actSwitchMovedAddSaving} from '../../../store/actions/savingAccount'
import Message from '../../message/Message'
function addSavingResult(props) {

    const onClickNext = ()=> {
        props.switchVerifyAddSaving();
        props.history.push('/addsaving')
    }
    const onClickHome = ()=> {
        props.history.push('/savingAccount')
    }
    useEffect(()=>{
        props.deleteConfirmInfo()
        return ()=>{
            console.log("un cpn")
            props.switchVerifyAddSaving();
        }
    },[])
    return (
        <Message title={"Add Saving"}  message={"Successful Add Saving Account"}  to={"/savingAccount"}  success={true} />
    )
}
const mapDispatchToProps = dispatch =>{
    return {
        deleteConfirmInfo : ()=>{
            dispatch(actDeleteConfirmInfoAddSaving())
        },
        switchVerifyAddSaving : ()=>{
            dispatch(actSwitchVerifyAddSaving())
        }
    }
}
export default connect(null,mapDispatchToProps)(addSavingResult)
