import transaction from './transaction';
import user from './user';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    transaction,
    user,
    
});

export default rootReducer