/**
 * JDiy (v1.x)  -  javaWeb framework Page Events
 *
 * @author         : 子秋(ziquee)
 * @QQ             : 39886616
 * @copyright      : http://www.jdiy.org
 *
 **/
var OBJECT = {};
var isNoRepeat;
function form2obj(fm, isJdiyTable) {
    if(isJdiyTable){
        var t;
        if (fm.fTid.checked) {
            t = new UserField();
            t.set("field", "tid");
            t.set("name", fm.fTid_1.value==''?"上级栏目":fm.fTid_1.value);
            t.set("depth", fm.depth.value);
            t.set("txf","t");
            OBJECT.set(t.toString());
            fm.fTid_1.disabled = fm.fTid_2.disabled=fm.linkage.disabled = fm.depth.disabled = false;
        } else {
            OBJECT.del("tid");
            fm.fTid_1.disabled = fm.fTid_2.disabled =fm.linkage.disabled= fm.depth.disabled = true;
        }

        if (fm.fSort.checked) {
            t = new UserField();
            t.set("field", "sort");
            t.set("name", fm.fSort_1.value==''?'排序索引':fm.fSort_1.value);
            t.set("txf","t");
            OBJECT.set(t.toString());
            fm.fSort_1.disabled = false;
        } else {
            OBJECT.del("sort");
            fm.fSort_1.disabled = true;
        }

        if (fm.fDt1.checked) {
            t = new UserField();
            t.set("field", "dt1");
            t.set("name", fm.fDt1_1.value==''?'添加时间':fm.fDt1_1.value);
            t.set("txf","t");
            OBJECT.set(t.toString());
            fm.fDt1_1.disabled = false;
        } else {
            OBJECT.del("dt1");
            fm.fDt1_1.disabled = true;
        }
        if (fm.fDt2.checked) {
            t = new UserField();
            t.set("field", "dt2");
            t.set("name", fm.fDt2_1.value==''?'更新时间':fm.fDt2_1.value);
            t.set("txf","t");
            OBJECT.set(t.toString());
            fm.fDt2_1.disabled = false;
        } else {
            OBJECT.del("dt2");
            fm.fDt2_1.disabled = true;
        }
        var jsPrm = [];
        if (fm.fTid_2.checked)jsPrm.push("noFirst");
        if (fm.linkage.checked)jsPrm.push("linkage");
        if (fm.fNoRepeat.checked)jsPrm.push(JSer("#repeatType").val());
        if (jsPrm.length != 0) {
            t = new UserField();
            t.set("field", "prm");
            t.set("prm", jsPrm.join(","));
            OBJECT.set(t.toString());
        } else {
            OBJECT.del("prm");
        }
    }
}

