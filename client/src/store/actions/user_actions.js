import axios from 'axios';
import {
    USER_LOGIN,
    USER_AUTH,
    USER_LOGOUT,
    REGISTER_USER,
    GENERATE_KEY,
    SUB_CHECK
} from '../types'



/*=============USER=================*/
export function loginUser({email, password}){
    console.log(email, password)
    const request = axios.post('/api/users/login', {email, password})
    .then(response => response.data)

    return{
        type: USER_LOGIN,
        payload:request
    }

}


export function registerUser({companyName, email, password}){
    console.log(companyName, email, password)
    const request = axios.post('/api/users/register', {companyName,email, password})
    .then(response => response.data)

    return{
        type: REGISTER_USER,
        payload:request
    }

}

export function auth(){
    const request = axios.get('/api/users/auth').then(response => response.data);
    return{
        type:USER_AUTH,
        payload:request
    }
}


export function generateKey(){

    console.log('Generating Key')
    const request = axios.get('/api/users/apiKey')
    .then(response => response.data)

    return{
        type: GENERATE_KEY,
        payload:request
    }

}


//// Subcriptions Status Check

export const subCheck = async () =>{

    console.log('Called Sub Check')

    const { data } = await axios.get('/api/stripe/subscription-status');
    console.log("SUBSCRIPTION STATUS => ", data);

    return{
        type: SUB_CHECK,
        payload: data
    }

}





export function logoutUser(){
    const request = axios.get('/api/users/logout')
        .then(response => {
                return false
            });
    return{
        type: USER_LOGOUT,
        payload:request
    }
}