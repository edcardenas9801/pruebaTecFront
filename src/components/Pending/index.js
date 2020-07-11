import React from "react";
import Form from "./form";
import {connect} from "react-redux";
import {getFormValues} from "redux-form/immutable";
import {string, object, number} from "prop-types";
import {FORM_NAME,VALIDATIONS} from "./constants";
import {validate} from "../utils";
import {onSubmit} from "./utils";

function Pending({error, idTask}) {
    const handleSubmit = values => onSubmit(values, idTask);
    return (
        <Form
            form={FORM_NAME}
            onSubmit={handleSubmit}
            error={error}
            validate={validate(VALIDATIONS)}
        />
    );
}
Pending.defaultProps = {
    error: null,
    formValues: {}
}
Pending.propTypes = {
    error: string,
    formValues: object,
    idTask: number
}
const mapStateToProps = state => ({
    formValues: getFormValues(FORM_NAME)(state)
});
export default connect(mapStateToProps)(Pending);
