import * as Types from '../../constants/ActionTypes'
const initState = {
    account:{},
    savingAccount,
    token:'',
    errors:{},
    movedOn:false,
    confirmInfo:{},
    verifyFina :null, 
    virify : false,
}

const savingAccount = (state = initState, action) => {
    switch(action.type){
        case Types.FETCH_SAVING_ACCOUNT:
            const { account , savingAccount} = action.data;
            state.errors = {};
            state.movedOn = false
            state.account = account;
            state.savingAccount = savingAccount;
            console.log({...state})
            return {
                ...state
            }

        case Types.GET_SAVING_DETAIL:
            const { id } = action;
            var saving;
            if(state.savingAccount)
            {
                state.savingAccount.map((x)=>{
                    if(id==x.id)
                    {
                        saving = x;
                    }
                })
                const userId = state.account.userId
                const accountNumber = state.account.accountNumber
                const obj = {userId,accountNumber}
                return {
                    ...saving,
                    ...obj,
               
                    
                }
            }
            return {
                ...state
            }
        case Types.ON_FINALIZATION:
            console.log(action.data)
            state.token = action.data;
            return {
                ...state
            }
        
        case Types.POST_VERIFY_FINALIZATION:
            console.log(action.data)
            state.verifyFina = true;
            return {
                ...state
            }

        case Types.SWITCH_VERIFY_FINA:
            state.verifyFina = null;
        
        case Types.POST_INFORMATION_ADD_SAING:
            // const {success} = action.data;
            console.log(action)
            if(action.data)
            {
                if(action.data.success===false)
                {
                    const {errors}= action.data;
                    state.errors =errors;
                    console.log(state)
                    return {...state}
                }
                else
                {
                    state.errors ={};
                    const { confirmInfo } = action.data;
                    state.confirmInfo = confirmInfo;
                    state.movedOn = true;
                    return {...state}
                }
            }
            
            
            return {
                ...state
            }
        
        case Types.SWITCH_MOVED_ADD_SAVING:
            console.log("SWITCH_MOVED_ADD_SAVING")
            state.movedOn = false;
            return {...state}

        case Types.SWITCH_VERIFY_ADD_SAVING:
            console.log("da chuyen SWITCH_VERIFY_ADD_SAVING")
            state.virify = null;
            state.confirmInfo ={};
            return {...state}

        case Types.DELETE_CONFIRMINFO_ADD_SAVING:

            state.confirmInfo = {};
            return {...state}

        case Types.POST_VERIFY_ADD_SAVING :
            if(action.data.success===true)
            {
                state.errors ={};
                state.virify = true;
                return {...state}
            }
            else
            {
                console.log("tao tktk that bai")
            }
            return {...state}

        default:
            return {...state}
    }
};
  
export default savingAccount;