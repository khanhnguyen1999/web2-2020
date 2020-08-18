import * as Types from '../../constants/ActionTypes'
const initState = {
    account:{},
    listBank:{},
    errors:{},
    confirmInfo:{},
    movedOn:false,
    virify : false,
    listTransaction : {},
    
}

const transaction = (state = initState, action) => {
    switch(action.type){
        case Types.GET_INFORMATION_TRANSACTION:

            const { account , listBank} = action.data;
            state.errors = {};
            state.account = account;
            state.listBank = listBank;
            console.log(state)
            console.log(state.listBank)
            console.log({...state})
            
            
            return {
                ...state
            }
        case Types.POST_INFORMATION_TRANSACTION:
            state.errors = {};
            if(action.data.success===false)
            {
                const {errors}= action.data;
                state.errors =errors;
                console.log(state)
                return {...state}
            }
            else
            {
                const { confirmInfo } = action.data;
                
                state.confirmInfo = confirmInfo;
                state.movedOn = true;
                return {...state}
            }

        case Types.SWITCH_MOVED:
            console.log("da xoa confirminfo")
            state.movedOn = false;
            return {...state}

        case Types.SWITCH_VERIFY:
            console.log("da chuyen")
            state.virify = false;
            // state.confirmInfo = {};
            return {...state}

        case Types.DELETE_CONFIRMINFO:

            state.confirmInfo = {};
            return {...state}

        case Types.POST_VERIFY_TRANSACTION :
            if(action.data.success === true)
            {
                state.virify = true;
            }
            console.log("co update moved")
            return {...state}
        case Types.GET_LIST_TRANSACTION :
            state.listTransaction = action.data;
            return {...state}
        default:
            return {...state}
    }
};
  
export default transaction;