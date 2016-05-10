package com.worthytrust.swordman.dao;

import java.util.List;

import com.worthytrust.swordman.entity.User;

public interface IUserDao {
	int deleteByPrimaryKey(Integer id);

	int insert(User record);

	int insertSelective(User record);

	User selectByPrimaryKey(Integer id);

	int updateByPrimaryKeySelective(User record);

	int updateByPrimaryKey(User record);
	
	List<User> selectByUserName(String userName);
}
