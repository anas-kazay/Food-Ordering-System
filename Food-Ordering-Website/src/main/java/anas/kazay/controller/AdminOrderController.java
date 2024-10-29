package anas.kazay.controller;

import anas.kazay.enums.OrderStatus;
import anas.kazay.model.Order;
import anas.kazay.model.User;
import anas.kazay.request.CreateOrderRequest;
import anas.kazay.service.OrderService;
import anas.kazay.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/order")
public class AdminOrderController {
    private OrderService orderService;
    private UserService userService;

    AdminOrderController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }


    @GetMapping("order/restaurants/{restaurantId}")
    public ResponseEntity<List<Order>> getOrdersByUser(
            @RequestHeader("Authorization") String token,
            @PathVariable Long restaurantId,
            @RequestParam(required = false) String status
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        return ResponseEntity.ok(orderService.getRestaurantOrders(restaurantId, OrderStatus.valueOf(status)));
    }

    @PutMapping("order/{orderId}/{orderStatus}")
    public ResponseEntity<Order> updateOrderStatus(
            @RequestHeader("Authorization") String token,
            @PathVariable Long orderId,
            @PathVariable String status
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        return ResponseEntity.ok(orderService.updateOrder(orderId, OrderStatus.valueOf(status)));
    }


}
