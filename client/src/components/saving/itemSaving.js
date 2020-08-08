import React,{useState,useEffect} from 'react';
import {inMoney,dateTimeToDate} from '../../utils/fc';
import Button from '@material-ui/core/Button';


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
            <div  id="id" onclick="onclick" class=" mt-2 card-header bg-transparent savingItem " style={{justifyContent : "center",display:"flex" ,alignItems: "center"}}>
                        <span  class="ml-3">
                            <span class="ml-3 float-left">So tien :<a className="float-left" href="#" class="alert-link">{saving?inMoney(saving.fund):0}</a></span> 
                             
                        </span>
                        <span class="ml-5 float-left" >{saving?dateTimeToDate(saving.openDate,0):0}</span>

                        <span class="ml-5 float-left" >{saving?dateTimeToDate(saving.closeDate,0):0}</span>

                        <Button variant="contained" disabled>
                            Disabled
                        </Button>
            </div>
        </div>
    )
}

export default itemSaving
