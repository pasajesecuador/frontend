import React, { Component } from 'react';
import TripOriginIcon from '@material-ui/icons/TripOrigin';
import PersonIcon from '@material-ui/icons/Person';
import MapIcon from '../assets/svg/map-marked-alt-solid.svg';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SearchIcon from '@material-ui/icons/Search';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import swal from 'sweetalert2';
import { motion } from 'framer-motion';
import LogoSvg from '../assets/logo_svg.js';
import Calendar from '../utils/calendar';
import CalendarBack from '../utils/calendarGoBack';

function compareStringCity(value, text) {
  const stringElement = value.toUpperCase();
  const stringText = text.toUpperCase();
  if(stringElement.search(stringText) > -1) {
    return stringElement;
  }
}

function toCapitalize(value){
  const lastString = value.substr(1).toLowerCase();
  const text = `${value[0]}${lastString}`;
  return text;
}

export default class sectionOne extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      tripSelect: 'goMode',
      activePassenger: false,
      passengerNumber: 0,
      citiesData: [],
      origin: '',
      newCitiesModal: [],
      destiny: '',
      newDestinyModal: [],
      dateFormat: null,
      dateFormatBack: null,
      calendarModalBox: false,
    }
    this.originInput = React.createRef();
    this.destinyInput = React.createRef();
  }

  componentDidMount() {
    this.props.props.getCities();
  }

  static getDerivedStateFromProps(props, state){
    return {
      citiesData: props.props.common.cities
    }
  }

  inputFocusSelect = (whichOne) => {
    if(whichOne === 'origin'){
      this.originInput.current.focus();
    } else {
      this.destinyInput.current.focus();
    }
  }

  handleSelectedRadio = (e) => {
    this.setState({
      tripSelect: e.target.value
    })
  }

  handleSelectPassenger = () => {
    this.setState({activePassenger: !this.state.activePassenger})
  }

  passengerControl = (value) => {
    if(value === 'minus') {
      this.setState((state) => ({
        passengerNumber: state.passengerNumber === 0 ? 0 : state.passengerNumber - 1
      }))
    } else if(value === 'plus') {
      this.setState((state) => ({
        passengerNumber: state.passengerNumber + 1
      }))
    }
  }

  getCityModal = (e) => {
    const value = e.target.value;
    const {citiesData} = this.state;
    this.setState({origin: value.toUpperCase()});
    const newCitiesSearch = [];
    if(value.length > 2){
      for (let index = 0; index < citiesData.length; index++) {
        const element = citiesData[index].city;
        const getCity = compareStringCity(element, value);
        if(getCity !== undefined && getCity !== this.state.destiny) {
          let obj = {city: getCity}
          newCitiesSearch.push(obj);
        }
      }
      this.setState({newCitiesModal:newCitiesSearch})
    } else {
      this.setState({newCitiesModal:[]})
    }
  }

  getDestinyModal = (e) => {
    const value = e.target.value;
    const {citiesData} = this.state;
    this.setState({destiny: value.toUpperCase()});
    const newDestinyModal = [];
    if(value.length > 2){
      for (let index = 0; index < citiesData.length; index++) {
        const element = citiesData[index].city;
        const getCity = compareStringCity(element, value);
        if(getCity !== undefined && getCity !== this.state.origin) {
          let obj = {city: getCity}
          newDestinyModal.push(obj);
        }
      }
      this.setState({newDestinyModal:newDestinyModal})
    } else {
      this.setState({newDestinyModal:[]})
    }
  }

  onBlurInputs = (inp) => {
    if(inp === 'origin') {
      setTimeout(() => {this.setState({newCitiesModal:[]})}, 300);
      if(this.state.origin !== '' && this.state.origin === this.state.destiny) {
        swal.fire('Hubo un error', 'El origen y destino no puede ser el mismo, por favor modifica tu origen de partida.', 'error');
      }
    } else if(inp === 'destiny') {
      setTimeout(() => {this.setState({newDestinyModal: []})}, 300);
      if(this.state.destiny !== '' && this.state.origin === this.state.destiny) {
        swal.fire('Hubo un error', 'El origen y destino no puede ser el mismo, por favor modifica tu destino de partida.', 'error');
      }
    }
  }

  onSearch = () => {
    const data = {
      origin: this.state.origin,
      destiny: this.state.destiny,
      date: this.state.dateFormat,
      passengers: this.state.passengerNumber
    }
    if(data.origin !== '' && data.destiny !== '' && data.date !== null && data.passengers !== 0){
      window.location.href = `/s/${data.date.valueOf()}/${data.passengers}?origin=${data.origin}&destiny=${data.destiny}`
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
  

  render() {
    const {classes} = this.props.props;
    const {i18} = this.props;
    const {tripSelect, activePassenger, passengerNumber, dateFormat, dateFormatBack,
      newCitiesModal, origin, destiny, newDestinyModal, calendarModalBox} = this.state;
    const item = {visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: -100 }};
    const maxWidth = window.matchMedia('(max-width: 480px)').matches;
    const md = window.matchMedia('(max-width: 750px)').matches;
    const tripMode = this.state.tripSelect === 'goBackMode' ? true : false;
    return (
      <div className={classes.principalContainerSearch}>
        <div className={classes.principalImg} />
        <div className={classes.searchMenuContainer}>
          <div className={classes.searchContainer}>
            <div className={classes.containerSearching}>
              <div className={classes.searchBox}>
                <div className={classes.boxOrigin}>
                  <div className={classes.boxInput} onClick={() => {this.inputFocusSelect('origin')}}>
                    <div className={classes.iconBox}><TripOriginIcon /></div>
                    <div>
                      <input ref={this.originInput} 
                        className={classes.inputBox} 
                        value={origin}
                        placeholder={i18.origin}
                        onChange={this.getCityModal}
                        onBlur={() => this.onBlurInputs('origin')} />
                    </div>
                  </div>
                  {newCitiesModal.length > 0 ? (
                  <div className={classes.boxPassengerModal}>
                    <div className={classes.boxModalOrigin}>
                      {newCitiesModal.map((city, key) =>
                      <div key={key} 
                        className={classes.cityInModal}
                        onClick={() => this.setState({origin:city.city})}>{toCapitalize(city.city)}</div>
                      )}
                    </div>
                  </div>
                  ) : null}
                </div>
                <div className={classes.boxDestiny}>
                  <div className={classes.boxInput} onClick={() => {this.inputFocusSelect('destiny')}}>
                    <div className={classes.iconBox}><img style={{width: 26}} src={MapIcon} alt='icon' /></div>
                    <div>
                      <input ref={this.destinyInput}
                        className={classes.inputBox} 
                        value={destiny}
                        placeholder={i18.destiny}
                        onChange={this.getDestinyModal}
                        onBlur={() => this.onBlurInputs('destiny')} />
                    </div>
                  </div>
                  {newDestinyModal.length > 0 ? (
                  <div className={classes.boxPassengerModal}>
                    <div className={classes.boxModalOrigin}>
                      {newDestinyModal.map((city, key) =>
                      <div key={key} 
                        className={classes.cityInModal}
                        onClick={() => this.setState({destiny:city.city})}>{toCapitalize(city.city)}</div>
                      )}
                    </div>
                  </div>
                  ) : null}
                </div>
                <div className={classes.boxDate}>
                  <div className={classes.boxInput} 
                    onClick={() => {this.setState({calendarModalBox: !calendarModalBox}); window.scrollTo(0, 400)}}>
                    <div className={classes.iconBox}><CalendarTodayIcon /></div>
                    <div>
                      <span className={classes.spanFontBox}>
                        {dateFormat !== null ? 
                          `${dateFormat.format('DD/MM/YYYY')} ${dateFormatBack !== null ? dateFormatBack.format('DD/MM/YYYY') : ''}` 
                          : 
                          i18.date
                        }
                      </span>
                    </div>
                  </div>
                  {calendarModalBox ? (
                    tripMode ? (
                      <motion.div initial='hidden' animate='visible' variants={item} className={classes.calendarModal} 
                        style={maxWidth ? {left:0} : {left: -150}}>
                        <CalendarBack selectedDay={(select, back) => {
                          this.setState({dateFormat: select, dateFormatBack: back, calendarModalBox: !calendarModalBox})
                        }} />
                      </motion.div>
                    ) : (
                      <motion.div initial='hidden' animate='visible' variants={item} className={classes.calendarModal} 
                        style={maxWidth ? {left:0} : {left: -150}}>
                        <Calendar 
                          selectedDay={(select) => {
                            this.setState({dateFormat: select.date}); this.setState({calendarModalBox: !calendarModalBox})}} />
                      </motion.div>
                    )
                  ) : null}
                </div>
                <div className={classes.boxPassenger}>
                  <div className={classes.boxInput} onClick={this.handleSelectPassenger}>
                    <div className={classes.iconBox}><PersonIcon /></div>
                    <div>
                      <span className={classes.spanFontBox}>
                        {passengerNumber === 0 ? '' : passengerNumber} {i18.passengers}{passengerNumber > 1 ? 's' : passengerNumber === 0 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  {activePassenger ? (
                  <motion.div initial='hidden' animate='visible' variants={item} className={classes.boxPassengerModal}>
                    <div className={classes.boxModalPassenger}>
                      <div style={{cursor:'pointer'}} onClick={() => this.passengerControl('minus')}>
                        <RemoveIcon style={{marginTop:5}} />
                      </div>
                      <div style={{fontSize:22}}>{passengerNumber}</div>
                      <div style={{cursor:'pointer'}} onClick={() => this.passengerControl('plus')}>
                        <AddIcon style={{marginTop:5}} />
                      </div>
                    </div>
                  </motion.div>
                  ) : null}
                </div>
                <div className={classes.boxButton} onClick={this.onSearch}>
                  <div className={classes.btnBox}>
                    <SearchIcon style={{color:'#ffffff',fontSize:30}} />
                  </div>
                </div>
              </div>
              {newCitiesModal.length > 0 ? null : (
              <div className={classes.selecteRadioContainer}>
                {maxWidth ? null : (
                <RadioGroup aria-label="selectedMode" style={{flexDirection: 'row'}}
                  name="selectedMode" value={tripSelect} onChange={this.handleSelectedRadio}>
                  <FormControlLabel value="goMode" control={<Radio />} label={i18.go} />
                  <FormControlLabel value="goBackMode" control={<Radio />} label={i18.goback} />
                </RadioGroup>
                )}
              </div>
              )}
            </div>
          </div>
          <div className={classes.textTitle}>
            <h6>{i18.slogan}</h6>
          </div>
          {md ? null : (
          <div style={{position:'absolute',width:370,top:'5%',left:39}}>
            <LogoSvg colorP='#000000' colorB='#000000' colorT='#000000' />
          </div>
          )}
        </div>
      </div>
    )
  }
}
