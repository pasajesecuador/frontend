import moment from 'moment'
import * as types from './types';
import en from '../../i18n/en';
import es from '../../i18n/es';
import langstring from '../../i18n';

const setEn = () => dispatch => {
  langstring.setLanguage('en')
  moment.locale('en')
  dispatch({ type: types.SET_EN, lang: en });
  localStorage.setItem('language', 'en')
};

const setEs = () => dispatch => {
  langstring.setLanguage('es')
  moment.locale('es')
  dispatch({ type: types.SET_ES, lang: es });
  localStorage.setItem('language', 'es')
};
export { setEn, setEs };
