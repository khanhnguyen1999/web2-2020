import callApi from '../../utils/apiCaller';
import * as Types from '../../constants/ActionTypes';


export const actFetchSavingAccount = (userId) => {
    console.log(userId)
    return dispatch => {
        return callApi('saving/getInformation', 'POST', { userId })
        .then(res => {
            console.log(res.data)
            dispatch({type:Types.FETCH_SAVING_ACCOUNT,data:res.data});
        })
        .catch(err => {
            console.log("loi")
            dispatch({type:Types.FETCH_SAVING_ACCOUNT_ERROR});
        });
    };
}

export const actGetSavingDetail = (id) => {
    console.log(id)
    return {
        type:Types.GET_SAVING_DETAIL,
        id,
    }
}

export const actOnFinalization = (userId) => {
    return dispatch => {
        return callApi('saving/onfinalization', 'POST', { userId })
        .then(res => {
            console.log(res.data)
            dispatch({type:Types.ON_FINALIZATION,data:res.data});
        })
        .catch(err => {
            console.log("loi")
            dispatch({type:Types.FETCH_SAVING_ACCOUNT_ERROR});
        });
    };
}

export const actPostVerifyFinalization = (data) => {
    return dispatch => {
        return callApi('saving/onfinalization/verify', 'POST', { data })
        .then(res => {
            console.log(res.data)
            dispatch({type:Types.POST_VERIFY_FINALIZATION,data:res.data});
        })
        .catch(err => {
            console.log("loi actPostVerifyFinalization")
            dispatch({type:Types.FETCH_SAVING_ACCOUNT_ERROR});
        });
    };
}
export const actPostInformationAddSaving = (data) => {
    return dispatch => {
        return callApi('saving/addSaving', 'POST', { data })
        .then(res => {
            console.log(res.data)
            dispatch({type:Types.POST_INFORMATION_ADD_SAING,data:res.data});
        })
        .catch(err => {
            console.log("loi actPostVerifyFinalization")
            dispatch({type:Types.FETCH_SAVING_ACCOUNT_ERROR});
        });
    };
}

export const actSwitchMovedAddSaving = () => {
    return {
        type:Types.SWITCH_MOVED_ADD_SAVING,
    }
}
export const actDeleteConfirmInfoAddSaving = () => {
    return {
        type:Types.DELETE_CONFIRMINFO_ADD_SAVING,
    }
}

export const actPostVerifyAddSaving = (data) => {
    return dispatch => {
        return callApi('saving/addSaving/verify', 'POST', {data})
        .then(res => {
            console.log(res.data)
            dispatch({type:Types.POST_VERIFY_ADD_SAVING,data:res.data});
        })
        .catch(err => {
            console.log("loi")
            dispatch({type:Types.POST_VERIFY_TRANSACTION_ERROR});
        });
    };
}
export const actSwitchVerifyFina = () => {
    return {
        type:Types.SWITCH_VERIFY_FINA,
    }
}
export const actSwitchVerifyAddSaving = () => {
    return {
        type:Types.SWITCH_VERIFY_ADD_SAVING,
    }
}