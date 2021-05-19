import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Logo_azul from '../assets/log_azul.png';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '../dashboard/utils/input';
import Button from '../dashboard/utils/button';
import { registerUser } from '../../../actions/auth';
import { patternEmail } from '../../../actions/types';
import CircularProgress from '@material-ui/core/CircularProgress';
import swal from 'sweetalert2';

const useStyleRegister = (theme) => ({
  loginroot: {
    height: '100vh',
    background: 'linear-gradient(45deg, #6a85b6, #bac8e0)',
  },
  loginContainer: {
    position: 'relative',
    margin: '0 auto',
    width: '100%',
    height: '100vh',
  },
  loginBox: {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
    top: '8%',
    left: '5%',
    width: '90%',
    height: 600,
    background: '#ffffff',
    borderRadius: 20,
    '@media (max-width: 480px)': {
      minHeight: 800,
    }
  },
  logoBody: {
    padding: 10,
    alignSelf: 'center'
  },
  imgLogo: {
    width: 234
  },
  titleBody: {
    position: 'relative',
    height: 60,
    width: 210,
    alignSelf: 'flex-end',
    background: '#c4c4c4',
    borderRadius: '5px 0px 0px 20px',
    margin: '10px 0'
  },
  titleFont: {
    position: 'absolute',
    width: 209,
    height: 36,
    left: 0,
    top: 12,
    fontWeight: 600,
    fontFamily: `'Open Sans', sans-serif`,
    fontSize: 24,
    color: '#4f4f4f',
    textAlign: 'center'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 50px',
    '@media (max-width: 480px)': {
      padding: '55px 20px'
    }
  },
  form: {
    display: 'flex',
    flexFlow: 'wrap',
    width: '100%',
    margin: 5,
    flexBasis: 110
  },
  hasAccount: {
    alignSelf: 'flex-end',
    fontFamily: `'Open Sans', sans-serif`,
    fontWeight: 600,
    color: '#4f4f4f',
    fontSize: 14,
    marginTop: 10,
    cursor: 'pointer'
  },
  button_container: {
    alignSelf: 'center',
    padding: '30px 0',
  },
  create: {
    alignSelf: 'center',
    fontFamily: `'Open Sans', sans-serif`,
    fontWeight: 600,
    color: '#346784',
    cursor: 'pointer'
  },
  selectId: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      height: 45,
      borderRadius: 10,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: '2px solid #BEC8F7',
      boxShadow: '0 0 3px 0px #b0b0b0',
    },
    '& .MuiInputLabel-outlined': {
      color: '#757575',
      fontWeight: 600,
      fontFamily: `'Open Sans', sans-serif`,
      fontSize: 16,
      transform: 'translate(22px, 15px) scale(1)'
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)'
    }
  },
  input: {
    background: '#ffffff',
    borderRadius: 10,
    boxShadow: '0 0 3px 0px #b0b0b0',
    border: '2px solid #BEC8F7',
    width: '100%',
    height: 45,
    padding: '0 20px',
    color: '#4f4f4f',
    fontWeight: 600,
    fontFamily: `'Open Sans', sans-serif`,
    fontSize: 16,
    boxSizing: 'border-box',
    '&:focus': {
      outline: 'none'
    }
  },
  errorDiv: {
    textAlign:'right',
    width:'97%',
    fontSize:'12px',
    fontFamily: `'Open Sans', sans-serif`,
    fontWeight: 600,
  },
  errorSpan: {
    color: '#ff0000'
  }
})

function searchQuery() {
  const x = new URL(window.location);
  const y = new URLSearchParams(x.search);
  const origin = y.get('p');
  const destiny = y.get('s');
  const location = {
    p: origin,
    s: destiny
  }
  return location
}

