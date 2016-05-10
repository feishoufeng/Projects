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

function form2obj() {
    var fd = new UserField();
    fd.set("field", "prm");
    JSer.each(['pageSize', 'outType', 'addFilter', 'sortType', 'sortField', 'inObj', 'cut', 'dbl', 'url', 'urlW', 'urlH'], function () {
        fd.set(String(this), JSer('#' + this).val());
    });
    fd.set("imgWH", JSer("#imgW").val() + "," + JSer("#imgH").val());
    var t = [];
    var o = JSer("#fdTarget")[0];
    var i;
    for (i = 0; i < o.options.length; i++)t.push(o.options[i].value);
    fd.set("outFields", t.join(","));
    t = [];
    o = JSer("#keyTarget")[0];
    for (i = 0; i < o.options.length; i++)t.push(o.options[i].value);
    fd.set("keyFields", t.join(","));
    t = [];
    JSer("input[name=bat]:checked").each(function () {
        t.push(JSer(this).val());
    });
    fd.set("bat", t.join(","));
    OBJECT.set(fd.toString());
    JSer("#prm").val(OBJECT.toString());
}
function obj2form() {
    if (addMode) {
        JSer("#pageSize")[0].selectedIndex = 20;
        JSer("#imgW, #imgH").val(0);
        JSer("#batDel")[0].checked = true;
    } else {
        var fd = OBJECT.get("prm");
        JSer("#pageSize")[0].selectedIndex = fd.get("pageSize");
        var t = JSer("#outType")[0], i;
        for (i = 0; i < t.options.length; i++)if (t.options[i].value == fd.get("outType")) {
            t.selectedIndex = i;
            break;
        }
        JSer("#outType").change();
        t = JSer("#inObj")[0];
        for (i = 0; i < t.options.length; i++)if (t.options[i].value == fd.get("inObj")) {
            t.selectedIndex = i;
            break;
        }
        JSer("#inObj").change();
        t = JSer("#dbl")[0];
        for (i = 0; i < t.options.length; i++)if (t.options[i].value == fd.get("dbl")) {
            t.selectedIndex = i;
            break;
        }
        JSer.each(['url', 'urlW', 'urlH', 'cut'], function () {
            JSer('#' + this).val(fd.get(this));
        })
        dblEvent(JSer("#dbl").val());
        JSer.url("~.jd?~=ctrlPrm@Conf&id=" + fd.get("inObj")).ajax(function (data) {
            setOptionFields(data, true);
        });
        JSer("#imgW").val(fd.get("imgWH").split(",")[0]);
        JSer("#imgH").val(fd.get("imgWH").split(",")[1]);
        JSer("input[@name=bat]").each(function () {
            JSer(this).attr("checked", fd.get("bat").indexOf(JSer(this).val()) != -1);
        });
    }
    showLD();
}
function edtFieldset() {
    var kstr = OBJECT.get("prm").get("keyFields"), oFd = OBJECT.get("prm").get("outFields").split(",");
    var kFd = kstr.split(","), t = JSer("#fdTarget")[0], k = JSer("#keySource")[0], s = JSer('#sortField')[0], i, name;
    for (i = 0; i < oFd.length; i++) {
        var io = inCtrl.get(oFd[i]);
        name = io && io.get("name");
        if (name == null) {
            if (oFd[i] == 'sort') name = '排序索引';
            else if (oFd[i] == 'hits') name = '点击次数';
            else if (oFd[i] == 'owner') name = '添加者';
            else if (oFd[i] == 'dt1') name = '添加时间';
            else if (oFd[i] == 'dt2') name = '更新时间';
            else if (oFd[i] == JSer('#tbpk').val()) name = 'ID';
            else continue;
        }
        t.options[t.options.length] = new Option(oFd[i] + " - " + name, oFd[i]);
        if ((io.get('type') || '').or('select', 'radio')) pi(oFd[i], name);
        var tx = oFd[i].split("=")[0];
        var isT = (inCtrl.get(tx) || {}).get('txf') == 't';
        if (isT && kFd.indexOf(oFd[i]) == -1) {
            k.options[k.options.length] = new Option(oFd[i] + " - " + name, oFd[i]);
        }
        if (isT) {
            s.options[s.options.length] = new Option(oFd[i] + " - " + name, oFd[i]);
        }
    }
    k = JSer("#keyTarget")[0];
    for (i = 0; i < kFd.length; i++) {
        if (kFd[i] == null || kFd[i] == '') continue;
        name = inCtrl.get(kFd[i]) == null ? null : inCtrl.get(kFd[i]).get("name");
        if (name == null) {
            if (kFd[i] == 'sort') name = '排序索引';
            else if (kFd[i] == 'hits') name = '点击次数';
            else if (kFd[i] == 'owner') name = '添加者';
            else if (oFd[i] == 'dt1') name = '添加时间';
            else if (oFd[i] == 'dt2') name = '更新时间';
            else if (kFd[i] == JSer('#tbpk').val()) name = 'ID';
            else continue;
        }
        k.options[k.options.length] = new Option(kFd[i] + " - " + name, kFd[i]);
    }
    JSer("#addFilter").val(OBJECT.get("prm").get("addFilter"));
    JSer("#sortType").val(OBJECT.get("prm").get("sortType"));
    JSer("#sortField").val(OBJECT.get("prm").get("sortField"));
    var opt = JSer("#fdSource")[0].options;
    var of = OBJECT.get("prm").get("outFields").split(",");
    for (i = opt.length - 1; i >= 0; i--) {
        if (of.indexOf(opt[i].value) != -1) {
            opt[i] = null;
        }
    }
}

