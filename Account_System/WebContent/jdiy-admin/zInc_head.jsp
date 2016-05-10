<%@page language="java" contentType="text/html; charset=UTF-8" import="org.jdiy.core.*"%>
<%
App ac=App.get();
Dao dao = ac.getDao();

response.setHeader("Cache-Control","no-store");
response.setHeader("Pragrma","no-cache");
response.setDateHeader("Expires", 0);


%><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"><html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>JDiy 网站开发平台</title>
<link href="../JDiy_bin/img/public.css" rel="stylesheet" type="text/css" />
<%
String _JD_Skin_ = ac.var("JD_Skin");
if(_JD_Skin_.equals("white")){
	%><link href="../JDiy_bin/skins/white/css_right.css" rel="stylesheet" type="text/css" /><%
}else{
	%><link href="../JDiy_bin/skins/<%=_JD_Skin_%>/css_right.css" rel="stylesheet" type="text/css" /><%
}
%>
<script type="text/javascript" src="../JDiy_bin/js/class/JSer.js"></script>
<script type="text/javascript" src="../JDiy_bin/js/evt/ee.js"></script>