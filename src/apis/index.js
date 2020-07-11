import axios from 'axios';

const urlBase ='http://localhost:5000'
const post = async (urlRequest, dataRequest) => {
    const response = await axios({
        url: urlRequest,
        method: 'POST',
        contentType: 'application/json',
        data: dataRequest
    });
    return response;
};

const get = async (urlRequest, dataRequest) => {
    const response = await axios({
        url: urlRequest,
        method: 'GET',
        contentType: 'application/json',
        data: dataRequest
    });
    return response;
};

const patch = async (urlRequest, dataRequest) => {
    const response = await axios({
        url: urlRequest,
        method: 'PATCH',
        contentType: 'application/json',
        data: dataRequest
    });
    return response;
};
/*Autenticación*/
const urlSignIn = `${urlBase}/api/auth/login`;
const urlRegisterUser = `${urlBase}/api/auth/register-user`;
const urlLogout = `${urlBase}/api/auth/logout`;

/*Acciones de las tareas*/
const urlListTask = `${urlBase}/api/tics/listTask/${sessionStorage.id}`;
const urlCreateTask = `${urlBase}/api/tics/createTask`;
const urlStatusTask = `${urlBase}/api/tics/statusTask`;
const urlCreatePending = `${urlBase}/api/tics/createPending`;
const urlDeletePending = `${urlBase}/api/tics/deletePending`;
const urlListPending = `${urlBase}/api/tics/listPending`;
const urlValidateTask = `${urlBase}/api/tics/validateTask/${sessionStorage.id}`;

export {post, get, patch, urlSignIn, urlRegisterUser, urlListTask, urlCreateTask, urlStatusTask, urlCreatePending, urlDeletePending, urlListPending, urlValidateTask, urlLogout};