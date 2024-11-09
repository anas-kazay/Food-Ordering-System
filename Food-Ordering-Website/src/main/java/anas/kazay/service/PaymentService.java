package anas.kazay.service;

import anas.kazay.model.Order;
import anas.kazay.request.PaymentResponse;

public interface PaymentService  {
    public PaymentResponse createPaymentLink(Order order);
}
