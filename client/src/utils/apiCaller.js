import axios from 'axios';
import * as Config from '../constants/Config'
var qs = require('qs');

export default function callApi(endpoint, method = 'GET', body){

    if(method==="PUT")
    {
        var data = qs.stringify({
            'amount': body
        });
        return axios({
            method: method,
            url: `${Config.API_URL}/${endpoint}`,
            headers: { 
                'amount': '2000000', 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            data: data
        }).catch(err => {
            console.log(err);
        });
    }

    return axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body,
        
    }).catch(err => {
        console.log(err);
    });
};

