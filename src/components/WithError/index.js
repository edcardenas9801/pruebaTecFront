import React from 'react';
import { string, object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import useStyles from './utils';

function WithError(WrappedComponent) {
    function WrappedFunction({ error, classes, ...props }) {
        return error ? (
            <div className={classes.container}>
                <img className={classes.logo} src="/images/error.svg" alt="" />
                <h2>Error</h2>
                <p>{error}</p>
            </div>
        ) : (
            <WrappedComponent {...props} />
        );
    }
    WrappedFunction.defaultProps = {
        error: null
    };
    WrappedFunction.propTypes = {
        error: string,
        classes: object.isRequired
    };
    return withStyles(useStyles)(WrappedFunction);
}
export default WithError;