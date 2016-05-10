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
        if (prm && s == prm.get("fd0"))JSer("#fd0")[0].selectedIndex = JSer("#fd0")[0].options.length - 1;
        JSer("#fd1")[0].options[JSer("#fd1")[0].options.length] = new Option(s, s);
        if (prm && s == prm.get("fd1"))JSer("#fd1")[0].selectedIndex = JSer("#fd1")[0].options.length - 1;
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
    var prm = OBJECT.get("prm"),
        t = JSer("#inObj")[0],
        mge = JSer("input[name=mge]"),
        pmge = prm.get("mge");
    for (var i = 0; i < t.options.length; i++) {
        if (t.options[i].value == prm.get("inObj")) {
            t.selectedIndex = i;
            break;
        }
    }
    JSer.url("~.jd?~=ctrlPrm@Conf&id=" + prm.get("inObj")).ajax(function(data) {
        setOptionFields(data, prm);
    });
    JSer("#depth")[0].selectedIndex = parseInt(prm.get("depth")) + 1;
    JSer("#rownum")[0].selectedIndex = prm.get("rownum");
    if (pmge.indexOf("AddEdt") != -1)mge[0].checked = true;
    if (pmge.indexOf("Delete") != -1)mge[1].checked = true;
    if (pmge.indexOf("BatSort") != -1)mge[2].checked = true;
    if (pmge.indexOf("DelAll") != -1) mge[3].checked = true;
    JSer("#usrTit").val(prm.get("usrTit"));
    showLD();
}
function showLD() {
    JSer("#span_ld").css("display", JSer("input[name=mge]")[1].checked ? "" : "none");
}
JSer.exec(function() {
    var i;
    for (i = 1; i < 9; i++)JSer("#rownum")[0].options[JSer("#rownum")[0].options.length] = new Option("　 " + i, i);
    for (i = 0; i < 17; i++)JSer("#depth")[0].options[JSer("#depth")[0].options.length] = new Option("　 " + i, i);
    JSer("#depth")[0].options[1].text = "　无限";
    JSer("#fd0")[0].options[0] = new Option("==请选择==", "");
    JSer("#fd1")[0].options[0] = new Option("==请选择==", "");
    JSer("#inObj").change(function() {
        if (this.selectedIndex == 0)return;
        JSer.url("~.jd?~=ctrlPrm@Conf&id=" + this.value).ajax(function(data) {
            setOptionFields(data);
        });
    });
    JSer("#delChk").click(function() {
        showLD();
    });
    JSer("#zltForm").submit(function() {
        var t;
        if((t=JSer("#tit")).val()==''){
            alert("请填写视图名称.");
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
            alert("请选择添加修改视图.");
            t.focus();
            return false;
        }
        if((t=JSer("#rownum")).val()==''){
            alert("请选择每行显示信息的条数.");
            t.focus();
            return false;
        }
        if((t=JSer("#depth")).val()==''){
            alert("请选择栏目深度.");
            t.focus();
            return false;
        }
        if((t=JSer("#fd0")).val()==''){
            alert("请选择显示字段1.");
            t.focus();
            return false;
        }
        var fd = new UserField();
        fd.set("field", "prm");
        var mgea = [];
        if (this.mge[0].checked)mgea.push("AddEdt");
        if (this.mge[1].checked)mgea.push("Delete");
        if (this.mge[2].checked) mgea.push("BatSort");
        if (this.mge[1].checked && this.mge[3].checked) mgea.push("DelAll");
        fd.set("mge", mgea.join(","));
        JSer.each(['inObj','rownum','depth','fd0','fd1','usrTit'], function(){
            fd.set(String(this), JSer('#'+this).val());
        });
        OBJECT.set(fd.toString());
        JSer("#prm").val(OBJECT.toString());
        JSer.url(this.action).sel(":input").ajax(function(d){
            if(d.indexOf("success")!=-1) JSer.url().set('JD_Status','successUpdate').go(0);
            else alert(d);
        });
        return false;
    });
    OBJECT = new UserFieldset(JSer("#prm").val());
    if (JSer("#prm").val() != "")obj2form(); else JSer("#usrTit").val("栏目");
});

var isNoRepeat;