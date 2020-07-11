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

 function Form({handleSubmit,error,classes,submitting}) {
    return (
        <Container component="main" maxWidth="xs" className={classes.body}>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" className={classes.title}>
                    Registrarse
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Field
                        label="Nombre completo"
                        name={FIELDS.name}
                        component={RenderField}
                        validate={VALIDATIONS[FIELDS.name]}
                    />
                    <Field
                        label="Correo electronico"
                        type="email"
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
                        Registrar
                    </Button>
                    <Button
                        type="button"
                        disabled={submitting}
                        fullWidth
                        variant="contained"
                        className={classes.submit}>
                        <a href="http://localhost:3000/">
                            Atrás
                        </a>
                    </Button>
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
