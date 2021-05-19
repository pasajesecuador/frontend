import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { loginUser } from '../../../actions/auth';
import { withStyles } from '@material-ui/core/styles';
import Logo_azul from '../assets/log_azul.png';
import Input from '../dashboard/utils/input';
import Button from '../dashboard/utils/button';
import CustomLoader from '@material-ui/core/CircularProgress';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import swal from 'sweetalert2';
import {cookieSetLogin} from '../../../validations/authCookie';

const useStyleLogin = (theme) => ({
  loginroot: {
    height: '100vh',
    background: 'linear-gradient(45deg, #6a85b6, #bac8e0)',
  },
  loginContainer: {
    position: 'relative',
    margin: '0 auto',
    width: 650,
    height: '100vh',
    '@media (max-width: 480px)': {
      width: '100%'
    }
  },
  loginBox: {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
    top: '8%',
    left: '15%',
    width: 450,
    height: 600,
    background: '#ffffff',
    borderRadius: 20,
    '@media (max-width: 480px)': {
      width: '95%',
      top: 20,
      left: 9,
      right: 10
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
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: 5
  },
  forgetDiv: {
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
  errorDiv: {
    textAlign:'right',
    width:'97%',
    fontSize:'12px',
    fontFamily: `'Open Sans', sans-serif`,
    fontWeight: 600,
  },
  errorSpan: {
    color: '#ff0000'
  },
  topFixedPopLog: {
    position: 'fixed',
    background: '#227400ab',
    width: '100%',
    color: '#ffffff',
    padding: '0.7%',
    textAlign: 'center'
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

const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timerProgressBar: true,
  timer: 1500,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', swal.stopTimer)
    toast.addEventListener('mouseleave', swal.resumeTimer)
  }
});

class Login extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      auth: '',
      password: '',
      loading: false,
      signed: false,
      errors: {}
    }
  }

  static getDerivedStateFromProps(props, state){
    if(props.auth.isAuthenticated){
      const au = cookieSetLogin(props.auth);
      if(au) {
        toast.fire({icon:'success', title:'Has iniciado sesión exitosamente'})
        setTimeout(() => {
          if(props.auth.user.rol === 3){
            if(window.location.search === ''){
              props.history.push('/');
            } else {
              const v = searchQuery();
              window.location.href = `/${v.p}/${v.s}`;
            }
          } else {
            props.history.push('/admin/pasajes/operator');
          }
        }, 1600);
      }
      return{
        signed: true
      }
    }
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

  onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = () => {
    const new_logger = {
      auth: this.state.auth,
      password: this.state.password
    }
    this.props.loginUser(new_logger)
  }
  
  render() {
    const {classes} = this.props;
    const { errors, loading, signed } = this.state;
    const v = searchQuery();
    return (
      <div className={classes.loginroot}>
        {v.p !== null ? (
        <div className={classes.topFixedPopLog}>
          <span>Tu usuario es tu numero de cedula y la contraseña anteriormente puesta en el proceso de pago.</span>
        </div>
        ) : null}
        <div className={classes.loginContainer}>
          <div className={classes.loginBox}>
            <div className={classes.logoBody} onClick={() => this.props.history.push('/')}>
              <img className={classes.imgLogo} src={Logo_azul} alt='logo_azul' />
            </div>
            <div className={classes.titleBody}>
              <div className={classes.titleFont}>Iniciar Sesión</div>
            </div>
            <div className={classes.formContainer}>
              <div className={classes.form}>
                <div style={{marginBottom: 10, marginTop: 10}}>
                  <Input name='auth' placeholder='Usuario o Correo Electrónico' onChange={this.onHandleChange} />
                  {errors.credential && (
                    <div className={classes.errorDiv}>
                      <span className={classes.errorSpan}>{errors.credential}</span>
                    </div>
                  )}
                </div>
                <div style={{marginTop: 25}}>
                  <Input name='password' type='password' placeholder='Contraseña' onChange={this.onHandleChange} />
                  {errors.password && (
                    <div className={classes.errorDiv}>
                      <span className={classes.errorSpan}>{errors.password}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className={classes.forgetDiv}>¿Has olvidado tu contraseña?</div>
              <div className={classes.button_container}>
                {loading ? (
                  signed ? (
                    <CheckCircleIcon style={{color:'#298701',fontSize:40}} />
                  ) : (
                    <CustomLoader />
                  )
                ) : (
                  <Button label='Conectar' onClick={this.onSubmit} />
                )}
              </div>
              <div className={classes.create} 
              onClick={() => {this.props.history.push(`/app/register${window.location.search}`)}}>Crear una cuenta</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  loading: state.loading
});

export default compose(connect(mapStateToProps, {loginUser}), withStyles(useStyleLogin, {theme: true}))(Login);
