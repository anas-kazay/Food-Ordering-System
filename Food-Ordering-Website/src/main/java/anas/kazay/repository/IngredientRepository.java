package anas.kazay.repository;

import anas.kazay.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientRepository extends JpaRepository<Ingredient, Long>{
    List<Ingredient> findByRestaurantId(Long restaurantId);
}