var inCtrl;
function setOptionFields(data, isEdt) {
    var fds = JSer("#fdSource")[0], i;

    function addOpt(fd, name) {
        fds.options[fds.options.length] = new Option(fd + " - " + name, fd);
    }

    fds.options.length = 0;
    inCtrl = new UserFieldset(data);
    JSer("#piDIV").empty();
    if (JSer("#tb").val() == '0') {
        addOpt("id", "ID");
        addOpt("hits", "点击次数");
        addOpt("owner", "添加者");
        if (inCtrl.has("tid")) {
            if (inCtrl.get("tid").get("name") != "") {
                addOpt("tid", inCtrl.get("tid").get("name"));
            } else {
                addOpt("tid", "上级栏目");
            }
            inCtrl.get('tid').set('type', 'select');
        }

        if (inCtrl.has("sort") && inCtrl.get("sort").get("name") != "") {
            addOpt("sort", inCtrl.get("sort").get("name"));
        } else {
            addOpt("sort", "排序索引");
        }
        if (inCtrl.has("dt1") && inCtrl.get("dt1").get("name") != "") {
            addOpt("dt1", inCtrl.get("dt1").get("name"));
        } else {
            addOpt("dt1", "添加时间");
        }
        if (inCtrl.has("dt2") && inCtrl.get("dt2").get("name") != "") {
            addOpt("dt2", inCtrl.get("dt2").get("name"));
        } else {
            addOpt("dt2", "更新时间");
        }
        inCtrl.set(new UserField().set({field: 'id', txf: 't'}));
        inCtrl.set(new UserField().set({field: 'hits', txf: 't'}));
        inCtrl.set(new UserField().set({field: 'owner', txf: 't'}));
        if (!inCtrl.has('tid'))inCtrl.set(new UserField().set({field: 'tid', txf: 't'}));
        inCtrl.set(new UserField().set({field: 'sort', txf: 't'}));
        inCtrl.set(new UserField().set({field: 'dt1', txf: 't'}));
        inCtrl.set(new UserField().set({field: 'dt2', txf: 't'}));
        for (i = 0; i < inCtrl.length(); i++)
            if (!inCtrl.get(i).get("field").or("tid", "sort", "dt1", "dt2", "prm", 'id', 'hits', 'owner'))
                addOpt(inCtrl.get(i).get("field"), inCtrl.get(i).get("name"));
    } else {
        addOpt(JSer("#tbpk").val(), "ID");
        inCtrl.set(new UserField().set({field: JSer('#tbpk').val(), txf: 't'}));
        for (i = 0; i < inCtrl.length(); i++)
            if (inCtrl.get(i).get('field') != JSer("#tbpk").val())
                addOpt(inCtrl.get(i).get("field"), inCtrl.get(i).get("name"));
    }
    if (isEdt)edtFieldset();
}
function dblEvent(val) {
    if (val == "edt" || val == "none") {
        JSer("#urlDiv, #whDiv").hide();
    } else {
        JSer("#urlDiv").show();
        if (val == "pop")JSer("#whDiv").show(); else JSer("#whDiv").hide();
    }
}
function showLD() {
    if (JSer("#outType").val() == "input1" && JSer("#batDel")[0].checked) {
        JSer("#span_ld").show();
    } else {
        JSer("#span_ld input").attr("checked", false);
        JSer("#span_ld").hide();
    }
}

