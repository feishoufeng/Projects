<%@page import="org.jdiy.core.Rs"%>
<%@page import="org.jdiy.core.Ls"%>
<%@page import="org.jdiy.core.Args"%>
<%@page import="org.jdiy.core.Dao"%>
<%@page import="org.jdiy.core.App"%>
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
	<%
		App app = App.get();
		Dao dao = app.getDao();
		Args args = new Args("catalog_title", "order by first_id asc",
				"title");
		Ls titles = dao.ls(args);
		request.setAttribute("catalog_title", request.getParameter("title"));
		request.setAttribute("first_id", request.getParameter("first_id"));
	%>
	<div align="center">
		<div align="center" style="width: 92%;">
			<table class="tablecss" rules="none" frame="void" cellpadding="0"
				cellspacing="0" style="width: 100%;text-align: center;">
				<tr style="height: 1.5em;">
					<td align="right" nowrap="nowrap" width="30%">子菜单名：</td>
					<td align="left" nowrap="nowrap" style="padding-left: 10;"><select>
							<%
								for (Rs title : titles.getItems()) {
							%>
							<option value="<%=title.getString("title")%>"
								<%if (request.getParameter("title").equals(
						title.getString("title").trim())) {%>
								selected="selected" <%}%>><%=title.getString("title")%></option>
							<%
								}
							%>
					</select></td>
				</tr>
				<tr style="height: 1.5em;">
					<td align="right" nowrap="nowrap" width="30%">子菜单名：</td>
					<td align="left" nowrap="nowrap" style="padding-left: 10;"><input
						type="text" id="second_name"></td>
				</tr>
				<tr style="height: 1.5em;">
					<td align="right" nowrap="nowrap" width="30%">子菜单索引：</td>
					<td align="left" nowrap="nowrap" style="padding-left: 10;"><input
						type="text" id="second_name"></td>
				</tr>
				<tr style="height: 1.5em;">
					<td align="right" nowrap="nowrap" width="30%">绑定地址：</td>
					<td align="left" nowrap="nowrap" style="padding-left: 10;"><input
						type="text" id="second_name"></td>
				</tr>
			</table>
		</div>
	</div>
</body>
</html>
