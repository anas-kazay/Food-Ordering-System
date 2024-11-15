package anas.kazay.model;

import anas.kazay.enums.OrderStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
@Table(name = "orders")
public class Order {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    private User customer;
    @JsonIgnore
    @ManyToOne
    private Restaurant restaurant;
    private Long totalPrice;
    private OrderStatus status;
    private Date orderDate;
    @ManyToOne
    private Address deliveryAddress;
    @OneToMany
    private List<OrderItem> items;
    private int totalItems;

}