function obj2form() {
    if(JSer("#tb").val()=='0'){
        var t;
        if (OBJECT.has("tid")) {
            JSer("#fTid")[0].checked = true;
            JSer("#fTid_1")[0].value = OBJECT.get("tid").get("name");
            JSer("#depth")[0].selectedIndex = OBJECT.get("tid").get("depth");
        } else {
            JSer("#fTid")[0].checked = false;
            JSer("#fTid_1, #fTid_2, #linkage").attr("disabled", true);
            JSer("#depth").attr("disabled", true);
        }
        if (OBJECT.has("sort")) {
            JSer("#fSort")[0].checked = true;
            t = OBJECT.get("sort").get("name");
            if (t != null)JSer("#fSort_1").val(t);
        } else {
            JSer("#fSort")[0].checked = false;
            JSer("#fSort_1")[0].disabled = true;
        }
        if (OBJECT.has("dt1")) {
            JSer("#fDt1")[0].checked = true;
            t = OBJECT.get("dt1").get("name");
            if (t != null)JSer("#fDt1_1").val(t);
        } else {
            JSer("#fDt1")[0].checked = false;
            JSer("#fDt1_1")[0].disabled = true;
        }
        if (OBJECT.has("dt2")) {
            JSer("#fDt2")[0].checked = true;
            t = OBJECT.get("dt2").get("name");
            if (t != null)JSer("#fDt2_1").val(t);
        } else {
            JSer("#fDt2")[0].checked = false;
            JSer("#fDt2_1")[0].disabled = true;
        }
        var prm = "";
        if (OBJECT.get("prm"))prm = OBJECT.get("prm").toString();

        JSer("#fTid_2")[0].checked = prm.indexOf("noFirst") != -1;
        JSer("#linkage").attr("checked", prm.indexOf("linkage")!=-1)
        JSer("#fNoRepeat")[0].checked = prm.indexOf("noRepeat") != -1;
        if (prm.indexOf("noRepeat") != -1) {
            JSer("#repeatRange").show();
        }
        for (var i = 0; i < JSer("#repeatType")[0].options.length; i++) {
            if (prm.indexOf(JSer("#repeatType")[0].options[i].value) != -1) {
                JSer("#repeatType")[0].selectedIndex = i;
                break;
            }
        }
    }
    userInterface();
}
function userInterface() {
    JSer("#msgDiv").html("");
    for (var i = 0; i < OBJECT.length(); i++) {
        var o = OBJECT.get(i);
        formUsr(o, i);
    }

    function cnType(s) {
        for (var i = 0; i < $input_type[0].length; i++)if ($input_type[0][i] == s) return $input_type[1][i];
        return '';
    }

    function formUsr(o, index) {
        if(JSer("#tb").val()=='0' && o.get('field').or('tid','sort','dt1','dt2','prm')){
            return;
        } // todo 这些隐藏字段tid....dt2的排序

        var s = [];
        if(OBJECT.length()>1){
            s.push('<img'+(index>0?'':' style=" visibility:hidden"')+' class="moveup" onclick="OBJECT.moveUp(\''+o.get('field')+'\');obj2form();" src="../JDiy_bin/img/moveup.gif" border="0" align="absmiddle" title="上移" />&nbsp;');
            s.push('<img'+(index<OBJECT.length()-1?'':' style=" visibility:hidden"')+' class="movedown" onclick="OBJECT.moveDown(\''+o.get('field')+'\');obj2form();" src="../JDiy_bin/img/movedown.gif" border="0" align="absmiddle" title="下移" />&nbsp;');
        }
        var txf = o.get('txf'), field = o.get("field");
        if(field==JSer("#tbpk").val() || txf!='t' && JSer("#dmpk").val()==1){
            s.push(' <span class="txtA" title="存在冲突">##</span>');
        }
        s.push('用');
        if(txf=='t') s.push('数据库字段');
        else if(txf=='x')s.push('XML字段控件');
        else if(txf=='f')s.push("文件字段");
        s.push('<strong class="txtD">');
        s.push(o.get("field") + '</strong>储存<span class="txtD">' + o.get("name") + '</span> ');
        if(txf=='f'){
            if(o.get('expand')==1) s.push('<span class="txtD">动态+'+ o.get('expandNum')+'</span> ');
        }
        s.push('<span class="txtD">' + (o.get("cols") == 2 ? '半行' : '整行') + '</span>');
        if(JSer("#isRoleIn").val()==1 && o.get("field")=='t15'){//roleIn view can't editable for field t15.
            s.push('<span class="txtA"> (不可修改)</span>');
        }else{
            if (o.get("ext") == null)s.push(' <span class="txtD">' + cnType(o.get("type")) + '</span>'); else s.push(' 允许上传<span class="txtD">' + o.get("ext") + '</span>');
            var tp = o.get("ext") + "";
            if (tp.indexOf("jpg") != -1 || tp.indexOf("jpeg") != -1 || tp.indexOf("gif") != -1 || tp.indexOf("png") != -1) {
                if (o.get("shortWH"))s.push(' <span class="txtD">缩放</span>');
                if (o.get("syImg"))s.push(' <span class="txtD">水印</span>');
            }
            var t = o.get("value");
            if (t != null && t != '')s.push(' 默认值:<span class="txtD">' + t + '</span>');
            t = o.get("style");
            if (t != null && t != '')s.push(' <span class="txtD">附加属性</span>');
            t = o.get("script");
            if (t != null && t != '')s.push(' <span class="txtD">js验证</span>');
            t= o.get("tips");
            if (t != null && t != '')s.push(' <span class="txtD">提示</span>');
            s.push(' <a noEvt="noEvt" onclick="showWin(\'' + o.get("field") + '\', \''+txf+'\')" title="修改字段"><img align="absmiddle"');
            s.push(' border="0" src="../JDiy_bin/img/edt.gif" />修改</a>');
            if (o.get("field") != "t0") {
                s.push(' <a noEvt="noEvt" onclick="OBJECT.del(\'' + o.get("field") + '\');obj2form();" title="删除字段"><img align="absmiddle"');
                s.push(' border="0" src="../JDiy_bin/img/edt.gif" />删除</a>');
            }
        }
        JSer("#msgDiv").append('<div class="uItem">' + s.join("") + '</div>');
    }
}

