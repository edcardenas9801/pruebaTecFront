import SwalAlert from 'sweetalert2';
import { SubmissionError } from 'redux-form/immutable'
import TextField from "@material-ui/core/TextField";
import React from "react";

const useStyles = theme => ({
    body: {
        backgroundColor: 'white',
        padding: '15px',
        maxWidth: '600px'
    },
    title: {
        fontFamily: 'cursive',
        color: '#5E6E95'
    },
    img: {
        width: '100px'
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#02a678ab',
        color: 'white',
        fontFamily: 'cursive',
    },
});

const fieldValidations = {
    required: value => (value == null || value === '' || !/\S/.test(value) ? 'Este campo es requerido' : undefined),
    email: value => (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Correo no válido' : undefined)
};

const RenderField = ({ input, label, name, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <TextField
                {...input} type={type}
                variant="outlined"
                margin="normal"
                fullWidth
                autoFocus
            />
            {touched &&
            ((error && <span style={{ color: 'red' }}>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
);

const validate = validations => () => {
    const errors = {};
    Object.keys(validations).forEach(item => {
        const itemValidation = Array.isArray(validations[item])
            ? validations[item].find(val => val !== null)
            : validations[item];
        if (typeof itemValidation !== "function") {
            errors[item] = itemValidation;
        }
    });
    return errors;
};
const modalMessage = (title, text, type, nameButton = 'Ok', isCancelButton = false, nameButtonCancel) => {
    const image = item => ({
        success: '/images/success.png',
        error: '/images/error.png'
    }[item]);
    const img = image(type);
    return SwalAlert.fire({
        imageUrl: img,
        imageWidth: 80,
        imageHeight: 80,
        title: title,
        text: text,
        showCancelButton: isCancelButton,
        cancelButtonText: nameButtonCancel,
        confirmButtonColor: '#673AB7',
        cancelButtonColor: '#424242',
        confirmButtonText: nameButton,
        allowEscapeKey: false,
        allowOutsideClick: false
    });
};

const getSubmitInfo = data => {
    const str = JSON.stringify(data,null,2);
    return JSON.parse(str)
};

const catchFormError = error => {
    const errorMsg = error && error.response
        ? error.response.data
        && (error.response.data.error || error.response.data.mssg)
        : error.message;
    throw new SubmissionError({ _error: errorMsg });
};

const responseAPI = (data, register = false, history = {} ) => {
    switch (data.status) {
        case 200: {
            modalMessage('Acción exitosa', data.message, 'success');
            if(register){
                history.push('/')
            }else{
                setTimeout(function(){ window.location.reload(); }, 2000);
            }
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
}


export {validate, getSubmitInfo, modalMessage, catchFormError, useStyles, RenderField, responseAPI, fieldValidations};