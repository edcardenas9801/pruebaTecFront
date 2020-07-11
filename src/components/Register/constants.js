import { fieldValidations } from "../utils";

const FORM_NAME = 'register';
const FIELDS = {
    name: 'name',
    user: 'user',
    password: 'password'
};

const VALIDATIONS = {
    [FIELDS.name]: fieldValidations.required,
    [FIELDS.user]: fieldValidations.required,
    [FIELDS.password]: fieldValidations.required,
};

export {FORM_NAME,FIELDS,VALIDATIONS};