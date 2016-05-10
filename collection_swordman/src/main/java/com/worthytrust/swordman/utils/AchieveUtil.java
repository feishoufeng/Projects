package com.worthytrust.swordman.utils;

import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class AchieveUtil {
	/**
	 * 获取随机id值
	 * 
	 * @return 返回随机id值
	 */
	public static String getRandomId() {
		return UUID.randomUUID().toString();
	}

	/**
	 * 获取当前时间字符串
	 * 
	 * @param style
	 *            输出时间格式（1：2016-01-01 11:11:11）,（2：2016-01-01）,（3：2016）
	 * @return 返回当前时间字符串
	 */
	public static String getCurrentTime(int style) {
		String styleStr = "";
		switch (style) {
		case ConstantsUtil.LONG_TIME_STYLE:
			styleStr = "yyyy-MM-dd HH:mm:ss";
			break;
		case ConstantsUtil.SHORT_TIME_STYLE:
			styleStr = "yyyy-MM-dd";
			break;
		case ConstantsUtil.TIME_YEAR_STYLE:
			styleStr = "yyyy";
			break;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(styleStr);
		return sdf.format(new Date());
	}

	/***
	 * MD5加密 生成32位md5码
	 * 
	 * @param password
	 *            待加密字符串
	 * @return 返回32位md5码
	 */
	public static String encryptMD5(String password) {
		MessageDigest md5 = null;
		byte[] byteArray = null;
		try {
			md5 = MessageDigest.getInstance("MD5");
			byteArray = password.getBytes("UTF-8");
		} catch (Exception e) {
			System.out.println(e.toString());
			e.printStackTrace();
			return "";
		}
		byte[] md5Bytes = md5.digest(byteArray);
		StringBuffer hexValue = new StringBuffer();
		for (int i = 0; i < md5Bytes.length; i++) {
			int val = ((int) md5Bytes[i]) & 0xff;
			if (val < 16) {
				hexValue.append("0");
			}
			hexValue.append(Integer.toHexString(val));
		}
		return hexValue.toString();
	}

	public static void main(String[] args) {
		System.out.println(encryptMD5("1"));
	}
}
