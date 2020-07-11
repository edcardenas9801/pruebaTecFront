import {getSubmitInfo, responseAPI, catchFormError} from "../utils";
import evolutionServices from "../../services/evolutionServices";

const onSubmit = (values, idTask) => {
    const formValues = getSubmitInfo(values);
    formValues["id_task"] = idTask;
    return evolutionServices.createPending(formValues).then(({data}) => {
        responseAPI(data);
    }).catch(catchFormError);

};
export {onSubmit};