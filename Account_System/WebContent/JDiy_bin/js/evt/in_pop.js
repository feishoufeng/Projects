/**
 * JDiy (v1.x)  -  javaWeb framework Page Events
 *
 * @author         : 子秋(ziquee)
 * @QQ             : 39886616
 * @copyright      : http://www.jdiy.org
 *
 **/
var winW = [680,680,680,680,680];
var winH = [500,627,560,435,550];
var oper = JSer.browser.msie ? window.dialogArguments : window.opener;
var tableStrutsCache={};
var selectedRid=selectedTxt=selectedVal=null;
var protectedFileNames =["aux", "con", "prn", "nul",
    "com1", "com2", "com3", "com4", "com5", "com6", "com7", "com8", "com9",
    "lpt1", "lpt2", "lpt3", "lpt4", "lpt5", "lpt6", "lpt7", "lpt8", "lpt9"];

function chkFileField(field){
    return /^[a-z-_]+[a-z0-9-_]*$/i.test(field) && protectedFileNames.indexOf(field.toLowerCase())==-1;
}

function fillStruts(tb){
    var to =JSer("#listTxt")[0], vo = JSer("#listVal")[0];
    var d = tableStrutsCache[tb];
    to.options.length=vo.options.length=0;
    to.options[0] = new Option("==请选择==","");
    vo.options[0] = new Option("==请选择==","");
    for(var i=0;i<d.length;i++){
        to.options[to.options.length]=new Option(d[i].field+'　- ('+d[i].type+')', d[i].field);
        vo.options[vo.options.length]=new Option(d[i].field+'　- ('+d[i].type+')', d[i].field);
    }
    if(selectedTxt) JSer("#listTxt").val(selectedTxt);
    if(selectedVal) JSer("#listVal").val(selectedVal);
}

