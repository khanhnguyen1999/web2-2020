import React , {useEffect} from 'react';
import {connect} from 'react-redux';
import {actDeleteConfirmInfoAddSaving,actSwitchVerifyAddSaving,actSwitchMovedAddSaving} from '../../../store/actions/savingAccount'
import Message from '../../message/Message'
function addSavingResult(props) {

    const onClickNext = () => {
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
    if(!props.savingAccount.virify){
        props.history.push('/addsaving')
    }
    return (
        <Message title={"Add Saving"}  message={"Successful Add Saving Account"}  to={"/savingAccount"}  success={true} />
    )
}

const mapStateToProps = state => {
    return {
        savingAccount : state.savingAccount,
    }
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
export default connect(mapStateToProps,mapDispatchToProps)(addSavingResult)
