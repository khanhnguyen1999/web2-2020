import axios from 'axios';
import * as Config from '../constants/Config'   
export default function callApiImage( endpoint,method = 'POST',formData){
    console.log(formData)
    return axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data' }
        })    
      

}