function showWin(fd, txf) {
    if (fd == null)fd = '';
    JSer.url('~.jd?~=input_popup@Conf').set({
        field:fd,
        tb:JSer("#tb").val(),
        txf:txf || 't'
    }).del('JD_Status id').open({target:'addT', width:680, height:500, modal:1});
}

JSer.exec(function() {

    JSer("#tbb").change(function(){
        JSer.url().set("tb",this.value).go();
    });

    JSer("#tbpk, #dmpk").change(function(){
        userInterface();
    });

    OBJECT = new UserFieldset(JSer("#prm").val());

    if(JSer("#tb").val()=="0"){

        for (var i = 0; i <= 16; i++) {
            JSer("#depth")[0].options[i] = new Option(i == 0 ? "无限" : i, i);
        }
        JSer("#fTid, #fSort, #fDt1, #fDt2, #fTid_2, #fNoRepeat, #linkage").click(function() {
            form2obj(this.form, true);
        });

        JSer("#fNoRepeat").click(function() {
            if (this.checked) {
                JSer("#repeatRange").show();
            } else {
                JSer("#repeatRange").hide();
            }
        });
    }
    obj2form();


    JSer("#addFdBtn").click(function() {
        showWin();
    });

    JSer("#zltForm").submit(function() {
        var t = JSer("#tit");
        if(t.val()==''){
            alert("请填写视图名称!");
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
        if (!isNoRepeat)return false;

        if(JSer("#tb").val()==0){
            t = JSer("#fType");
            if(t.val()==''){
                alert("请选择视图类型!");
                t.focus();
                return false;
            }
            form2obj(this, true);
        }else{
            if(JSer("#tbpk").val()==''){
                alert("请选择唯一字段，以作为数据更新依据。");
                JSer("#tbpk").focus();
                return false;
            }
            var isDbpk = JSer("#dmpk").val()==1;
            for(var i=0;i<OBJECT.length();i++){
                var fd = OBJECT.get(i).get("field");
                if(fd==JSer("#tbpk").val()){
                    alert("唯一字段不能被用户修改，因此不应该在控件列表中出现。");
                    return false;
                }

                if(isDbpk && OBJECT.get(i).get("txf")!="t"){
                    alert("唯一字段只有是JDiy维护时，才允许使用XML或文件上传控件。");
                    return false;
                }
            }

            form2obj(this, false);
        }
        if(OBJECT.length()==0){
            alert("对不起，您还没有定义输入控件。");
            return false;
        }
        JSer("#prm").val(OBJECT.toString());

        JSer.url(this.action).sel(":input").ajax(function(d){
            if(d.indexOf("success")!=-1) JSer.url().set('JD_Status','successUpdate').go(0);
            else alert(d);
        });
        return false;
    });
});

