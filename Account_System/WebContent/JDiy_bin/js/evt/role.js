/**
 * JDiy (v1.x)  -  javaWeb framework Page Events
 *
 * @author         : 子秋(ziquee)
 * @QQ             : 39886616
 * @copyright      : http://www.jdiy.org
 *
 **/
function init() {
    JSer("input[@name=roles]").each(function() {
        var o = JSer(this);
        if (JSer("#t15").val().indexOf(o.val()) != -1)o.attr("checked", true);
    });
}

function setRoles() {
    var ROLES = [];
    JSer("input[@name=roles]").each(function() {
        if (this.checked)ROLES.push("'" + this.value + "'");
    });
    JSer("#t15").val(ROLES.join(", "));
}

JSer.exec(function(){
    init();
    JSer('input[@zlt=chn]').click(function() {
        var id = JSer(this).val();
        var tChk = this.checked;
        JSer('input[@chnid=' + id + ']').each(function() {
            this.checked=tChk;
        });
    });
    JSer('input[@zlt=mm]').click(function() {
        var id = this.value;
        var chnid = JSer(this).attr("chnid");
        var tChk = this.checked;
        JSer('input[@mmid=' + id + ']').each(function() {
            this.checked=tChk;
        });
        if (tChk) {
            JSer("input[@value=" + chnid + "]").attr("checked", true);
        } else {
            tSeld = 0;
            JSer("input[@chnid=" + chnid + "]").each(function() {
                if (this.checked)tSeld++;
            });
            if (!tSeld)JSer("input[@value=" + chnid + "]").attr("checked", false);
        }
    });
    JSer('input[@zlt=sm]').click(function() {
        var mmid = JSer(this).attr("mmid");
        var chnid = JSer(this).attr("chnid");
        var tChk = this.checked;
        if (tChk) {
            JSer("input[@value=" + mmid + "]").attr("checked", true);
            JSer("input[@value=" + chnid + "]").attr("checked", true);
        } else {
            tSeld = 0;
            JSer("input[@mmid=" + mmid + "]").each(function() {
                if (this.checked)tSeld++;
            });
            if (!tSeld)JSer("input[@value=" + mmid + "]").attr("checked", false);
            var tSeld = 0;
            JSer("input[@chnid=" + chnid + "]").each(function() {
                if (this.checked)tSeld++;
            });
            if (!tSeld)JSer("input[@value=" + chnid + "]").attr("checked", false);
        }
    });
});
