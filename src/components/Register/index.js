import React from "react";
import Form from "./form";
import {connect} from "react-redux";
import {getFormValues} from "redux-form/immutable";
import {string,object} from "prop-types";
import {FORM_NAME,VALIDATIONS} from "./constants";
import {validate} from "../utils";
import {onSubmit} from "./utils";

function Register({error, history}) {
    const handleSubmit = values => onSubmit(values, history);
    return (
        <Form
            form={FORM_NAME}
            onSubmit={handleSubmit}
            error={error}
            validate={validate(VALIDATIONS)}
        />
    );
}
Register.defaultProps = {
    error: null,
    formValues: {}
}
Register.propTypes = {
    error: string,
    formValues: object,
    history: object
}
const mapStateToProps = state => ({
    formValues: getFormValues(FORM_NAME)(state)
});
export default connect(mapStateToProps)(Register);
