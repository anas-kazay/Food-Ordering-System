package anas.kazay.controller;


import anas.kazay.model.Food;
import anas.kazay.service.FoodService;
import anas.kazay.service.RestaurantService;
import anas.kazay.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
public class FoodController {
    private FoodService foodService;
    private UserService userService;
    private RestaurantService restaurantService;

    FoodController(FoodService foodService, UserService userService, RestaurantService restaurantService) {
        this.foodService = foodService;
        this.userService = userService;
        this.restaurantService = restaurantService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFood(
            @RequestParam String query
            ) {
        return ResponseEntity.ok(foodService.searchFood(query));
    }

    @GetMapping("restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> getRestaurantFood(
            @RequestParam boolean isVegetarian,
            @RequestParam boolean isNonVegetarian,
            @RequestParam boolean isSeasonal,
            @RequestParam(required = false) String foodCategory,
            @PathVariable Long restaurantId
            ) {
    List<Food> foods= foodService.getRestaurantFoods(restaurantId, isVegetarian, isNonVegetarian, isSeasonal, foodCategory);
    return ResponseEntity.ok(foods);
    }


}
