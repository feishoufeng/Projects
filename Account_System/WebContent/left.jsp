<%@page import="com.zhuobo.account.model.MenuModel"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<link href="${pageContext.request.contextPath}/css/zzsc.css"
	type="text/css" rel="stylesheet">
<script src="${pageContext.request.contextPath}/js/jquery-1.3.2.js"
	type="text/javascript"></script>
<script type="text/javascript">
	$(function() {
		$(".subNav").click(
				function() {
					$(this).toggleClass("currentDd").siblings(".subNav")
							.removeClass("currentDd");
					$(this).toggleClass("currentDt").siblings(".subNav")
							.removeClass("currentDt");
					// 修改数字控制速度， slideUp(500)控制卷起速度
					$(this).next(".navContent").slideToggle(500).siblings(
							".navContent").slideUp(500);
				});
	});
</script>
<!-- 代码 开始 -->
<div class="subNavBox">
	<%
		List<Map<String, List<MenuModel>>> list = (List<Map<String, List<MenuModel>>>) request.getAttribute("list");
		if (list != null && list.size() > 0) {
			for (int i = 0; i < list.size(); i++) {
				Map<String, List<MenuModel>> map = list.get(i);
				if (map != null) {
					List<MenuModel> menuList = map.get("key" + i);
	%>
					<div class="subNav <%if (i == 0) {%>currentDd currentDt<%}%>"><%=menuList.get(0).getFirst_name() %></div>
					<ul class="navContent " <%if (i == 0) {%>style="display:block"<%}%>>
	<%
					if (menuList != null && menuList.size() > 0) {
						for (int j = 0; j < menuList.size(); j++) {
	%>
							<li><a href="${pageContext.request.contextPath}/<%=menuList.get(j).getLink_address()%>" target="rightPage"><%=menuList.get(j).getSecond_name()%></a></li>
	<%
						}
					}
	%>
					</ul>
	<%
				}
			}
		}
	%>
</div>
