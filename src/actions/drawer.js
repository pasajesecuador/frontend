import { SET_DRAWER_MENU, GET_CITIES, GET_COMPANIES } from './types';
import axios from 'axios';

export const changeMenu = (data) => {
  return {
    type: SET_DRAWER_MENU, 
    payload: data
  }
}

export const getCities = () => (dispatch) => {
  axios.get('/api/trip/get/routes/cities')
    .then(res => {
      dispatch(citiesRedux(res.data))
    })
}

export const citiesRedux = (data) => {
  return {
    type: GET_CITIES,
    payload: data
  }
}

export const getCompanies = () => (dispatch) => {
  axios.get('/api/trip/admin/companies/get')
    .then(res => {
      dispatch(companies(res.data));
    })
}

export const companies = (data) => {
  return {
    type: GET_COMPANIES,
    payload: data
  }
}
