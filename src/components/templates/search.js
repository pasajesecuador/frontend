import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import {compose} from 'redux';
import { Stylescss } from './styled/style';
import { withStyles } from '@material-ui/styles';
import { getCities } from '../../actions/drawer';
import { logoutUser } from '../../actions/auth';
import { setEn, setEs } from '../../ducks/i18n';
import i18 from '../../i18n';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Navbar from './navbar/navbar';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import TripOriginIcon from '@material-ui/icons/TripOrigin';
import MapIcon from './assets/svg/map-marked-alt-solid.svg';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert2';
import Calendar from './utils/calendar';
import { motion } from 'framer-motion';
import BusIcon from './assets/iconBus';
import CompanyIcon from './assets/companies/reina.png';
import {Stations} from './utils/stations';
import axios from 'axios';
import clsx from 'clsx';
import PlacesMedia from './utils/cardPlaces';
import QuitoWebP from './assets/q.webp';
import GuayasWebP from './assets/guaya.webp';
import AmbatoWebP from './assets/am.webp';
import MantaWebP from './assets/m.webp';
import { quitoString, ambatoString, guayaquilString, mantaString} from './utils/textCity';
import 'moment/locale/es';

function searchQuery() {
  const x = new URL(window.location);
  const y = new URLSearchParams(x.search);
  const origin = y.get('origin');
  const destiny = y.get('destiny');
  const location = {
    origin: origin,
    destiny: destiny
  }
  return location
}
function timeFormat(t, date) {
  const timeTrim = Object.keys(t).toString();
  const time = timeTrim.substr(1);
  const timeFormat = time.split('_');
  const hour = parseFloat(timeFormat[0]) * 3600000;
  const minute = parseFloat(timeFormat[1]) * 60000;
  const times = hour + minute;
  const dateValue = date + times;
  const compareValue = dateValue - Date.now();
  const compareTransformHours = Math.abs(compareValue) / 3600000;
  const dateActual = moment(dateValue);
  if(compareTransformHours < 2) {
    return dateActual.fromNow()
  } else {
    return dateActual.format('HH:mm')
  }
}
function isFormatB(t, date) {
  const timeTrim = Object.keys(t).toString();
  const time = timeTrim.substr(1);
  const timeFormat = time.split('_');
  const hour = parseFloat(timeFormat[0]) * 3600000;
  const minute = parseFloat(timeFormat[1]) * 60000;
  const times = hour + minute;
  const dateValue = date + times;
  const compareValue = dateValue - Date.now();
  const compareTransformHours = Math.abs(compareValue) / 3600000;
  if(compareTransformHours < 2) {
    return true
  } else {
    return false
  }
}
function timeFormatBack(t, date, distance) {
  const timeTrim = Object.keys(t).toString();
  const time = timeTrim.substr(1);
  const timeFormat = time.split('_');
  const distanceValue = Math.round(distance);
  const tBack = distanceValue / 64;
  const tArrived = tBack;
  const hour = parseFloat(timeFormat[0]) * 3600000;
  const minute = parseFloat(timeFormat[1]) * 60000;
  const times = hour + minute;
  const dateValue = date + times;
  const dateActual = moment(dateValue).add(tArrived, 'hour');
  return dateActual.format('HH:mm');
}
function toCapitalize(value){
  const lastString = value.substr(1).toLowerCase();
  const text = `${value[0]}${lastString}`;
  return text;
}
function getActualDate(t, date){
  const timeTrim = Object.keys(t).toString();
  const time = timeTrim.substr(1);
  const timeFormat = time.split('_');
  const hour = parseFloat(timeFormat[0]) * 3600000;
  const minute = parseFloat(timeFormat[1]) * 60000;
  const times = hour + minute;
  const dateValue = date + times;
  const dateActual = moment(dateValue);
  return dateActual;
}
function getOneBefore(t, date){
  const timeTrim = Object.keys(t).toString();
  const time = timeTrim.substr(1);
  const timeFormat = time.split('_');
  const hour = parseFloat(timeFormat[0]) * 3600000;
  const minute = parseFloat(timeFormat[1]) * 60000;
  const times = hour + minute;
  const dateValue = date + times;
  const compareValue = dateValue - Date.now();
  const compareTransformHours = Math.abs(compareValue) / 3600000;
  if(compareTransformHours < 0.62) {
    return true
  } else {
    return false;
  }
}

