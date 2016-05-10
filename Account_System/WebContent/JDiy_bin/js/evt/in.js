/**
 * JDiy (v2.x)  -  javaWeb framework Page Events
 *
 * @author         : 子秋(ziquee)
 * @QQ             : 39886616
 * @copyright      : http://www.jdiy.org
 *
 **/


var progressPst = 0;
function showLoadingBar() {
    JSer.url('~.jd?~=progressBar@Ajax').ajax(
        function (d) {
            var da = d.split("|");
            if (da.length == 4) {
                JSer('#loadingBar').show();
                progressPst = parseInt(da[0]);
                JSer('#upPercent').html(progressPst + '%');
                if(progressPst==0) JSer('#upByteInfo').html('正在准备上传,请稍等…');
                else if (progressPst < 100)
                    JSer('#upByteInfo').html('总共:' + da[1] + '　已上传:' + da[2] + '　速率:' + da[3] + '/秒');
                else JSer('#upByteInfo').html('等待最后处理，即将完成…');
                JSer('#upProcessBar').css('width', 3 * progressPst + 'px');
            }
            if(progressPst<100) setTimeout(showLoadingBar, 20);
        }
    );
}

function blurNumber(o) {
    var j = JSer(o);
    if (j.val() == parseFloat(j.val())) {
        j.attr('od', j.val());
    } else {
        j.val(j.attr('od'));
    }
}

function addExpandFile(fd) {
    var n = JSer('.file_item', '#filediv_' + fd).length + (parseInt(JSer('#countfs_' + fd).html()) || 0);
    var l = parseInt(JSer('#' + fd + '_expandNum').val()) || Number.MAX_VALUE;

    if (n >= l) {
        alert('您最多只可以上传' + n + '个文件.');
        return;
    }
    var guid = new Date().getTime();
    JSer('#filediv_' + fd).append('<div class="file_item"><input name="' + fd + '@' + guid + '" class="file_' + fd + '" size="15" type="file"/> ' +
        '<input type="button" class="btn" value="x 删除" onclick="JSer(this).parent().remove();" /> </div>');
}

function linkageLoad(field, tb, rid, aid, rootSelectable, depth,readonly) {
    JSer("#" + field).val(aid);
    var listFilter = JSer("#linkageDIV_" + field).attr("listFilter");
    JSer.url("~.jd?~=linkageLoad@Ajax&_=" + Math.random()).set({
        tb: tb,
        rid: rid,
        aid: aid,
        listFilter: listFilter,
        rootSelectable: rootSelectable,
        field:field,
        depth: depth,
        readonly:readonly
    }).ajax({
            success: function (d) {
                JSer("#linkageDIV_" + field).html(d);
                if (JSer.browser.msie) {//垃圾IE动态载入的下拉菜单选不中
                    JSer(".linkagesel").each(function () {
                        var o = this.options;
                        for (var i = 0; i < o.length; i++) {
                            if (o[i].sub) {
                                this.selectedIndex = i;
                                break;
                            }
                        }
                    });
                }
            }
        });
}

function JDiyDeleteFile(fileName, fileSigner, fileDivName, fd) {
    if (confirm("警告:此操作不可撤消!\r\n您真地要删除此文件吗?")) {
        JSer.url("~.jd?~=delUpfile@Ajax").set({
            fp: fileName,
            __JDiy_Sign__: fileSigner
        }).ajax(function (data) {
                if (data.indexOf('success') != -1) {
                    if (document.getElementById(fileDivName) == null)document.location.reload();
                    else JSer('#' + fileDivName).hide();
                    if (fd) {
                        var countobj = JSer('#countfs_' + fd);
                        if (countobj.html() == parseInt(countobj.html())) {
                            var ca = parseInt(countobj.html()) - 1;
                            countobj.html(String(ca));
                            if (ca <= 0) JSer('#fsDIV_' + fd).hide();
                        }
                    }
                } else alert('删除失败! 原因:\r\n' + data);
            });
    }
}

