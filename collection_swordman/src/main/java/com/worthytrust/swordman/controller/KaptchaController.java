package com.worthytrust.swordman.controller;

import java.awt.image.BufferedImage;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.code.kaptcha.Constants;
import com.google.code.kaptcha.Producer;

@Controller
@RequestMapping("/kaptcha")
public class KaptchaController {
	@Resource
	private Producer kcaptchaProducer = null;
	private ServletOutputStream out;

	@RequestMapping("/getKaptchaImage")
	public synchronized void getKaptchaImage(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession();
		String code = (String) session.getAttribute(Constants.KAPTCHA_SESSION_KEY);
		System.out.println("验证码: " + code);

		response.setDateHeader("Expires", 0);
		response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
		response.addHeader("Cache-Control", "post-check=0, pre-check=0");
		response.setHeader("Pragma", "no-cache");
		response.setContentType("image/jpeg");

		String capText = kcaptchaProducer.createText();
		session.setAttribute(Constants.KAPTCHA_SESSION_KEY, capText);

		BufferedImage bi = kcaptchaProducer.createImage(capText);
		out = response.getOutputStream();
		ImageIO.write(bi, "jpg", out);
		out.flush();
		out.close();
	}
}
