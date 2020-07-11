import React, {useEffect, useState} from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withStyles} from "@material-ui/core/styles";
import {catchFormError, useStyles} from '../utils';
import {object, string} from "prop-types";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Task from "../Task";
import FormHelperText from "@material-ui/core/FormHelperText";
import ListTask from "../ListTask";
import evolutionServices from "../../services/evolutionServices";
import SwalAlert from 'sweetalert2';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Home({classes, history, error}) {

    const [newTask, setNewTask] = useState(false);
    const [titleNewTask, setTitleNewTask] = useState('Nueva tarea');

    const validateTask = () => {
        evolutionServices.validateTask().then(({data}) => {
            if(data.message.length !== 0){

                const Toast = SwalAlert.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 8500,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                        toast.addEventListener('mouseenter', SwalAlert.stopTimer)
                        toast.addEventListener('mouseleave', SwalAlert.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'info',
                    title: `Tienes ${data.message.length} tareas próximas a vencer`
                })

            }
        }).catch(catchFormError);
    }

    useEffect(() => {
        validateTask();
    }, []);

    const handleOpenNewTask = async () => {
          setNewTask(!newTask);
          if(newTask){
              setTitleNewTask('Nueva tarea');
          }else{
              setTitleNewTask('Cerrar');
        }
    };

    const handleLogout = () => {
        evolutionServices.logout().then(() => {
              history.push('/')
        }).catch(catchFormError);
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.body}>
            <CssBaseline />
            <div className={classes.paper}>
                <img className={classes.img} src='/images/fondo.jpg' alt='' />
                <Typography component="h1" variant="h5" className={classes.title}>
                    Bienvenido/a {sessionStorage.name}
                </Typography>
                <Button startIcon={<ExitToAppIcon/>} title="Salir" onClick={handleLogout} />
                <form className={classes.form}>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        onClick={handleOpenNewTask}
                        className={classes.submit}
                        startIcon={<BookmarkBorderIcon/>}
                    >
                        {titleNewTask}
                    </Button>

                    {
                        newTask && (<Task />)
                    }
                    <ListTask />
                    {error && (
                        <FormHelperText className={classes.error}>{error}</FormHelperText>
                    )}
                </form>
            </div>
        </Container>
    );
}

Home.defaultProps = {
    error: null
}

Home.propTypes = {
    error: string,
    classes: object.isRequired,
    history: object.isRequired
}
export default withStyles(useStyles)(Home);
