import * as Types from '../../constants/ActionTypes';
import CallApi from '../../utils/apiCaller';

export const actGetAccount  = (userId)=>{
    console.log(userId)
    return dispatch =>{
        
        return CallApi('information/getAccount','POST',{userId})
        .then(res =>{
            console.log(res.data);
            dispatch({type:Types.GET_ACCOUNT,data:res.data})
        })
        .catch(err => {
            console.log("loi get account")
        })
    }
}
