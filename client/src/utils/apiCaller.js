import axios from "axios";
import * as env from "../constants/Config";

export const callApi = (endpoint, method="GET", body) => {
    return axios({
        method,
        url: `${env.BASE_URL}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.err(err);
    });
}