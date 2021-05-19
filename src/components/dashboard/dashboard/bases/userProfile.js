import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Title from '../utils/title';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import swal from 'sweetalert2';
import moment from 'moment';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CustomizedTableTicket from '../utils/ticketsTable';
import CustomizedBill from '../utils/bill';
import Visa from '../../assets/visa.png';
import Diners from '../../../templates/assets/Diners.svg';
import Master from '../../../templates/assets/mastercard.svg';
import CardDefault from '../../../templates/assets/cardDefault.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  maincontainer: {
    padding: 0,
    width: '100%',
  },
  savesChanges: {
    float: 'right',
  },
  titleTickets: {
    marginTop: 50,
  },
  cardstyle: {
    background: '#ffffff',
    borderRadius: 20,
    marginTop: 15,
    boxShadow: '0 2px 12px 1px rgba(0, 0, 0, 0.10)'
  }
}));

function picCard(params) {
  switch (params) {
    case 'visa':
      return Visa;  
    case 'diners':
      return Diners;
    case 'master':
      return Master;
    default:
      return CardDefault;
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box m={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function UserProfile(props) {
  const [rol] = React.useState(props.profile.rol);
  const [id] = React.useState(props.profile.id);
  const [profile, setProfile] = React.useState({});
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const cancelBtn = (lastNumbers) => {
    const last = {
      item: lastNumbers,
    };
    swal.fire({
      title: '¿Estas seguro de eliminar esta tarjeta?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      icon: 'question'
    }).then(result => {
      if(result.isConfirmed) {
        axios.post(`/api/auth/card/delete/update/${id}`, last).then(res => {
          if(res.status === 200) {
            swal.fire('OK', 'Tu tarjeta ha sido eliminada exitosamente', 'success').then(() => {
              window.location.reload();
            });
          }
        })
      } else if(result.isDenied) {
        swal.fire('OK', 'Tu tarjeta no se ha eliminado', 'info');
      }
    });
  }

  React.useEffect(() => {
    axios.get(`/api/auth/profile/billing/${id}`).then(res => {
      setProfile(res.data);
    })
  }, [id])

  return (
    <div>
      <div style={{position:'relative'}}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography>Pasajes</Typography>
          <Typography>Admin</Typography>
          <Typography>Cuenta</Typography>
        </Breadcrumbs>
      </div>
      <Title label='Perfil de usuario' />
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        {rol === 3 ? (
        <Tab label="Compras" {...a11yProps(0)} />
        ) : null}
        <Tab label="General" {...a11yProps(1)} />
        <Tab label="Seguridad" {...a11yProps(2)} />
      </Tabs>
      {rol === 3 ? (
      <TabPanel value={value} index={0}>
        <CustomizedTableTicket props={profile.billings} />
        <h3 className={classes.titleTickets}>Tarjetas de credito</h3>
        {profile.subcription !== undefined && profile.subcription.map((card, index) =>
          <List className={classes.cardstyle} dense={true} key={index}>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{background:'#ffffff'}}>
                  <img width='100%' src={picCard(card.instrument[2].value)} alt='visa' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Tarjeta ${card.instrument[3].value}`}
                secondary={card.instrument[4].value}
              />
              <ListItemText
                primary="Numero de tarjeta"
                secondary={`xxxx-xxxx-xxxx-${card.instrument[5].value}`}
              />
              <ListItemText
                primary="Fecha de expiración"
                secondary={moment(card.instrument[6].value).format('MM/YY')}
              />
              <ListItemText
                primary="CVV"
                secondary="xxx"
              />
              {Object.values(props.profile.pendient).length > 0 ? null : (
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={(e) => cancelBtn(card.instrument[5].value)}>
                  <DeleteIcon color='error' />
                </IconButton>
              </ListItemSecondaryAction>
              )}
            </ListItem>
          </List>
        )}
        <h3 className={classes.titleTickets}>Historial de transacciones</h3>
        <CustomizedBill props={profile.collects} />
      </TabPanel>
      ) : null}
      <TabPanel value={value} index={rol === 3 ? 1 : 0}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid className={classes.maincontainer} container spacing={2}>
            <Grid className={classes.maincontainer} item xs={12}>
              <Box component='h2'>Perfil</Box>
            </Grid>
            <Grid className={classes.maincontainer} item xs={12} sm={6}>
              <TextField label="Nombre" variant="outlined" fullWidth={true} />
            </Grid>
            <Grid className={classes.maincontainer} item xs={12} sm={6}>
              <TextField label="Apellido" variant="outlined" fullWidth={true} />
            </Grid>
            <Grid className={classes.maincontainer} item xs={12} sm={6}>
              <TextField label="Documento" variant="outlined" fullWidth={true} />
            </Grid>
            <Grid className={classes.maincontainer} item xs={12} sm={6}>
              <TextField label="Identificación" variant="outlined" fullWidth={true} />
            </Grid>
            <Grid className={classes.maincontainer} item xs={12} sm={6}>
              <TextField label="Email" variant="outlined" fullWidth={true} />
            </Grid>
            <Grid className={classes.maincontainer} item xs={12} sm={6}>
              <TextField label="Pais" variant="outlined" fullWidth={true} />
            </Grid>
            <Grid className={classes.maincontainer} item xs={12} sm={6}>
              <TextField label="Ciudad" variant="outlined" fullWidth={true} />
            </Grid>
            <Grid className={classes.maincontainer} item xs={12} sm={6}>
              <TextField label="Celular" variant="outlined" fullWidth={true} />
            </Grid>
            <Grid className={classes.maincontainer} item xs={12} sm={6}>
              <TextField label="Sexo" variant="outlined" fullWidth={true} />
            </Grid>
            <Grid className={classes.maincontainer} item xs={12} sm={6}>
              <TextField label="Fecha de nacimiento" variant="outlined" fullWidth={true} />
            </Grid>
            <Grid className={classes.maincontainer} item xs={12} sm={12}>
              <Button className={classes.savesChanges} variant="outlined" color="primary">Guardar cambios</Button>
            </Grid>
          </Grid>
        </form>
      </TabPanel>
      <TabPanel value={value} index={rol === 3 ? 2 : 1}>
        <Grid className={classes.maincontainer} container spacing={2}>
          <Grid className={classes.maincontainer} item xs={12}>
            <Box component='h2'>Cambiar contraseña</Box>
          </Grid>
          <Grid className={classes.maincontainer} item xs={12} sm={6}>
            <TextField label="Nueva contraseña" variant="outlined" fullWidth={true} />
          </Grid>
          <Grid className={classes.maincontainer} item xs={12} sm={6}>
            <TextField label="Repetir contraseña" variant="outlined" fullWidth={true} />
          </Grid>
          <Grid className={classes.maincontainer} item xs={12} sm={12}>
            <Button className={classes.savesChanges} variant="outlined" color="primary">Guardar cambios</Button>
          </Grid>
        </Grid>
      </TabPanel>
    </div>
  )
}
