import React,{useState,useEffect} from 'react';
import {inMoney,dateTimeToDate} from '../../utils/fc';


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
    return (
        <div>
            <div id="id" onclick="onclick" class="card-header bg-transparent savingItem">
                        <span><i class="fas fa-id-badge mr-3 text-success "></i><span class="mr-2">So tien :</span> <a href="#" class="alert-link">{saving?inMoney(saving.fund):0}</a> </span>
                        <span class="float-right" >{saving?dateTimeToDate(saving.closeDate,0):0}</span>
            </div>
        </div>
    )
}

export default itemSaving
