import { GET_PROFILE, CLEAR_CURRENT_PROFILE } from '../actions/types';

const initialState = {
  profile: {},
}

export default function profile(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return{
        ...state,
        profile: action.payload,
      }
    case CLEAR_CURRENT_PROFILE:
      return{
        ...state,
        profile: null
      }
    default:
      return state;
  }
}