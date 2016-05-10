<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<script src="${pageContext.request.contextPath}/js/jquery-1.3.2.js" type="text/javascript"></script>
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
			<input type="button" value="增加备注" onclick="add();"
				style="cursor: pointer;">
		</div>
		<br />
		<div align="center" style="width: 92%;">
			<table class="tablecss" rules="none" frame="void" cellpadding="0"
				cellspacing="0" style="width: 100%;text-align: center;">
				<tr style="height: 2em;" bgcolor="#4273A3">
					<td style="width: 15%"><strong><font color="white">序号</font></strong></td>
					<td style="width: 55%"><strong><font color="white">备注名称</font></strong></td>
					<td style="width: 15%"><strong><font color="white">当前状态</font></strong></td>
					<td style="width: 15%"><strong><font color="white">操作</font></strong></td>
				</tr>
				<c:if test="${remarks.rowCount eq 0 }">
					<tr style="height: 1.5em;">
						<td colspan="4"><font color="red">目前备注信息！</font></td>
					</tr>
				</c:if>
				<c:forEach items="${remarks.items }" var="remark" varStatus="vs">
					<tr style="height: 1.5em;" <c:if test="${vs.index % 2 eq 1}">class="tr"</c:if>>
					<td nowrap="nowrap">${vs.index + 1 }</td>
					<td nowrap="nowrap">${remark.remark_value }</td>
					<td nowrap="nowrap">
						<c:if test="${remark.status eq 0 }">
							<img alt="使用中" title="使用中" src="${pageContext.request.contextPath}/images/status_normal.png">
						</c:if>
						<c:if test="${remark.status eq 1 }">
							<img alt="暂停使用" title="暂停使用" src="${pageContext.request.contextPath}/images/status_forbidden.png">
						</c:if>
					</td>
					<td nowrap="nowrap">
						<img alt="切换状态" title="切换状态" style="cursor: pointer;" src="${pageContext.request.contextPath}/images/status_change.png" onclick="change('${remark.id}');">
					</td>
				</tr>
				</c:forEach>
			</table>
		</div>
	</div>
</body>
<script type="text/javascript">
	function change(id){
		$.ajax({
			method : "post",
			type : "json",
			data : {"id":id},
			url : "${pageContext.request.contextPath}/RemarkMaintain/changeStatue.jd",
			success : function(d) {
				var json = eval("(" + d + ")");
				if (json.result == "success") {
					alert("切换状态成功！");
					window.location.reload();
				} else {
					alert(json.result);
				}
			}
		});
	}
	
	function add(){
		var remark_name = prompt("请输入备注名称:","");
		if (remark_name != null && remark_name != ""){
			$.ajax({
				method : "post",
				type : "json",
				data : {"remark_name":remark_name},
				url : "${pageContext.request.contextPath}/RemarkMaintain/addStatue.jd",
				success : function(d) {
					var json = eval("(" + d + ")");
					if (json.result == "success") {
						alert("新增备注成功！");
						window.location.reload();
					} else {
						alert(json.result);
					}
				}
			});
		}
	}
</script>
</html>
