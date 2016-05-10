package com.worthytrust.swordman.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 转换工具类
 * 
 * @author 费寿锋
 * @version 1.0 2016/04/25 14:42
 */
public class ConvertUtil {
	/**
	 * 字符串转换为整形
	 * 
	 * @param str
	 *            需要转换的字符串
	 * @param defaultVal
	 *            默认返回值
	 * @return 返回转换后的值
	 */
	public static int intFormat(String str, int defaultVal) {
		if (str == null || str.isEmpty()) {
			return defaultVal;
		} else {
			return Integer.parseInt(str);
		}
	}

	/**
	 * 字符串转换为双精度浮点型
	 * 
	 * @param str
	 *            需要转换的字符串
	 * @param defaultVal
	 *            默认返回值
	 * @return 返回转换后的值
	 */
	public static double doubleFormat(String str, double defaultVal) {
		if (str == null || str.isEmpty()) {
			return defaultVal;
		} else {
			return Double.parseDouble(str);
		}
	}

	/**
	 * 字符串转换为浮点型
	 * 
	 * @param str
	 *            需要转换的字符串
	 * @param defaultVal
	 *            默认返回值
	 * @return 返回转换后的值
	 */
	public static float floatFormat(String str, float defaultVal) {
		if (str == null || str.isEmpty()) {
			return defaultVal;
		} else {
			return Float.parseFloat(str);
		}
	}

	/**
	 * 检查字符串，保证字符串不为空
	 * 
	 * @param str
	 *            需要转换的字符串
	 * @return 返回转换后的字符串
	 */
	public static String getStr(String str) {
		if (str == null || str.isEmpty()) {
			return "";
		} else {
			return str;
		}
	}

	/**
	 * 保留小数位数（四舍五入）[float]
	 * 
	 * @param val
	 *            需要转换的值
	 * @param digit
	 *            需要保留的小数位数
	 * @return 返回转换后的值
	 */
	public static float getFloat(float val, int digit) {
		return (float) (Math.round(val * (Math.pow(10, digit))) / Math.pow(10,
				digit));
	}

	/**
	 * 保留小数位数（四舍五入）[double]
	 * 
	 * @param val
	 *            需要转换的值
	 * @param digit
	 *            需要保留的小数位数
	 * @return 返回转换后的值
	 */
	public static double getDouble(double val, int digit) {
		return Math.round(val * (Math.pow(10, digit))) / Math.pow(10, digit);
	}

	/**
	 * * 格式化日期（24小时制）
	 * 
	 * @param date
	 *            需要格式化的时间
	 * @param style
	 *            输出时间格式（1：2016-01-01 11:11:11）,（2：2016-01-01）,（3：2016）
	 * @return 返回时间字符串
	 */
	public static String getDate(Date date, int style) {
		String styleStr = "";
		if (date == null) {
			return "";
		} else {
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
			return sdf.format(date);
		}
	}

	public static void main(String[] args) {
		System.out.println(getDate(new Date(), 2));
	}
}
