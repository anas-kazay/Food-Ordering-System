package anas.kazay.service;

import anas.kazay.model.Category;

import java.util.List;

public interface CategoryService {
    public Category createCategory(String name,Long userId) throws Exception;
    public List<Category> findCategoriesByRestaurantId(Long restaurantId) throws Exception;
    public Category findCategoryById(Long categoryId) throws Exception;

}
