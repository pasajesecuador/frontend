import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

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
  tableUp: {
    '&::-webkit-scrollbar': {
      width: 3,
      height: 3
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgb(0, 0, 0)'
    }
  }
});

function statusCard(value) {
  switch (value) {
    case 'Approved':
      return 'Aprobado';
    case 'Rejected':
      return 'Rechazado';
    default:
      return 'Pendiente';
  }
}

function compare( a, b ) {
  if ( b.billing.date < a.billing.date ){
    return -1;
  }
  if ( b.billing.date > a.billing.date ){
    return 1;
  }
  return 0;
}

export default function CustomizedTableTicket(props) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.tableUp} component={Paper} style={{maxHeight:500,overflow:'auto'}}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Estado</StyledTableCell>
            <StyledTableCell>Asiento #</StyledTableCell>
            <StyledTableCell>Origen</StyledTableCell>
            <StyledTableCell>Destino</StyledTableCell>
            <StyledTableCell>Fecha</StyledTableCell>
            <StyledTableCell>Hora</StyledTableCell>
            <StyledTableCell>Fecha de compra</StyledTableCell>
            <StyledTableCell>Operadora</StyledTableCell>
            <StyledTableCell>Precio</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.props !== undefined && props.props.sort(compare).map((row, index) => (
            <StyledTableRow key={index} style={row.billing.status.trim() === 'PENDING' ? {boxShadow:'0 1px 12px 1px #ffa000'} : null}>
              <StyledTableCell component="th" scope="row" 
                style={row.billing.status.trim() === 'PENDING' ? 
                  {color:'#ffa000'} : 
                  {color: row.billing.status.trim() === 'Rejected' ? 'red' : 'green'}}>
                {statusCard(row.billing.status)}
              </StyledTableCell>
              <StyledTableCell>{row.billing.plazas}</StyledTableCell>
              <StyledTableCell>{row.billing.origin}</StyledTableCell>
              <StyledTableCell>{row.billing.destiny}</StyledTableCell>
              <StyledTableCell>{moment(row.billing.date).format('DD/MM/YYYY')}</StyledTableCell>
              <StyledTableCell>{moment(row.billing.date).format('HH:mm')}</StyledTableCell>
              <StyledTableCell>{moment(row.billing.datebuy).fromNow()}</StyledTableCell>
              <StyledTableCell>{row.billing.operador}</StyledTableCell>
              <StyledTableCell>{row.billing.price}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}