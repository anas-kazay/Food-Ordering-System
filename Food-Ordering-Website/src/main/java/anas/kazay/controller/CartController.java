package anas.kazay.controller;


import anas.kazay.model.Cart;
import anas.kazay.model.CartItem;
import anas.kazay.model.User;
import anas.kazay.request.AddCartItemRequest;
import anas.kazay.request.UpdateCartItemRequest;
import anas.kazay.service.CartService;
import anas.kazay.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CartController {
    private CartService cartService;
    private UserService userService;

    CartController(CartService cartService, UserService userService) {
        this.cartService = cartService;
        this.userService = userService;
    }

    @PutMapping("/cart/add")
    public ResponseEntity<CartItem> addItemToCart(
            @RequestBody AddCartItemRequest addCartItemRequest,
            @RequestHeader("Authorization") String token
            ) throws Exception {
        CartItem cartItem = cartService.addItemToCart(addCartItemRequest, token);
        return ResponseEntity.ok(cartItem);
    }

    @PutMapping("/cart-item/update")
    public ResponseEntity<CartItem> updateCartItem(
            @RequestBody UpdateCartItemRequest updateCartItemRequest,
            @RequestHeader("Authorization") String token
            ) throws Exception {

        CartItem cartItem = cartService.updateCartItemQuantity(
                updateCartItemRequest.getCartItemId(),
                updateCartItemRequest.getQuantity());
        return ResponseEntity.ok(cartItem);

    }

    @DeleteMapping("/cart-item/{cartItemId}/remove")
    public ResponseEntity<String> removeItemFromCart(
            @PathVariable Long cartItemId,
            @RequestHeader("Authorization") String token
            ) throws Exception {
        cartService.removeItemFromCart(cartItemId, token);
        return ResponseEntity.ok("Item removed from cart");
    }

    @PutMapping("/cart/clear")
    public ResponseEntity<String> clearCart(
            @RequestHeader("Authorization") String token
            ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        cartService.clearCart(user.getId());
        return ResponseEntity.ok("Cart cleared");
    }

    @GetMapping("/cart")
    public ResponseEntity<Cart> findUserCart(
            @RequestHeader("Authorization") String token
            ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Cart cart = cartService.findCartByUserId(user.getId());
        return ResponseEntity.ok(cart);
    }

}