function JDiyFormCheck(fm) {
    this.fm = fm;
    function Alt(obj, msg) {
        if (msg)alert("对不起, " + msg + "。");
        try {
            fm[obj].focus();
            fm[obj].select();
        } catch(e) {
        }
        return false;
    }

    function Num(obj, msg, min, max, isFloat) {
        var v = fm[obj].value;
        var n = isFloat ? parseFloat(v) : parseInt(v);
        return(v != n || (min != null && n < min) || (max != null && n >= max)) ? Alt(obj, msg) : true;
    }

    function getSplit(str, spStr, spExp) {
        var s1 = str.replace(new RegExp(spExp, "ig"), spStr).split(spStr);
        var s2 = [];
        for (var i = 0; i < s1.length; i++)if (s1[i] != null && s1[i] != "")s2.push(s1[i]);
        return s2.join(spStr);
    }

    this.isNull = function(obj, msg) {
        return(fm[obj].value == "" && !Alt(obj, msg));
    };
    this.isInt = function(obj, msg, min, max) {
        return Num(obj, msg, min, max, false);
    };
    this.isFloat = function(obj, msg, min, max) {
        return Num(obj, msg, min, max, true);
    };
    this.isLen = function(obj, msg, min, max) {
        min = min ? min : 0;
        max = max ? max : 0;
        var len = fm[obj].value.length;
        var isok = len >= min && (max == 0 ? true : len < max);
        if (isok)return true; else return Alt(obj, msg);
    };
    this.isChk = function(obj, msg) {
        try {
            for (var i = 0; i < fm[obj].length; i++)if (fm[obj][i].checked)return String(fm[obj][i].value);
            void Alt(obj, msg);
            fm[obj][0].focus();
        } catch(e) {
            alert(e);
        }
        return null;
    };
    this.isDate = function(obj, msg) {
        var d = fm[obj].value;
        var dArr = d.split("-");
        if (dArr.length != 3)return Alt(obj, msg);
        try {
            var yy = parseInt(dArr[0]);
            var mm = parseInt(dArr[1]) - 1;
            var dd = parseInt(dArr[2]);
            var dt = new Date(yy, mm, dd);
            if (yy == dt.getFullYear() && mm == dt.getMonth() && dd == dt.getDate())return true; else return Alt(obj, msg);
        } catch(e) {
            return Alt(obj, msg);
        }
    };
    this.isExt = function(obj, exts, msg) {
        try {
            if (this.isNull(obj))return true;
            exts = getSplit(exts, ",", "[\.。　 ;；|、｜]+").toLowerCase();
            var extsA = exts.split(",");
            var ext = fm[obj].value.toLowerCase().substring(fm[obj].value.lastIndexOf(".") + 1);
            var ok = false;
            for (var i = 0; i < extsA.length; i++) {
                if (extsA[i] == ext) {
                    ok = true;
                    break;
                }
            }
            if (ok)return true; else {
                return Alt(obj, msg);
            }
        } catch(e) {
            alert(e.description);
            return false;
        }
    };
    this.setDef = function(obj, value) {
        if (fm[obj].value == "")fm[obj].value = value;
        return this;
    };
    this.split = function(obj, spStr, spExp) {
        fm[obj].value = getSplit(fm[obj].value, spStr, spExp);
        return this;
    };
    this.isRepeat = function(obj) {
        var tmpId = fm.__JDiy_Id__.value;
        var by = obj.by;
        if (by == null || by == "" || by == "tid") {
            by = "tid";
        } else if (by.toLowerCase() != "rootid" && by.toLowerCase() != "all") {
            alert("客户端脚本异常：isRepeat方法参数对象的by属性的值只能是下列值之一：\r\ntid, rootId, all");
            return true;
        }
        var tid = obj.rootId && by != 'tid' ? obj.rootId : fm.tid.value;
        if (obj.root == null) {
            alert("参数对象未指定root应用程序根路径属性.");
            return true;
        }
        if (!fm.t0) {
            alert("客户端脚本异常：当前的表单中未找到t0字段！");
            return true;
        }
        var table = fm.__JDiy_Table__.value;
        isNoRepeat = true;
        JSer.url('~.jd?~=chkRepeat@Ajax').set({
            tb:table,
            tid:tid,
            t0:fm.t0.value,
            id:tmpId,
            by:by
        }).ajax({async:false,type:'script'});
        return !isNoRepeat;
    }
}