import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeMenu} from '../../../../actions/drawer';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Logo from '../../assets/logo.png';
import UserProfile from '../../assets/icons/newUser';
import AppIcon from '../../assets/icons/appIcon';
import CityIcon from '../../assets/icons/cityIcon';
import CompanyIcon from '../../assets/icons/companyIcon';
import DashIcon from '../../assets/icons/dash';
import FleetIcon from '../../assets/icons/fleetIcon';
import PassengersIcon from '../../assets/icons/passengersIcon';
import RoutesIcon from '../../assets/icons/routesIcon';
import { Typography } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Badge from '@material-ui/core/Badge';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined';
//loadingRoutes
import Users from '../bases/users';
import Companies from '../bases/companies';
import DashboardBases from '../bases/dashboard';
import Apps from '../bases/apps';
import Cities from '../bases/cities';
import Fleet from '../bases/fleet';
import Groups from '../bases/groups';
import GroupsUsers from '../bases/groupsUsers';
import RoutesC from '../bases/routesC';
import Passengers from '../bases/passangers';

const drawerWidth = 260;

const useStyles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    background: '#282C34',
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: 5,
      height: 4
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  rightTools: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
  },
  userMenu: {
    padding: 10,
    cursor: 'pointer',
    marginLeft: 10
  },
  userMenuDrawer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px 0',
  },
  listTitle: {
    '& span': {
      color: '#767676',
      fontSize: 13,
      fontWeight: '600',
    }
  },
  listIcon: {
    minWidth: 30,
    marginLeft: 5,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
});


class navbar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      openList: false,
      profile: {}
    }
  }

  componentDidMount(){
    if(!this.props.auth.isAuthenticated){
      window.location.href = '/';
    }
  }

  static getDerivedStateFromProps(props, state){
    if(props.auth.isAuthenticated){
      return { profile: props.profile.profile }
    }
  }

  handleClick = () => {
    this.setState({
      openList: !this.state.openList
    });
  };

  routesChildrens = (state) => {
    switch (state) {
      case 1:
        return(
          <DashboardBases />
        )
      case 2:
        return(
          <Companies companies={this.props.common.companies} />
        )
      case 3:
        return(
          <RoutesC companies={this.props.common.companies} />
        )
      case 4:
        return(
          <Cities companies={this.props.common.companies} />
        )
      case 5:
        return(
          <Fleet companies={this.props.common.companies} />
        )
      case 6:
        return(
          <Passengers />
        )
      case 7:
        return(
          <Users />
        )
      case 8:
        return(
          <Apps />
        )
      case 9:
        return(
          <Groups />
        )
      case 10:
        return(
          <GroupsUsers />
        )
      default:
        break;
    }
  }
  
  render() {
    const {classes, drawer} = this.props;
    const {openList, profile} = this.state;
    return Object.values(profile).length > 0 ? (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <img style={{width: 30, height: 30}} src={Logo} alt='Logo' onClick={() => window.location.href = '/'} />
            <div className={classes.rightTools}>
              <div className={classes.userMenu}>
                <Brightness2OutlinedIcon style={{ fontSize: 27, color: '#fffffff' }} />
              </div>
              <div className={classes.userMenu}>
                <SettingsOutlinedIcon style={{ fontSize: 27, color: '#fffffff' }} />
              </div>
              <div className={classes.userMenu}>
                <Badge badgeContent={4} color="primary">
                  <NotificationsNoneOutlinedIcon style={{ fontSize: 27, color: '#fffffff' }} />
                </Badge>
              </div>
              <div className={classes.userMenu}>
                <UserProfile size='30px'/>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        {profile.rol === 3 ? null : (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <div className={classes.userMenuDrawer}>
              <div style={{cursor:'pointer'}} onClick={() => this.props.changeMenu(0)}>
                <UserProfile size='80px' border={true} background='#282C34' />
              </div>
              <div style={{marginTop: 15}}>
                <Typography>
                  Panel administrativo
                </Typography>
              </div>
            </div>
            <Divider />
            <List>
              <ListItem>
                <ListItemText className={classes.listTitle} primary='Reportes' />
              </ListItem>
              <ListItem button onClick={() => this.props.changeMenu(1)}>
                <ListItemIcon className={classes.listIcon} >
                  <DashIcon size={22} color='#141414' />
                </ListItemIcon>
                <ListItemText primary='Dashboard' />
              </ListItem>
              <ListItem>
                <ListItemText className={classes.listTitle} primary='Administración' />
              </ListItem>
              <ListItem button onClick={() => this.props.changeMenu(2)}>
                <ListItemIcon className={classes.listIcon} >
                  <CompanyIcon size={25} color='#141414' />
                </ListItemIcon>
                <ListItemText primary='Empresas' />
              </ListItem>
              <ListItem button onClick={() => this.props.changeMenu(3)}>
                <ListItemIcon className={classes.listIcon} >
                  <RoutesIcon size={22} color='#141414' />
                </ListItemIcon>
                <ListItemText primary='Rutas' />
              </ListItem>
              <ListItem button onClick={() => this.props.changeMenu(4)}>
                <ListItemIcon className={classes.listIcon} >
                  <CityIcon size={22} color='#141414' />
                </ListItemIcon>
                <ListItemText primary='Ciudades' />
              </ListItem>
              <ListItem button onClick={() => this.props.changeMenu(5)}>
                <ListItemIcon className={classes.listIcon} >
                  <FleetIcon size={22} color='#141414' />
                </ListItemIcon>
                <ListItemText primary='Flotas' />
              </ListItem>
              <ListItem button onClick={() => this.props.changeMenu(6)}>
                <ListItemIcon className={classes.listIcon} >
                  <PassengersIcon size={22} color='#141414' />
                </ListItemIcon>
                <ListItemText primary='Pasajeros' />
              </ListItem>
              <ListItem>
                <ListItemText className={classes.listTitle} primary='Panel' />
              </ListItem>
              <ListItem button onClick={this.handleClick}>
                <ListItemIcon className={classes.listIcon}>
                  <AppIcon size={22} color='#141414' />
                </ListItemIcon>
                <ListItemText primary="Aplicativo" />
                {openList ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              {openList ? (
                <div>
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() => this.props.changeMenu(7)}>
                      <ListItemText primary="Usuarios" />
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() => this.props.changeMenu(8)}>
                      <ListItemText primary="Boletos Vendidos" />
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() => this.props.changeMenu(9)}>
                      <ListItemText primary="Grupos" />
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() => this.props.changeMenu(10)}>
                      <ListItemText primary="Boletería" />
                    </ListItem>
                  </List>
                </div>
              ) : null}
            </List>
          </div>
        </Drawer>
        )}
        <main className={classes.content}>
          <Toolbar />
          {drawer.drawer === 0 ? this.props.children : this.routesChildrens(drawer.drawer)}
        </main>
      </div>
    ) : null;
  }
}

navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  changeMenu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  drawer: state.drawer,
  profile: state.profile,
  auth: state.auth,
  common: state.common,
});

export default compose(withStyles(useStyles, {theme: true}), connect(mapStateToProps, {changeMenu}))(navbar);