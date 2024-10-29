package anas.kazay.controller;

import anas.kazay.model.Ingredient;
import anas.kazay.model.IngredientCategory;
import anas.kazay.request.IngredientCategoryRequest;
import anas.kazay.request.IngredientRequest;
import anas.kazay.service.IngredientsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/admin/ingredients")
public class IngredientsController {
    private IngredientsService ingredientsService;


    IngredientsController(IngredientsService ingredientsService) {
        this.ingredientsService = ingredientsService;
    }

    @PostMapping("/category")
    public ResponseEntity<IngredientCategory> createIngredientCategory(
            @RequestBody IngredientCategoryRequest ingredientCategoryRequest) throws Exception {
        IngredientCategory category = ingredientsService.createIngredientCategory(
                ingredientCategoryRequest.getName(),
                ingredientCategoryRequest.getRestaurantId()
        );
        return ResponseEntity.ok(category);

    }

    @PostMapping
    public ResponseEntity<Ingredient> createIngredient(
            @RequestBody IngredientRequest ingredientRequest) throws Exception {
        Ingredient ingredient = ingredientsService.createIngredient(
                ingredientRequest.getName(),
                ingredientRequest.getCategoryId(),
                ingredientRequest.getRestaurantId());
        return ResponseEntity.ok(ingredient);

    }

    @PutMapping("/{id}/stock")
    public ResponseEntity<Ingredient> updateIngredientStock(
            @PathVariable Long id) throws Exception {
        Ingredient ingredient = ingredientsService.updateStock(id);
        return ResponseEntity.ok(ingredient);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Ingredient>> getRestaurantIngredients(
            @PathVariable Long restaurantId) throws Exception {
        List<Ingredient> ingredients = ingredientsService.findRestaurantIngredients(restaurantId);
        return ResponseEntity.ok(ingredients);
    }

    @GetMapping("/restaurant/{restaurantId}/category")
    public ResponseEntity<List<IngredientCategory>> getRestaurantIngredientCategories(
            @PathVariable Long restaurantId) throws Exception {
        List<IngredientCategory> categories = ingredientsService.findIngredientCategoriesByRestaurantId(restaurantId);
        return ResponseEntity.ok(categories);
    }


}
