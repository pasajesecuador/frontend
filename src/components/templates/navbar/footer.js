import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import FacebookIcon from '../assets/socialMedia/facebook-brands.svg';
import MessIcon from '../assets/socialMedia/facebook-messenger-brands.svg';
import InstIcon from '../assets/socialMedia/instagram-brands.svg';
import WsIcon from '../assets/socialMedia/whatsapp-brands.svg';
import PasajesLetter from '../assets/logoWhite.png';
import CopyrightIcon from '@material-ui/icons/Copyright';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';

function getModalStyle() {
  const top = 35;
  const left = 40;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const StylesFooter = ({
  footerCss: {
    position: 'relative',
    borderRadius: '100px 100px 0 0',
    color: '#ffffff',
    background: '#172D48'
  },
  footerContainer: {
    padding: '50px 50px 15px 93px',
    fontFamily: `'Open Sans', sans-serif`,
  },
  titleSocial: {
    textAlign: 'center',
    fontSize: 18
  },
  copy:{
    display: 'flex',
    marginLeft: 30,
    marginRight: 30,
  },
  privacy: {
    display: 'flex',
    justifyContent: 'center',
    padding: '50px 10px 20px 10px'
  },
  paper: {
    position: 'absolute',
    minWidth: 400,
    height: 500,
    overflow: 'scroll',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 8px 1px rgba(255, 255, 255, 0.25)',
    padding: '1%',
    outline: 'none',
    borderRadius: 10
  },
})

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  
  render() {
    const {classes, i18} = this.props;
    const minWidth480 = window.matchMedia('(min-width: 480px)').matches;
    return (
      <footer className={classes.footerCss} style={minWidth480 ? null : {borderRadius:2}}>
        <Grid container className={classes.footerContainer} 
          style={minWidth480 ? null : {padding: '10px 10px 15px 10px'}}>
          <Grid item xs={6} md={4}>
            <h1 style={{fontSize:18}}>{i18.onGo}</h1>
            <Grid container style={{marginTop:20}} spacing={1}>
              <Grid item xs={12}>
                <span>{i18.bookings}</span>
              </Grid>
              <Grid item xs={12}>
                <span>{i18.createUser}</span>
              </Grid>
              <Grid item xs={12}>
                <span>{i18.downloadapp}</span>
              </Grid>
              <Grid item xs={12}>
                <span>{i18.needhelp}</span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} md={4}>
            <h1 style={{fontSize:18}}>{i18.office}</h1>
            <Grid container style={{marginTop:20}} spacing={1}>
              <Grid item xs={12}>
                <span>{i18.aboutus}</span>
              </Grid>
              <Grid item xs={12} style={{cursor:'pointer'}} onClick={() => this.setState({open: !this.state.open})} >
                <span>Preguntas frecuentes</span>
              </Grid>
              <Grid item xs={12}>
                <span>{i18.howitwork}</span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <h1 className={classes.titleSocial}>{i18.followus}</h1>
            <Grid container justify='center' style={{marginTop:25}}>
              <Grid item xs={3} style={{textAlign:'center'}}>
                <img width={30} src={FacebookIcon} alt='iconSocial' />
              </Grid>
              <Grid item xs={3} style={{textAlign:'center'}}>
                <img width={30} src={WsIcon} alt='iconSocial' />
              </Grid>
              <Grid item xs={3} style={{textAlign:'center'}}>
                <img width={30} src={InstIcon} alt='iconSocial' />
              </Grid>
              <Grid item xs={3} style={{textAlign:'center'}}>
                <img width={30} src={MessIcon} alt='iconSocial' />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.privacy}>
              <div style={{marginRight:'5%'}}>
                <span>{i18.terms}</span>
              </div>
              <div className={classes.copy}>
                <div>
                  <CopyrightIcon />
                </div>
                <div style={{marginLeft:5}}>
                  <span>{i18.c} 2020</span>
                </div>
              </div>
              <div style={{marginLeft:'5%'}} onClick={() => window.location.href = 'https://pasajesecuador.com/terminos_privacidad_politicas.pdf'}>
                <span>{i18.privacy}</span>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{textAlign:'center'}}>
              <img width={250} src={PasajesLetter} alt='pasajesLetter'/>
            </div>
          </Grid>
        </Grid>
        <Modal
          open={this.state.open}
          onClose={() => this.setState({open: !this.state.open})}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={getModalStyle()} className={classes.paper}>
            <h2>Preguntas frecuentes</h2>
            <Grid container>
              <Grid item xs={12}>
                <h5>1. ¿Qué es Placetopay?</h5>
              </Grid>
              <Grid item xs={12}>
                <p>
                  Placetopay es la plataforma de pagos electrónicos que usa
                  pasajesecuador.com para procesar en línea las transacciones
                  generadas en la tienda virtual con las formas de pago
                  habilitadas para tal fin.
                </p>
              </Grid>
              <Grid item xs={12}>
                <h5>2. ¿Cómo puedo pagar?</h5>
              </Grid>
              <Grid item xs={12}>
                <p>
                  En la tienda virtual de pasajesecuador.com usted podrá realizar
                  su pago con los medios habilitados para tal fin. Usted, de
                  acuerdo a las opciones de pago escogidas por el comercio,
                  podrá pagar a través Diners, Discover, Visa y MasterCard; de
                  todos los bancos con pago corriente y en los diferido,
                  tarjetas emitidas por Banco Pichincha, Diners, Loja, BGR y
                  Manabí.
                </p>
              </Grid>
              <Grid item xs={12}>
                <h5>3. ¿Es seguro ingresar mis datos bancarios en este sitio web?</h5>
              </Grid>
              <Grid item xs={12}>
                <p>
                  Para proteger tus datos pasajesecuador.com delega en Placetopay
                  la captura de la información sensible. Nuestra plataforma de
                  pagos cumple con los más altos estándares exigidos por la
                  norma internacional PCI DSS de seguridad en transacciones
                  con tarjeta de crédito. Además tiene certificado de
                  seguridad SSL expedido por GeoTrust una compañía Verisign,
                  el cual garantiza comunicaciones seguras mediante la
                  encriptación de todos los datos hacia y desde el sitio; de
                  esta manera, te podrás sentir seguro a la hora de ingresar
                  la información de su tarjeta. Durante el proceso de pago, en
                  el navegador se muestra el nombre de la organización
                  autenticada, la autoridad que lo certifica y la barra de
                  dirección cambia a color verde. Estas características son
                  visibles de inmediato y dan garantía y confianza para
                  completar la transacción en Placetopay. Placetopay también
                  cuenta con el monitoreo constante de McAfee Secure y la
                  firma de mensajes electrónicos con Certicámara. Placetopay
                  es una marca de la empresa colombiana EGM Ingeniería Sin
                  Fronteras S.A.S.
                </p>
              </Grid>
              <Grid item xs={12}>
                <h5>4. ¿Puedo realizar el pago cualquier día y a cualquier hora?</h5>
              </Grid>
              <Grid item xs={12}>
                <p>
                  Sí, en pasajesecuador.com podrás realizar tus compras en línea
                  los 7 días de la semana, las 24 horas del día a sólo un clic
                  de distancia.
                </p>
              </Grid>
              <Grid item xs={12}>
                <h5>5. ¿Puedo cambiar la forma de pago?</h5>
              </Grid>
              <Grid item xs={12}>
                <p>
                  Si aún no has finalizado tu pago, podrás volver al paso
                  inicial y elegir la forma de pago que prefieras. Una vez
                  finalizada la compra no es posible cambiar la forma de pago.
                </p>
              </Grid>
              <Grid item xs={12}>
                <h5>6. ¿Pagar electrónicamente tiene algún valor para mí como comprador?</h5>
              </Grid>
              <Grid item xs={12}>
                <p>
                  No, los pagos electrónicos realizados a través de Placetopay
                  no generan costos adicionales para el comprador.
                </p>
              </Grid>
              <Grid item xs={12}>
                <h5>7. ¿Qué debo hacer si mi transacción no concluyó?</h5>
              </Grid>
              <Grid item xs={12}>
                <p>
                  En primera instancia deberás revisar si llegó un mail de
                  confirmación del pago en tu cuenta de correo electrónico (la
                  inscrita en el momento de realizar el pago), en caso de no
                  haberlo recibido, deberás contactar a admin@inprovince.com
                  para confirmar el estado de la transacción. En caso que tu
                  transacción haya declinado, debes verificar si la
                  información de la cuenta es válida, está habilitada para
                  compras no presenciales y si tienes cupo o saldo disponible.
                  Si después de esto continua con la declinación debes
                  comunicarte con pasajesecuador.com. En última instancia, puedes
                  remitir tu solicitud a servicioposventa@placetopay.ec
                </p>
              </Grid>
              <Grid item xs={12}>
                <h5>8. ¿Qué debo hacer si no recibí el comprobante de pago?</h5>
              </Grid>
              <Grid item xs={12}>
                Por cada transacción aprobada a través de Placetopay,
                recibirás un comprobante del pago con la referencia de
                compra en la dirección de correo electrónico que indicaste
                al momento de pagar. Si no lo recibes, podrás contactar a la
                línea 0992079843 o al correo electrónico
                pasajesecuador@outlook.com, para solicitar el reenvío del
                comprobante a la misma dirección de correo electrónico
                registrada al momento de pagar. En última instancia, puedes
                remitir tu solicitud a servicioposventa@placetopay.ec
              </Grid>
            </Grid>
          </div>
        </Modal>
      </footer>
    )
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(StylesFooter)(Footer);