class register extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      name: '',
      phone: '',
      typeid: '',
      idNumber: '',
      city: '',
      country: '',
      password: '',
      loading: false,
      errors: {},
      outlinedName: true,
      outlinedSurname: true,
      outlinedCI: true,
      outlinedEmail: true,
      outlinedPwd: true,
      usern: true,
      ciErrorMessage: ''
    }
    this._type = React.createRef();
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
    const {typeid} = this.state;
    if(typeid === 'CI') {
      const isValid = this.handleValidationType(e.target.value, ['^[0-9]{10}$']);
      this.setState({
        outlinedCI:isValid[0],
        ciErrorMessage: 'Cedula debe contener 10 digitos.'
      })
    } else if(typeid === 'PPN') {
      const isValid = this.handleValidationType(e.target.value, ['^[0-9]{5,20}$']);
      this.setState({
        outlinedCI:isValid[0],
        ciErrorMessage: 'Pasaporte debe contener mas de 5 digitos.'
      })
    } else if(typeid === 'RUC') {
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

  static getDerivedStateFromProps(props, state){
    if(props.errors !== state.errors){
      return{
        errors: props.errors
      }
    }else{
      return {
        loading: props.loading.loading
      }
    }
  }

  onChangeRegister = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmitRegister = (e) => {
    e.preventDefault()

    this.setState({loading: true})

    const newUser = {
      username: this.state.username.toLowerCase(),
      email: this.state.email.toLowerCase(),
      names: `${this.state.name} ${this.state.surname}`,
      phone: this.state.phone,
      typeid: this.state.typeid,
      idNumber: this.state.idNumber,
      city: this.state.city,
      country: this.state.country,
      password: this.state.password,
    }

    const isFull = this.state.name !== '' && this.state.surname !== '' && this.state.dni !== '' && 
                this.state.documentType !== '' && this.state.email !== '' && this.state.mobile !== '' && this.state.pwd !== '';
    const isIncorrect = this.state.outlinedName && this.state.outlinedSurname && 
                        this.state.outlinedEmail && this.state.outlinedCI && this.state.outlinedPwd;

    if(isFull) {
      if(isIncorrect){
        const v = searchQuery();

        if(v.p !== null) {
          this.props.registerUser(newUser, this.props.history, `?p=${v.p}&s=${v.s}`);
        } else {
          this.props.registerUser(newUser, this.props.history, '');
        }
      } else {
        swal.fire('Campos incorrectos', 'Por favor corrige los campos incorrectos con las descripciones.', 'error')
      }
    } else {
      swal.fire('Campos vacios', 'Por favor llena los campos requeridos. Son aquellos con asteriscos.', 'error')
    }

  }

  render() {
    const {classes} = this.props;
    const { errors, loading, outlinedName, outlinedSurname, outlinedCI, ciErrorMessage, outlinedEmail, outlinedPwd, usern } = this.state;
    const maxWidth = window.matchMedia('(max-width: 480px)').matches;
    return (
      <div className={classes.loginroot}>
        <div className={classes.loginContainer}>
          <div className={classes.loginBox}>
            <div className={classes.logoBody} onClick={() => this.props.history.push('/')}>
              <img className={classes.imgLogo} src={Logo_azul} alt='logo_azul' />
            </div>
            <div className={classes.titleBody}>
              <div className={classes.titleFont}>Crear Cuenta</div>
            </div>
            <div className={classes.formContainer}>
              <div className={classes.form}>
                <div style={{width: maxWidth ? '100%' : '32%', margin: 5}}>
                  <Input placeholder='Usuario*' id='usern' style={!usern ? {border:'2px solid red'} : null}
                    onKeyUp={(e) => this.validation(e, ['^[a-zA-Z]{3,25}$'])}
                    name='username' onChange={this.onChangeRegister} />
                  {errors.username && (
                    <div className={classes.errorDiv}>
                      <span className={classes.errorSpan}>{errors.username}</span>
                    </div>
                  )}
                  {!usern ? (
                    <div className={classes.errorDiv}>
                      <span className={classes.errorSpan}>
                        Usuario debe contener solo numeros y letras de minimo 3 caracteres, sin espacios.
                      </span>
                    </div>
                  ) : null}
                </div>
                <div style={{width: maxWidth ? '100%' : '32%', margin: 5}}>
                  <Input placeholder='Nombre*' name='name' id="outlinedName" style={!outlinedName ? {border:'2px solid red'} : null}
                    onKeyUp={(e) => this.validation(e, ['^[a-zA-Z ]{3,25}$'])}
                    onChange={this.onChangeRegister} />
                  {errors.names && (
                    <div className={classes.errorDiv}>
                      <span className={classes.errorSpan}>{errors.names}</span>
                    </div>
                  )}
                  {!outlinedName ? (
                    <div className={classes.errorDiv}>
                      <span className={classes.errorSpan}>
                        Nombre debe contener almenos 3 letras y no caracteres especiales */#
                      </span>
                    </div>
                  ) : null}
                </div>
                <div style={{width: maxWidth ? '100%' : '32%', margin: 5}}>
                  <Input placeholder='Apellido*' name='surname' id="outlinedSurname" style={!outlinedSurname ? {border:'2px solid red'} : null}
                    onKeyUp={(e) => this.validation(e, ['^[a-zA-Z ]{3,25}$'])}
                    onChange={this.onChangeRegister} />
                  {errors.names && (
                    <div className={classes.errorDiv}>
                      <span className={classes.errorSpan}>{errors.names}</span>
                    </div>
                  )}
                  {!outlinedSurname ? (
                    <div className={classes.errorDiv}>
                      <span className={classes.errorSpan}>
                        Apellido debe contener almenos 3 letras y no caracteres especiales */#
                      </span>
                    </div>
                  ) : null}
                </div>
                <div style={{width: maxWidth ? '100%' : '32%', margin: 5}}>
                  <Input placeholder='Correo Electrónico*' id="outlinedEmail" style={!outlinedEmail ? {border:'2px solid red'} : null}
                  onKeyUp={(e) => this.validation(e, patternEmail)}
                  name='email' onChange={this.onChangeRegister} />
                  {errors.email && (
                    <div className={classes.errorDiv}>
                      <span className={classes.errorSpan}>{errors.email}</span>
                    </div>
                  )}
                  {!outlinedEmail ? (
                    <div className={classes.errorDiv}>
                      <span className={classes.errorSpan}>Debe ser un correo electrónico real</span>
                    </div>
                  ) : null}
                </div>
                <div style={{width: maxWidth ? '100%' : '32%', margin: 5}}>
                  <FormControl variant="outlined" className={classes.selectId}>
                    <InputLabel htmlFor="outlined-age-native-simple">Tipo de indentificación</InputLabel>
                    <Select
                      native
                      value={this.state.typeid}
                      onChange={this.onChangeRegister}
                      label="Tipo de indentificación*"
                      inputProps={{
                        name: 'typeid',
                        id: 'outlined-type-native-simple',
                      }}
                    >
                      <option aria-label="None" value="" disabled />
                      <option value='CI'>Cedula</option>
                      <option value='PPN'>Pasaporte</option>
                      <option value='RUC'>RUC</option>
                    </Select>
                  </FormControl>
                  {errors.typeid && (
                    <div className={classes.errorDiv}>
                      <span className={classes.errorSpan}>{errors.typeid}</span>
                    </div>
                  )}
                </div>
                <div style={{width: maxWidth ? '100%' : '32%', margin: 5}}>
                  <input className={classes.input} type='number' style={!outlinedCI ? {border:'2px solid red'} : null}
                        placeholder='Identificación*' onInput={this.validationIdentification} 
                        name='idNumber' ref={this._type} onChange={this.onChangeRegister} />
                  {errors.idNumber && (
                    <div className={classes.errorDiv}>
                      <span className={classes.errorSpan}>{errors.idNumber}</span>
                    </div>
                  )}
                  {!outlinedCI ? (
                    <div className={classes.errorDiv}>
                      <span className={classes.errorSpan}>{ciErrorMessage}</span>
                    </div>
                  ) : null}
                </div>
                <div style={{width: maxWidth ? '100%' : '32%', margin: 5}}>
                  <Input placeholder='Telefono*' name='phone' type='number' min='0' onChange={this.onChangeRegister} />
                </div>
                <div style={{width: maxWidth ? '100%' : '15%', margin: 5}}>
                  <Input placeholder='Ciudad' name='city' onChange={this.onChangeRegister} />
                </div>
                <div style={{width: maxWidth ? '100%' : '16%', margin: 5}}>
                  <Input placeholder='Pais' name='country' onChange={this.onChangeRegister} />
                </div>
                <div style={{width: maxWidth ? '100%' : '32%', margin: 5}}>
                  <Input placeholder='Contraseña*' id="outlinedPwd" style={!outlinedPwd ? {border:'2px solid red'} : null}
                    onKeyUp={(e) => this.validation(e, [/^.{6,25}$/])}
                    type='password' name='password' onChange={this.onChangeRegister} />
                  {errors.password && (
                    <div className={classes.errorDiv}>
                      <span className={classes.errorSpan}>{errors.password}</span>
                    </div>
                  )}
                  {!outlinedPwd ? (
                    <div className={classes.errorDiv}>
                      <span className={classes.errorSpan}>
                        Contraseña debe tener almenos 6 caracteres y debe ser segura
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className={classes.hasAccount} onClick={() => this.props.history.push('/app/login')}>¿Ya tienes cuenta? Inicia sesión</div>
              <div className={classes.hasAccount}>
                Al registrarte en pasajesecuador estas aceptando los 
                <a href='https://pasajesecuador.com/terminos_privacidad_politicas.pdf'> terminos y condiciones</a>
              </div>
              <div className={classes.button_container}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button label='Conectar' onClick={this.onSubmitRegister} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  loading: state.loading
});

export default compose(connect(mapStateToProps, {registerUser}), withStyles(useStyleRegister, {theme: true}))(register);
