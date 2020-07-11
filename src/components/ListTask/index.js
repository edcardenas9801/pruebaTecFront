import React, {useEffect, useState} from "react";
import {string,object} from "prop-types";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import evolutionServices from "../../services/evolutionServices";
import {catchFormError} from "../utils";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Moment from 'moment';
import Button from "@material-ui/core/Button";
import ModalPending from "../ModalPending";

function ListTask({ error }) {
    const [open, setOpen] = useState(false);
    const [idTask, setIdTask] = useState(null);
    const [data, setData] = useState([]);

    const getTask = () => {
        evolutionServices.listTask().then(({data}) => {
            setData(data.message);
        }).catch(catchFormError);
    }

    const viewTask = (id) => {
          setIdTask(id);
          setOpen(true);
    }

    const handleClose = () => {
        setOpen(!open);
    }

    useEffect(() => {
        getTask();
    }, []);


    return (
        <>
            {
                data.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Prioridad</TableCell>
                                    <TableCell>Fecha de vencimiento</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>--</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.priority}</TableCell>
                                        <TableCell align="right">{Moment(row.due_date).format('D MMM Y')}</TableCell>
                                        <TableCell align="right">{row.status === 1 ? 'Activo' : 'Cerrada'}</TableCell>
                                        <TableCell align="right"><Button onClick={() => viewTask(row.id)} startIcon={<VisibilityIcon />} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (<small>Aún no tienes tareas registradas.</small>)
            }
         <ModalPending
           open={open}
           idTask={idTask}
           handleClose={handleClose}
         />
    </>
    );
}
ListTask.defaultProps = {
    error: null
}
ListTask.propTypes = {
    error: string,
    history: object
}

export default ListTask;
