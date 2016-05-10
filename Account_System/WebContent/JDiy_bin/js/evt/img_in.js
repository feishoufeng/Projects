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
    JSer.each(['imgW', 'imgH', 'addFilter','inObj', 'img0','cut', 'rownum', 'pagesize', 'dbl'], function () {
        fd.set(String(this), JSer('#' + this).val());
    });
    var v = fd.get('dbl');
    if (v == "url" || v == "pop") fd.set("url", JSer("#url").val());
    if (v == "pop") JSer.each(['urlW', 'urlH'], function () {
        fd.set(String(this), JSer('#' + this).val());
    });
    v = [];
    v.push(JSer("#fd0").val());
    if (JSer("#fd1").val() != '') v.push(JSer("#fd1").val());
    if (JSer("#fd2").val() != '') v.push(JSer("#fd2").val());
    fd.set("outFields", v.join(","));

    v = [];
    JSer("#keyTarget option").each(function () {
        v.push(this.value);
    });
    fd.set("keyFields", v.join(","));
    var t = [];
    JSer("input[name=bat]:checked").each(function () {
        t.push(JSer(this).val());
    });
    fd.set("bat", t.join(","));
    OBJECT.set(fd.toString());
    JSer("#prm").val(OBJECT.toString());
}
function obj2form() {
    var fd = OBJECT.get("prm"), i;
    var t = JSer("#inObj")[0];
    for (i = 0; i < t.options.length; i++)if (t.options[i].value == fd.get("inObj")) {
        t.selectedIndex = i;
        break;
    }
    t = JSer("#dbl")[0];
    for (i = 0; i < t.options.length; i++)if (t.options[i].value == fd.get("dbl")) {
        t.selectedIndex = i;
        break;
    }
    JSer("#dbl").change();
    JSer.url("~.jd?~=ctrlPrm@Conf&id=" + fd.get("inObj")).ajax(function (data) {
        setOptionFields(data);
    });
    JSer.each(['imgW','imgH','addFilter','cut', 'rownum','pagesize','url','urlW','urlH'],function(){
        JSer('#'+this).val(fd.get(this));
    });
    JSer('#batDel').attr('checked', fd.get("bat").indexOf("-Delete-") != -1);
}


function pi(fd, name) {
    if (JSer("#outType").val() == "input1" && fd == 'tid')return;
    var piArr = OBJECT.get('prm') == null ? [] : OBJECT.get('prm').get('bat').split(',');
    JSer("#piDIV").append('<span id="pi__' + fd
        + '"><label><input type="checkbox" class="inChk" name="bat" value="' + fd + '"'
        + (piArr.indexOf(fd) != -1 ? ' checked' : '') + ' />批量改' + name + '</label></span>　');
}

function setOptionFields(data) {
    function addOpt(fdx, name) {
        var s = fdx + "=" + name;
        fd0.options[fd0.options.length] = new Option(s, fdx);
        if (outs[0] == fdx) fd0.selectedIndex = fd0.options.length - 1;

        fd1.options[fd1.options.length] = new Option(s, fdx);
        if (outs.length > 1 && outs[1] == fdx) fd1.selectedIndex = fd1.options.length - 1;

        fd2.options[fd2.options.length] = new Option(s, fdx);
        if (outs.length > 2 && outs[2] == fdx) fd2.selectedIndex = fd2.options.length - 1;

        if (keys.indexOf(fdx) == -1) ks.options[ks.options.length] = new Option(s, fdx);
        else kt.options[kt.options.length] = new Option(s, fdx);
    }

    function addOptImg(fdx, name) {
        var s = fdx + "=" + name;
        img0.options[img0.options.length] = new Option(s, s);
        if (s == fd.get("img0"))img0.selectedIndex = img0.options.length - 1;
    }

    JSer("#piDIV").empty();

    var fd = OBJECT.get("prm") || new UserField();
    var fd0 = JSer("#fd0")[0], fd1 = JSer("#fd1")[0], fd2 = JSer("#fd2")[0];
    var ks = JSer("#keySource")[0], kt = JSer("#keyTarget")[0], img0 = JSer("#img0")[0];
    var outs = (fd.get("outFields") || '').split(","), keys = (fd.get("keyFields") || '').split(",");
    var odata = new UserFieldset(data), i, fdx, nm;
    fd0.options.length = fd1.options.length = fd2.options.length = img0.options.length = 1;
    ks.options.length = kt.options.length = 0;
    if (JSer("#tb").val() == '0') {
        if (odata.has("sort")) {
            if (odata.get("sort").get("name") != "") {
                addOpt("sort", n = odata.get("sort").get("name"));
                pi('-Sort-', n);
            } else {
                addOpt("sort", "排序索引");
                pi('-Sort-', '排序');
            }
        }
        if (odata.has("tid")) {
            if (odata.get("tid").get("name") != "") {
                var n;
                addOpt("tid", n = odata.get("tid").get("name"));
                pi("tid", n);
            } else {
                addOpt("tid", "上级栏目");
                pi("tid", "上级栏目");
            }
        }
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
        for (i = 0; i < odata.length(); i++) {
            fdx = odata.get(i).get("field");
            nm = odata.get(i).get("name");
            if (!fdx.or("tid", "sort", "dt1", "dt2") && odata.get(i).get("txf") == 't') {
                addOpt(fdx, nm);
                if ((odata.get(i).get('type') || '').or('select', 'radio')) pi(fdx, nm);
            } else if (odata.get(i).get("type") == 'file') {
                addOptImg(fdx, nm);
            }
        }
    } else {
        for (i = 0; i < odata.length(); i++) {
            fdx = odata.get(i).get("field");
            nm = odata.get(i).get("name");
            if (odata.get(i).get("type") == 'file') {
                addOptImg(fdx, nm);
                if ((odata.get(i).get('type') || '').or('select', 'radio')) pi(fdx, nm);
            } else if (odata.get(i).get("txf") == 't') {
                addOpt(fdx, nm);
            }
        }
    }
    if(img0.options.length==2) img0.selectedIndex=1;
}
function dblEvent(val) {
    if (val == "edt" || val == "none") {
        JSer("#urlDiv").hide();
        JSer("#whDiv").hide();
    } else {
        JSer("#urlDiv").show();
        if (val == "pop")JSer("#whDiv").show(); else JSer("#whDiv").hide();
    }
}

