import callApi from '../../utils/apiCaller'
import * as Types from '../../constants/ActionTypes'

export const transaction = (data) => {
    return dispatch => {
        return callApi('transaction', 'POST', data).then(res => {
            console.log(res);
            // dispatch({type:Types.VERIFY,data:res.data});
        });
    };
}

export const actGetInformation = (userId) => {
    return dispatch => {
        return callApi('transaction/getInformation', 'POST', {userId})
        .then(res => {
            console.log(res.data)
            dispatch({type:Types.GET_INFORMATION_TRANSACTION,data:res.data});
        })
        .catch(err => {
            console.log("loi")
            dispatch({type:Types.GET_INFORMATION_TRANSACTION_ERROR});
        });
    };
}

export const actPostInformation = (data) => {
    return dispatch => {
        return callApi('transaction/postInformation', 'POST', {data})
        .then(res => {
            console.log(res.data)
            dispatch({type:Types.POST_INFORMATION_TRANSACTION,data:res.data});
        })
        .catch(err => {
            console.log("loi")
            dispatch({type:Types.POST_INFORMATION_TRANSACTION_ERROR});
        });
    };
}

export const actSwitchMoved = () => {
    return {
        type:Types.SWITCH_MOVED,
    }
}

export const actDeleteConfirmInfo = () => {
    return {
        type:Types.DELETE_CONFIRMINFO,
    }
}

export const actPostVerify = (data) => {
    return dispatch => {
        return callApi('transaction/verify', 'POST', {data})
        .then(res => {
            console.log(res.data)
            dispatch({type:Types.POST_VERIFY_TRANSACTION,data:res.data});
        })
        .catch(err => {
            console.log("loi")
            dispatch({type:Types.POST_VERIFY_TRANSACTION_ERROR});
        });
    };
}
export const actSwitchVerify = () => {
    return {
        type:Types.SWITCH_VERIFY,
    }
}

export const verify = (data) => {
    return dispatch => {
        return callApi('transaction', 'POST', data).then(res => {
            console.log(res);
            dispatch({type:Types.VERIFY,data:res.data});
        });
    };
}