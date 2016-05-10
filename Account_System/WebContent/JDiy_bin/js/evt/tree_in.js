/**
 * JDiy (v1.x)  -  javaWeb framework Page Events
 *
 * @author         : 子秋(ziquee)
 * @QQ             : 39886616
 * @copyright      : http://www.jdiy.org
 *
 **/

var OBJECT = {};
function setOptionFields(data, prm) {
    function addOpt(fd, name) {
        var s = fd + "=" + name;
        JSer("#fd0")[0].options[JSer("#fd0")[0].options.length] = new Option(s, s);
        if (prm && s == prm.get("fd0")) JSer("#fd0")[0].selectedIndex = JSer("#fd0")[0].options.length - 1;
        JSer("#fd1")[0].options[JSer("#fd1")[0].options.length] = new Option(s, s);
        if (prm && s == prm.get("fd1")) JSer("#fd1")[0].selectedIndex = JSer("#fd1")[0].options.length - 1;
    }

    JSer("#fd0")[0].options.length = 1;
    JSer("#fd1")[0].options.length = 1;
    var odata = new UserFieldset(data);
    if (odata.has("dt1") && odata.get("dt1").get("name") != "") {
        addOpt("dt1", odata.get("dt1").get("name"));
    } else {
        addOpt("dt1", "添加时间");
    }
    if (odata.has("dt2") && odata.get("dt2").get("name") != "") {
        addOpt("dt2", odata.get("dt2").get("name"));
    } else {
        addOpt("dt2", "更新时间");
    }
    for (var i = 0; i < odata.length(); i++) {
        if(!odata.get(i).get("field").or("dt1","dt2","sort", "tid","prm")){
            addOpt(odata.get(i).get("field"), odata.get(i).get("name"));
        }
    }
}
function obj2form() {
    var prm = OBJECT.get("prm");
    var t = JSer("#inObj")[0];
    for (var i = 0; i < t.options.length; i++) {
        if (t.options[i].value == prm.get("inObj")) {
            t.selectedIndex = i;
            break;
        }
    }
    JSer.url("~.jd?~=ctrlPrm@Conf&id=" + prm.get("inObj")).ajax(function(data) {
        setOptionFields(data, prm);
    });
    JSer("#depth")[0].selectedIndex = prm.get("depth") == 0 ? 0 : prm.get("depth") - 1;
    JSer("#depthAdd").val(prm.get("depthAdd"));
    JSer("#depthEdt").val(prm.get("depthEdt"));
    JSer("#depthDel").val(prm.get("depthDel"));
    JSer("#usrTit").val(prm.get("usrTit"));
    if (prm.get("bat") != null && prm.get("bat").indexOf("DelAll") != -1) JSer("#del_ld").attr("checked", "checked");
}
function form2obj() {
    var fd = new UserField();
    fd.set("field", "prm");
    fd.set("inObj", JSer("#inObj").val());
    fd.set("depth", JSer("#depth").val());
    fd.set("fd0", JSer("#fd0").val());
    fd.set("fd1", JSer("#fd1").val());
    fd.set("depthAdd", JSer("#depthAdd").val());
    fd.set("depthEdt", JSer("#depthEdt").val());
    fd.set("depthDel", JSer("#depthDel").val());
    fd.set("usrTit", JSer("#usrTit").val());
    var batArr = [];
    if (JSer("#del_ld")[0].checked) batArr.push("DelAll");
    fd.set("bat", batArr.join(","));
    OBJECT.set(fd.toString());
    JSer("#prm").val(OBJECT.toString());
}
function getSplit(str, spStr, spExp) {
    var s1 = str.replace(new RegExp(spExp, "ig"), spStr).split(spStr);
    var s2 = [];
    for (var i = 0; i < s1.length; i++)if (s1[i] != null && s1[i] != "")s2.push(s1[i]);
    return s2.join(spStr);
}
JSer.exec(function() {
    for (var i = 0; i <= 16; i++) {
        var j = i;
        if (i == 1) continue; else if (i > 1) j = i - 1;
        JSer("#depth")[0].options[j] = new Option(i == 0 ? "无限" : i, i);
    }

    JSer("#inObj").change(function() {
        if (this.selectedIndex == 0) return;
        JSer.url("~.jd?~=ctrlPrm@Conf&id="+this.value).ajax(function(data) {
            setOptionFields(data);
        });
    });
    JSer("#zltForm").submit(function() {
        var t;
        if((t=JSer("#tit")).val()==''){
            alert('名称不能为空.');
            t.focus();
            return false;
        }
        var od = JSer("#tit").attr("old"),ti = JSer("#tit").val();
        if (od == ti) isNoRepeat = true;
        else {
            JSer.url("~.jd?~=chkRepeatCtrl@Conf").set({
                tit:JSer("#tit").val(),
                tit_old:JSer("#tit").attr("old"),
                fType:JSer("#fType").val()
            }).ajax({type:"SCRIPT",async: false});
        }
        if (!isNoRepeat) return false;
        if((t=JSer("#usrTit")).val()=='')JSer('#usrTit').val('栏目');
        if((t=JSer("#inObj")).val()==''){
            alert('请指定输入源.');
            t.focus();
            return false;
        }
        if((t=JSer("#fd0")).val()==''){
            alert('请选择显示字段1.');
            t.focus();
            return false;
        }
        if((t=JSer("#depthAdd")).val()==''){
            alert('请输入允许添加子节点操作的层级.');
            t.focus();
            return false;
        }

        JSer("#depthAdd").val(getSplit(JSer("#depthAdd").val(), ",", "[\.。　 ;；|、｜]+"));
        if((t=JSer("#depthEdt")).val()==''){
            alert('请输入允许修改操作的层级.');
            t.focus();
            return false;
        }
        t.val(getSplit(t.val(),",","[\.。　 ;；|、｜]+"));
        if((t=JSer("#depthDel").val())=='' || t!=parseInt(t)){
            alert('请用整数数字输入可删除操作的层级.');
            t.focus();
            return false;
        }
        form2obj();
        JSer.url(this.action).sel(":input").ajax(function(d){
            if(d.indexOf("success")!=-1) JSer.url().set('JD_Status','successUpdate').go(0);
            else alert(d);
        });
        return false;
    });
    OBJECT = new UserFieldset(JSer("#prm").val());
    if (JSer("#prm").val() != "") obj2form(); else {
        JSer("#depthAdd").val(1);
        JSer("#depthEdt").val('0');
        JSer("#depthDel").val('0');
        JSer("#usrTit").val("栏目");
    }
});
var isNoRepeat;