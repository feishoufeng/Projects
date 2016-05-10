<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
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
			<input type="button" value="增加流水" onclick="add();" style="cursor: pointer;">
		</div>
		<br />
		<div align="center" style="width: 92%;">
			<table class="tablecss" rules="none" frame="void" cellpadding="0"
				cellspacing="0" style="width: 100%;text-align: center;">
				<tr style="height: 2em;" bgcolor="#4273A3">
					<td style="width: 5%"><strong><font color="white">序号</font></strong></td>
					<td style="width: 8%"><strong><font color="white">日期</font></strong></td>
					<td style="width: 10%"><strong><font color="white">金额</font></strong></td>
					<td style="width: 10%"><strong><font color="white">税金</font></strong></td>
					<td style="width: 8%"><strong><font color="white">进出帐</font></strong></td>
					<td style="width: 12%"><strong><font color="white">账户总金额</font></strong></td>
					<td style="width: 30%"><strong><font color="white">说明</font></strong></td>
					<td style="width: 9%"><strong><font color="white">备注</font></strong></td>
					<td style="width: 8%"><strong><font color="white">操作</font></strong></td>
				</tr>
				<c:if test="${list.rowCount eq 0 }">
					<tr style="height: 1.5em;">
						<td colspan="8"><font color="red">目前无账务流水信息！</font></td>
					</tr>
				</c:if>
				<c:forEach items="${list.items }" var="item" varStatus="vs">
					<tr style="height: 1.5em;"
						<c:if test="${vs.index % 2 eq 1}">class="tr"</c:if>>
						<td nowrap="nowrap">${vs.index + 1 }</td>
						<td nowrap="nowrap"><fmt:formatDate
								value="${item.register_date}" pattern="yyyy-MM-dd" /></td>
						<td nowrap="nowrap">￥${item.money }</td>
						<td nowrap="nowrap">￥${item.taxes }</td>
						<td nowrap="nowrap"><c:if test="${item.flow_flag eq 0 }">进项</c:if>
							<c:if test="${item.flow_flag eq 1 }">出项</c:if></td>
						<td nowrap="nowrap">￥${item.total }</td>
						<td nowrap="nowrap">${item.explain_txt }</td>
						<td nowrap="nowrap">${item.remarks }</td>
						<td align="center" nowrap="nowrap"><img
							src="${pageContext.request.contextPath}/images/cash_flow_del.png"
							border="0" width="15px" height="15px" style="margin-top: 4px;cursor: pointer;"
							onclick="del('${item.id}');" title="删除流水" /> <img
							src="${pageContext.request.contextPath}/images/cash_flow_edit.png"
							border="0" width="15px" height="15px"
							style="margin-left: 15px;margin-top: 4px;cursor: pointer;"
							onclick="edit('${item.id}');" title="编辑流水" /></td>
					</tr>
				</c:forEach>
			</table>
		</div><br/>
		<!--分页链接 开始-->
		<!--注意：分页样式您可以根据自己的需要调整，以下只是一个简单的示例演示-->
		<div class="pager">
			共${list.pageCount}页/${list.rowCount}条记录 当前第${list.absPage}页.
			&nbsp;&nbsp;&nbsp;
			<c:if test="${list.absPage gt 1}">
				<a
					href="${pageContext.request.contextPath}/CashFlow/getCashFlowList.jd?page=1">[首页]</a>
				<a
					href="${pageContext.request.contextPath}/CashFlow/getCashFlowList.jd?page=${list.absPage-1}">[上一页]</a>
			</c:if>
			<c:if test="${list.absPage le 1}">
                        [首页]
                        [上一页]
                    </c:if>
                    <c:if test="${list.pageCount le 7}">
                    	<c:forEach begin="1" end="${list.pageCount}" var="i">
							<a href="${pageContext.request.contextPath}/CashFlow/getCashFlowList.jd?page=${i}">[${i}]</a>
						</c:forEach>
                    </c:if>
                    <c:if test="${list.absPage le 3 && list.pageCount gt 7}">
                    	<c:forEach begin="1" end="7" var="i">
							<a href="${pageContext.request.contextPath}/CashFlow/getCashFlowList.jd?page=${i}">[${i}]</a>
						</c:forEach>
                    </c:if>
                    <c:if test="${list.absPage gt 3 && list.pageCount gt 7}">
                    	<c:if test="${list.absPage + 3 le list.pageCount}">
	                    	<c:forEach begin="${list.absPage - 3}" end="${list.absPage + 3}" var="i">
								<a href="${pageContext.request.contextPath}/CashFlow/getCashFlowList.jd?page=${i}">[${i}]</a>
							</c:forEach>
						</c:if>
						<c:if test="${list.absPage + 3 gt list.pageCount}">
	                    	<c:forEach begin="${list.pageCount - 6}" end="${list.pageCount}" var="i">
								<a href="${pageContext.request.contextPath}/CashFlow/getCashFlowList.jd?page=${i}">[${i}]</a>
							</c:forEach>
						</c:if>
                    </c:if>
						
			<c:if test="${list.absPage lt list.pageCount}">
				<a
					href="${pageContext.request.contextPath}/CashFlow/getCashFlowList.jd?page=${list.absPage+1}">[下一页]</a>
				<a
					href="${pageContext.request.contextPath}/CashFlow/getCashFlowList.jd?page=${list.pageCount}">[尾页]</a>
			</c:if>
			<c:if test="${list.absPage ge list.pageCount}">
                        [下一页]
                        [尾页]
                    </c:if>
		</div>
		<!--分页链接 结束-->
	</div>
</body>
<script type="text/javascript">
	function del(id) {
		if (confirm("确认删除账务流水？")) {
			$
					.ajax({
						method : "post",
						type : "json",
						url : "${pageContext.request.contextPath}/CashFlow/delFlow.jd?id="
								+ id,
						success : function(d) {
							var json = eval("(" + d + ")");
							if (json.result == "success") {
								window.location.reload();
							} else {
								alert(json.result);
							}
						}
					});
		}
	}

	function edit(id) {
		var height = window.screen.availHeight;
		var width = window.screen.availWidth;
		window
				.open(
						"${pageContext.request.contextPath}/CashFlow/editFlow.jd?id="
								+ id,
						"new",
						"height=300, width=500, top="
								+ (height - 400)
								/ 2
								+ ", left="
								+ (width - 500)
								/ 2
								+ ", toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
	}

	function add() {
		var height = window.screen.availHeight;
		var width = window.screen.availWidth;
		window
				.open(
						"${pageContext.request.contextPath}/CashFlow/addFlow.jd",
						"new",
						"height=300, width=500, top="
								+ (height - 400)
								/ 2
								+ ", left="
								+ (width - 500)
								/ 2
								+ ", toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
	}
</script>
</html>
