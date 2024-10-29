import axios from "axios";
import { API_URL, api } from "./../../components/config/api";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  ADD_TO_FAVOTIE_REQUEST,
  ADD_TO_FAVOTIE_SUCCESS,
  ADD_TO_FAVOTIE_FAILURE,
  LOGOUT,
} from "./ActionType";

export const registerUser = (reqData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(
      API_URL + "/auth/signup",
      reqData.userData
    );
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    if (data.role === "ROLE_RESTAURANT_OWNER") {
      reqData.navigate("/admin/restaurant");
    } else {
      reqData.navigate("/");
    }
    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
  } catch (err) {
    dispatch({ type: REGISTER_FAILURE, payload: err });
    console.log("error", err);
  }
};

export const loginUser = (reqData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(
      API_URL + "/auth/signin",
      reqData.userData
    );
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    if (data.role === "ROLE_RESTAURANT_OWNER") {
      reqData.navigate("/admin/restaurant");
    } else {
      reqData.navigate("/");
    }
    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, payload: err });
    console.log("error", err);
  }
};

export const getUser = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const { data } = await api.get("/api/users/profile", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: GET_USER_SUCCESS, payload: data });
    console.log("user profile", data);
  } catch (err) {
    dispatch({ type: GET_USER_FAILURE, payload: err });
    console.log("error", err);
  }
};

export const addToFavorite =
  ({ jwt, restaurantId }) =>
  async (dispatch) => {
    dispatch({ type: ADD_TO_FAVOTIE_REQUEST });
    try {
      const { data } = await api.put(
        `/api/restaurants/${restaurantId}/add-favorites`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: ADD_TO_FAVOTIE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: ADD_TO_FAVOTIE_FAILURE, payload: err });
      console.log("error", err);
    }
  };

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  try {
    localStorage.removeItem("jwt");
  } catch (err) {
    console.log("error", err);
  }
};
