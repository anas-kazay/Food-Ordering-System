package anas.kazay.controller;

import anas.kazay.model.Food;
import anas.kazay.model.Restaurant;
import anas.kazay.model.User;
import anas.kazay.request.CreateFoodRequest;
import anas.kazay.service.FoodService;
import anas.kazay.service.RestaurantService;
import anas.kazay.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/foods")
public class AdminFoodController {
    private FoodService foodService;
    private UserService userService;
    private RestaurantService restaurantService;

    AdminFoodController(FoodService foodService, UserService userService, RestaurantService restaurantService) {
        this.foodService = foodService;
        this.userService = userService;
        this.restaurantService = restaurantService;
    }

    @PostMapping()
    public ResponseEntity<Food> createFood(
            @RequestBody CreateFoodRequest createFoodRequest,
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Restaurant restaurant = restaurantService.getRestaurantById(createFoodRequest.getRestaurantId());
        Food food = foodService.createFood(createFoodRequest,createFoodRequest.getCategory(), restaurant);
        return ResponseEntity.ok(food);
    }

    @DeleteMapping("/{foodId}")
    public ResponseEntity<String> deleteFood(
            @PathVariable Long foodId
    ) throws Exception {
        foodService.deleteFood(foodId);
        return ResponseEntity.ok("Food deleted successfully");
    }

    @PutMapping("/{foodId}")
    public ResponseEntity<Food> updateFoodAvailability(
            @PathVariable Long foodId
    ) throws Exception {
        Food food = foodService.updateAvailability(foodId);
        return ResponseEntity.ok(food);
    }



}
