/**
 * 获取ajax
 * 
 * @param url
 *            跳转地址
 * @param data
 *            代入参数
 * @param succ
 *            返回成功处理函数
 * @param fail
 *            返回失败处理函数
 * @param type
 *            请求方式
 * @param dataType
 *            返回值类型
 * @param sync
 *            是否异步请求
 */
$(function() {
	jQuery.getAjax = function(url, data, succ, fail, type, dataType, sync) {
		$.ajax({
			type : "undefined" == typeof (type) ? "post" : type,
			sync : "undefined" == typeof (sync) ? true : sync,
			url : url,
			data : data,
			dataType : "undefined" == typeof (dataType) ? "json" : dataType,
			success : function(d) {
				succ(d);
			},
			error : function(e) {
				"undefined" == typeof (type) ? alert("系统发生错误，请联系管理员！") : fail(e);
			}
		});
	};
});