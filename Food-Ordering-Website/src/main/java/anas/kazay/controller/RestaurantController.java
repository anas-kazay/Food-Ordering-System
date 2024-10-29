package anas.kazay.controller;

import anas.kazay.dto.RestaurantDTO;
import anas.kazay.model.Restaurant;
import anas.kazay.model.User;
import anas.kazay.service.RestaurantService;
import anas.kazay.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {
    private RestaurantService restaurantService;
    private UserService userService;

    RestaurantController(RestaurantService restaurantService, UserService userService) {
        this.restaurantService = restaurantService;
        this.userService = userService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurants(
            @RequestParam String query
            ) {
        return ResponseEntity.ok(restaurantService.searchRestaurants(query));
    }

    @GetMapping()
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        return ResponseEntity.ok(restaurantService.getAllRestaurants());
    }

    @GetMapping("/{restaurantId}")
    public ResponseEntity<Restaurant> getRestaurantById(
            @PathVariable Long restaurantId
            ) throws Exception {
        System.out.println("restaurantId: " + restaurantId);
        return ResponseEntity.ok(restaurantService.getRestaurantById(restaurantId));
    }

    @PutMapping("/{restaurantId}/add-favorites")
    public ResponseEntity<RestaurantDTO> addToFavorites(
            @PathVariable Long restaurantId,
            @RequestHeader("Authorization") String token
            ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        RestaurantDTO restaurantDTO = restaurantService.addToFavorites(restaurantId, user);
        return ResponseEntity.ok(restaurantDTO);

    }



}
