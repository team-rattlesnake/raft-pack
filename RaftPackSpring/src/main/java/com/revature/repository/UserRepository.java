package com.revature.repository;

import java.util.List;

import com.revature.model.User;

public interface UserRepository {
	
	void create(User user);
	List<User> findAll();
	User findByUserId(int userId);
	User findByUserEmail(String userEmail);
	List<User> findByFirstName(String firstName);
	List<User> findByLastName(String lastName);
	List<User> findByDoB(String dob);
	List<User> findByGender(String gender);
	void update(User user);
	void delete(User user);

}
