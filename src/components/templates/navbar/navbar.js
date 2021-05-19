import React, { Component } from 'react';
import LoginIcon from '../assets/svg/login.svg';
import HelpIcon from '../assets/svg/question.svg';
import LogoN from '../assets/logo_negro.png';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import BusIcon from '../assets/svg/bus.svg';
import LuggageIcon from '../assets/svg/luggage.svg';
import ActivityIcon from '../assets/svg/playa.svg';
import TripIcon from '../assets/svg/destination.svg';
import RouteIcon from '../assets/svg/signpost.svg';
import LanguageWorldIcon from '../assets/svg/world.svg';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LogoOnlyP from '../assets/logoP.png';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import StoreIcon from '@material-ui/icons/Store';
import {motion} from 'framer-motion';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import InputIcon from '@material-ui/icons/Input';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import TripOriginIcon from '@material-ui/icons/TripOrigin';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import LanguageIcon from '@material-ui/icons/Language';
import LogoFull from '../assets/logo_svg.js';
import spanishFlag from '../assets/regions/spain.svg';
import englishFlag from '../assets/regions/english-language.svg';

export default class navbar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      activeModalProfile: false,
      value: 0,
      drawerMenu: false,
      activeModalLanguage: false
    }
  }

  openDraw = () => {
    this.setState({
      drawerMenu: !this.state.drawerMenu
    })
  }
  
  render() {
    const {classes, history, auth, logoutUser, profile, setEs, setEn} = this.props.props;
    const { i18 } = this.props;
    const { activeModalProfile, value, drawerMenu, activeModalLanguage } = this.state;
    const variants = {
      visible: { x: 0 },
      hidden: { x: -260 },
    }
    return (
      <>
      <div className={classes.NavbarContainer}>
        <div className={classes.nav1}>
          <div className={classes.logoDiv}onClick={() => window.location.href = '/'}>
            <img className={classes.logoImg} src={LogoN} alt='logo' />
          </div>
          <div className={classes.navAuth}>
            {auth.isAuthenticated ? (
              <div className={classes.navAuthContainer}>
                <div className={classes.iconDiv}>
                  <AccountCircleIcon />
                </div>
                <div className={classes.textAuth} onClick={() => this.setState({activeModalProfile: !activeModalProfile})}>{i18.profile}</div>
                {activeModalProfile ? (
                  <div className={classes.boxProfileModal}>
                    <div className={classes.boxModalProfileItem}
                      onClick={() => history.push('/admin/pasajes/operator')}>{profile.profile.rol === 3 ? i18.travels : i18.admin}</div>
                    <div className={classes.boxModalProfileItem} style={{color:'red'}}
                      onClick={() => logoutUser()}>{i18.logout}</div>
                  </div>
                ) : null}
              </div>
            ) : (
              <>
              <div className={classes.navAuthContainer}>
                <div className={classes.iconDiv}>
                  <img className={classes.iconSvgSize} src={LoginIcon} alt='icons'/>
                </div>
                <div className={classes.textAuth} onClick={() => history.push('/app/login')}>{i18.login}</div>
              </div>
              <div className={classes.navAuthContainer}>
                <div className={classes.iconDiv}>
                  <GroupAddIcon />
                </div>
                <div className={classes.textAuth} onClick={() => history.push('/app/register')}>{i18.register}</div>
              </div>
              </>
            )}
            <div className={classes.navAuthContainer}>
              <div className={classes.iconDiv}>
              <img className={classes.iconSvgSize} src={HelpIcon} alt='icons'/>
              </div>
              <div className={classes.textAuth}>{i18.help}</div>
            </div>
          </div>
        </div>
        <div className={classes.nav2}>
          <div className={classes.nav2Container}>
            <div className={classes.menuI}>
              <div className={classes.iconContainer}>
                <div className={classes.iconNavMenu}>
                  <img className={classes.logoIconMenu} src={BusIcon} alt='bus' />
                </div>
                <div className={classes.textNavMenu}>{i18.tickets}</div>
                <div className={classes.lineMenu} />
              </div>
            </div>
            <div className={classes.menuI}>
              <div className={classes.iconContainer}>
                <div className={classes.iconNavMenu}>
                  <img className={classes.logoIconMenu} src={LuggageIcon} alt='trips' />
                </div>
                <div 
                  className={classes.textNavMenu}
                  onClick={auth.isAuthenticated ? () => history.push('/admin/pasajes/operator') : () => history.push('/app/login')}>
                  {i18.travels}
                </div>
              </div>
            </div>
            <div className={classes.menuI}>
              <div className={classes.iconContainer}>
                <div className={classes.iconNavMenu}>
                  <img className={classes.logoIconMenu} src={ActivityIcon} alt='activity' />
                </div>
                <div className={classes.textNavMenu}>{i18.activities}</div>
              </div>
            </div>
            <div className={classes.menuI}>
              <div className={classes.iconContainer}>
                <div className={classes.iconNavMenu}>
                  <img className={classes.logoIconMenu} src={TripIcon} alt='tripsR' />
                </div>
                <div className={classes.textNavMenu}>{i18.routes}</div>
              </div>
            </div>
            <div className={classes.menuI}>
              <div className={classes.iconContainer}>
                <div className={classes.iconNavMenu}>
                  <img className={classes.logoIconMenu} src={RouteIcon} alt='routes' />
                </div>
                <div className={classes.textNavMenu}>{i18.trips}</div>
              </div>
            </div>
            <div className={classes.menuI}>
              <div className={classes.iconContainer} style={{position:'relative'}}>
                <div className={classes.iconNavMenu}>
                  <img className={classes.logoIconMenu} src={LanguageWorldIcon} alt='world' />
                </div>
                <div className={classes.textNavMenu} onClick={() => this.setState({activeModalLanguage: !activeModalLanguage})}>{i18.lang}</div>
                {activeModalLanguage ? (
                  <div className={classes.boxProfileModal} style={{left:-30,top:65}}>
                    <div className={classes.boxModalProfileItem} style={{display:'flex',justifyContent:'space-around'}}
                      onClick={() => {setEs(); window.location.reload()}}>
                        <div><img src={spanishFlag} alt='flag' width={24} /></div><div>{i18.es}</div>
                      </div>
                    <div className={classes.boxModalProfileItem} style={{display:'flex',justifyContent:'space-around'}}
                      onClick={() => {setEn(); window.location.reload()}}>
                        <div><img src={englishFlag} alt='flag' width={24} /></div><div>{i18.en}</div>
                      </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.menuMobileBack} onClick={this.openDraw} style={drawerMenu ? {display:'block'} : {display:'none'}} />
      {drawerMenu ? (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{duration:0.5}}
        className={classes.menuMobile}>
        <div style={{margin:5}}>
          <LogoFull />
        </div>
        <List component="nav" aria-label="main mailbox folders">
          {auth.isAuthenticated ? (
            <ListItem button style={{padding:'15px 20px'}} onClick={() => window.location.href = '/admin/pasajes/operator'}>
              <ListItemIcon>
                <GroupAddIcon />
              </ListItemIcon>
              <ListItemText primary={i18.profile} />
            </ListItem>
          ) : (
            <>
            <ListItem button style={{padding:'15px 20px'}} onClick={() => window.location.href = '/app/login'}>
              <ListItemIcon>
                <InputIcon />
              </ListItemIcon>
              <ListItemText primary={i18.login} />
            </ListItem>
            <ListItem button style={{padding:'15px 20px'}} onClick={() => window.location.href = '/app/register'}>
              <ListItemIcon>
                <GroupAddIcon />
              </ListItemIcon>
              <ListItemText primary={i18.register} />
            </ListItem>
            </>
          )}
          <ListItem button style={{padding:'15px 20px'}}>
            <ListItemIcon>
              <PersonPinCircleIcon />
            </ListItemIcon>
            <ListItemText primary={i18.activities} />
          </ListItem>
          <ListItem button style={{padding:'15px 20px'}}>
            <ListItemIcon>
              <TripOriginIcon />
            </ListItemIcon>
            <ListItemText primary={i18.routes} />
          </ListItem>
          <ListItem button style={{padding:'15px 20px'}}>
            <ListItemIcon>
              <DirectionsBusIcon />
            </ListItemIcon>
            <ListItemText primary={i18.trips} />
          </ListItem>
          <ListItem button style={{padding:'15px 20px'}}>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary={i18.lang} />
          </ListItem>
          <ListItem button style={{padding:'15px 20px'}}>
            <ListItemIcon>
              <TouchAppIcon />
            </ListItemIcon>
            <ListItemText primary={i18.getitapp} />
          </ListItem>
          {auth.isAuthenticated ? (
            <ListItem button style={{padding:'15px 20px'}} onClick={() => logoutUser()}>
              <ListItemIcon>
                <InputIcon />
              </ListItemIcon>
              <ListItemText primary={i18.logout} />
            </ListItem>
          ) : null}
        </List>
      </motion.div>
      ) : null}
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          this.setState({value: newValue})
        }}
        showLabels
        className={classes.inputNavFixed}
      >
        <BottomNavigationAction label={i18.tickets} icon={<StoreIcon />} onClick={() => {window.location.href = '/'}} />
        <BottomNavigationAction label="Menu" onClick={this.openDraw}
          icon={<img src={LogoOnlyP} width={24} alt='logop' />} />
        <BottomNavigationAction label={i18.travels} icon={<LocationOnIcon />} 
          onClick={auth.isAuthenticated ? () => history.push('/admin/pasajes/operator') : () => history.push('/app/login')} />
      </BottomNavigation>
      </>
    );
  }
}
