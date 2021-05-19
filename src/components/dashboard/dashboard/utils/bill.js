import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#282c34',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function compare( a, b ) {
  if ( b.status.date < a.status.date ){
    return -1;
  }
  if ( b.status.date > a.status.date ){
    return 1;
  }
  return 0;
}

function statusCard(value) {
  switch (value) {
    case 'APPROVED':
      return 'Aprobado';
    case 'REJECTED':
      return 'Rechazado';
    default:
      return 'Pendiente';
  }
}

export default function CustomizedTableTransaction(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Estado</StyledTableCell>
            <StyledTableCell>Metodo</StyledTableCell>
            <StyledTableCell>Recibo</StyledTableCell>
            <StyledTableCell>Referencia</StyledTableCell>
            <StyledTableCell>Fecha</StyledTableCell>
            <StyledTableCell>Descripción</StyledTableCell>
            <StyledTableCell>Monto USD</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.props !== undefined && props.props.sort(compare).map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {statusCard(row.status.status)}
              </StyledTableCell>
              <StyledTableCell>{row.payment !== null && row.payment[0].paymentMethodName}</StyledTableCell>
              <StyledTableCell>{row.payment !== null && row.payment[0].receipt}</StyledTableCell>
              <StyledTableCell>{row.request.payment.reference}</StyledTableCell>
              <StyledTableCell>{row.payment !== null && moment(row.payment[0].status.date).format('DD/MM/YYYY HH:mm')}</StyledTableCell>
              <StyledTableCell>{row.request.payment.description}</StyledTableCell>
              <StyledTableCell>${row.request.payment.amount.total}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}