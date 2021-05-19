import { REHYDRATE } from 'redux-persist';
import moment from 'moment'
import * as types from './types';
import en from '../../i18n/en';
import es from '../../i18n/es';
import langstring from '../../i18n';

const initialState = {
  lang: langstring.getLanguage() === 'en' ? en : es,
  langCode: langstring.getLanguage(),
};

export default function language(state = initialState, { type, lang, payload }) {
  let incoming;
  switch (type) {
    case types.SET_EN:
      return {
        lang,
        langCode: 'en',
      };
    case types.SET_ES:
      return {
        lang,
        langCode: 'es',
      };
    case REHYDRATE:
      incoming = payload && payload.i18nStore;
      if (incoming) {
        if (incoming.langCode) {
          langstring.setLanguage(incoming.langCode);
          moment.locale(incoming.langCode)
        }
        return {
          ...incoming,
        };
      }

      return initialState;
    default:
      return state;
  }
};
