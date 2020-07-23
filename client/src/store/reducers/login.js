import * as Types from "../../constants/ActionTypes";

const initState = {
    username: "",
    password: "",
};

const login = (state = initState, action) => {
    switch (action.type) {
        case Types.POST_LOGIN:
            state = action.data;
            return { ...state };
        default:
            return { ...state };
    }
};
