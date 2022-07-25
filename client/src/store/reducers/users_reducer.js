import { USER_LOGIN, USER_AUTH, USER_LOGOUT, REGISTER_USER, GENERATE_KEY, SUB_CHECK } from "../types";

export default function(state={}, action){
    switch(action.type){
        case USER_LOGIN:
            return {...state, auth: action.payload.auth, userData: action.payload.userData}
        case USER_AUTH:
            return {...state,
                 auth: action.payload.auth ? action.payload.auth:false,
                 userData:action.payload.userData ? action.payload.userData:false
                }
        case REGISTER_USER:
            return {...state, auth: action.payload.auth, userData: action.payload.userData}
        case GENERATE_KEY:
            return {...state, auth: action.payload.auth, userData: action.payload.userData}
        case SUB_CHECK:
            return {...state, auth: action.payload.auth, userData: action.payload.userData }
        case USER_LOGOUT:
            return{...state, auth: action.payload, userData:false}
        default: 
            return state;
    }
}