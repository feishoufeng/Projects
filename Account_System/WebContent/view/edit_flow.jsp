<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>My JSP 'edit_flow.jsp' starting page</title>
</head>
<script src="${pageContext.request.contextPath}/js/jquery-1.3.2.js"
	type="text/javascript"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/view/jsDatePick.jquery.min.1.3.js"></script>
<link rel="stylesheet" type="text/css" media="all"
	href="${pageContext.request.contextPath}/view/jsDatePick_ltr.min.css" />

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
	<c:set var="flowItem" value="${flow.items[0]}"></c:set>
	<input type="hidden" value="${flowItem.id }" id="id">
	<div align="center">
		<div align="center" style="width: 92%;">
			<table class="tablecss" rules="none" frame="void" cellpadding="0"
				cellspacing="0" style="width: 100%;text-align: center;">
				<tr style="height: 1.5em;">
					<td align="right" nowrap="nowrap" width="30%">日期：</td>
					<td align="left" nowrap="nowrap" style="padding-left: 10;"><input
						type="text" id="time" readonly="readonly"
						value="<fmt:formatDate value="${flowItem.register_date}" pattern="yyyy-MM-dd" />">
					</td>
				</tr>
				<tr style="height: 1.5em;">
					<td align="right" nowrap="nowrap">金额：</td>
					<td align="left" nowrap="nowrap" style="padding-left: 10;"><input
						type="text" value="${flowItem.money }" id="money"
						onblur="change();"> <input type="hidden"
						value="${flowItem.money }" id="old_money"></td>
				</tr>
				<tr style="height: 1.5em;">
					<td align="right" nowrap="nowrap">税金：</td>
					<td align="left" nowrap="nowrap" style="padding-left: 10;"><input
						type="text" value="${flowItem.taxes }" id="taxes" onblur="checkValue();">
				</tr>
				<tr style="height: 1.5em;">
					<td align="right" nowrap="nowrap">进出帐：</td>
					<td align="left" nowrap="nowrap" style="padding-left: 10;"><select
						id="flow_flag" onchange="change();">
							<option value="1"
								<c:if test="${flowItem.flow_flag eq 1 }">selected="selected"</c:if>>出项</option>
							<option value="0"
								<c:if test="${flowItem.flow_flag eq 0 }">selected="selected"</c:if>>进项</option>
					</select> <input type="hidden" value="${flowItem.flow_flag }" id="old_flag">
					</td>
				</tr>
				<tr style="height: 1.5em;">
					<td align="right" nowrap="nowrap">账户总金额：</td>
					<td align="left" nowrap="nowrap" style="padding-left: 10;"><c:if
							test="${empty flowItem.total }">
							<c:set var="total_value" value="${total }"></c:set>
						</c:if> <c:if test="${not empty flowItem.total }">
							<c:set var="total_value" value="${flowItem.total }"></c:set>
						</c:if> <input type="text" style="border: none;background: none;"
						disabled="disabled" id="total" value="${total_value }"> <input
						type="hidden" value="${total_value }" id="old_total"></td>
				</tr>
				<tr style="height: 1.5em;">
					<td align="right" nowrap="nowrap">说明：</td>
					<td align="left" nowrap="nowrap" width="70%"
						style="padding-left: 10;"><textarea style="width: 98%"
							rows="3" id="explain">${flowItem.explain_txt }</textarea></td>
				</tr>
				<tr style="height: 1.5em;">
					<td align="right" nowrap="nowrap">备注：</td>
					<td align="left" nowrap="nowrap" style="padding-left: 10;"><select
						id="remark">
							<c:forEach var="remarks" items="${remarks.items}">
								<option value="${remark.remark_value }"
									<c:if test="${flowItem.remarks eq remarks.remark_value }">selected="selected"</c:if>>${remarks.remark_value }</option>
							</c:forEach>
					</select></td>
				</tr>
			</table>
		</div>
		<div>
			<input type="button" value="保存" onclick="save();">
		</div>
	</div>
</body>
<script type="text/javascript">
	function checkMath() {
		var money = $("#money").val();
		if (money.length == 0) {
			alert("金额不可以为空！");
			return;
		}
		if (!/^\d+(?=\.{0,1}\d+$|$)/.test(money)) {
			alert("请输入正确的数字");
			$("#money").val($("#old_money").val());
			return;
		}
		$("#money").val(Math.round(money * 100) / 100.00);
	}
	
	function checkValue(){
		var taxes = $("#taxes").val();
		if (taxes.length == 0) {
			alert("金额不可以为空！");
			return;
		}
		if (!/^\d+(?=\.{0,1}\d+$|$)/.test(taxes)) {
			alert("请输入正确的数字");
			return;
		}
		$("#taxes").val(Math.round(taxes * 100) / 100.00);
	}

	function calc() {
		checkMath();
		var old_money = $("#old_money").val();
		if (old_money.length == 0) {
			old_money = 0;
		}
		var old_flag = $("#old_flag").val();
		var old_total = $("#old_total").val();
		if (old_total.length == 0) {
			old_total = 0;
		}
		var money = $("#money").val();
		if (money.length == 0) {
			money = 0;
		}
		var flow_flag = $("#flow_flag").val();
		var total = 0;
		if (old_flag == 0) {
			total = parseFloat(old_total) - parseFloat(old_money);
		} else if (old_flag == 1) {
			total = parseFloat(old_total) + parseFloat(old_money);
		}
		if (flow_flag == 0) {
			total = total + parseFloat(money);
		} else if (flow_flag == 1) {
			total = total - parseFloat(money);
		}
		$("#total").val(Math.round(total * 100) / 100.00);
	}

	function change() {
		checkMath;
		calc();
	}

	function add() {
		var time = $("#time").val();
		var money = $("#money").val();
		var taxes = $("#taxes").val();
		var flow_flag = $("#flow_flag").val();
		var total = $("#total").val();
		var explain = $("#explain").val();
		var remark = $("#remark option:selected").text();
		change();
		$.ajax({
			method : "post",
			type : "json",
			data : {
				"time" : time,
				"money" : money,
				"taxes" : taxes,
				"flow_flag" : flow_flag,
				"total" : total,
				"explain" : explain,
				"remark" : remark
			},
			url : "${pageContext.request.contextPath}/CashFlow/saveFlow.jd",
			success : function(d) {
				var json = eval("(" + d + ")");
				if (json.result == "success") {
					window.close();
					self.opener.location.reload();
				} else {
					alert(json.result);
				}
			}
		});
	}

	function save() {
		var id = $("#id").val();
		if (id == "" || id == null) {
			add();
			return;
		}
		var time = $("#time").val();
		var money = $("#money").val();
		var taxes = $("#taxes").val();
		var flow_flag = $("#flow_flag").val();
		var total = $("#total").val();
		var explain = $("#explain").val();
		var remark = $("#remark option:selected").text();
		change();
		$.ajax({
			method : "post",
			type : "json",
			data : {
				"id" : id,
				"time" : time,
				"money" : money,
				"taxes" : taxes,
				"flow_flag" : flow_flag,
				"total" : total,
				"explain" : explain,
				"remark" : remark
			},
			url : "${pageContext.request.contextPath}/CashFlow/updateFlow.jd",
			success : function(d) {
				var json = eval("(" + d + ")");
				if (json.result == "success") {
					window.close();
					self.opener.location.reload();
				} else {
					alert(json.result);
				}
			}
		});

	}

	window.onload = function() {
		new JsDatePick({
			useMode : 2,
			target : "time",
			dateFormat : "%Y-%M-%d"
		});
	};
</script>
</html>
