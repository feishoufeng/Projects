<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=UTF-8"%>
<%
	//设置页面登录标题
	request.setAttribute("pageTitle", "欢迎登录");
%>
<!-- 引入页面头部文件 -->
<jsp:include page="../baseView/base_top.jsp" />
<form action="${basePath }/login/checkUser" method="post" id="login_form">
	<div align="center">
		<table>
			<tr>
				<td class="lable">用户名：</td>
				<td class="txt">
					<input type="text" id="userName" name="userName">
				</td>
			</tr>
			<tr>
				<td class="lable">密<span style="margin-left: 1em"></span>码：</td>
				<td class="txt">
					<input type="password" id="password" name="password">
				</td>
			</tr>
			<tr>
				<td class="lable">验证码：</td>
				<td class="txt">
					<input name="verificationCode" type="text" id="verificationCode" maxlength="4" > 
					<img src="${kaptchaImageUrl }" id="kaptchaImage" style="margin-bottom: -10px;" title="看不清，下一张"/>
				</td>
			</tr>
			<tr>
				<td class="button" colspan="2">
					<input type="reset" value="重置">
					<input type="button" value="提交" id="login_btn" onclick="login();">
				</td>
			</tr>
		</table>
	</div>
</form>
<!-- 引入页面脚部文件 -->
<jsp:include page="../baseView/base_foot.jsp" />