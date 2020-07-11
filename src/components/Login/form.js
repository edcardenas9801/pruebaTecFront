import React from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withStyles} from "@material-ui/core/styles";
import {useStyles, RenderField} from '../utils';
import {bool, object, string, func} from "prop-types";
import WithError from "../WithError";
import {Field,reduxForm} from "redux-form/immutable";
import {FIELDS, VALIDATIONS} from "./constants";
import FormHelperText from "@material-ui/core/FormHelperText";
import {Link} from 'react-router-dom';

 function Form({handleSubmit,error,classes,submitting}) {
    return (
        <Container component="main" maxWidth="xs" className={classes.body}>
            <CssBaseline />
            <div className={classes.paper}>
                <img className={classes.img} src='/images/fondo.jpg' alt='' />
                <Typography component="h1" variant="h5" className={classes.title}>
                    Evolution Tic's
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Field
                        label="Correo electrónico"
                        name={FIELDS.user}
                        component={RenderField}
                        validate={VALIDATIONS[FIELDS.user]}
                    />
                    <Field
                        label="Contraseña"
                        type= "password"
                        name={FIELDS.password}
                        component={RenderField}
                        validate={VALIDATIONS[FIELDS.password]}
                    />
                    {error && (
                        <FormHelperText className={classes.error}>{error}</FormHelperText>
                    )}
                    <Button
                        type="submit"
                        disabled={submitting}
                        fullWidth
                        variant="contained"
                        className={classes.submit}>
                        Ingresar
                    </Button>
                    <Link
                        to="/register"
                    >
                        ¿Aún no tienes cuenta? Regístrate
                    </Link>
                </form>
            </div>
        </Container>
    );
}
Form.defaultProps = {
    error: null
}
Form.propTypes = {
    error: string,
    classes: object.isRequired,
    handleSubmit: func.isRequired,
    submitting: bool.isRequired,
}
export default WithError(withStyles(useStyles)(reduxForm()(Form)));
