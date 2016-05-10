/**
 * 创建验证码对象
 * @param id 验证码id
 * @param url 获取验证码控制器路径
 */
function createVerificationCode(id,url){
	$("#" + id).click(
		function() {
			$(this).hide().attr("src", url + "?"+ Math.floor(Math.random() * 100)).fadeIn();
		}
	);
}

/**
 * 刷新验证码
 * @param id 验证码id
 * @param url 获取验证码控制器路径
 */
function changeVerificationCode(id,url) {
	$("#" + id).hide().attr("src",  url + "?" + Math.floor(Math.random() * 100)).fadeIn();
	event.cancelBubble = true;
}
