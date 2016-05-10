<%@page import="com.zhuobo.account.model.CatalogModel"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
</head>
<script src="${pageContext.request.contextPath}/js/jquery-1.3.2.js"
	type="text/javascript"></script>
<style type="text/css">
.tablecss tr td {
	border: solid 1px #3661B4;
}

.tablecss {
	border: solid 1px #3661B4;
}

.tr {
	background: #D1E8FF;
}
</style>
<body>
	<div align="center">
		<div align="right" style="width: 92%;">
			<input type="button" value="增加父菜单" onclick="addFirst();"
				style="cursor: pointer;">
		</div><br/>
		<div align="center" style="width: 92%;">
			<table class="tablecss" rules="none" frame="void" cellpadding="0"
				cellspacing="0" style="width: 100%;text-align: center;">
				<tr style="height: 2em" bgcolor="#4273A3">
					<td><strong><font color="white">菜单结构</font></strong></td>
					<td><strong><font color="white">排序索引</font></strong></td>
					<td><strong><font color="white">绑定地址</font></strong></td>
				</tr>
				<c:forEach items="${titleList.items }" var="title">
					<c:set var="first_name" value="${title.title }" scope="request"></c:set>
					<tr style="height: 2em" bgcolor="#D1E8FF">
						<td colspan="3" style="text-align: left;padding-left: 10px;">
							<img
							src="${pageContext.request.contextPath}/images/first_catalog.png">
							${title.title }<a style="margin-left: 200px;cursor: pointer;"
							href="#" onclick="addSecond('${title.title }','${title.first_id }');"><font size="2">增加子菜单</font></a>
						</td>
					</tr>
					<%
						Map<String, List<CatalogModel>> map = (Map<String, List<CatalogModel>>) request
									.getAttribute("catalogs");
							List<CatalogModel> list = (List<CatalogModel>) map
									.get((String) request.getAttribute("first_name"));
							for (int i = 0; i < list.size(); i++) {
					%>
					<tr style="height: 1.5em">
						<td style="width: 30%;"><img
							src="${pageContext.request.contextPath}/images/second_catalog.png">
							<%=list.get(i).getSecond_name()%></td>
						<td style="width: 10%;"><%=list.get(i).getSecond_id()%></td>
						<td style="width: 60%;padding-left: 10px;text-align: left;"><%=list.get(i).getLink_address()%></td>
					</tr>
					<%
						}
					%>
				</c:forEach>
			</table>
		</div>
	</div>
</body>
<script type="text/javascript">
	function addFirst(){
		
	}
	function addSecond(title,first_id){
		var height = window.screen.availHeight;
		var width = window.screen.availWidth;
		window.open("${pageContext.request.contextPath}/view/catalog_edit.jsp?title="+ title +"&first_id=" + first_id,
						"new",
						"height=300, width=500, top=" + (height - 400) / 2 + ", left=" + (width - 500) / 2 + ", toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
	}
</script>
</html>
