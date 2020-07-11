import {
    post,
    patch,
    get,
    urlSignIn,
    urlRegisterUser,
    urlListTask,
    urlCreateTask,
    urlStatusTask,
    urlCreatePending,
    urlDeletePending,
    urlListPending,
    urlValidateTask,
    urlLogout
} from '../apis';

export default {
    signIn: data => post(urlSignIn, data),
    registerUser: data => post(urlRegisterUser, data),
    listTask: data => get(urlListTask),
    createTask: data => post(urlCreateTask, data),
    statusTask: data => patch(urlStatusTask, data),
    createPending: data => post(urlCreatePending, data),
    deletePending: data => post(urlDeletePending, data),
    listPending: data => post(urlListPending, data),
    validateTask: data => get(urlValidateTask),
    logout: () => post(urlLogout)
    };