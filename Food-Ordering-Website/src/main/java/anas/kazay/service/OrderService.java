package anas.kazay.service;

import anas.kazay.enums.OrderStatus;
import anas.kazay.model.Order;
import anas.kazay.model.User;
import anas.kazay.request.CreateOrderRequest;
import anas.kazay.request.OrderRequest;

import java.util.List;

public interface OrderService {
    public Order createOrder(OrderRequest orderRequest, User user) throws Exception;
    public Order updateOrder(Long orderId, OrderStatus orderStatus) throws Exception;
    public void cancelOrder(Long orderId) throws Exception;
    public List<Order> getOrdersByUser(Long userId) throws Exception;
    public List<Order> getRestaurantOrders(Long restaurantId,OrderStatus orderStatus) throws Exception;
    public Order getOrderById(Long orderId) throws Exception;
}
