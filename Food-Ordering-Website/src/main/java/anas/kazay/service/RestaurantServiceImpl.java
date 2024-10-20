package anas.kazay.service;


import anas.kazay.dto.RestaurantDTO;
import anas.kazay.model.Address;
import anas.kazay.model.Restaurant;
import anas.kazay.model.User;
import anas.kazay.repository.AddressRepository;
import anas.kazay.repository.RestaurantRepository;
import anas.kazay.repository.UserRepository;
import anas.kazay.request.CreateRestaurantRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RestaurantServiceImpl implements RestaurantService {
    private RestaurantRepository restaurantRepository;
    private AddressRepository addressRepository;
    private UserRepository userRepository;

    RestaurantServiceImpl(RestaurantRepository restaurantRepository, AddressRepository addressRepository, UserRepository userRepository) {
        this.restaurantRepository = restaurantRepository;
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Restaurant createRestaurant(CreateRestaurantRequest createRestaurantRequest, User user) throws Exception {
        Address address = addressRepository.save(createRestaurantRequest.getAddress());

        Restaurant restaurant = Restaurant.builder()
                .address(address)
                .contactInformation(createRestaurantRequest.getContactInformation())
                .cuisineType(createRestaurantRequest.getCuisineType())
                .description(createRestaurantRequest.getDescription())
                .name(createRestaurantRequest.getName())
                .openingHours(createRestaurantRequest.getOpeningHours())
                .images(createRestaurantRequest.getImages())
                .registrationDate(LocalDateTime.now())
                .owner(user)
                .build();

        return restaurantRepository.save(restaurant);
    }


    @Override
    public Restaurant updateRestaurant(CreateRestaurantRequest createRestaurantRequest, Long restaurantId) throws Exception {
        Restaurant restaurant = getRestaurantById(restaurantId);
        if(createRestaurantRequest.getAddress() != null) {
            Address address = addressRepository.save(createRestaurantRequest.getAddress());
            restaurant.setAddress(address);
        }
        if(createRestaurantRequest.getContactInformation() != null) {
            restaurant.setContactInformation(createRestaurantRequest.getContactInformation());
        }
        if(createRestaurantRequest.getCuisineType() != null) {
            restaurant.setCuisineType(createRestaurantRequest.getCuisineType());
        }
        if(createRestaurantRequest.getDescription() != null) {
            restaurant.setDescription(createRestaurantRequest.getDescription());
        }
        if(createRestaurantRequest.getName() != null) {
            restaurant.setName(createRestaurantRequest.getName());
        }
        if(createRestaurantRequest.getOpeningHours() != null) {
            restaurant.setOpeningHours(createRestaurantRequest.getOpeningHours());
        }
        if(createRestaurantRequest.getImages() != null) {
            restaurant.setImages(createRestaurantRequest.getImages());
        }
        return restaurantRepository.save(restaurant);
    }

    @Override
    public void deleteRestaurant(Long restaurantId) throws Exception {
        Restaurant restaurant = getRestaurantById(restaurantId);
        restaurantRepository.delete(restaurant);
    }

    @Override
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    @Override
    public List<Restaurant> searchRestaurants(String query) {
        return restaurantRepository.findBySearchQuery(query);
    }

    @Override
    public Restaurant getRestaurantById(Long restaurantId) throws Exception {
        return restaurantRepository.findById(restaurantId).orElseThrow(() -> new Exception("Restaurant not found"));
    }

    @Override
    public Restaurant getRestaurantByUserId(Long userId) throws Exception {
        Restaurant restaurant= restaurantRepository.findByOwnerId(userId);
        if(restaurant == null) {
            throw new Exception("Restaurant not found");
        }
        return restaurant;
    }

    @Override
    public RestaurantDTO addToFavorites(Long restaurantId, User user) throws Exception {
        Restaurant restaurant = getRestaurantById(restaurantId);
        RestaurantDTO restaurantDTO = RestaurantDTO.builder()
                .description(restaurant.getDescription())
                .title(restaurant.getName())
                .images(restaurant.getImages())
                .id(restaurant.getId())
                .build();

        boolean isAlreadyFavorite = user.getFavorites().stream()
                .anyMatch(fav -> fav.getId().equals(restaurantId));

        if (isAlreadyFavorite) {
            // Remove the restaurant from favorites if it exists
            user.getFavorites().removeIf(fav -> fav.getId().equals(restaurantId));
        } else {
            // Add the restaurant to favorites if it doesn't exist
            user.getFavorites().add(restaurantDTO);
        }

        userRepository.save(user);
        return restaurantDTO;
    }


    @Override
    public Restaurant updateRestaurantStatus(Long restaurantId) throws Exception {
        Restaurant restaurant = getRestaurantById(restaurantId);
        restaurant.setOpen(!restaurant.isOpen());
        return restaurantRepository.save(restaurant);
    }
}
