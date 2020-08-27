import * as Types from '../../constants/ActionTypes';
const initState = {
    user: null,
    successLogin:null,
    successForgotPassword :null,
    successCheckToken :null,
    successPostChange :null,
    successPostRegister :null,
    successPostVerifyImage :null,
    errorPostChange :null,
    errorPostRegister :null,
}

const user = (state = initState, action) => {
    const us =  JSON.parse(localStorage.getItem("currentUser"))
    if(us)
    {
        state.user =us;
    }
    switch(action.type){
        case Types.GET_USER_BY_EMAIL :
            const {data} = action.data;
            console.log(data)
            state.user = data;
            localStorage.setItem("currentUser",JSON.stringify(data));
            console.log("get user")
            return {...state}

        case Types.RESET_STATE_USER :
            console.log("reset")
            state.successLogin = null
            state.successForgotPassword = null
            state.successCheckToken  = null
            state.successPostChange  = null
            state.successPostRegister  = null
            state.successPostVerifyImage = null;
            state.errorPostChange  = null
            state.errorPostRegister  = null
            return {...state}

        case Types.POST_VERIFY_IMAGE :
            console.log(action.data)
            if(action.data.success===true)
            {
                console.log("sdasd")
                state.successPostVerifyImage=true;
                return {...state}
            }
            else
            {
                state.successPostVerifyImage=false;
                return {...state}
            }

        case Types.REFRESH_USER :
            console.log(action.data)

        case Types.POST_LOGIN:
            if(action.data.success===true)
            {
                state.user = action.data.user ;
                state.successLogin = true;
                localStorage.setItem("currentUser",JSON.stringify(action.data.user))
                console.log("cap nhat state")
                return {...state}
            }
            else
            {
                localStorage.removeItem("currentUser")
                state.user = null ;
                state.successLogin=false;
                return {...state}
            }
            return {...state}

        case Types.LOGOUT :
            localStorage.removeItem("currentUser")
            state.user = null ;
            state.successLogin=null;
            return {...state}

        case Types.FORGOT_PASSWORD:
            if(action.data.success===true){
                state.successForgotPassword = true;
                
                return {...state}
            }
            else{
                state.successForgotPassword = false;
                return {...state}
            }
            return {...state}

        case Types.POST_CHECK_TOKEN :
            if(action.data.success===true){            
                state.successCheckToken = true;
                return {...state}
            }
            if(action.data.success===false){
                state.successCheckToken = false;
                return {...state}
            }
            return {...state}

        case Types.POST_CHANGE_PASSWORD :
           
            if(action.data.success === true)
            {
                state.user = null;
                localStorage.removeItem("currentUser")
                state.successPostChange=true;
            }
            else{
                state.successPostChange=false;
                state.errorPostChange = action.data.errors;
            }
            return {...state}

        //register

        case Types.POST_REGISTER :
            if(action.data.success===true){
                state.errorPostRegister = null;
                state.successPostRegister =true;
            }
            else{
                state.successPostRegister =false;
                state.errorPostRegister = action.data.errors;
            }
            return {...state}

        default:
            return {...state}
    }
};
export default user;