package anas.kazay.service;

import anas.kazay.enums.OrderStatus;
import anas.kazay.model.*;
import anas.kazay.repository.*;
import anas.kazay.request.CreateOrderRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService{
    private OrderRepository orderRepository;
    private OrderItemRepository orderItemRepository;
    private AddressRepository addressRepository;
    private UserRepository userRepository;
    private RestaurantRepository restaurantRepository;
    private RestaurantService restaurantService;
    private CartService cartService;

    public OrderServiceImpl(OrderRepository orderRepository,
                            OrderItemRepository orderItemRepository,
                            AddressRepository addressRepository,
                            UserRepository userRepository,
                            RestaurantRepository restaurantRepository,
                            RestaurantService restaurantService,
                            CartService cartService
    ) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.restaurantRepository = restaurantRepository;
        this.restaurantService = restaurantService;
        this.cartService = cartService;
    }

    @Override
    public Order createOrder(CreateOrderRequest orderRequest, User user) throws Exception {
        Address deliveryAddress = orderRequest.getDeliveryAddress();
        Address savedAddress = addressRepository.save(deliveryAddress);
        if(!user.getAddresses().contains(savedAddress)) {
            user.getAddresses().add(savedAddress);
            userRepository.save(user);
        }
        Restaurant restaurant = restaurantRepository.findById(orderRequest.getRestaurantId()).get();
        Order order = new Order();
        order.setRestaurant(restaurant);
        order.setCustomer(user);
        order.setDeliveryAddress(savedAddress);
        order.setOrderDate(new Date());
        order.setStatus(OrderStatus.PENDING);

        Cart cart = cartService.findCartByUserId(user.getId());
        List<OrderItem> orderItems = new ArrayList<>();
        for(CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setFood(cartItem.getFood());
            orderItem.setIngredients(cartItem.getIngredients());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalPrice(cartItem.getTotalPrice());
            OrderItem savedOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(savedOrderItem);
        }
        Long totalPrice=cartService.calculateCartTotals(cart);
        order.setItems(orderItems);
        order.setTotalPrice(totalPrice);
        Order savedOrder = orderRepository.save(order);
        restaurant.getOrders().add(savedOrder);
        return savedOrder;

    }

    @Override
    public Order updateOrder(Long orderId, OrderStatus orderStatus) throws Exception {
       Order order = orderRepository.findById(orderId).orElseThrow(() -> new Exception("Order not found"));
       if(orderStatus==OrderStatus.OUT_FOR_DELIVERY ||
               orderStatus==OrderStatus.DELIVERED ||
                orderStatus==OrderStatus.COMPLETED ||
                orderStatus==OrderStatus.PENDING
       ){
           order.setStatus(orderStatus);
           return orderRepository.save(order);
       }
        throw new Exception("Invalid order status");
    }

    @Override
    public void cancelOrder(Long orderId) throws Exception {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new Exception("Order not found"));
        orderRepository.deleteById(orderId);
    }

    @Override
    public List<Order> getOrdersByUser(Long userId) throws Exception {
        return orderRepository.findByCustomerId(userId);
    }

    @Override
    public List<Order> getRestaurantOrders(Long restaurantId, OrderStatus orderStatus) throws Exception {
        List<Order> orders = orderRepository.findByRestaurantId(restaurantId);

        return orderStatus != null ?
                orders.stream()
                        .filter(order -> order.getStatus() == orderStatus)
                        .collect(Collectors.toList()) :
                orders;
    }


    @Override
    public Order getOrderById(Long orderId) throws Exception {
        return orderRepository.findById(orderId).orElseThrow(() -> new Exception("Order not found"));
    }
}
