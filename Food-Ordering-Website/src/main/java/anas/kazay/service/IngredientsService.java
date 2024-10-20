package anas.kazay.service;

import anas.kazay.model.Ingredient;
import anas.kazay.model.IngredientCategory;

import java.util.List;

public interface IngredientsService {
    public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception;
    public IngredientCategory findIngredientCategoryById(Long ingredientCategoryId) throws Exception;
    public List<IngredientCategory> findIngredientCategoriesByRestaurantId(Long restaurantId) throws Exception;

    public Ingredient createIngredient(String name, Long ingredientCategoryId,Long restaurantId) throws Exception;

    public List<Ingredient> findRestaurantIngredients(Long restaurantId) throws Exception;

    public Ingredient updateStock(Long ingredientId, int stock) throws Exception;

}
