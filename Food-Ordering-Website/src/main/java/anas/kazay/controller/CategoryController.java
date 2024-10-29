package anas.kazay.controller;

import anas.kazay.model.Category;
import anas.kazay.model.Restaurant;
import anas.kazay.model.User;
import anas.kazay.service.CategoryService;
import anas.kazay.service.RestaurantService;
import anas.kazay.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {
    private CategoryService categoryService;
    private UserService userService;
    private RestaurantService restaurantService;

    CategoryController(CategoryService categoryService, UserService userService, RestaurantService restaurantService) {
        this.categoryService = categoryService;
        this.userService = userService;
        this.restaurantService = restaurantService;
    }

    @PostMapping("/admin/category")
    public ResponseEntity<Category> createCategory(
            @RequestBody Category category,
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Category createdCategory = categoryService.createCategory(category.getName(), user.getId());
        return ResponseEntity.ok(createdCategory);
    }

    @GetMapping("/category/resaurant/{id}")
    public ResponseEntity<List<Category>> getRestaurantCategory(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Restaurant restaurant = restaurantService.getRestaurantByUserId(user.getId());
        List<Category> categories = categoryService.findCategoriesByRestaurantId(restaurant.getId());
        return ResponseEntity.ok(categories);
    }

}
