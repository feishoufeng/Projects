<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path;
	request.setAttribute("basePath", basePath);
	String kaptchaImagePath = basePath + "/kaptcha/getKaptchaImage";
	request.setAttribute("kaptchaImageUrl", kaptchaImagePath);
	String[] curServletStrs = request.getServletPath().split("/");
	String curJspPath = curServletStrs[curServletStrs.length - 1].replace(".jsp", "");
	request.setAttribute("curJspPath", curJspPath);
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<!-- jQuery -->
<script type="text/javascript" src="${basePath }/js/baseJs/jquery-2.2.3.min.js"></script>
<!-- jQuery and the Poshy Tip plugin files -->
<script type="text/javascript" src="${basePath }/js/utilJs/poshytip.js"></script>
<!-- 验证码工具 -->
<script type="text/javascript" src="${basePath }/js/utilJs/kaptchaUtil.js"></script>
<!-- 基础工具 -->
<script type="text/javascript" src="${basePath }/js/utilJs/baseUtil.js"></script>
<!-- Tooltip classes -->
<link rel="stylesheet" href="${basePath }/css/utilCss/tip-yellowsimple.css" type="text/css" />
<!-- 当前页面css样式 -->
<link rel="stylesheet" href="${basePath }/css/viewCss/${curJspPath }.css" type="text/css" />
<!-- 当前页面所需js -->
<script type="text/javascript" src="${basePath }/js/viewJs/${curJspPath }.js"></script>
<head>
<title>${pageTitle}</title>
</head>
<body>