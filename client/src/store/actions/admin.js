import * as  Types from '../../constants/ActionTypes';
import callApi from '../../utils/apiCaller';
export const actGetAllUser = () => {
    return dispatch => {
        return callApi("admin/users","GET","")
        .then(res => {
            console.log(res.data)
            dispatch({type:Types.GET_ALL_USER,data:res.data})
        })
        .catch(err => {
            console.log("loi get all user");
            console.log(err)
        })
    }
}

export const actGetAllUserPending = () => {
    return dispatch => {
        return callApi("admin/users/management","GET","")
        .then(res => {
            console.log(res.data)
            dispatch({type:Types.GET_ALL_USER,data:res.data})
        })
        .catch(err => {
            console.log("loi get all user");
            console.log(err)
        })
    }
}

//get transaction user
export const actGetUserTransaction = (userId)=>{
    return dispatch =>{
        console.log(userId)
        return callApi(`admin/users/${userId}`,"GET",'')
        .then(res => {
            console.log("cccc")
            console.log(res.data)
          
        })
        .catch(err => {
            console.log("loi get user transaction")
            console.log(err)
        })
    }
}

export const actAddUserAmount = (userId,amount)=>{
    return dispatch => {
        return callApi(`admin/users/${userId}`,"PUT",amount)
        .then(res => {
            console.log(JSON.stringify(res.data))
            dispatch({type:Types.ADD_USER_AMOUNT,data:res.data})
        })
        .catch(err => {
            console.log("loi add user amount")
            console.log(err)
        })
    }
}

export const actEditUserProfile = (userId,data)=>{
    return dispatch=>{
        console.log("data")
        console.log(data)
        return callApi(`admin/users/${userId}`,"POST",{data})
        .then(res => {
            console.log(res.data)
            dispatch({type:Types.EDIT_USER_PROFILE,data:res.data})
        })
        .catch(err => {
            console.log("loi edit user profile")
            console.log(err)
        })
    }
}

export const actLockUser = (userId) =>{
    return dispatch => {
        console.log("userId")
        console.log(userId)
        return callApi(`admin/users/${userId}/lock`,"GET",'')
        .then(res =>{
            console.log(res.data)
            dispatch({type:Types.LOCK_USER,data:res.data});
        })
        .catch(err => {
            console.log("loi lock user")
            console.log(err);
        })
    }
}

export const actAcceptUser = (userId) => {
    return dispatch => {
        return callApi(`admin/users/${userId}/verify-accept`,"GET",'')
        .then(res => {
            console.log(res.data)
            dispatch({type:Types.ACCEPT_USER,data:res.data})
        })
        .catch(err => {
            console.log("loi accept user")
            console.log(err)
        })
    }
}

export const actDenytUser = (userId) => {
    return dispatch => {
        return callApi(`admin/users/${userId}/verify-deny`,"GET",'')
        .then(res => {
            console.log(res.data)
            dispatch({type:Types.DENY_USER,data:res.data})
        })
        .catch(err => {
            console.log("loi deny user")
            console.log(err)
        })
    }
}