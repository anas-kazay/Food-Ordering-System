import {
  ADD_TO_FAVOTIE_FAILURE,
  ADD_TO_FAVOTIE_REQUEST,
  ADD_TO_FAVOTIE_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  LOGIN_SUCCESS,
  GET_USER_SUCCESS,
  LOGOUT,
} from "./ActionType";
import { isPresentInFavorites } from "../../components/config/logic";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
  favorites: [],
  success: null,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case ADD_TO_FAVOTIE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: "success",
        jwt: action.payload,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        favorites: action.payload.favorites,
      };

    case ADD_TO_FAVOTIE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: "success",
        favorites: isPresentInFavorites(state.favorites, action.payload)
          ? state.favorites.filter((fav) => fav.id !== action.payload.id)
          : [...state.favorites, action.payload],
      };
    case LOGOUT:
      return initialState;
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case ADD_TO_FAVOTIE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: null,
      };
    default:
      return state;
  }
};
