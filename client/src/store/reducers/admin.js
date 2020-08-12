import * as Types from '../../constants/ActionTypes';
const initState = {
    listUser : {},
    listUserTransaction:null,
    accountUser:null,
    errorEditProfile : null,
}

export const Admin = (state = initState, action)=>{
    switch(action.type){
        case Types.GET_ALL_USER :
            console.log("reducer get all user");
            state.listUser = action.data;
            console.log(state.listUser);
            return {...state};
        
        case Types.RESET_ADMIN :
            console.log("reducer admin reset admin")
            state.errorEditProfile = null;
            return {...state};


        case Types.GET_USER_TRANSACTION :
            console.log("reducer get user transaction")
            console.log(action.data)
            state.listUserTransaction = action.data;
            return {...state};

        case Types.ADD_USER_AMOUNT :
            console.log("reducer add user amount")
            console.log(action.data)
            state.accountUser = action.data;
            return {...state};

        case Types.EDIT_USER_PROFILE :
            if(action.data.success===false){
                state.errorEditProfile = action.data.errors;
                return {...state}
            }
            state.errorEditProfile=true;
            console.log("reducer edit user profile")
            console.log(action.data)
            state.accountUser = action.data;
            return {...state};

        case Types.LOCK_USER :
            console.log("reducer lock user")
            console.log(action.data)
            state.accountUser = action.data;
            return {...state};

        case Types.ACCEPT_USER :
            console.log("accept lock user")
            console.log(action.data)
            state.accountUser = action.data;
            return {...state};

        case Types.DENY_USER :
            console.log("deny lock user")
            console.log(action.data)
            state.accountUser = action.data;
            return {...state};

        default :
            return {...state};
    }
}

export default Admin;