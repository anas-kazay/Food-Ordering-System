package anas.kazay.service;

import anas.kazay.model.Category;
import anas.kazay.model.Food;
import anas.kazay.model.Restaurant;
import anas.kazay.request.CreateFoodRequest;

import java.util.List;

public interface FoodService {
    public Food createFood(CreateFoodRequest createFoodRequest, Category category, Restaurant restaurant);
    public void deleteFood(Long foodId) throws Exception;
    public List<Food> getRestaurantFoods(Long restaurantId,
                                         boolean isVegetarian,
                                         boolean isNonVegetarian,
                                         boolean isSeasonal,
                                         String foodCategory
    );

    public List<Food> searchFood(String query);
    public Food findFoodById(Long foodId) throws Exception;
    public Food updateAvailability(Long foodId) throws Exception;



}
