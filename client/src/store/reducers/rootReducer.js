import transaction from './transaction';
import savingAccount from './savingAccount';
import user from './user';
import account from './account'
import admin from './admin';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    transaction,
    savingAccount,
    user,
    account,
    admin,
});

export default rootReducer;