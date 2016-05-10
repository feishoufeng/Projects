package com.worthytrust.swordman.controller;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.alibaba.fastjson.JSONObject;
import com.google.code.kaptcha.Constants;
import com.worthytrust.swordman.service.IUserService;

@Controller
@RequestMapping("/login")
public class LoginController {
	@RequestMapping("/login_page")
	public String login_page() {
		return "loginView/login_page";
	}

	@RequestMapping("/checkUser")
	public String checkUser(@RequestParam String userName, @RequestParam String password) {
		return "loginView/login_page";
	}

	@Resource
	private IUserService userService = null;

	@RequestMapping("/checkUserName")
	public void checkUserName(@RequestParam String userName, Model model, HttpServletResponse response) {
		JSONObject resultJSON = new JSONObject();
		int num = userService.checkUserName(userName).size();
		resultJSON.put("flag", num > 0 ? true : false);
		try {
			response.getWriter().print(resultJSON.toJSONString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping("/checkVerificationCode")
	public void checkVerificationCode(@RequestParam String verificationCode, HttpServletResponse response,HttpServletRequest request) {
		HttpSession session = request.getSession();
		JSONObject resultJSON = new JSONObject();
		String kaptchaCode = session.getAttribute(Constants.KAPTCHA_SESSION_KEY).toString();
		resultJSON.put("flag", verificationCode.toLowerCase().equals(kaptchaCode.toLowerCase()));
		try {
			response.getWriter().print(resultJSON);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
