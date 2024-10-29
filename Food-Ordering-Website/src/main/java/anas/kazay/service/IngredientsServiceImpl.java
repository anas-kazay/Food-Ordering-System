package anas.kazay.service;

import anas.kazay.model.Ingredient;
import anas.kazay.model.IngredientCategory;
import anas.kazay.model.Restaurant;
import anas.kazay.repository.IngredientCategoryRepository;
import anas.kazay.repository.IngredientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientsServiceImpl implements IngredientsService{
    private IngredientRepository ingredientRepository;
    private IngredientCategoryRepository ingredientCategoryRepository;
    private RestaurantService restaurantService;

    IngredientsServiceImpl(IngredientRepository ingredientRepository,
                           IngredientCategoryRepository ingredientCategoryRepository,
                            RestaurantService restaurantService) {
        this.ingredientRepository = ingredientRepository;
        this.ingredientCategoryRepository = ingredientCategoryRepository;
        this.restaurantService = restaurantService;
    }


    @Override
    public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception {
        Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);
        IngredientCategory ingredientCategory = IngredientCategory.builder()
                .name(name)
                .restaurant(restaurant)
                .build();
        return ingredientCategoryRepository.save(ingredientCategory);
    }

    @Override
    public IngredientCategory findIngredientCategoryById(Long ingredientCategoryId) throws Exception {
        return ingredientCategoryRepository.findById(ingredientCategoryId).orElseThrow(() -> new Exception("Ingredient Category not found"));
    }

    @Override
    public List<IngredientCategory> findIngredientCategoriesByRestaurantId(Long restaurantId) throws Exception {
        restaurantService.getRestaurantById(restaurantId);
        return ingredientCategoryRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public Ingredient createIngredient(String name, Long ingredientCategoryId, Long restaurantId) throws Exception {
        Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);
        IngredientCategory ingredientCategory = findIngredientCategoryById(ingredientCategoryId);
        Ingredient ingredient = Ingredient.builder()
                .name(name)
                .restaurant(restaurant)
                .category(ingredientCategory)
                .build();
        Ingredient savedIngredient = ingredientRepository.save(ingredient);
        ingredientCategory.getIngredients().add(savedIngredient);
        return savedIngredient;
    }

    @Override
    public List<Ingredient> findRestaurantIngredients(Long restaurantId) throws Exception {
        return ingredientRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public Ingredient updateStock(Long ingredientId) throws Exception {
        Ingredient ingredient = ingredientRepository.findById(ingredientId).orElseThrow(() -> new Exception("Ingredient not found"));
        ingredient.setInStock(!ingredient.isInStock());
        return ingredientRepository.save(ingredient);
    }
}
