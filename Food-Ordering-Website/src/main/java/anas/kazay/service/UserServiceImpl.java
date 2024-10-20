package anas.kazay.service;

import anas.kazay.configuration.JwtProvider;
import anas.kazay.model.User;
import anas.kazay.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    private UserRepository userRepository;
    private JwtProvider jwtProvider;

    public UserServiceImpl(UserRepository userRepository, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public User findUserByJwtToken(String token) throws Exception {
        jwtProvider.getEmailFromToken(token);
        User user = userRepository.findByEmail(jwtProvider.getEmailFromToken(token));
        if (user == null) {
            throw new Exception("User not found with token : "+ token);
        }
        return user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new Exception("User not found with email : "+ email);
        }
        return user;
    }
}
