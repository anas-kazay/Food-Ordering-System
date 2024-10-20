package anas.kazay.service;

import anas.kazay.dto.RestaurantDTO;
import anas.kazay.model.Restaurant;
import anas.kazay.model.User;
import anas.kazay.request.CreateRestaurantRequest;

import java.util.List;

public interface RestaurantService {
    public Restaurant createRestaurant(CreateRestaurantRequest createRestaurantRequest, User user) throws Exception;
    public Restaurant updateRestaurant(CreateRestaurantRequest createRestaurantRequest, Long restaurantId) throws Exception;
    public void deleteRestaurant(Long restaurantId) throws Exception;
    public List<Restaurant> getAllRestaurants();
    public List<Restaurant> searchRestaurants(String query);
    public Restaurant getRestaurantById(Long restaurantId) throws Exception;
    public Restaurant getRestaurantByUserId(Long userId) throws Exception;
    public RestaurantDTO addToFavorites(Long restaurantId, User user) throws Exception;
    public Restaurant updateRestaurantStatus(Long restaurantId) throws Exception;

}
