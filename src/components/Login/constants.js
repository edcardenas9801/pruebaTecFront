import { fieldValidations } from "../utils";

const FORM_NAME = 'login';
const FIELDS = {
    user: 'user',
    password: 'password'
};

const VALIDATIONS = {
    [FIELDS.user]: fieldValidations.required,
    [FIELDS.user]: fieldValidations.email,
    [FIELDS.password]: fieldValidations.required
};

export {FORM_NAME,FIELDS,VALIDATIONS};