class Search extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      search: [],
      time: null,
      timeback: null,
      passenger: 0,
      calendarModalBox: false,
      origin: '',
      destiny: '',
      statusRate: 0,
      test: 0
    }
    this.originInput = React.createRef();
    this.destinyInput = React.createRef();
  }

  componentDidMount() {
    const location = searchQuery();
    const {time, passenger} = this.props.match.params;
    const data = {
      origin: location.origin,
      destiny: location.destiny
    }
    axios.post('/api/trip/s/operator/trip', data)
      .then(res => {
        const {data, statusRate} = res.data;
        if(statusRate !== 40){
          this.setState({
            statusRate: statusRate,
            search: data
          });
        } else {
          this.setState({
            statusRate: statusRate,
          })
        }
      })
      .catch(err => {
        if(err) {
          swal.fire('Error', 'Tenemos un error en el sistema, vuelve a intentarlo', 'error');
        }
      })
    this.setState({
      time: parseFloat(time),
      passenger: parseInt(passenger),
      origin: location.origin,
      destiny: location.destiny
    });

    const lang = localStorage.getItem('language')
    if(lang === null){
      this.props.setEs()
    } else if(lang === 'es'){
      this.props.setEs();
    } else {
      this.props.setEn();
    }
  }

  passengerControl = (value) => {
    if(value === 'minus') {
      this.setState((state) => ({
        passenger: state.passenger === 0 ? 0 : state.passenger - 1
      }))
    } else if(value === 'plus') {
      this.setState((state) => ({
        passenger: state.passenger + 1
      }))
    }
  }

  inputFocusSelect = (whichOne) => {
    if(whichOne === 'origin'){
      this.originInput.current.focus();
    } else {
      this.destinyInput.current.focus();
    }
  }

  setChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSearch = () => {
    const data = {
      origin: this.state.origin,
      destiny: this.state.destiny,
      date: this.state.time,
      passengers: this.state.passenger
    }
    if(data.origin !== '' && data.destiny !== '' && data.date !== null && data.passengers !== 0){
      window.location.href = `/s/${data.date}/${data.passengers}?origin=${data.origin}&destiny=${data.destiny}`
    } else {
      swal.fire({title: 'Atención', 
      html:`
        <div style='text-align: left;padding:0'>Todos los campos son requeridos:</div> 
        <br /><div style='text-align: left'> 1. Origen </div>
        <br /><div style='text-align: left'> 2. Destino </div>
        <br /><div style='text-align: left'> 3. Fecha </div>
        <br /><div style='text-align: left'> 4. Numero de pasajeros </div>`,
        icon: 'error'
      })
    }
  }

  selectingBtn = (date, origin, destiny, price, operator, dis_km) => {
    const data = {
      date: date.valueOf(),
      origin: origin,
      destiny: destiny,
      price: price,
      operator: operator,
      passenger: this.state.passenger,
      dis_km: dis_km
    }
    localStorage.setItem('s_s_s', JSON.stringify(data))
    window.location.href = '/checkout/process'
  }
  
  render() {
    const {classes} = this.props;
    const {time, calendarModalBox, passenger, origin, destiny, timeback, search, statusRate} = this.state;
    const item = {visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: -100 }};
    const maxWidth = window.matchMedia('(max-width: 480px)').matches;
    return statusRate === 40 || search.length > 0 ? (
      <div>
        <Navbar props={this.props} i18={i18} />
        <div className={classes.tripContainer}>
          <div className={classes.tripBox}>
            <div className={classes.filterContainer}>
              <div className={classes.titleSearch}>
                <h1>{i18.tickets}</h1>
              </div>
              <div className={classes.radioControlSearch}>
                <RadioGroup value='goMode'>
                  <FormControlLabel value="goMode" control={<Radio />} label={i18.go} />
                </RadioGroup>
              </div>
              <div className={classes.filterBox}>
                <div className={classes.filterTitleSearch}>{i18.origin}</div>
                <div className={classes.boxInput} 
                style={{borderRight:'none',border:'1.8px solid #bebebe',borderRadius:7,margin:0,width:'100%'}} 
                onClick={() => {this.inputFocusSelect('origin')}}>
                  <div className={classes.iconBox}><TripOriginIcon /></div>
                  <div>
                    <input ref={this.originInput} 
                      name='origin'
                      className={classes.inputBox} 
                      value={origin}
                      placeholder={i18.origin}
                      onChange={this.setChange} />
                  </div>
                </div>
              </div>
              <div className={classes.filterBox}>
                <div className={classes.filterTitleSearch}>{i18.destiny}</div>
                <div className={classes.boxInput} 
                style={{borderRight:'none',border:'1.8px solid #bebebe',borderRadius: 7,margin:0,width:'100%'}} 
                onClick={() => {this.inputFocusSelect('destiny')}}>
                  <div className={classes.iconBox}><img style={{width: maxWidth ? 18 : 26}} src={MapIcon} alt='icon' /></div>
                  <div>
                    <input ref={this.destinyInput}
                      name='destiny'
                      className={classes.inputBox} 
                      value={destiny}
                      placeholder={i18.destiny}
                      onChange={this.setChange} />
                  </div>
                </div>
              </div>
              <div className={classes.filterBox}>
                <div className={classes.filterTitleSearch}>{i18.date}</div>
                <div className={classes.boxInput} 
                    style={{borderRight:'none',border:'1.8px solid #bebebe', borderRadius:7,margin:0,width:'100%'}}
                    onClick={() => {this.setState({calendarModalBox: !calendarModalBox}); window.scrollTo(0, 400)}}>
                    <div className={classes.iconBox}><CalendarTodayIcon /></div>
                    <div>
                      <span className={classes.spanFontBox}>
                        {time !== null ? moment(time).format('DD/MM/YYYY') : i18.date}
                      </span>
                    </div>
                  </div>
                  {calendarModalBox ? (
                    <motion.div initial='hidden' animate='visible' variants={item} className={classes.calendarModal} 
                    style={{left:62,top:582,background:'white',zIndex:1}}>
                      <Calendar 
                        selectedDay={(select) => {
                          this.setState({time: select.date.valueOf()}); this.setState({calendarModalBox: !calendarModalBox})}} />
                    </motion.div>
                  ) : null}
              </div>
              <div className={classes.filterBox}>
                <div className={classes.filterTitleSearch}>{i18.passengers}</div>
                <div className={classes.boxModalPassenger} 
                style={{border:'1.8px solid #bebebe',boxShadow:'none',height:50}}>
                  <div style={{cursor:'pointer'}} onClick={() => this.passengerControl('minus')}>
                    <RemoveIcon style={{marginTop:5}} />
                  </div>
                  <div style={{fontSize:22}}>{passenger}</div>
                  <div style={{cursor:'pointer'}} onClick={() => this.passengerControl('plus')}>
                    <AddIcon style={{marginTop:5}} />
                  </div>
                </div>
              </div>
              <Button className={classes.buttonSearchFilter} onClick={this.onSearch}>
                {i18.searchBtn}
              </Button>
            </div>
          </div>
          <div className={classes.tripSearch}>
            {statusRate === 10 ? null : (
              statusRate === 20 ? (
                <h1 className={classes.resultWarningMsg}>{i18.noFoundDestiny}</h1>
            ) : statusRate === 30 ? (
              <h1 className={classes.resultWarningMsg}>
                {i18.notFoundOrigin} {origin}, {i18.notFoundODestiny} {destiny}.
              </h1>
            ) : (
              <h1 className={classes.resultWarningMsg}>
                {i18.othersPlacesFound}
              </h1>
            ))}
            <div className={classes.tripBoxContainer}>
              {search.map((trip, index) =>
                !getActualDate(trip.time, time).isBefore(new Date()) ? (
                <div className={clsx(classes.resultsBox, [getOneBefore(trip.time, time) ? classes.leftTime : null])} key={index}>
                  {getOneBefore(trip.time, time) ? (
                    <div style={{position:'absolute',top:-30,left:0,background:'#3f9200',color:'#ffffff',padding:5,borderRadius:10,zIndex:20}}>
                      {i18.aboutBegin}
                    </div>
                  ) : null}
                  <div className={classes.dateTime}>
                    <div className={classes.dateTimeIconBus}><BusIcon /></div>
                    <div className={classes.dateTimeText}>{timeback === null ? i18.go : i18.goback}</div>
                    <div className={classes.dateTimeDate}>{moment(time).format('dddd, DD MMM YYYY')}</div>
                  </div>
                  <div className={classes.resultImage}>
                    <img className={classes.imgCompany} src={CompanyIcon} alt='company' />
                  </div>
                  <div className={classes.resultTimeInit}>
                    <div className={classes.timeResult}>
                      <span style={isFormatB(trip.time, time) ? {fontSize:13} : null}>
                        {timeFormat(trip.time, time)}
                      </span>
                    </div>
                    <div className={classes.cityResult}>
                      <span>{toCapitalize(trip.origin)}</span>
                      <div className={classes.terminal}>
                        <span>{Stations(trip.origin)}</span>
                      </div>
                    </div>
                  </div>
                  <div className={classes.resultTimeInit}>
                    <div className={classes.timeResult}>
                      <span>{timeFormatBack(trip.time, time, trip.dis_km)}</span>
                    </div>
                    <div className={classes.cityResult}>
                      <span>{toCapitalize(trip.destiny)}</span>
                      <div className={classes.terminal}>
                        <span>{Stations(trip.destiny)}</span>
                      </div>
                    </div>
                  </div>
                  <div className={classes.resultPrice}>
                    <div style={{width:'100%',textAlign:'center'}}>
                      <span style={{fontWeight:700,fontSize:15,textShadow:'0 0 1px #000000'}}>{i18.pricePerCapital}</span>
                    </div>
                    <div style={{width:'50%'}}>
                      <span style={{fontWeight:700,fontSize:13,textShadow:'0 0 1px #000000'}}>USD</span>
                    </div>
                    <div style={{width:'35%',textAlign:'end',marginRight:15}}>
                      <span style={{fontWeight:700,fontSize:13}}>${Math.floor(Math.random() * 15) + 3}</span>
                    </div>
                    <div style={{width:'75%'}}>
                      <span style={{fontWeight:700,fontSize:13,textShadow:'0 0 1px #000000'}}>{i18.avaiSeat}</span>
                    </div>
                    <div style={{width:'10%',textAlign:'end',marginRight:15,color:'#298501'}}>
                      <span style={{fontWeight:700,fontSize:13}}>{Math.floor(Math.random() * 30)}</span>
                    </div>
                    <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                      <Button className={classes.buttomChoose} 
                        onClick={() => 
                          this.selectingBtn(getActualDate(trip.time, time), trip.origin, trip.destiny, 12.50, trip.company, trip.dis_km)
                        }>
                        {i18.selectedBtn}
                      </Button>
                    </div>
                  </div>
                  <div id='bottomMsg'>
                    {i18.dateOut} {getActualDate(trip.time, time).format('HH:mm')} {i18.routeout} {trip.route}
                  </div>
                </div>
              ): null )}
            </div>
            {statusRate === 40 ? (
            <div style={{display:'flex',flexFlow:'row wrap'}}>
              <div style={{marginTop: 10,width:'50%'}}>
                <PlacesMedia img={QuitoWebP} label='Quito' text={quitoString} /></div>
              <div style={{marginTop: 10,width:'50%'}}>
                <PlacesMedia img={MantaWebP} label='Manta' text={mantaString} /></div>
              <div style={{marginTop: 10,width:'50%'}}>
                <PlacesMedia img={AmbatoWebP} label='Ambato' text={ambatoString} /></div>
              <div style={{marginTop: 10,width:'50%'}}>
                <PlacesMedia img={GuayasWebP} label='Guayaquil' text={guayaquilString} /></div>
            </div>
            ) : null}
          </div>
        </div>
      </div>
    ) : null
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.loading,
  profile: state.profile,
  common: state.common
});

export default compose(connect(mapStateToProps, {
  logoutUser,
  getCities,
  setEn, 
  setEs
}), withStyles(Stylescss, {withTheme:true}))(Search)