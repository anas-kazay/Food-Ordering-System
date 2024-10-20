package anas.kazay.service;

import anas.kazay.model.User;

public interface UserService {
    public User findUserByJwtToken(String token) throws Exception;

    public User findUserByEmail(String email) throws Exception;
}