JSer.exec(function () {
    JSer("#dbl").change(function () {
        dblEvent(this.value)
    });
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
                tit:JSer("#tit").val(),
                tit_old:JSer("#tit").attr("old"),
                fType:JSer("#fType").val()
            }).ajax({type:"SCRIPT", async:false});
        }
        if (!isNoRepeat) return false;
        if ((t = JSer("#imgW")).val() != parseInt(t.val()) || parseInt(t.val()) < 0) {
            alert('图片显示宽度必须是一个非负整数!');
            t.focus();
            return false;
        }
        if ((t = JSer("#imgH")).val() != parseInt(t.val()) || parseInt(t.val()) < 0) {
            alert('图片显示高度必须是一个非负整数!');
            t.focus();
            return false;
        }
        if ((t = JSer("#inObj")).val() == '') {
            alert('请选择添加修改视图!');
            t.focus();
            return false;
        }
        if ((t = JSer("#img0")).val() == '') {
            alert('请选择缩图字段!');
            t.focus();
            return false;
        }
        if ((t = JSer("#fd0")).val() == '') {
            alert('请选择文字显示字段1!');
            t.focus();
            return false;
        }
        if ((t = JSer("#rownum")).val() != parseInt(t.val()) || parseInt(t.val()) < 0) {
            alert('每行显示的图片数必须是一个大于０的整数!');
            t.focus();
            return false;
        }
        if ((t = JSer("#pagesize")).val() != parseInt(t.val()) || parseInt(t.val()) < 0) {
            alert('每页显示的图片数必须是一个大于０的整数!');
            t.focus();
            return false;
        }

        if (parseInt(JSer("#pagesize").val()) % parseInt(JSer("#rownum").val()) != 0) {
            alert('对不起,每页显示的图片数必须是每行显示的图片数的倍数！');
            t.focus();
            t.select();
            return false;
        }
        if ((t=JSer('#dbl').val()) == "pop" || t == "url") {
            if ((t = JSer("#url")).val() == '') {
                alert('页面地址不能为空!');
                t.focus();
                return false;
            }
            if (JSer("#dbl").val() == "pop") {
                if ((t = JSer("#urlW")).val() != parseInt(t.val()) || parseInt(t.val()) < 0) {
                    alert('弹出窗口宽必须是一个非负整数!');
                    t.focus();
                    return false;
                }
                if ((t = JSer("#urlH")).val() != parseInt(t.val()) || parseInt(t.val()) < 0) {
                    alert('弹出窗口高必须是一个非负整数!');
                    t.focus();
                    return false;
                }
            }
        }
        t=JSer("#cut");
        if (t.val() != parseInt(t.val()) || parseInt(t.val()) < 0) {
            alert("字符串截取必须是一个非负整数！");
            t.focus().select();
            return false;
        }
        form2obj();
        JSer.url(this.action).sel(":input").ajax(function(d){
            if(d.indexOf("success")!=-1) JSer.url().set('JD_Status','successUpdate').go(0);
            else alert(d);
        });
        return false;
    });
    JSer("#inObj").change(function () {
        if (this.selectedIndex == 0) {
            setOptionFields();
            return;
        }
        var ino = JSer(this[this.selectedIndex]);
        JSer.each(['tb','tbpk','dmpk'],function(){
            JSer('#'+this).val(ino.attr(this));
        });
        if (ino.attr('tb') == 0) {
            JSer("#systbBat").show();
        } else {
            JSer("#systbBat").hide();
        }
        JSer.url("~.jd?~=ctrlPrm@Conf&id=" + this.value).ajax({
            success:function (data) {
                setOptionFields(data);
            }
        });
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
    OBJECT = new UserFieldset(JSer("#prm").val());
    if (JSer("#prm").val() != "")obj2form();
});