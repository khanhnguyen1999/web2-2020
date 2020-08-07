import transaction from './transaction';
import savingAccount from './savingAccount';
import user from './user';
import account from './account'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    transaction,
    savingAccount,
    user,
    account,
});

export default rootReducer;