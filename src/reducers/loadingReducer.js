import { LOADING } from '../actions/types';

const initialState = {
  loading: false
}

export default function loading(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}