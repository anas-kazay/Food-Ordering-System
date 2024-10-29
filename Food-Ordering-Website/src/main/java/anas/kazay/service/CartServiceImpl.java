package anas.kazay.service;

import anas.kazay.model.Cart;
import anas.kazay.model.CartItem;
import anas.kazay.model.Food;
import anas.kazay.model.User;
import anas.kazay.repository.CartItemRepository;
import anas.kazay.repository.CartRepository;
import anas.kazay.repository.FoodRepository;
import anas.kazay.request.AddCartItemRequest;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService{
    private CartRepository cartRepository;
    private UserService userService;
    private CartItemRepository cartItemRepository;
    private FoodService foodService;

    CartServiceImpl(CartRepository cartRepository, UserService userService, CartItemRepository cartItemRepository,FoodService foodService) {
        this.cartRepository = cartRepository;
        this.userService = userService;
        this.cartItemRepository = cartItemRepository;
        this.foodService = foodService;
    }

    @Override
    public CartItem addItemToCart(AddCartItemRequest addCartItemRequest, String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Food food = foodService.findFoodById(addCartItemRequest.getFoodId());
        Cart cart = cartRepository.findByCustomerId(user.getId());
        for(CartItem cartItem : cart.getItems()) {
            if(cartItem.getFood().getId() == food.getId()) {
                int newQuantity = cartItem.getQuantity() + addCartItemRequest.getQuantity();
                return updateCartItemQuantity(cartItem.getId(), newQuantity);
            }
        }
           CartItem newCartItem = new CartItem();
            newCartItem.setFood(food);
            newCartItem.setQuantity(addCartItemRequest.getQuantity());
            newCartItem.setCart(cart);
            newCartItem.setIngredients(addCartItemRequest.getIngredients());
            newCartItem.setTotalPrice(food.getPrice() * addCartItemRequest.getQuantity());
            CartItem savedCartItem = cartItemRepository.save(newCartItem);
            cart.getItems().add(savedCartItem);
            return savedCartItem;
    }

    @Override
    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception {
        CartItem cartItem = cartItemRepository.findById(cartItemId).orElseThrow(() -> new Exception("Cart item not found"));
        cartItem.setQuantity(quantity);
        cartItem.setTotalPrice(cartItem.getFood().getPrice() * quantity);
        return cartItemRepository.save(cartItem);
    }

    @Override
    public Cart removeItemFromCart(Long cartItemId, String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Cart cart = cartRepository.findByCustomerId(user.getId());
        CartItem cartItem = cartItemRepository.findById(cartItemId).orElseThrow(() -> new Exception("Cart item not found"));
        cart.getItems().remove(cartItem);
        cartRepository.save(cart);
        return cart;
    }

    @Override
    public Long calculateCartTotals(Cart cart) throws Exception {
        Long total = 0L;
        for(CartItem cartItem : cart.getItems()) {
            total += cartItem.getTotalPrice();
        }
        return total;
    }

    @Override
    public Cart findCartById(Long cartId) throws Exception {
        return cartRepository.findById(cartId).orElseThrow(() -> new Exception("Cart not found"));
    }

    @Override
    public Cart findCartByUserId(Long userId) throws Exception {
        Cart cart = cartRepository.findByCustomerId(userId);
        cart.setTotal(calculateCartTotals(cart));
        return cart;
    }

    @Override
    public Cart clearCart(Long userId) throws Exception {
        Cart cart = cartRepository.findByCustomerId(userId);
        cart.getItems().clear();
        return cartRepository.save(cart);
    }



}
