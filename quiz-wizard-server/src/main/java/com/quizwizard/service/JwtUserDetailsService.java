package com.quizwizard.service;

import com.quizwizard.dao.PreferencesDao;
import com.quizwizard.dao.UserDao;
import com.quizwizard.dto.UserDto;
import com.quizwizard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDao user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(
            user.getUsername(),
            user.getPassword(),
            new ArrayList<>()
        );
    }

    public UserDao save(UserDto user) {
        UserDao newUser = new UserDao();

        newUser.setUsername(user.getUsername());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));

        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setAvatar(user.getAvatar());

        // create default preferences
        PreferencesDao preferences = new PreferencesDao();
        preferences.setLanguage("en");
        preferences.setTheme("light");

        newUser.setPreferences(preferences);

        return userRepository.save(newUser);
    }

    public UserDao getAuthenticatedUser() {
        Object principal = SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();

        String username = principal instanceof UserDetails ?
            ((UserDetails) principal).getUsername() :
            principal.toString();

        return userRepository.findByUsername(username);
    }

}
