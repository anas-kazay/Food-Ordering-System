package anas.kazay.service;

import anas.kazay.model.Cart;
import anas.kazay.model.CartItem;
import anas.kazay.request.AddCartItemRequest;

public interface CartService {
    public CartItem addItemToCart(AddCartItemRequest addCartItemRequest, String token) throws Exception;
    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception;
    public Cart removeItemFromCart(Long cartItemId,String token) throws Exception;
    public Long calculateCartTotals(Cart cart) throws Exception;
    public Cart findCartById(Long cartId) throws Exception;
    public Cart findCartByUserId(Long userId) throws Exception;
    public Cart clearCart(Long userId) throws Exception;
}
