import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import { cookieGetToken, cookieAuth } from './validations/authCookie';
import { setCurrentUser, getProfile } from './actions/auth';
import setAuthToken from "./validations/setAuthToken";
import swal from 'sweetalert2';
import axios from 'axios';
import store from "./store";
import "./App.css";

//LOAD ROUTES
import Home from './components/templates/home';
import Login from './components/dashboard/auth/login';
import Register from './components/dashboard/auth/register';
import Forgot from './components/dashboard/auth/forgot';
import Dashboard from './components/dashboard/dashboard/dashboard';
import Search from './components/templates/search';
import Checkout from './components/templates/checkout';
import Chat from './components/templates/chat';

function App() {
  const [pendingStatus] = React.useState(null);
  const authenticate = cookieAuth('_uuv') === 'True' ? true : false;

  if(cookieGetToken('_usid')) {
    const tokenuud = cookieGetToken('_usid');
    const token = `Bearer ${tokenuud}`
    setAuthToken(token);
  }
  
  if(cookieAuth('_uuv')) {
    const authenticate = cookieAuth('_uuv') === 'True' ? true : false;
    store.dispatch(setCurrentUser({}, '', authenticate))
    store.dispatch(getProfile());
  }

  React.useEffect(() => {
    const thisTimeDown =  setInterval(() => {
      const profileBase = store.getState().profile.profile !== undefined && store.getState().profile.profile;
      if(Object.values(profileBase).length > 0) {
        if(pendingStatus || pendingStatus === null) {
          if(Object.values(profileBase.pendient).length > 0) {
            axios.get(`/api/auth/api/redirect/p2p/${profileBase.pendient.requestId}`)
              .then(verified => {
                if (verified.data.status.status === 'APPROVED') {
                  console.log(parseFloat(verified.data.payment[0].amount.to.total))
                  clearInterval(thisTimeDown);
                  const referenceShow = verified.data.payment[0] !== undefined ? ` de referencia ${verified.data.payment[0].reference} ` : '';
                  swal.fire(
                    'Excelente',
                    `Tu transacción ${referenceShow} ha sido aprobada con exito`,
                    'success'
                  ).then(() => {
                    const refe = {
                      reference: verified.data.payment[0].internalReference,
                      resData: verified.data,
                    };
                    if(parseFloat(verified.data.payment[0].amount.to.total) > 1) {
                      axios.post(`/api/auth/api/reverse/pendient/greater/payment/p2p?id=${profileBase.id}`, refe)
                      .then((reverse) => {
                        if (reverse.data.data.status.status === 'APPROVED') {
                          swal.fire({toast: true,position: 'bottom-end',icon: 'success',
                            title: 'El pago fue realizado con exito',
                            timerProgressBar: true,showConfirmButton: false,timer: 2000
                          }).then(() => {
                            if(Object.keys(reverse.data.bill).length > 0){
                              axios.get(`/api/auth/bill/update/status/${reverse.data.bill.id}/Approved`)
                                .then(() => {
                                  window.location.reload()
                                })
                            } else {
                              window.location.reload()
                            }
                          })
                        }
                      })
                    } else {
                      axios.post(`/api/auth/api/reverse/pendient/payment/p2p?id=${profileBase.id}`, refe)
                        .then((reverse) => {
                          if (reverse.data.data.status.status === 'APPROVED') {
                            swal.fire({toast: true,position: 'bottom-end',icon: 'success',
                              title: 'El reverso fue realizado con exito',
                              timerProgressBar: true,showConfirmButton: false,timer: 2000
                            }).then(() => {
                              if(Object.keys(reverse.data.bill).length > 0){
                                axios.get(`/api/auth/bill/update/status/${reverse.data.bill.id}/Approved`)
                                  .then(() => {
                                    window.location.reload()
                                  })
                              } else {
                                window.location.reload()
                              }
                            })
                          } else {
                            swal.fire('Reverso fallido', 'Tu reverso no fue realizado comunicate con pasajesecuador.com',
                            'error');
                          }
                        })
                    }
                  })
                } else if(verified.data.status.status === 'PENDING') {} else {
                  clearInterval(thisTimeDown);
                  swal.fire('Tarjeta rechazada', 'Tu tarjeta la cual intentas registrar ha sido rechazada.', 'error')
                    .then(() => {
                      const refe = {
                        resData: verified.data,
                      };
                      axios.post(`/api/auth/api/reverse/pendient/payment/rejected?id=${profileBase.id}`, refe)
                        .then((response) => {
                          if(Object.keys(response.data).length > 0){
                            axios.get(`/api/auth/bill/update/status/${response.data.id}/Rejected`)
                              .then(() => {
                                window.location.reload()
                              })
                          } else {
                            window.location.reload()
                          }
                        })
                    })
                }
              })
          } else {
            return () => clearInterval(thisTimeDown);
          }
        } else {
          return () => clearInterval(thisTimeDown);
        }
      } else {
        return () => clearInterval(thisTimeDown);
      }
    }, 5000);
    return () => clearInterval(thisTimeDown);
  }, [pendingStatus])

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path='/' component={Home} />
          <Route exact path='/s/:time/:passenger' component={Search} />
          <Route exact path='/checkout/process' component={Checkout} />
          <Route exact path='/admin/pasajes/operator' component={Dashboard} />
          <Route exact path='/admin/pasajes/chat' component={Chat} />
          {!authenticate ? (
            <>
            <Route exact path='/app/register' component={Register} />
            <Route exact path='/app/login' component={Login} />
            <Route exact path='/auth/forgetting' component={Forgot} />
            </>
          ) : null}
        </div>
      </Router>
    </Provider>
  );
}

export default App;
