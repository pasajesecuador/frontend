import { GET_CITIES, GET_COMPANIES } from '../actions/types';

const initialState = {
  cities: [],
  companies: [],
}

export default function common(state = initialState, action) {
  switch (action.type) {
    case GET_CITIES:
      return {
        ...state,
        cities: action.payload
      }
    case GET_COMPANIES:
      return {
        ...state,
        companies: action.payload
      }
    default:
      return state
  }
}