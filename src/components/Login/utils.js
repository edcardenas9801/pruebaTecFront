import {getSubmitInfo, modalMessage, catchFormError} from "../utils";
import {FIELDS} from "./constants";
import evolutionServices from "../../services/evolutionServices";
import jwt_decode from "jwt-decode";

const onSubmit = (values, history) => {
    const formValues = getSubmitInfo(values);
    const body = {
        user: formValues[FIELDS.user],
        password: formValues[FIELDS.password]
    };
    return evolutionServices.signIn(body).then(({data}) => {
        switch (data.status) {
            case 200: {
                const decode = jwt_decode(data.token);
                sessionStorage.setItem("name", decode.name);
                sessionStorage.setItem("id", decode.id);
                sessionStorage.setItem("user", decode.user);
                modalMessage('Acción exitosa', data.message, 'success');
                history.push('/home');
                break;
            }
            case 500: {
                modalMessage('Error en el servidor', data.message, 'error');
                break;
            }
            default: {
                modalMessage('Algo salió mal', data.message, 'error');
                break;
            }
        }
    }).catch(catchFormError);

};
export {onSubmit};