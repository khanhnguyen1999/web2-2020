import * as Types from '../../constants/ActionTypes';
import CallApi from '../../utils/apiCaller';
import callApiImage from '../../utils/apiCallerImage';
import callApi from '../../utils/apiCaller';

export const actGetUserByEmail = (email)=>{
    return dispatch => {
        console.log(email)
        console.log("get user by email")
        return CallApi("information/getUserByEmail","POST",{email})
        .then(res => {
            console.log(res.data)
            dispatch({type:Types.GET_USER_BY_EMAIL,data : res.data})
        })
        .catch( err => {
            console.log("loi get user by email");
            console.log(err)
        })
    }
   
}

export const actRefreshUser = (userId) => {
    return dispatch => {
        console.log("res post refresh")
        return callApi("information/refreshUser","POST" ,{userId})
        .then(res => {
            console.log("res post refresh")
            console.log(res.data)
            dispatch({type:Types.REFRESH_USER,data:res.data})
        })
        .catch(err => {
            console.log("loi post refresh")
            console.log(err)
        })
    }
}

export const actResetStateUser = ()=>{
    return{
        type:Types.RESET_STATE_USER
    }
}

export const actPostLogin  = (data)=>{
    console.log(data)
    // return {type:Types.POST_LOGIN}

    return dispatch =>{
        
        return CallApi('login','POST',{data})
        .then(res =>{
            dispatch({type:Types.POST_LOGIN,data:res.data})
        })
        .catch(err => {
            console.log("loi post login")
        })
    }
}

export const actLogout = ()=>{
    return{
        type:Types.LOGOUT,
    }
}

export const actForgotPassword = (data) => {
    console.log(data)
    return (dispatch) => {
        return CallApi("forgot-password", "POST", { data })
            .then((res) => {
                console.log(res.data);
                dispatch({ type: Types.FORGOT_PASSWORD, data: res.data });
            })
            .catch((err) => {
                console.log("loi post forgot password");
                console.log(err);
            });
    };
};

export const actPostCheckToken = data =>{
    return dispatch => {
        return CallApi("forgot-password/check-token","POST",{data})
        .then(res => {
            console.log(res.data)
            dispatch({type:Types.POST_CHECK_TOKEN , data : res.data})
        })
        .catch(err => {
            console.log("loi post check token")
            console.log(err)
        })
    }
}

export const actPostChangePassword = data => {
    return dispatch => {
        console.log(data)
        return CallApi("change-password","POST",{data})
            .then(res => {
                console.log("nhan ve");
                console.log(res.data);
                dispatch({type:Types.POST_CHANGE_PASSWORD,data:res.data})
            })
            .catch(err => {
                console.log("loi post change pass");
                console.log(err);
            })
    }
}

//register

export const actPostRegister = (data)=>{
    return dispatch => {
        console.log(data)
        return CallApi("register","POST",{data})
        .then(res => {
            console.log(res.data)
            dispatch({type : Types.POST_REGISTER , data:res.data})
        })
        .catch(err => {
            console.log("loi post register")
            console.log(err)
        })
    }
}

//verify image
// export async function actPostVerifyImage (formData){
//     console.log(formData)
//     const res =await callApiImage("verify","POST",formData)
//     return  dispatch => {
//         res.then((data)=>{
//             console.log(data)
//         })
        
        

//     }
// }
export function actPostVerifyImage(formData) {

    return dispatch => {
        console.log(formData)
        return callApiImage("verify","POST",formData)
        .then(res => {
            console.log(res.data)
            dispatch({type : Types.POST_VERIFY_IMAGE , data:res.data})
        })
        .catch(err => {
            console.log("loi post verify")
            console.log(err)
        })
    }
}
