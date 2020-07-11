import {getSubmitInfo, responseAPI, catchFormError} from "../utils";
import evolutionServices from "../../services/evolutionServices";

const onSubmit = (values, history) => {
    const formValues = getSubmitInfo(values);
    return evolutionServices.registerUser(formValues).then(({data}) => {
       responseAPI(data, true, history);
    }).catch(catchFormError);

};
export {onSubmit};