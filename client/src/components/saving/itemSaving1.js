import React,{useState,useEffect} from 'react';
import {inMoney,dateTimeToDate} from '../../utils/fc';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {actGetSavingDetail, actOnFinalization} from '../../store/actions/savingAccount';

function itemSaving(props) {
    const [id,setId] = useState();
    const [saving,setSaving] = useState();

    useEffect(()=>{
        const {saving} = props;
        // const {id} = props.match.params;
        // console.group(id);
        // setId(id);

        setSaving(saving)
        console.log(saving)
    },[])
    const onClickInfor = (e)=>{
        console.log(saving.id)
        props.history.push(`/savingAccount1/${saving.id}`)
    }
    const onClickFina = (e)=>{
        const user = JSON.parse(localStorage.getItem("currentUser")) 
        props.getSavingById(saving.id)
        props.onFinalization(user.id)
        props.history.push(`/savingAccount/:${saving.id}/finalization`)
    }
    return (
        <tr>
        <th scope="row " className="align-middle">
        <a href="#" class="text-dark align-middle d-inline-block">{saving?inMoney(saving.fund):0} VND</a>
        
        </th>
        <td class="align-middle"><strong>{saving?dateTimeToDate(saving.openDate,0):0}</strong></td>
        <td class="align-middle"><strong>{saving?dateTimeToDate(saving.closeDate,0):0}</strong></td>
        <td class="align-middle"><a  class="text-dark"><Button onClick={onClickInfor}   variant="outlined" color="primary" >
                            Information
                        </Button></a>
        </td>
        <td class="align-middle"><a  class="text-dark"><Button variant="outlined" color="secondary" onClick={onClickFina}>
        Finalization
                        </Button></a>
        </td>
      </tr>
        
    )
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
export default withRouter(connect(null,mapDispatchToProps)(itemSaving));
