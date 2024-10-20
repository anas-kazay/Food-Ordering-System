package anas.kazay.controller;

import anas.kazay.model.Restaurant;
import anas.kazay.model.User;
import anas.kazay.request.CreateRestaurantRequest;
import anas.kazay.service.RestaurantService;
import anas.kazay.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/restaurants")
public class AdminRestaurantController {
    private RestaurantService restaurantService;
    private UserService userService;

    AdminRestaurantController(RestaurantService restaurantService, UserService userService) {
        this.restaurantService = restaurantService;
        this.userService = userService;
    }

    @PostMapping()
    public ResponseEntity<Restaurant> createRestaurant(
            @RequestBody CreateRestaurantRequest createRestaurantRequest,
            @RequestHeader("Authorization") String token
            ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        return ResponseEntity.ok(restaurantService.createRestaurant(createRestaurantRequest, user));
    }

    @PutMapping("/{restaurantId}")
    public ResponseEntity<Restaurant> updateRestaurant(
            @RequestBody CreateRestaurantRequest createRestaurantRequest,
            @PathVariable Long restaurantId
            ) throws Exception {
        return ResponseEntity.ok(restaurantService.updateRestaurant(createRestaurantRequest, restaurantId));
    }

    @DeleteMapping("/{restaurantId}")
    public ResponseEntity<String> deleteRestaurant(
            @PathVariable Long restaurantId
            ) throws Exception {
        restaurantService.deleteRestaurant(restaurantId);
        return ResponseEntity.ok("Restaurant deleted successfully");
    }

    @PutMapping("/{restaurantId}/status")
    public ResponseEntity<Restaurant> updateRestaurantStatus(
            @PathVariable Long restaurantId
            ) throws Exception {
        return ResponseEntity.ok(restaurantService.updateRestaurantStatus(restaurantId));
    }

    @GetMapping("/user")
    public ResponseEntity<Restaurant> getRestaurantByUserId(
            @RequestHeader("Authorization") String token
            ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        return ResponseEntity.ok(restaurantService.getRestaurantByUserId(user.getId()));
    }




}
