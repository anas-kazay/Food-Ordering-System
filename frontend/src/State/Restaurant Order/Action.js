import { api } from "../../components/config/api.js";
import {
  GET_RESTAURANTS_ORDER_FAILURE,
  GET_RESTAURANTS_ORDER_REQUEST,
  GET_RESTAURANTS_ORDER_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
} from "./ActionType.js";

export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    try {
      const response = await api.put(
        `/api/admin/${orderId}/${orderStatus}`,
        {},
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      const updatedOrder = response.data;
      console.log("updatedOrder", updatedOrder);
      dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: updatedOrder });
    } catch (error) {
      console.log(error);
      dispatch({ type: UPDATE_ORDER_STATUS_FAILURE });
    }
  };
};

export const fetchRestaurantOrders = ({ restaurantId, orderStatus, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });
    try {
      const response = await api.get(
        `/api/admin/order/restaurant/${restaurantId}`,
        {
          params: { order_status: orderStatus },
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      const orders = response.data;
      console.log("orders", orders);
      dispatch({ type: GET_RESTAURANTS_ORDER_SUCCESS, payload: orders });
    } catch (error) {
      console.log("order error", error);
      dispatch({ type: GET_RESTAURANTS_ORDER_FAILURE });
    }
  };
};
