import { stringArrayToObject } from "./utils";

export const actions = stringArrayToObject([
    'GET_LOGIN',
    'LOGIN_SUCCESS',
    'LOGIN_FAILURE'
],
'@@LOGIN'
)