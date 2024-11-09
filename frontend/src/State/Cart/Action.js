import { api } from "../../components/config/api";
import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  CLEARE_CART_FAILURE,
  CLEARE_CART_REQUEST,
  CLEARE_CART_SUCCESS,
  FIND_CART_FAILURE,
  FIND_CART_REQUEST,
  FIND_CART_SUCCESS,
  GET_ALL_CART_ITEMS_FAILURE,
  GET_ALL_CART_ITEMS_REQUEST,
  GET_ALL_CART_ITEMS_SUCCESS,
  REMOVE_CARTITEM_FAILURE,
  REMOVE_CARTITEM_REQUEST,
  REMOVE_CARTITEM_SUCCESS,
  UPDATE_CARTITEM_FAILURE,
  UPDATE_CARTITEM_REQUEST,
  UPDATE_CARTITEM_SUCCESS,
} from "./ActionType";

export const findCart = (token) => {
  return async (dispatch) => {
    dispatch({ type: FIND_CART_REQUEST });
    try {
      const response = await api.get("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: FIND_CART_SUCCESS, payload: response.data });
      console.log("cart", response.data);
    } catch (error) {
      console.log("cart error", error);
      dispatch({ type: FIND_CART_FAILURE, payload: error });
    }
  };
};

export const getAllCartItems = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });
    try {
      const response = await api.get(`/api/carts/${reqData.cartId}/items`, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      console.log("cart items", response.data);
      dispatch({
        type: GET_ALL_CART_ITEMS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_CART_ITEMS_FAILURE,
        payload: error,
      });
    }
  };
};

export const addItemToCart = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
    try {
      const response = await api.put(`/api/cart/add`, reqData.cartItem, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      console.log("add item to cart", response.data);
      dispatch({
        type: ADD_ITEM_TO_CART_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log("add item to cart error", error);
      dispatch({
        type: ADD_ITEM_TO_CART_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const updateCartItem = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CARTITEM_REQUEST });
    try {
      const response = await api.put(`/api/cart-item/update`, reqData.data, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      console.log("update cart items", response.data);
      dispatch({
        type: UPDATE_CARTITEM_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_CARTITEM_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const removeCartItem = (cartItemId, token) => {
  return async (dispatch) => {
    dispatch({ type: REMOVE_CARTITEM_REQUEST });
    try {
      const response = await api.delete(`/api/cart-item/${cartItemId}/remove`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("remove cart item", response.data);
      dispatch({
        type: REMOVE_CARTITEM_SUCCESS,
        payload: response.data.id,
      });
    } catch (error) {
      dispatch({
        type: REMOVE_CARTITEM_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const clearCartAction = () => {
  return async (dispatch) => {
    dispatch({ type: CLEARE_CART_REQUEST });
    try {
      const response = await api.put(
        `/api/cart/clear`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      console.log("cart items", response.data);
      dispatch({
        type: CLEARE_CART_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CLEARE_CART_FAILURE,
        payload: error.message,
      });
    }
  };
};
