import React, {useEffect, useState} from "react";
import {number, string, bool, func, object} from "prop-types";
import FormHelperText from "@material-ui/core/FormHelperText";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Modal from "@material-ui/core/Modal";
import evolutionServices from "../../services/evolutionServices";
import {catchFormError} from "../utils";
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import Pending from "../Pending";
import {useStyles} from './utils';
import {withStyles} from "@material-ui/core/styles";
import SwalAlert from 'sweetalert2';

function ModalPending({ error, idTask, open, handleClose, classes }) {
    const [data, setData] = useState([]);
    const [newPending, setNewPending] = useState(false);
    const [titleNewPending, setTitleNewPending] = useState('Nuevo pendiente');

    const finallyTask = (id) => {
        SwalAlert.fire({
            title: '¿Seguro que deseas eliminar?',
            text: "Después de eliminar esta tarea, no habrá forma de recuperarla.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#02a678ab',
            cancelButtonColor: '#efa1a1',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                const body = {
                    id: id
                }
                evolutionServices.deletePending(body).then(({data}) => {
                    setData(data.message);
                }).catch(catchFormError);
            }
        })
    }

    const getPendings = () => {
        const body = {
            id: idTask
        }
        evolutionServices.listPending(body).then(({data}) => {
            setData(data.message);
        }).catch(catchFormError);
    }

    const handleOpenNewPending = async () => {
        setNewPending(!newPending);
        if(newPending){
            setTitleNewPending('Nuevo pendiente');
        }else{
            setTitleNewPending('Cerrar');
        }
    }

    useEffect(() => {
        getPendings();
    }, [open]);


    return (
           <Modal
               open={open}
               onClose={handleClose}
               className={classes.modal}
           >
               <div className={classes.container}>
                   <Button
                       type="button"
                       fullWidth
                       variant="contained"
                       onClick={handleOpenNewPending}
                       className={classes.button}
                       startIcon={<AlarmOnIcon/>}
                   >
                       {titleNewPending}
                   </Button>

                   {
                       newPending && (<Pending idTask={idTask}/>)
                   }
                   {
                       data.length > 0 ? (
                           <TableContainer component={Paper}>
                               <Table aria-label="simple table">
                                   <TableHead>
                                       <TableRow>
                                           <TableCell>Nombre</TableCell>
                                           <TableCell>--</TableCell>
                                       </TableRow>
                                   </TableHead>
                                   <TableBody>
                                       {data.map((row) => (
                                           <TableRow key={row.name}>
                                               <TableCell>{row.name}</TableCell>
                                               <TableCell><Button onClick={() => finallyTask(row.id)} startIcon={<CheckCircleOutlineIcon />} /></TableCell>
                                           </TableRow>
                                       ))}
                                   </TableBody>
                               </Table>
                           </TableContainer>
                       ) : (<small>Aún no tienes pendientes.</small>)
                   }
               {error && (
                   <FormHelperText>{error}</FormHelperText>
               )}
               </div>
           </Modal>
    );
}

ModalPending.defaultProps = {
    error: null,
    idTask: undefined
}

ModalPending.propTypes = {
    error: string,
    open: bool,
    idTask: number,
    handleClose: func,
    classes: object
}

export default withStyles(useStyles)(ModalPending);
