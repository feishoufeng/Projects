/**
 * JDiy (v2.x)  -  javaWeb framework Page Events
 *
 * @author         : 子秋(ziquee)
 * @QQ             : 39886616
 * @copyright      : http://www.jdiy.org
 *
 **/
if (top.location != self.location)top.location = self.location;
var errObj = {
    logout:"您己经安全地退出了本系统.",
    timeout:"对不起，未登录或登录超时，请重新登录..",
    accountDisabled:"对不起，开发账号在该域下已经停用！",
    accountWrong:"对不起，用户名或密码错，请重新登录！",
    accountEmpty:"对不起，请先输入用户名后再登录！",
    passwordEmpty:"对不起，请输入密码后再登录！",
    yzmWrong:"对不起，验证码输入不正确！",
    yzmEmpty:"请输入方框后面的四位数字的验证码！",
    serverWrong:"对不起,服务器响应出错.请稍后再试...",
    sending:"请稍候，正在进行安全验证并登录中...."
};


JSer.exec(function() {
    JSer("#zltForm").submit(function() {
        showErr('sending');
        if (this.uid.value == '') {
            showErr('accountEmpty');
            this.uid.focus();
            return false;
        }
        if (this.pwd.value == '') {
            showErr('passwordEmpty');
            this.pwd.focus();
            return false;
        }
        if (this.yzm.value == '') {
            showErr('yzmEmpty');
            this.yzm.focus();
            return false;
        }
        if (this.yzm.value.length != 4) {
            showErr('yzmEmpty');
            this.yzm.focus();
            this.yzm.select();
            return false;
        }
        try{
        JSer.url("~.jd?~=managementLogin@Public").set({
            uid:this.uid.value,
            pwd:this.pwd.value,
            yzm:this.yzm.value
        }).ajax({
                    method:'post',
                    type:'SCRIPT',
                    error:function() {
                        showErr('serverWrong');
                    }
                });
        }catch(e){alert(e);}
        return false;
    });
    JSer("#iYzm").click(changeYzm).css("cursor", "pointer").attr("title", "点击这儿换一张");
    JSer("#yzm").css("width", "72px").attr("title", "请填写后面图片中的四位数字");
    changeYzm();
    JSer("#uid").focus();
});
function changeYzm() {
    JSer('#iYzm').attr('src', '~.jd?~=yzm@Public&dt=' + Math.random());
}
function showErr(status) {
    if (status == "" || status == 'null')return;
    JSer("#loginErrMsg").html(errObj[status]);
}