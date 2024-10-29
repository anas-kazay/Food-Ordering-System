package anas.kazay.repository;

import anas.kazay.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    public List<Order> findByCustomerId(Long customerId);
    public List<Order> findByRestaurantId(Long restaurantId);

}
