package com.worthytrust.swordman.service;

import java.util.List;

import com.worthytrust.swordman.entity.User;

public interface IUserService {
	public User getUserById(int userId);
	public List<User> checkUserName(String userName);
}
