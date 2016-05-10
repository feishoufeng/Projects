package com.worthytrust.swordman.serviceImpl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.worthytrust.swordman.dao.IUserDao;
import com.worthytrust.swordman.entity.User;
import com.worthytrust.swordman.service.IUserService;

@Service("userService")
public class UserServiceImpl implements IUserService {
	@Resource
	private IUserDao userDao;

	public User getUserById(int userId) {
		return this.userDao.selectByPrimaryKey(userId);
	}

	@Override
	public List<User> checkUserName(String userName) {
		return this.userDao.selectByUserName(userName);
	}
}
