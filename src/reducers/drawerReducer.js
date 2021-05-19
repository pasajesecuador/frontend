import { SET_DRAWER_MENU } from '../actions/types';

const initialState = {
  drawer: 0
}

export default function drawer(state = initialState, action) {
  switch (action.type) {
    case SET_DRAWER_MENU:
      return {
        ...state,
        drawer: action.payload
      }
    default:
      return state
  }
}