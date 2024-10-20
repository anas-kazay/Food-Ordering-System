package anas.kazay.service;

import anas.kazay.model.Category;
import anas.kazay.model.Food;
import anas.kazay.model.Restaurant;
import anas.kazay.repository.FoodRepository;
import anas.kazay.request.CreateFoodRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodServiceImpl implements FoodService{
    private FoodRepository foodRepository;

    FoodServiceImpl(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }
    @Override
    public Food createFood(CreateFoodRequest createFoodRequest, Category category, Restaurant restaurant) {
        Food food = Food.builder()
                .category(category)
                .description(createFoodRequest.getDescription())
                .images(createFoodRequest.getImages())
                .ingredients(createFoodRequest.getIngredients())
                .isSeasonal(createFoodRequest.isSeasonal())
                .isVegetarian(createFoodRequest.isVegetarian())
                .name(createFoodRequest.getName())
                .price(createFoodRequest.getPrice())
                .restaurant(restaurant)
                .build();
        Food savedFood = foodRepository.save(food);
        restaurant.getFoods().add(savedFood);
        return savedFood;

    }

    @Override
    public void deleteFood(Long foodId) throws Exception {
        Food food = findFoodById(foodId);
        food.setRestaurant(null);
        foodRepository.save(food);
        foodRepository.deleteById(foodId);
    }

    @Override
    public List<Food> getRestaurantFoods(Long restaurantId,
                                         boolean isVegetarian,
                                         boolean isNonVegetarian,
                                         boolean isSeasonal,
                                         String foodCategory) {
        List<Food> foods = foodRepository.findByRestaurantId(restaurantId);
        if(isVegetarian) {
            foods.removeIf(food -> !food.isVegetarian());
        }
        if(isNonVegetarian) {
            foods.removeIf(food -> food.isVegetarian());
        }
        if(isSeasonal) {
            foods.removeIf(food -> !food.isSeasonal());
        }
        if(foodCategory != null) {
            foods.removeIf(food -> !food.getCategory().getName().equals(foodCategory));
        }
        return foods;
    }

    @Override
    public List<Food> searchFood(String query) {
        return foodRepository.searchFood(query);
    }

    @Override
    public Food findFoodById(Long foodId) throws Exception {
        return foodRepository.findById(foodId).orElseThrow(() -> new Exception("Food not found"));
    }

    @Override
    public Food updateAvailability(Long foodId) throws Exception {
        Food food = findFoodById(foodId);
        food.setAvailable(!food.isAvailable());
        return foodRepository.save(food);
    }
}
