<%@page import="com.zhuobo.account.model.FineReportModel"%>
<%@page import="org.jdiy.core.Ls"%>
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
			年份：<select onchange="change();" id="year">
				<c:forEach items="${years.items}" var="item">
					<option
						<c:if test="${year eq item.year }">selected="selected"</c:if>>${item.year }</option>
				</c:forEach>
			</select>
		</div>
		<br />
		<div align="center" style="width: 92%;">
			<table class="tablecss" rules="none" frame="void" cellpadding="0"
				cellspacing="0" style="width: 100%;text-align: center;">
				<tr style="height: 2em;" bgcolor="#4273A3">
					<td style="width: 6%"><strong><font color="white">序号</font></strong></td>
					<td style="width: 10%"><strong><font color="white">类型</font></strong></td>
					<td style="width: 7%"><strong><font color="white">一月</font></strong></td>
					<td style="width: 7%"><strong><font color="white">二月</font></strong></td>
					<td style="width: 7%"><strong><font color="white">三月</font></strong></td>
					<td style="width: 7%"><strong><font color="white">四月</font></strong></td>
					<td style="width: 7%"><strong><font color="white">五月</font></strong></td>
					<td style="width: 7%"><strong><font color="white">六月</font></strong></td>
					<td style="width: 7%"><strong><font color="white">七月</font></strong></td>
					<td style="width: 7%"><strong><font color="white">八月</font></strong></td>
					<td style="width: 7%"><strong><font color="white">九月</font></strong></td>
					<td style="width: 7%"><strong><font color="white">十月</font></strong></td>
					<td style="width: 7%"><strong><font color="white">十一月</font></strong></td>
					<td style="width: 7%"><strong><font color="white">十二月</font></strong></td>
				</tr>
				<c:if test="${remaksList.rowCount eq 0 }">
					<tr style="height: 1.5em;">
						<td colspan="14"><font color="red">目前无账务流水信息！</font></td>
					</tr>
				</c:if>
				<c:forEach items="${remaksList.items }" var="remark" varStatus="vs">
					<c:set value="${vs.index }" var="index" scope="request"></c:set>
					<tr style="height: 1.5em;"
						<c:if test="${vs.index % 2 eq 1}">class="tr"</c:if>>
						<td nowrap="nowrap">${vs.index + 1 }</td>
						<td nowrap="nowrap">${remark.remarks }</td>
						<%
							Map<String,List<FineReportModel>> map = (Map<String,List<FineReportModel>>)request.getAttribute("fineReportlist");
							int m = (Integer)request.getAttribute("index");
							List<FineReportModel> list = map.get(m + "");
							String flag = "";
							for (int i = 1; i <= 12; i++) {
								int n = 0;
								if(i < 10){
									flag = "0" + i;
								}else{
									flag = "" + i;
								}
								for(int j = 0; j < list.size(); j++){
									request.setAttribute("money", list.get(j).getMoney());
									if(flag.equals(list.get(j).getDate_time())){
										n = 1;
						%>
										<td nowrap="nowrap">
											<fmt:formatNumber value="${money}" minFractionDigits="2" ></fmt:formatNumber>
										</td>
						<%
										break;
									}
								}
								if(n == 0){
						%>
									<td nowrap="nowrap">0.00</td>
						<%
								}
							}
						%>
					</tr>
				</c:forEach>
				<c:if test="${remaksList.rowCount ne 0 }">
					<tr style="height: 1.5em;"
						<c:if test="${remaksList.RowCount % 2 eq 1}">class="tr"</c:if>>
						<td nowrap="nowrap">${remaksList.RowCount + 1 }</td>
						<td nowrap="nowrap">应付税金</td>
						<c:forEach step="1" end="12" begin="1" varStatus="count">
							<c:set var="stepValue" value="0"></c:set>
							<c:set var="num" value="0"></c:set>
							<c:forEach items="${taxesLs.items }" var="taxes">
								<c:if test="${count.index le 9 }">
									<c:set var="stepValue" value="0${count.index}"></c:set>
								</c:if>
								<c:if test="${step.index gt 9 }">
									<c:set var="stepValue" value="${count.index}"></c:set>
								</c:if>
								<c:if test="${stepValue eq taxes.date_time }">
									<td nowrap="nowrap">${taxes.taxes }</td>
									<c:set var="num" value="1"></c:set>
								</c:if>
							</c:forEach>
							<c:if test="${num eq 0 }">
								<td nowrap="nowrap">0.00</td>
							</c:if>
						</c:forEach>
					</tr>
				</c:if>
			</table>
		</div>
	</div>
</body>
<script type="text/javascript">
	function change() {
		var year = $("#year option:selected").text();
		window.location.href = "${pageContext.request.contextPath}/FineReport/getFineReport.jd?year="
				+ year;
	}
</script>
</html>
