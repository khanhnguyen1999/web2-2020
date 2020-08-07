import * as Types from '../../constants/ActionTypes';
const initState = {}

const account = (state = initState, action) => {
    switch (action.type){
        
        case Types.GET_ACCOUNT:
            console.log(action.data)
            state=action.data
            return {...state}
        default :
            return {...state}
    }
}

export default account;