function loadNode(tb, id) {
    if(tb=='')return;
    var flag = JSer("#tb @selected").attr("flag");
    if(flag==0){
        JSer("#rid").val("");
        JSer("#ridDiv").loadUrl("~.jd?~=tidOpt@Conf&tb=" + tb + "&zlt=" +
        (id == null ? "" : id) + "&width=175px", function(){
           if(selectedRid!=null){
               JSer("#tid").val(selectedRid);
               JSer("#rid").val(selectedRid);
           }
            tableStrutsCache[tb]=[{field:'t0',type:'VARCHAR'},{field:'id',type:'VARCHAR'}];
            fillStruts(tb);
        });
        JSer(".flag0").show();
        if(JSer("#fType").val()=="linkage")JSer("#tqlx").hide();

    }else{
        JSer(".flag0").hide();
        if(!tableStrutsCache[tb]){
           JSer.url("~.jd?~=tbStruts@Conf&tb="+tb).ajax({
                success:function(d){
                    if(d && d.length) tableStrutsCache[tb]=d;
                    else tableStrutsCache[tb]=[];
                    fillStruts(tb);
                },
                type:'json'
            });
        }else{
            fillStruts(tb);
        }
    }
}
JSer.exec(function() {
    var thisurl=JSer.url();
    var pField = thisurl.get("field"), txf=thisurl.get("txf"), tb= thisurl.get("tb"), fd=JSer("#fFd")[0];

    function fdOpt() {
        var FIELDS, OBJECT,TB,TBPK,DMPK;
        try{
            FIELDS = oper.FIELDS;
            OBJECT = oper.OBJECT;
            TB=oper.document.getElementById("tb").value;
            TBPK = TB=='0'?null:oper.document.getElementById("tbpk").value;
            DMPK = TB=='0'?null:oper.document.getElementById("dmpk").value;
        }catch(e){
            alert('父窗口信息读取失败，请关闭此窗口，然后重试。');
            return;
        }
        for (var i = 0; i < FIELDS.length; i++) {
            if (TBPK!=FIELDS[i] && (OBJECT.get(FIELDS[i]) == null || FIELDS[i] == pField)){
                fd.options[fd.options.length] = new Option("数据库字段 " +FIELDS[i], FIELDS[i]);
                if (txf=='t' && FIELDS[i] == pField) fd.selectedIndex = fd.options.length - 1;
            }
        }
        if(TB=='0' || DMPK==0){
            fd.options[fd.options.length] = new Option(".....XML 字段.....", "$JDIY_XML");
            JSer(fd.options[fd.options.length-1]).css("color", "blue");
            if(txf=="x") fd.options.selectedIndex=fd.options.length-1;

            fd.options[fd.options.length] = new Option("...文件上传字段...", "$JDIY_FILE");
            JSer(fd.options[fd.options.length-1]).css("color", "blue");
            if(txf=="f") fd.options.selectedIndex=fd.options.length-1;
        }
    }

    if (pField == 't0' && tb=='0') {
        fd.options.length = 0;
        fd.options[0] = new Option("数据库字段 t0", "t0");
    } else {
        fdOpt();
    }
    JSer("#fFd1").val(pField);

    JSer("#liUp").click(function() {
        JSer("#liItem").selectUp();
    });
    JSer("#liDown").click(function() {
        JSer("#liItem").selectDown();
    });
    JSer("#liDel").click(function() {
        JSer("#liItem").selectRemove();
    });
    JSer("#fType").change(function() {
        selType(this);
    });
    JSer("#liN").keyup(function() {
        JSer('#liV')[0].value = this.value;
    });
    JSer("#cancelBtn").click(function() {
        if (confirm('您确定要放弃对本页的修改吗？'))window.close();
    });
    JSer("#fFd").change(function() {
        var isF = this.value == "$JDIY_FILE";
        var isX = this.value == "$JDIY_XML";
        if(isF || isX){
            JSer("#xfDIV").show();
        }else{
            JSer("#xfDIV").hide();
        }
        if (isF) {
            JSer('#fUI_type').html("文件");
            JSer('#fType').hide();
            JSer('#fExt').show();
            showList(0);
            JSer("#fDef").attr("disabled", "disabled");
            showShort();
            JSer("input[@name=fPos]")[0].checked = false;
            JSer("#fPos_hide").hide();
            JSer("#expandDIV").show();
        } else {
            JSer('#fUI_type').html("控件");
            JSer('#fType').show();
            JSer('#fExt').hide();
            selType(JSer("#fType")[0]);
            JSer("#fDef").attr("disabled",null);
            showShort(true);
            JSer("#fType").click();
            JSer("#expandDIV").hide();
        }
    });
    JSer("#liAdd").click(function() {
        var chk = new JDiyFormCheck(this.form);
        if (chk.isNull("liN", "请先输入选项的显示名称"))return;
        if (chk.isNull("liV", "请先输入选项的值"))return;
        var n = JSer("#liN")[0];
        var v = JSer("#liV")[0];
        if (n.value.indexOf("{") != -1 || n.value.indexOf("};") != -1 || n.value.indexOf('"') != -1) {
            alert("对不起,选项名称中不能含有大括号和双引号！");
            n.focus();
            n.select();
            return;
        }
        if (n.value.indexOf("<JD_") != -1 || n.value.indexOf("</JD_") != -1) {
            alert("对不起,选项名称中不能含有＂<JD_＂或＂</JD_＂这样的字符.");
            n.focus();
            n.select();
            return;
        }
        if (v.value.indexOf("{") != -1 || v.value.indexOf("};") != -1 || v.value.indexOf('"') != -1) {
            alert("对不起,选项值中不能含有大括号和双引号！");
            v.focus();
            v.selected();
            return;
        }
        if (v.value.indexOf("<JD_") != -1 || v.value.indexOf("</JD_") != -1) {
            alert("对不起,选项值中不能含有＂<JD_＂或＂</JD_＂这样的字符.");
            v.focus();
            v.select();
            return;
        }
        var t = JSer("#liItem")[0];
        var tStr = n.value + "{" + v.value + "};";
        t.options[t.options.length] = new Option(tStr, tStr);
        t.selectedIndex = t.options.length - 1;
        n.value = v.value = "";
        n.focus();
    });
    JSer("#tb").change(function() {
        loadNode(this.value);
    });
    JSer("input[@name=valRadio]").click(function() {
        JSer("#valType").val(JSer(this).val());
    });
    JSer("#fExt").keyup(function() {
        showShort();
    });
    JSer("#zltForm").submit(function() {
        var chk = new JDiyFormCheck(this);
        if (chk.isNull("fFd", "请选择要使用的字段"))return false;


        var iObj = new UserField();
        var isF = this.fFd.value == "$JDIY_FILE";
        var isX = this.fFd.value == "$JDIY_XML";
        var FIELDS, OBJECT;
        try{
            FIELDS = oper.FIELDS;
            OBJECT = oper.OBJECT;
        }catch(e){
            alert('父窗口信息读取失败，请关闭此窗口，然后重试。');
            return;
        }
        var fdVal;
        if(isF || isX){
            fdVal=this.fFd1.value.trim();
            if(fdVal==''){
                alert("请填写字段名称!");
                JSer("#fFd1").focus();
                return false;
            }


            if(!chkFileField(fdVal)){
                alert("对不起,字段名称只能由字母[a-z]或数字[0-9],横线[-, _]的组合,\r\n" +
                    "且不能以数字开头,不能是DOS的保留字(例如: con, nul, aux, com1等).");
                JSer("#fFd1").focus();
                return false;
            }
        }else{
            fdVal = this.fFd.value;
        }
        var urlField = JSer.url().get("field");
        if(urlField!=fdVal && OBJECT.hasDuplicate(fdVal)){
            alert("对不起，字段名称"+fdVal+"已经存在，不能重复定义。");
            return false;
        }
        if((isF || isX) && FIELDS.indexOf(fdVal)!=-1){
            alert("对不起，字段名称"+fdVal+"不能与数据库字段重名。");
            this.fFd1.focus();
            return false;
        }

        if (chk.isNull("fTit", "请输入显示名称"))return false;
        if (this.fTit.value.indexOf("=") != -1 || this.fTit.value.indexOf(",") != -1 || this.fTit.value.indexOf("|") != -1) {
            alert("对不起,显示名称中不能含有等号,逗号或竖线！");
            this.fTit.focus();
            return false;
        }
        chk.split("fExt", ",", "[\.。　 ;；|、｜]+");
        if(JSer("#fType").val()=='number' && !isF && !isX){
            if(JSer("#fDef").val()!=parseFloat(JSer("#fDef").val())){
                alert("对不起,默认值必须是一个有效的数字.");
                JSer("#fDef").focus();
                return false;
            }
        }
        if (!chk.isChk("fPos", "请选择占位方式"))return false;
        if (JSer("#divList").css('display') != "none" && this.tb.value == "") {
            if (this.liItem.options.length == 0) {
                alert("对不起，未定义“选项列表”！");
                this.liN.focus();
                return false;
            }
        }
        var shortW = JSer("#shortW").val();
        var shortH = JSer("#shortH").val();
        var re = new RegExp("[^a-z0-9_]", "gi");
        if (shortW != 0 || shortH != 0) {
            if (shortW != parseInt(shortW) || shortW < 0) {
                alert("缩略图的长度必须是非负整数.");
                JSer("#shortW").focus();
                return false;
            }
            if (shortH != parseInt(shortH) || shortH < 0) {
                alert("缩略图的宽度必须是非负整数.");
                JSer("#shortH").focus();
                return false;
            }
            var n = JSer("#shortName").val();
            if (n != "" && !chkFileField(n)) {
                alert("自动缩图“另存为”的文件名只能由字母[a-z]或数字[0-9],横线[-, _]的组合,\r\n" +
                    "且不能以数字开头,不能是DOS的保留字(例如: con, nul, aux, com1等).");
                JSer("#shortName").focus();
                return false;
            }
        }
        var syImg = JSer("#syImg").val();
        if (syImg != '') {
            if (syImg.charAt(0) != "/") {
                alert("水印图片的地址必须是以“/”开头的相对跟路径（例如：/main/logo.png）。\r\n如果不需要水印，则“水印图片”框无需填写。");
                JSer("#syImg").focus();
                return false;
            }
            var syImgExt = syImg.substring(syImg.lastIndexOf(".") + 1).toLowerCase();
            if (syImgExt != "jpg" && syImgExt != "jpeg" && syImgExt != "gif" && syImgExt != "png") {
                alert("水印图片文件的格式必须是png,gif,jpg三种格式之一。");
                JSer("#syImg").focus();
                return false;
            }
            var syExists =JSer.url("~.jd?~=checkWatermarkExists@Conf").set('fn',syImg).ajax({
                async:false
            }).responseText;
            if (syExists != "success") {
                alert("对不起,指定的水印图片不存在！请检查水印图片的地址输入是否正确."+syExists);
                JSer("#syImg").focus();
                return false;
            }
            n = JSer("#syName").val();
            if (n != "" && !chkFileField(n)) {
                alert("自动水印“另存为”的文件名只能由字母[a-z]或数字[0-9],横线[-, _]的组合,\r\n" +
                    "且不能以数字开头,不能是DOS的保留字(例如: con, nul, aux, com1等).");
                JSer("#syName").focus();
                return false;
            }
        }
        if (JCP(this.fTit))return false;
        if (JCP(this.fDef))return false;
        if (JCP(this.fStyle))return false;
        if (JCP(this.fScript))return false;
        if (JCP(this.tips))return false;
        if(/<\/*(script|form|input|textarea|select|html|body|head)/i.test(this.tips.value)){
            alert("提示文字虽支持HTML,但以下这些标签不应该在此出现:\r\n" +
                "script,form,input,textarea,select,html,body,head");
            return false;
        }

        if(isF || isX){
            iObj.set("field", this.fFd1.value);
            iObj.set("txf", isF ? 'f':'x');
            if(isF){
                if(JSer("#expandChk")[0].checked){
                    var ev = JSer("#expandNum").val();
                    if(ev !=parseInt(ev) || ev<0){
                        alert("请用有效的整数输入动态扩展数量上限.");
                        JSer("#expandNum").focus();
                        return false;
                    }
                    iObj.set("expand",1);
                    iObj.set("expandNum",ev);
                }
            }
        }else{
            iObj.set("field", this.fFd.value);
            iObj.set('txf','t');
        }
        iObj.set("name", this.fTit.value);
        iObj.set("type", isF ? "file" : this.fType.value);
        iObj.set("value", this.fDef.value);
        iObj.set("cols", this.fPos[0].checked ? 0 : (this.fPos[1].checked ? 1 : 2));
        if (!chk.isNull("fStyle"))iObj.set("style", this.fStyle.value);
        if(JSer('#readonly_add').attr('checked')) iObj.set('readonly_add',1);
        if(JSer('#readonly_edit').attr('checked')) iObj.set('readonly_edit',1);
        if (!chk.isNull("fScript"))iObj.set("script", this.fScript.value);
        if (!chk.isNull("tips"))iObj.set("tips", this.tips.value);
        if (this.liItem.options.length != 0) {
            var s = [];
            for (var i = 0; i < this.liItem.options.length; i++)s.push(this.liItem.options[i].value);
            iObj.set("valuelist", s.join("\n"));
        }
        if (JSer("#fExt").css('display') != "none") {
            iObj.set("ext", this.fExt.value);
        }
        if (this.tb.value != "") {
            iObj.set("listTable", JSer("#tb").val());

            var flag = JSer("#tb @selected").attr("flag");
            if(flag==0){
                if (JSer("#rid").val() == "") {
                    alert('请选择父节点！');
                    JSer("#tid").focus();
                    return false;
                }
                iObj.set("listTid", JSer("#rid").val());
                iObj.set("listIsc", JSer("#listIsc").val());
            }

            if(this.fType.value!='linkage'){
                if(JSer("#listTxt").val()==''){
                    alert("请选择选项名称.");
                    JSer("#listTxt").focus();
                    return false;
                }
                iObj.set("listTxt", JSer("#listTxt").val());

                if(JSer("#listVal").val()==''){
                    alert("请选择选项值.");
                    JSer("#listVal").focus();
                    return false;
                }
                iObj.set("listVal", JSer("#listVal").val());
            }
            iObj.set("listFilter", JSer("#listFilter").val());
        }
        if (JSer("#shortW").val() != 0 || JSer("#shortH").val() != 0) {
            iObj.set("shortWH", JSer("#shortW").val() + "," + JSer("#shortH").val());
            if (JSer("#shortLock")[0].checked)iObj.set("shortLock", "1");
            if (JSer("#shortName").val() != "")iObj.set("shortName", JSer("#shortName").val());
        }
        if (JSer("#syImg").val() != "") {
            iObj.set("syImg", JSer("#syImg").val());
            iObj.set("syPosition", JSer("#syPosition").val());
            if (JSer("#syName").val() != "")iObj.set("syName", JSer("#syName").val());
        }
        try {
            oper.OBJECT.set(iObj.toString(), pField);
        } catch(e) {
            alert("操作失败！原因：\n\n" + e.description);
        }
        oper.userInterface();
        self.close();
        chk = null;
        return false;
    });

    if (pField)initForm(pField);
    JSer("#shortW, #shortH").keyup(function() {
        var w = JSer("#shortW").val();
        var h = JSer("#shortH").val();
        var b = w == parseInt(w) && h == parseInt(h) && (w > 0 || h > 0);
        autoShort(b);
    }).keyup();
    JSer("#syImg").keyup(function() {
        autoSy(this.value != "");
    }).keyup();

});
function autoShort(enable) {
    JSer("#shortLock, #shortName").attr("disabled", !enable);
}
function autoSy(enable) {
    JSer("#syPosition, #syName").attr("disabled", !enable);
}
function initForm(pField) {
    var o = oper.OBJECT.get(pField), v;
    JSer("@name=fPos")[o.get("cols")].checked = true;
    if ((v=o.get("name")) != null)JSer("#fTit").val(v);
    if ((v=o.get("ext")) != null)JSer("#fExt").val(v);
    if ((v=o.get("value")) != null)JSer("#fDef").val(v);
    if ((v=o.get("style")) != null)JSer("#fStyle").val(v);
    if ((v=o.get("script")) != null)JSer("#fScript").val(v);
    if ((v=o.get("tips"))!=null) JSer("#tips").val(v);
    var ot = JSer("#fType")[0], i,t,ta;
    for (i = 0; i < ot.options.length; i++)if (ot.options[i].value == o.get("type"))ot.selectedIndex = i;
    JSer("#fFd").change();
    JSer("#fType").change();
    var lv = o.get("valuelist");
    if (lv != null && lv != "") {
        lv = lv.split("\n");
        t =JSer("#liItem")[0];
        for (i = 0; i < lv.length; i++) {
            t.options[t.options.length] = new Option(lv[i], lv[i]);
        }
    }
    if(o.get("listTable") != null){
        JSer("#tb option").each(function(){
            if(o.get("listTable")==this.value){
                this.selected=true;
                return false;
            }
        });
        if(o.get("listTid") != null){
            selectedRid = o.get("listTid");
        }
        selectedTxt = o.get("listTxt");
        selectedVal = o.get("listVal");
        loadNode(o.get("listTable"), o.get("listTid"));

        JSer("#listIsc").val(o.get("listIsc"));
        JSer("#listFilter").val(o.get("listFilter"));
    }
    t = o.get("shortWH");
    if (t != null && t != '') {
        ta = t.split(",");
        JSer("#shortW").val(ta[0]);
        JSer("#shortH").val(ta[1]);
    }
    JSer('#readonly_add').attr('checked', o.get('readonly_add')==1);
    JSer('#readonly_edit').attr('checked', o.get('readonly_edit')==1);
    JSer("#shortLock").attr("checked", String(o.get("shortLock")) == 1);
    JSer("#shortName").val(o.get("shortName"));
    t = o.get("syImg");
    if (t != null && t != '') {
        JSer("#syImg").val(t);
        ta = parseInt(o.get("syPosition"));
        if (ta < 1 || ta > 9)ta = 9;
        JSer("#syPosition")[0].selectedIndex = ta - 1;
        JSer("#syName").val(o.get("syName"));
    }

    var isF = JSer("#fFd").val()=='$JDIY_FILE';
    if (isF){
        showShort();
        if(o.get('expand')==1){
            JSer("#expandChk").attr('checked','checked');
            JSer("#expandNum").val(o.get('expandNum'));
        }
    }
}

function showAllTable(){
    var tbo = JSer("#tb")[0],sub=0;
    tbo.options.length=1;
    for(var i=0;i<TBLIST.length;i++){
        tbo.options[++sub]=new Option("『"+TBLIST[i].tb+"』 "+TBLIST[i].tit, TBLIST[i].tb);
        if(TBLIST[i].flag==1)JSer(tbo.options[sub]).css("color","blue");
        JSer(tbo.options[sub]).attr("flag", TBLIST[i].flag);
    }
    JSer("#tb").change();
}

function showTreeTable(){
    var tbo = JSer("#tb")[0],sub=0;
    tbo.options.length=1;
    for(var i=0;i<TBLIST.length;i++){
        if(TBLIST[i].flag==1)continue;
        tbo.options[++sub]=new Option("『"+TBLIST[i].tb+"』 "+TBLIST[i].tit, TBLIST[i].tb);
        JSer(tbo.options[sub]).attr("flag", TBLIST[i].flag);
    }
}


function selType(o) {
    var v = o.value;
    if (v.or("radio", "checkbox")) {
        showAllTable();
        showList(2);
    } else if (v == "select" || v == "selectx") {
        showAllTable();
        showList(1);
    } else if (v == "webeditor" || v == "hidden") {
        showList(3);
    }else if(v=='linkage'){
        showTreeTable();
        showList(2);
    } else {
        showList(0);
    }
    if(v=='linkage'){
        JSer(".noLinkages").hide();
        JSer(".flag0").show();
        JSer("#tqlx").hide();
    }else{
        JSer(".noLinkages").show();
        JSer(".flag0").hide();
    }
    if (v == 'hidden') {
        JSer("#fPos_hide").show();
    } else {
        JSer("#fPos_hide").hide();
        JSer("input[@name=fPos]")[0].checked = false;
    }
}
function showShort(noShow) {
    if (noShow) {
        JSer("tr[@name=picOption]").hide();
        return;
    }
    var v = JSer("#fExt").val().toLowerCase();
    if(/jpg|jpeg|gif|png|bmp/.test(v)){
        JSer("tr[@name=picOption]").show();
        showList(4);
    } else {
        JSer("tr[@name=picOption]").hide();
        showList(0);
    }
}
function showList(winSize) {
    if (JSer.browser.msie) {
        window.dialogWidth = winW[winSize] + "px";
        window.dialogHeight = winH[winSize] + "px";
        window.dialogLeft = (screen.width - winW[winSize]) / 2 + "px";
        window.dialogTop = (screen.height - winH[winSize]) / 2 + "px";
        window.moveTo((screen.width - winW[winSize]) / 2, (screen.height - winH[winSize]) / 2);
    } else {
        window.resizeTo(winW[winSize] + 10, winH[winSize] + 10);
        window.moveTo((screen.width - winW[winSize]) / 2, (screen.height - winH[winSize]) / 2);
    }
    if (winSize == 0) {
        JSer("#divList").hide();
        JSer("#trStyle").show();
    } else if (winSize == 1) {
        JSer("#divList").show();
        JSer("#trStyle").show();
    } else if (winSize == 2) {
        JSer("#divList").show();
        JSer("#trStyle").hide();
    } else if (winSize == 3) {
        JSer("#divList").hide();
        JSer("#trStyle").hide();
    }
}
function JCP(o) {
    var v = o.value;
    if (v.indexOf("<JD_") != -1 || v.indexOf("</JD_") != -1) {
        alert("您输入的内容中不能含有＂<JD_＂或＂</JD_＂！！");
        o.focus();
        o.select();
        return true;
    }
    return false;
}