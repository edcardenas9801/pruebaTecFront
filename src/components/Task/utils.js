import {getSubmitInfo, responseAPI, catchFormError} from "../utils";
import evolutionServices from "../../services/evolutionServices";

const onSubmit = (values) => {
    const formValues = getSubmitInfo(values);
    formValues["id_user"] = sessionStorage.id;
    return evolutionServices.createTask(formValues).then(({data}) => {
        responseAPI(data);
    }).catch(catchFormError);

};
export {onSubmit};