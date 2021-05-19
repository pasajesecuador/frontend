import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withStyles } from '@material-ui/styles';
import { Stylescss } from './styled/style';
import {cookieAuth} from '../../validations/authCookie';
import { logoutUser, registerUser } from '../../actions/auth';
import { getCities } from '../../actions/drawer';
import { setEn, setEs } from '../../ducks/i18n';
import i18 from '../../i18n';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import TextField from '@material-ui/core/TextField';
import SelectInput from './utils/selectInput';
import Navbar from './navbar/navbar';
import cards from './assets/cards.png';
import moment from 'moment';
import swal from 'sweetalert2';
import Seats from './utils/seats';
import Visa from './assets/visa.png';
import DinersSvg from './assets/Diners.svg';
import Master from './assets/mastercard.svg';
import CardDefault from './assets/cardDefault.svg';
import axios from 'axios';
import {patternEmail} from '../../actions/types';
import Progress from '@material-ui/core/CircularProgress';

function picCard(params) {
  switch (params) {
    case 'visa':
      return Visa;
    case 'diners':
      return DinersSvg;
    case 'master':
      return Master;
    default:
      return CardDefault;
  }
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

class Checkout extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      dataResult: {},
      name: '',
      surname: '',
      documentType: '',
      idUser: '',
      gender: '',
      seat: '',
      dni: '',
      birth: '',
      purpose: '',
      email: '',
      mobile: '',
      methodPay: 'Card',
      country: '',
      city: '',
      pwd: '',
      rpwd: '',
      selectingCard: 0,
      time: moment().add(15, 'minutes'),
      minutes: 14,
      seconds: 59,
      activeProcess: false,
      activeProcessSave: true,
      loading: false,
      loadingProcess: false,
      outlinedName: true,
      outlinedSurname: true,
      outlinedEmail: true,
      outlinedCI: true,
      outlinedPwd: true,
      loadingRegister: false,
      ciErrorMessage: '',
      saveInfo: {},
      errors: {},
      pendingStatus: null
    }
  }

  componentDidMount() {

    const lang = localStorage.getItem('language')
    if(lang === null){
      this.props.setEs()
    } else if(lang === 'es'){
      this.props.setEs();
    } else {
      this.props.setEn();
    }

    if(this.props.auth.isAuthenticated) {
      swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'Tienes 15 minutos para completar la operación, caso contrario sera cancelado.',
      })
    } else {
      swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Tienes 15 minutos para completar la operación!',
        text: 'En 15 minutos esta operación sera cancelada. Si tienes cuenta conectate ahora, si no crea una en datos.',
        showDenyButton: true,
        confirmButtonText: 'Conectar',
        denyButtonText: 'Crear cuenta',
      }).then(result => {
        if(result.isConfirmed) {
          window.location.href = '/app/login?p=checkout&s=process'
        } else if(result.isDenied) {
          swal.fire('Crear una cuenta', 'Debes crear una cuenta llenando tus datos y contacto y dar click en "ir a pagar"', 'warning');
        }
      })
    }

    if(cookieAuth('_uuv')) {
      const authenticate = cookieAuth('_uuv') === 'True' ? true : false;
      if(authenticate) {
        axios.get('/api/auth/current/user')
          .then(user => {
            const idUser = user.data.id;
            const idrequest = user.data.subcriptionUpdate.requestId;
            if(idrequest !== undefined) {
              this.setState({loading:true});
              axios.get(`/api/auth/api/redirect/p2p/${idrequest}`)
                .then(res => {
                  if(res.data.status.status === 'APPROVED') {
                    const payment = {
                      payments: res.data.subscription,
                    };
                    axios.post(`/api/auth/p2p/subscription/update/${idUser}`, payment)
                      .then(subs => {
                        if (subs.data.status === 200) {
                          const updateData = {
                            id: idUser,
                            data: {},
                          };
                          axios.post('/api/auth/update/subcription/client', updateData)
                            .then(au => {
                              const payments = {
                                payments: res.data.subscription,
                                document: user.data.idNumber,
                                documentType: user.data.typeid,
                                name: user.data.name.split(' ')[0],
                                surname: user.data.name.split(' ')[1],
                                email: user.data.email,
                                mobile: user.data.phone,
                                description:
                                  'Registro de tarjeta de credito o debito',
                                amount: 0.12,
                                base: 0.88,
                                total: 1,
                              };
                              axios.post(`/api/auth/api/collect/payment/p2p?id=${idUser}`, payments)
                                .then(collect => {
                                  this.setState({loading:false});
                                  if (collect.data.status.status === 'APPROVED') {
                                    const referenceShow =
                                      collect.data.payment[0] !== undefined
                                        ? ` de referencia ${collect.data.payment[0].reference} `
                                        : '';
                                    swal.fire(
                                      'Excelente',
                                      `Tu transacción ${referenceShow} ha sido aprobada con exito`,
                                      'success'
                                    ).then(() => {
                                      const refe = {
                                        reference:
                                          collect.data.payment[0]
                                            .internalReference,
                                      };
                                      axios.post(`/api/auth/api/reverse/payment/p2p?id=${idUser}`, refe)
                                        .then(reverse => {
                                          if (reverse.data.status.status === 'APPROVED') {
                                            swal.fire({toast: true,position: 'bottom-end',icon: 'success',
                                            title: 'El reverso fue realizado con exito',
                                            timerProgressBar: true,showConfirmButton: false,timer: 2000
                                            }).then(() => {
                                              window.location.reload();
                                            })
                                          } else {
                                            swal.fire('Reverso fallido', 'Tu reverso no fue realizado comunicate con pasajesecuador.com',
                                            'error');
                                          }
                                        })
                                    })
                                  } else if (collect.data.status.status === 'REJECTED') {
                                    const referenceShow =
                                      collect.data.payment[0] !== undefined
                                        ? ` de referencia ${collect.data.payment[0].reference} `
                                        : '';
                                    swal.fire(
                                      'Problemas',
                                      `Tu transacción ${referenceShow} ha sido rechazada, prueba con otra tarjeta`,
                                      'error'
                                    )
                                  } else if (collect.data.status.status === 'PENDING') {
                                    const referenceShow = ` de referencia ${collect.data.request.payment.reference} `
                                    swal.fire(
                                      'Aviso',
                                `Tu tarjeta ${referenceShow} esta en modo pendiente, no puedes pagar el viaje, te avisaremos en un lapso de 15 minutos`,
                                      'warning'
                                    ).then(() => {
                                      window.location.reload()
                                    })
                                  } else {
                                    this.setState({loading:false});
                                    swal.fire('Tenemos problemas', 'Hubo un problema con nuestro sistema intentalo nuevamente', 'error')
                                  }
                                })
                            })
                        }
                      })
                  } else {
                    this.setState({loading:false});
                    swal.fire({toast: true,position: 'bottom-end',icon: 'error',title: res.data.status.message,
                    timerProgressBar: true,showConfirmButton: false,timer: 6000
                    })
                  }
                })
            }
          }).catch(err => {
            this.setState({loading:false});
            if(err) {
              swal.fire({
                toast: true,
                position: 'bottom-end',
                icon: 'error',
                title: 'Hubo un error autenticando tus datos para la tarjeta.',
                timerProgressBar: true,
                showConfirmButton: false,
                timer: 6000
              })
            }
          })
      }
    }

    let cookieSeat = getCookie('_prevData');
    if(cookieSeat !== '') {
      cookieSeat =  JSON.parse(getCookie('_prevData')).seat
    } else {
      cookieSeat = ''
    }

    const dataResult = localStorage.getItem('s_s_s');
    if(dataResult === null){
      window.location.href = '/'
    } else {
      this.setState({
        dataResult: JSON.parse(dataResult),
        seat: cookieSeat
      })
    }
    
    this.timedown = setInterval(() => {
      const distance = this.state.time.valueOf() - moment().valueOf();
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.setState({
        minutes,
        seconds
      })
      if(distance < 1) {
        clearInterval(this.timedown);
        swal.fire('Sesión expirada', 'Tu tiempo para completar la comprar se ha expirado, vuelve a intentarlo.', 'error')
          .then(() => {
            window.location.href = '/'
          })
      }
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.timedown);
  }

  static getDerivedStateFromProps(props, state){
    if(props.errors !== state.errors){
      return{
        errors: props.errors
      }
    }else{
      return {
        loadingRegister: props.loading.loading
      }
    }
  }

  handleValidationType = (value, patterns) => {
    const pattern = patterns;
    if (typeof pattern === 'string') {
      const condition = new RegExp(pattern, 'g');
      return condition.test(value);
    }
    if (typeof pattern === 'object') {
      const conditions = pattern.map((rule) => new RegExp(rule, 'g'));
      return conditions.map((condition) => condition.test(value));
    }
  }

  validation = (e, pattern) => {
    const isValid = this.handleValidationType(e.target.value, pattern);
    this.setState({[e.target.id]: isValid[0]})
  }

  validationIdentification = (e) => {
    const {documentType} = this.state;
    if(documentType === 'CI') {
      const isValid = this.handleValidationType(e.target.value, ['^[0-9]{10}$']);
      this.setState({
        outlinedCI:isValid[0],
        ciErrorMessage: 'Cedula debe contener 10 digitos.'
      })
    } else if(documentType === 'PPN') {
      const isValid = this.handleValidationType(e.target.value, ['^[0-9]{5,20}$']);
      this.setState({
        outlinedCI:isValid[0],
        ciErrorMessage: 'Pasaporte debe contener mas de 5 digitos.'
      })
    } else if(documentType === 'RUC') {
      const isValid = this.handleValidationType(e.target.value, ['^[0-9]{13}$']);
      this.setState({
        outlinedCI:isValid[0],
        ciErrorMessage: 'RUC debe contener 10 digitos.'
      })
    } else {
      this.setState({
        outlinedCI: false,
        ciErrorMessage: 'Por favor elige el tipo de identificación'
      });
    }
  }

  saveInfo = () => {
    const {name, surname, documentType, dni, birth, gender, email, mobile, purpose, seat} = this.state;

    const data = {
      name: name || (this.props.profile.profile.name !== undefined && this.props.profile.profile.name.split(' ')[0]),
      surname: surname || (this.props.profile.profile.name !== undefined && this.props.profile.profile.name.split(' ')[1]),
      documentType: documentType || this.props.profile.profile.typeid,
      dni: dni || this.props.profile.profile.idNumber,
      birth, 
      gender, 
      email: email || this.props.profile.profile.email, 
      mobile: mobile || this.props.profile.profile.phone, 
      purpose, 
      seat
    }

    if(this.props.profile.profile.subscription.length > 0){
      if(seat !== ''){
        this.setState({
          activeProcess: true,
          activeProcessSave: false,
          saveInfo: data
        })
      } else {
        swal.fire('Campos vacios', 'Por favor elige un asiento', 'error')
      }
    } else {
      swal.fire('Sin tarjetas', 'No has agregado ninguna tarjeta para el pago', 'error');
    }
  }

  registerProcess = () => {
    const {name, surname, documentType, dni, birth, gender, email, mobile, purpose, seat, methodPay, 
      city, country, pwd, outlinedName, outlinedSurname, outlinedEmail, outlinedCI, outlinedPwd} = this.state;

    const data = {
      username: dni,
      names: `${name} ${surname}`,
      typeid: documentType,
      idNumber: dni,
      city,
      country,
      birth,
      gender, 
      email: email.toLowerCase(), 
      phone: mobile, 
      purpose,
      password: pwd
    }

    const dataProvi = {
      seat,
      methodPay
    }

    const isFull = name !== '' && surname !== '' && dni !== '' && documentType !== '' && email !== '' && mobile !== '' && pwd !== '';
    const isIncorrect = outlinedName && outlinedSurname && outlinedEmail && outlinedCI && outlinedPwd;

    if(isFull) {
      if(isIncorrect){
        if(pwd === this.state.rpwd){
          if(seat !== ''){
            this.setState({
              activeProcess: true,
              activeProcessSave: false,
              saveInfo: data
            })
            var d = new Date();
            d.setTime(d.getTime() + (3600*100));
            document.cookie = `_prevData=${JSON.stringify(dataProvi)};expires=${d.toUTCString()};path=/checkout/process`;
            this.props.registerUser(data, this.props.history, '?p=checkout&s=process')
          } else {
            swal.fire('Campos vacios', 'Por favor elige un asiento', 'error')
          }
        } else {
          swal.fire('Problemas', 'Hemos tenido un problema con tu contraseña. No coincide.', 'error')
        }
      } else {
        swal.fire('Campos incorrectos', 'Por favor corrige los campos incorrectos con las descripciones', 'error')
      }
    } else {
      swal.fire('Campos vacios', 'Por favor llena los campos requeridos', 'error')
    }
  }

  addCard = () => {
    this.setState({
      loading: true
    })

    const {name, surname, email, dni, documentType, mobile, outlinedName, outlinedSurname,
      outlinedEmail, outlinedCI} = this.state;

    const cardData = {
      document: dni || this.props.profile.profile.idNumber,
      documentType: documentType || this.props.profile.profile.typeid,
      name: name || (this.props.profile.profile.name !== undefined && this.props.profile.profile.name.split(' ')[0]),
      surname: surname || (this.props.profile.profile.name !== undefined && this.props.profile.profile.name.split(' ')[1]),
      email: email || this.props.profile.profile.email,
      mobile: mobile || this.props.profile.profile.phone,
      userAgent: window.navigator.userAgent
    }

    const isFull = cardData.name !== '' && cardData.surname !== '' && cardData.dni !== '' && 
    cardData.documentType !== '' && cardData.email !== '' && cardData.mobile !== '';
    const isIncorrect = outlinedName && outlinedSurname && outlinedEmail && outlinedCI;

    if(isFull) {
      if(isIncorrect){
        axios.post('/api/auth/p2p/subscription', cardData)
          .then(res => {
            if(res.data.status.status === 'OK'){
              const updateData = {
                id: this.props.profile.profile.id,
                data: res.data,
              };
              axios.post('/api/auth/update/subcription/client', updateData)
                .then(updated => {
                  if (updated.data.statusCode === 200) {
                    window.location.href = res.data.processUrl
                  }
                })
            }
          })
          .catch(err => {
            if(err){
              alert('error');
            }
          })
      } else {
        this.setState({
          loading: false
        })
        swal.fire('Campos incorrectos', 'Por favor corrige los campos incorrectos con las descripciones', 'error')
      }
    } else {
      this.setState({
        loading: false
      })
      swal.fire('Campos vacios', 'Por favor llena los campos requeridos', 'error')
    }
  }

  processCheckout = () => {
    this.setState({loadingProcess: true})
    const {selectingCard, saveInfo, dataResult, birth, gender, purpose} = this.state;

    const payments = {
      payments: this.props.profile.profile.subscription[selectingCard],
      document: saveInfo.dni,
      documentType: saveInfo.documentType,
      name: saveInfo.name,
      surname: saveInfo.surname,
      email: saveInfo.email,
      mobile: saveInfo.mobile,
      description: `Compra de boleto ${dataResult.origin} - ${dataResult.destiny} día ${moment(dataResult.date).format('DD MMMM YYYY HH:mm')}`,
      amount: 0.06,
      base: 0.5,
      total: 12
    }

    const billing = {
      name: saveInfo.name,
      surname: saveInfo.surname,
      age: birth,
      origin: dataResult.origin,
      destiny: dataResult.destiny,
      date: dataResult.date,
      price: dataResult.price,
      plazas: saveInfo.seat,
      passenger: dataResult.passenger,
      datebuy: Date.now(),
      dis_km: dataResult.dis_km,
      action: `A${(Math.random() * (3150 - 1000) + 1000).toFixed(0)}`,
      code: `T${(Math.random() * (3150 - 1000) + 1000).toFixed(0)}`,
      operador: dataResult.operator,
      gender: gender,
      options: purpose,
    }

    axios.post(`/api/auth/api/collect/payment/p2p/process?id=${this.props.profile.profile.id}`, payments)
      .then(res => {
        if(res.data.status.status === 'APPROVED') {
          axios.post(
            `/api/trip/payment/billing/process/${this.props.profile.profile.id}?statusCollect=${res.data.status.status}
            &requestBID=${res.data.requestId}`, billing)
            .then(billing => {
              if(billing.status === 200) {
                this.setState({loadingProcess: false})
                swal.fire('Exitosamente', 
                `Has procesado el pago con referencia ${res.data.request.payment.reference} exitosamente`, 
                'success').then(() => {
                  window.location.href = '/admin/pasajes/operator'
                })
              }
            })
        } else if(res.data.status.status === 'REJECTED') {
          this.setState({loadingProcess: false})
          swal.fire('Rechazado', 
          `La transacción con referencia ${res.data.request.payment.reference} ha sido rechazada. Vuelve a intentarlo o comunicate con tu banco`, 
          'error').then(() => {
            window.location.href = '/'
          })
        } else {
          axios.post(`/api/trip/payment/billing/process/${this.props.profile.profile.id}?statusCollect=${res.data.status.status}
          &requestBID=${res.data.requestId}`, billing)
            .then(billing => {
              if(billing.status === 200) {
                this.setState({loadingProcess: false})
                swal.fire('Pendiente', 
      `Tu tarjeta con referencia ${res.data.request.payment.reference} esta modo pendiente te llamaremos una vez aprobado tu compra para procesarla.`, 
                  'warning')
                    .then(() => {
                      window.location.href = '/'
                  })
              }
            })
        }
      })
      .catch(err => {
        if(err) {
          swal.fire('Tuvimos un error', 'Hemos tenido un problema en el servidor vuelve a intentarlo', 'error')
        }
      })

  }

  render() {
    const {classes, auth} = this.props;
    const {name, email, typeid, idNumber, phone, subscription, country, city, sex, purpose, pendient} = this.props.profile.profile;
    const {gender, seat, activeProcess, activeProcessSave, seconds, minutes, dataResult, loading, rpwd, pwd, loadingRegister, selectingCard,
      outlinedName, outlinedSurname, outlinedEmail, outlinedCI, ciErrorMessage, loadingProcess, outlinedPwd, errors} = this.state;
    const minWidth480 = window.matchMedia('(min-width: 480px)').matches;

    return loading || loadingRegister ? (
      <div style={{textAlign:'center',padding:'20%'}}>
        <Progress />
      </div>
    ) : (
      <div>
        <Navbar props={this.props} i18={i18} />
        <div className={classes.Checkoutcontainer}>
          <div className={classes.checkoutBox}>
            <div className={classes.boxCheckout}>
              <div style={{fontWeight:700}}>Datos</div>
              <div style={{marginTop: 20, marginBottom: 20}}>
                {errors.username && (
                  <div className={classes.errorDiv}>
                    <span className={classes.errorSpan}>El numero de cedula que quieres registrar ya se encuentra activo en nuestro sistema</span>
                  </div>
                )}
                {errors.email && (
                  <div className={classes.errorDiv}>
                    <span className={classes.errorSpan}>
                      El correo electrónico o numero de cedula que quieres registrar ya se encuentra activo en nuestro sistema
                    </span>
                  </div>
                )}
              </div>
              <Grid container className={classes.datosBasic} spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField className={classes.formControl} id="outlinedName" error={outlinedName ? false : true}
                    label={(name !== undefined && name.split(' ')[0]) || "Nombre"}  variant="outlined" 
                    helperText={outlinedName ? '' : 'Nombre debe contener almenos 3 letras y no caracteres especiales */#'}
                    onKeyUp={(e) => this.validation(e, ['^[a-zA-Z ]{3,25}$'])}
                    onChange={(e) => this.setState({name: e.target.value})} />
                  {outlinedName ? (
                  <FormHelperText>Requerido</FormHelperText>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField className={classes.formControl} id="outlinedSurname" error={outlinedSurname ? false : true}
                    label={(name !== undefined && name.split(' ')[1]) || "Apellido"} variant="outlined" 
                    helperText={outlinedSurname ? '' : 'Apellido debe contener almenos 3 letras y no caracteres especiales */#'}
                    onKeyUp={(e) => this.validation(e, ['^[a-zA-Z ]{3,25}$'])}
                    onChange={(e) => this.setState({surname: e.target.value})} />
                  {outlinedSurname ? (
                  <FormHelperText>Requerido</FormHelperText>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={6}>
                  <SelectInput value={typeid} onChange={(e) => this.setState({documentType: e.target.value})} 
                  variants={[{value:'Tipo de identificación',key:''},{value:'Cedula',key:'CI'},{value:'Pasaporte',key:'PPN'},{value:'Ruc',key:'RUC'}]} />
                  <FormHelperText>Requerido</FormHelperText>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField className={classes.formControl} id="outlined-number" type='Number'
                  onInput={this.validationIdentification} error={outlinedCI ? false : true} helperText={outlinedCI ? '' : ciErrorMessage}
                  label={idNumber || "Identificación"} variant="outlined" onChange={(e) => this.setState({dni: e.target.value})} />
                  {outlinedCI ? (
                  <FormHelperText>Requerido</FormHelperText>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField className={classes.formControl} id="outlined-country" 
                  label={country || "Pais"} variant="outlined" onChange={(e) => this.setState({country: e.target.value})} />
                  <FormHelperText>Opcional - Para un mejor servicio</FormHelperText>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField className={classes.formControl} id="outlined-city" 
                  label={city || "Ciudad"} variant="outlined" onChange={(e) => this.setState({city: e.target.value})} />
                  <FormHelperText>Opcional - Para un mejor servicio</FormHelperText>
                </Grid>
                {!auth.isAuthenticated ? (
                <Grid item xs={12} md={6}>
                  <TextField className={classes.formControl} type='date'
                  id="outlined-born" variant="outlined" onChange={(e) => this.setState({birth: e.target.value})} />
                  <FormHelperText>Opcional - Fecha de cumpleaños</FormHelperText>
                </Grid>
                ) : null}
                <Grid item xs={12} md={6}>
                  <SelectInput value={gender || sex} onChange={(e) => this.setState({gender:e.target.value})} 
                  variants={[{value:'Genero',key:''},{value:'Masculino',key:'M'},{value:'Femenino',key:'F'}]} />
                  <FormHelperText>Opcional</FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <TextField className={classes.formControl} id="outlined-born" 
                  label={purpose || "Motivo de viaje"} variant="outlined" onChange={(e) => this.setState({purpose: e.target.value})} />
                  <FormHelperText>Opcional - Para un mejor servicio</FormHelperText>
                </Grid>
                {auth.isAuthenticated ? null : (
                <>
                <Grid item xs={12} md={6}>
                  <TextField className={classes.formControl} id="outlinedPwd" error={outlinedPwd ? false : true}
                  helperText={outlinedPwd ? '' : 'Contraseña debe tener almenos 6 caracteres'} type='password'
                  onKeyUp={(e) => this.validation(e, [/^.{6,25}$/])}
                  label="Contraseña" variant="outlined" onChange={(e) => this.setState({pwd: e.target.value})} />
                  {outlinedPwd ? (
                  <FormHelperText>Requerido</FormHelperText>
                  ) : null }
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField className={classes.formControl} id="outlined-pwrd" error={pwd === rpwd ? false : true}
                  helperText={pwd === rpwd ? 'La contraseña coincide' : 'La contraseña no coincide'} type='password'
                  label="Repetir contraseña" variant="outlined" onChange={(e) => this.setState({rpwd: e.target.value})} />
                  {outlinedPwd ? (
                  <FormHelperText>Requerido</FormHelperText>
                  ) : null }
                </Grid>
                </>
                )}
              </Grid>
              <div style={{marginTop:10,fontWeight:700}}>Contacto</div>
              <Grid container className={classes.datosBasic} spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField className={classes.formControl} id="outlinedEmail" error={outlinedEmail ? false : true}
                  helperText={outlinedEmail ? '' : 'Debe ser un correo electrónico real'}
                  onKeyUp={(e) => this.validation(e, patternEmail)}
                  label={email || "Correo Electrónico"} variant="outlined" onChange={(e) => this.setState({email: e.target.value})} />
                  {outlinedEmail ? (
                  <FormHelperText>Requerido</FormHelperText>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField className={classes.formControl} id="outlined-mobile" type='Number'
                  label={phone || "Numero de celular"} variant="outlined" onChange={(e) => this.setState({mobile: e.target.value})} />
                  <FormHelperText>Requerido</FormHelperText>
                </Grid>
              </Grid>
              <div style={{marginTop:10,fontWeight:700}}>Elegir asiento</div>
              <Grid container>
                <Grid item xs={12}>
                  <div style={{textAlign:'center',marginTop:10}}>Cabina</div>
                </Grid>
                <Grid item xs={12}><Seats number={seat} seatNumber={(seat) => this.setState({seat:seat})} /></Grid>
              </Grid>
              <div style={{marginTop:10,fontWeight:700}}>Metodo de pago</div>
              <Grid container className={classes.datosBasic} spacing={2}>
                <Grid item xs={12} md={6}>
                  <RadioGroup value='cards'>
                    <FormControlLabel value="cards" control={<Radio color='primary' />} label="Pago en tarjeta de credito/debito" />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container>
                    <Grid item xs={12}>
                      <img src={cards} style={minWidth480 ? {width:300} : {width: '100%'}} alt='imgCard' />
                    </Grid>
                    <Grid item xs={12}>
                      <img src='https://static.placetopay.com/placetopay-logo.svg' style={minWidth480 ? {width:300} : {width: '100%'}} alt='imgCard' />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    {auth.isAuthenticated ? (
                      subscription !== undefined && subscription.length > 0 ? (
                        subscription.map((c, i) => 
                          <List className={classes.cardstyle} dense={true} key={i}>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar style={{background:'#ffffff'}}>
                                  <img width='100%' src={picCard(c.instrument[2].value)} alt='visa' />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary="Numero de tarjeta"
                                secondary={`xxxx-xxxx-xxxx-${c.instrument[5].value}`}
                              />
                              <ListItemText
                                primary="Fecha caducidad"
                                secondary={moment(c.instrument[6].value).format('MM/YY')}
                              />
                              <ListItemText
                                primary="CVV"
                                secondary={c.instrument[7].value === null ? 'xxx' : c.instrument[7].value}
                              />
                              {subscription.length > 1 ? (
                              <ListItemText>
                                {selectingCard === i ? (
                                  <CheckCircleIcon style={{color:'green'}} />
                                ) : (
                                <Button 
                                  className={classes.btnSelectCard}
                                  onClick={() => this.setState({selectingCard: i})}>Seleccionar</Button>
                                )}
                              </ListItemText>
                              ) : (
                              <ListItemSecondaryAction>
                                <IconButton>
                                  <CheckCircleIcon style={{color:'green'}} />
                                </IconButton>
                              </ListItemSecondaryAction>
                              )}
                            </ListItem>
                          </List>
                        )
                      ) : null
                    ) : null }
                    {auth.isAuthenticated ? (
                      pendient !== undefined && Object.keys(pendient).length > 0 ? (
                        <div>Tienes una tarjeta en modo pendiente</div>
                      ) : (
                        <Button color='secondary' variant='outlined' onClick={this.addCard} >Agregar tarjeta</Button>
                      )
                    ) : null}
                  </div>
                </Grid>
              </Grid>
              {activeProcessSave ? (
              <div style={{display:'flex',justifyContent:'center',margin:'60px 10px 10px 10px'}}>
                {pendient !== undefined && Object.keys(pendient).length > 0 ? (
                  <div>No puedes pagar hasta que se apruebe tu anterior pago</div>
                ) : (
                  <Button color='primary' variant='outlined' 
                    onClick={auth.isAuthenticated ? this.saveInfo : this.registerProcess}>
                      Ir a pagar
                  </Button>
                )}
              </div>
              ) : null}
            </div>
          </div>
          <div className={classes.priceContaineProcess}>
            <div className={classes.boxCheckoutDiv}>
              <div style={{width:'50%',fontWeight:700}}>Tu reserva</div>
              <div style={{width:'50%',textAlign:'end',fontWeight:700,color:'#46a800'}}>
                {seconds.toString().length > 1 ? `${minutes}:${seconds}` : `${minutes}:0${seconds}`}
              </div>
              <div style={{width:'50%',fontWeight:700}}>{dataResult.passenger} persona</div>
              <div style={{width:'50%',textAlign:'end'}}>USD {dataResult.price * dataResult.passenger}</div>
              <div style={{width:'50%',fontWeight:700}}>Comisión</div>
              <div style={{width:'50%',textAlign:'end'}}>USD 1.80</div>
              <div style={{width:'50%',fontWeight:700}}>Total</div>
              <div style={{width:'50%',textAlign:'end'}}>USD {dataResult.price + 1.8}</div>
              <div style={{width:'100%'}}>
                {activeProcess ? (
                  loadingProcess ? (
                    <div style={{textAlign:'center'}}>
                      <Progress />
                    </div>
                  ) : (
                    <Button className={classes.buttonProcess} onClick={this.processCheckout}>Procesar pago</Button>
                  )
                ) : (
                  <Button className={classes.buttonProcess} disabled={true}>Procesar pago</Button>
                )}
              </div>
            </div>
          </div>
        </div>
        {pendient !== undefined && Object.keys(pendient).length > 0 ? (
        <div className={classes.cardPending}>
          Tienes una tarjeta de referencia {pendient.request.payment.reference} en modo pendiente. Apenas se verifique te notificaremos.
        </div>
        ) : null}
      </div>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.loading,
  profile: state.profile,
  errors: state.errors,
  common: state.common
});

export default compose(connect(mapStateToProps, {
  logoutUser,
  getCities,
  registerUser,
  setEn, setEs
}), withStyles(Stylescss, {withTheme:true}))(Checkout);