function pi(fd, name) {
    if (JSer("#outType").val() == "input1" && fd == 'tid')return;
    var piArr = OBJECT.get('prm') == null ? [] : OBJECT.get('prm').get('bat').split(',');
    JSer("#piDIV").append('<span id="pi__' + fd
        + '"><label><input type="checkbox" class="inChk" name="bat" value="' + fd + '"'
        + (piArr.indexOf(fd) != -1 ? ' checked' : '') + ' />批量改' + name + '</label></span>　');
}

JSer.exec(function () {
    var i, ps = JSer("#pageSize")[0];
    for (i = 0; i <= 100; i++) {
        ps.options[ps.options.length] = new Option(i == 0 ? "全部记录（不分页）" : "　 " + i + "条记录　", i);
    }
    JSer("#inObj").change(function () {
        if (this.selectedIndex == 0)return;
        var opt = JSer(this.options[this.selectedIndex]);
        JSer("#tb").val(pkoptions[this.value].tb);
        if (pkoptions[this.value].tb == 0) JSer(".jdtbDIV").show();
        else {
            JSer(".jdtbDIV input").attr("checked", false);
            JSer(".jdtbDIV").hide();
        }
        JSer("#tbpk").val(pkoptions[this.value].tbpk);
        JSer("#dmpk").val(pkoptions[this.value].dmpk);
        JSer.url("~.jd?~=ctrlPrm@Conf&id=" + this.value).ajax(function (data) {
            setOptionFields(data);
            JSer("#fdTarget")[0].options.length = JSer("#keySource")[0].options.length = JSer("#keyTarget")[0].options.length = 0;
            JSer("#sortField")[0].options.length =1;
        });
    });
    JSer("#outType").change(function () {
        if (this.value == 'input1') JSer("#lanmuTips").html(' 如果要维护的栏目下存在多个子节点层级，系统建议您改用树形节点视图或者目录列表视图管理。');
        else JSer("#lanmuTips").empty();

        showLD();
        JSer("#inObj")[0].options.length = 1;
        for (var i = 0; i < inSource.length; i++) {
            var io = JSer("#inObj")[0].options;
            if (inSource[i].type == this.value)
                io[io.length] = new Option("　 " + inSource[i].tit, inSource[i].id);
            if (inSource[i].tb != '0') JSer(io[io.length - 1]).css('color', 'blue');
        }
    });
    JSer("#batDel").click(function () {
        showLD();
    });


    function ssh(isAdd) {
        var i;
        if (isAdd) {
            JSer("#piDIV").empty();
            var f = JSer("#fdTarget")[0], t = JSer("#keySource")[0], s = JSer("#sortField")[0], tStr = "";
            for (i = 0; i < t.options.length; i++)tStr += "ZLT" + t.options[i].value + "ZLT";
            for (i = 0; i < f.options.length; i++) {
                var v = f.options[i].value;
                var vt = f.options[i].text;
                var io = inCtrl.get(v) || {};
                if ((io.get('type') || '').or('select', 'radio')) pi(io.get('field'), io.get('name'));
                var notT = io.get('txf') != 't';
                if (!f.options[i].selected || notT) continue;
                if (tStr.indexOf("ZLT" + v + "ZLT") == -1){
                    t.options[t.options.length] = new Option(vt, v);
                    s.options[s.options.length] = new Option(vt, v);
                }
            }
        } else {
            var f1 = JSer("#fdSource")[0], t1 = JSer("#keySource")[0], t2 = JSer("#keyTarget")[0], s = JSer("#sortField")[0], j;
            for (i = 0; i < f1.options.length; i++) {
                JSer('#pi__' + (inCtrl.get(f1.options[i].value) || {}).get('field')).remove();
                if (!f1.options[i].selected) continue;
                for (j = t1.options.length - 1; j >= 0; j--) {
                    if (t1.options[j].value == f1.options[i].value)t1.options[j] = null;
                }
                for (j = t2.options.length - 1; j >= 0; j--) {
                    if (t2.options[j].value == f1.options[i].value)t2.options[j] = null;
                }
                for (j = s.options.length; j--;) {
                    if (s.options[j].value == f1.options[i].value)s.options[j] = null;
                }
            }
        }
    }

    function l2r() {
        JSer("#fdSource").selectMove("#fdTarget");
        ssh(true);
    }

    function r2l() {
        JSer("#fdTarget").selectMove("#fdSource");
        ssh();
    }

    JSer("#fdR").click(l2r);
    JSer("#fdL").click(r2l);
    JSer("#fdSource").dblclick(l2r);
    JSer("#fdTarget").dblclick(r2l);
    JSer("#fdT").click(function () {
        JSer("#fdTarget").selectUp();
    });
    JSer("#fdB").click(function () {
        JSer("#fdTarget").selectDown();
    });
    function k_l2r() {
        JSer("#keySource").selectMove("#keyTarget");
    }

    function k_r2l() {
        JSer("#keyTarget").selectMove("#keySource");
    }

    JSer("#keyR").click(k_l2r);
    JSer("#keyL").click(k_r2l);
    JSer("#keySource").dblclick(k_l2r);
    JSer("#keyTarget").dblclick(k_r2l);

    JSer("#keyT").click(function () {
        JSer("#keyTarget").selectUp();
    });
    JSer("#keyB").click(function () {
        JSer("#keyTarget").selectDown();
    });
    JSer("#dbl").change(function () {
        dblEvent(this.value)
    });
    OBJECT = new UserFieldset(JSer("#prm").val());
    obj2form();
    JSer("#zltForm").submit(function () {
        var t;
        if ((t = JSer("#tit")).val() == '') {
            alert("请填写视图名称.");
            t.focus();
            return false;
        }

        var od = JSer("#tit").attr("old"), ti = JSer("#tit").val();
        if (od == ti) isNoRepeat = true;
        else {
            JSer.url("~.jd?~=chkRepeatCtrl@Conf").set({
                tit: JSer("#tit").val(),
                tit_old: JSer("#tit").attr("old"),
                fType: JSer("#fType").val()
            }).ajax({type: "SCRIPT", async: false});
        }
        if (!isNoRepeat)return false;
        t = JSer("#outType");
        if (t.val() == '') {
            alert('请选择输出类型!');
            t.focus();
            return false;
        }
        t = JSer("#inObj");
        if (t.val() == '') {
            alert('请绑定输入表单!');
            t.focus();
            return false;
        }
        t = JSer("#fdTarget");
        if (t[0].options.length < 1) {
            alert("对不起,请指定显示字段！");
            t.focus();
            return false;
        }
        t = JSer("#dbl");
        if (t.val() == "pop" || t.val() == "url") {
            var tw = JSer("#urlW"), th = JSer("#urlH");
            if (this.url.value == '') {
                alert('页面地址不能为空!');
                this.url.focus();
                return false;
            }
            if (t.val() == "pop") {
                if (tw.val() != parseInt(tw.val()) || parseInt(tw.val()) < 0) {
                    alert("弹出窗口宽必须是一个非负整数!");
                    this.urlW.focus();
                    return false;
                }
                if (th.val() != parseInt(th.val()) || parseInt(th.val()) < 0) {
                    alert("弹出窗口高必须是一个非负整数!");
                    th.focus();
                    return false;
                }
            }
        }
        var iw = JSer("#imgW"), ih = JSer("#imgH");
        if (iw.val() != parseInt(iw.val()) || parseInt(iw.val()) < 0) {
            alert('图片显示长度必须是一个非负整数!');
            iw.focus();
            return false;
        }
        if (ih.val() != parseInt(ih.val()) || parseInt(ih.val()) < 0) {
            alert('图片显示宽度必须是一个非负整数!');
            ih.focus();
            return false;
        }
        t = JSer("#cut");
        if (t.val() != parseInt(t.val()) || parseInt(t.val()) < 0) {
            alert("字符串截取必须是一个非负整数！");
            t.focus().select();
            return false;
        }
        form2obj();
        JSer.url(this.action).sel(":input").ajax(function (d) {
            if (d.indexOf("success") != -1) JSer.url().set('JD_Status', 'successUpdate').go(0);
            else alert(d);
        });
        return false;
    });
});