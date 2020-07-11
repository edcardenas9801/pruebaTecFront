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
                    Nuevo pendiente
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <div>
                        <Field
                            label="Nombre"
                            name={FIELDS.name}
                            component={RenderField}
                            validate={VALIDATIONS[FIELDS.name]}
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
                            Crear
                        </Button>
                    </div>
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
