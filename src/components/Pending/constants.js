import { fieldValidations } from "../utils";

const FORM_NAME = 'newPending';
const FIELDS = {
    name: 'name',
};

const VALIDATIONS = {
    [FIELDS.name]: fieldValidations.required,
};

export {FORM_NAME,FIELDS,VALIDATIONS};