package anas.kazay.controller;

import anas.kazay.model.CartItem;
import anas.kazay.model.Order;
import anas.kazay.model.User;
import anas.kazay.request.CreateOrderRequest;
import anas.kazay.request.OrderRequest;
import anas.kazay.service.OrderService;
import anas.kazay.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

private OrderService orderService;
private UserService userService;

OrderController(OrderService orderService, UserService userService) {
this.orderService = orderService;
this.userService = userService;
}

@PostMapping("/order")
    public ResponseEntity<Order> createOrder(
        @RequestBody OrderRequest orderRequest,
        @RequestHeader("Authorization") String token
        )throws Exception {
    User user = userService.findUserByJwtToken(token);
    Order order = orderService.createOrder(orderRequest, user);
    return ResponseEntity.ok(order);
}

@GetMapping("order/user")
public ResponseEntity<List<Order>> getOrderHistory(
        @RequestHeader("Authorization") String token
) throws Exception {
    User user = userService.findUserByJwtToken(token);
    List<Order> orders = orderService.getOrdersByUser(user.getId());
    return ResponseEntity.ok(orders);
}


}
