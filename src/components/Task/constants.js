import { fieldValidations } from "../utils";

const FORM_NAME = 'newTask';
const FIELDS = {
    name: 'name',
    priority: 'priority',
    due_date: 'due_date'
};

const VALIDATIONS = {
    [FIELDS.name]: fieldValidations.required,
    [FIELDS.priority]: fieldValidations.required,
    [FIELDS.due_date]: fieldValidations.required,
};

export {FORM_NAME,FIELDS,VALIDATIONS};