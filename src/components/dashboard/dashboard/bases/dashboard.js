import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Title from '../utils/title';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Commute';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function createData(ticket, buyer, quantity, total, date) {
  return { ticket, buyer, quantity, total, date };
}

const rows = [
  createData('A155', 'Sebastian Bash', 2, '$7.50 USD', '12/02/2021'),
  createData('B545', 'Roberto Carlo', 4, '$3.50 USD', '12/02/2021'),
  createData('T52', 'Juan Endes', 1, '$8.50 USD', '22/02/2021'),
  createData('A52', 'Johm Doe', 1, '$3.00 USD', '15/02/2021'),
  createData('T815', 'Dimitri Vlek', 2, '$5.00 USD', '21/02/2021'),
];

const useStyle = (theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  root1: {
    display: 'flex',
    padding: 5,
    justifyContent: 'space-around',
  },
  root2: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5
  },
  root3: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5
  },
  panelStats: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    boxShadow: '0 2px 12px 1px #c5c5c5',
    width: 200,
    padding: 20,
    borderRadius: 10,
    textAlign: 'center',
  },
  statsTitle: {
    width: '100%',
    margin: '15px 0', 
  },
  statsSub: {
    width: '50%',
    '&:nth-child(3)': {
      width: '100%'
    }
  },
  statsPer: {
    width: '50%',
  },
  titleRoot: {
    textAlign: 'left',
    width: '50%',
    padding: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  actions: {
    textAlign: 'right',
    width: '50%',
    padding: 15
  },
  paper: {
    width: '100%'
  },
  table: {
    minWidth: 700,
  },
  padding: {
    padding: 15,
  },
  listContainer: {
    width: '100%',
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class Dashboard extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div>
        <div style={{position:'relative'}}>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography>Pasajes</Typography>
            <Typography>Admin</Typography>
            <Typography>Dashboard</Typography>
          </Breadcrumbs>
        </div>
        <Title label='Panel de reportes' />
        <div className={classes.root}>
          <div className={classes.root1}>
            <div className={classes.panelStats}>
              <div className={classes.statsTitle}>
                <span>TOTAL DE INGRESOS</span>
              </div>
              <div className={classes.statsSub}>
                <span>$10,522.00</span>
              </div>
              <div className={classes.statsPer}>
                <span>+25%</span>
              </div>
            </div>
            <div className={classes.panelStats}>
              <div className={classes.statsTitle}>
                <span>TOTAL DE GASTOS</span>
              </div>
              <div className={classes.statsSub}>
                <span>$20,544.25</span>
              </div>
              <div className={classes.statsPer}>
                <span>+12%</span>
              </div>
            </div>
            <div className={classes.panelStats}>
              <div className={classes.statsTitle}>
                <span>GANANCIA NETA</span>
              </div>
              <div className={classes.statsSub}>
                <span>$5,412.87</span>
              </div>
              <div className={classes.statsPer}>
                <span>+5%</span>
              </div>
            </div>
            <div className={classes.panelStats}>
              <div className={classes.statsTitle}>
                <span>SUBSCRIPTORES</span>
              </div>
              <div className={classes.statsSub}>
                <span>1200</span>
              </div>
            </div>
          </div>
          <div className={classes.root2}>
            <div className={classes.titleRoot}>
              <span>Ultimas ventas</span>
            </div>
            <div className={classes.actions}>
              <MoreVertIcon />
            </div>
            <div className={classes.paper}>
              <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.padding}>Boleto</TableCell>
                      <TableCell className={classes.padding} align="right">Comprador</TableCell>
                      <TableCell className={classes.padding} align="right">Cantidad</TableCell>
                      <TableCell className={classes.padding} align="right">Total</TableCell>
                      <TableCell className={classes.padding} align="right">Fecha</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, key) => (
                      <TableRow key={key}>
                        <TableCell className={classes.padding} component="th" scope="row">
                          {row.ticket}
                        </TableCell>
                        <TableCell className={classes.padding} align="right">{row.buyer}</TableCell>
                        <TableCell className={classes.padding} align="right">{row.quantity}</TableCell>
                        <TableCell className={classes.padding} align="right">{row.total}</TableCell>
                        <TableCell className={classes.padding} align="right">{row.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div className={classes.root3}>
            <div className={classes.titleRoot}>
              <span>Actividad</span>
            </div>
            <div className={classes.actions}>
              <MoreVertIcon />
            </div>
            <div className={classes.listContainer}>
              <List className={classes.list}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Sebastian Velasco" secondary="1717781054" />
                  <ListItemSecondaryAction>
                    <span>23 minutes</span>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Luis Borja" secondary="1702452175" />
                  <ListItemSecondaryAction>
                    <span>23 minutes</span>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Roberto Lopex" secondary="0400547452" />
                  <ListItemSecondaryAction>
                    <span>23 minutes</span>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(useStyle, {theme: true})(Dashboard);