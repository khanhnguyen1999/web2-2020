import { callApi } from "../../utils/apiCaller";
import * as Types from "../../constants/ActionTypes";

export const actGetLogin = (data) => {
    return {
        type: Types.GET_LOGIN,
        data,
    };
};

export const actPostLogin = (data) => {
    return (dispatch) => {
        return callApi("login", "POST", data).then((res) => {
            console.log(res);
        });
    };
};
