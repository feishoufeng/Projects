(function($) {
	$.fn.checkNull = function(context) {
		var value = $(this).val().trim();
		if (value == null || value == "") {
			// 显示悬浮气泡
			tipShow($(this).attr("id"), context);
			return false;
		} else {
			// 隐藏悬浮气泡
			tipHide($(this).attr("id"));
			return true;
		}
	};
})(jQuery);

$(document).ready(function() {
	// 初始化悬浮气泡提示信息组件
	createPoshytip("userName");
	createPoshytip("password");
	// 初始化验证码组件
	createVerificationCode("kaptchaImage", "../kaptcha/getKaptchaImage");

	// 检测密码
	$("#password").blur(function() {
		$("#password").checkNull("密码不可以为空！");
	});

	// 检测用户名
	$("#userName").blur(function() {
		var userName = $("#userName").val().trim();
		var url = "../login/checkUserName";
		var data = {"userName" : userName};
		if ($("#userName").checkNull("用户名不可以为空！")) {
			$.getAjax(url, data, function(d) {
				if (!d.flag) {
					tipShow("userName", "用户名不存在，请重新输入！");
				}
			});
		}
	});

	// 检测验证码输入框，并验证验证码
	$("#verificationCode").keyup(function() {
		$.checkVerificationCode();
	});
	
	// 检测验证码是否为空
	$("#verificationCode").blur(function() {
		var verificationCode = $("#verificationCode").val().trim();
		if (verificationCode == null || verificationCode == "") {
			$("#verificationCode").css("background","url(../images/viewImages/login_page_images/status_error.png) no-repeat right");
		}
	});
	
	$("#kaptchaImage").click(function(){
		changeVerificationCode("kaptchaImage","../kaptcha/getKaptchaImage");
		$.checkVerificationCode();
	});

	// 提交表单
	$("#login_btn").click(function() {

	});
	
	$("input:reset").click(function(){
		$("#verificationCode").css("background","none");
	});
	
	//验证验证码
	$(function() {
		jQuery.checkVerificationCode = function(){
			var code = $("#verificationCode").val().trim();
			var url = "../login/checkVerificationCode";
			var data = {"verificationCode" : code};
			if (code.length == 4) {
				$.getAjax(url, data, function(d) {
					if(!d.flag){
						$("#verificationCode").css("background","url(../images/viewImages/login_page_images/status_error.png) no-repeat right");
					}else{
						$("#verificationCode").css("background","url(../images/viewImages/login_page_images/status_success.png) no-repeat right");
					}
				});
			}
		};
	});
});