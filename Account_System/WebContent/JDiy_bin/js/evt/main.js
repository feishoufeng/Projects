/**
 * JDiy (v1.x)  -  javaWeb framework Page Events
 *
 * @author         : 子秋(ziquee)
 * @QQ             : 39886616
 * @copyright      : http://www.jdiy.org
 *
 **/
var $jdiycache = {};
$jdiycache.ids = "";
$jdiycache.sort = {};
$jdiycache.reloadMain = false;
var absNav = 0;
var navLeft = 0;
var docWidth = 0;
var navTimer = null;
function JD_loading(isShow) {
    if (isShow) {
        JSer('#JD_Tip').width(270).height(105);
        showTip("JD_Tip");
    } else {
        JSer('#JD_Tip').hide();
    }
}
function JD_Dialog(pmObj) {
    var href = pmObj.href;
    var html = pmObj.html;
    var by = String(pmObj.by).toLowerCase();
    var tit = pmObj.tit;
    var ww = pmObj.width;
    var hh = pmObj.height;
    JSer("#jcmTitle").html(tit);
    JSer("#jcmMain").width(ww).height(hh + 28);
    var s;
    if (by == "html") {
        s = html;
    } else {
        s = "<div id=\"dialogLoading\" style=\"text-align:center\"><img src=\"../JDiy_bin/img/load.gif\" width=\"36\"" +
                " height=\"32\" align=\"absmiddle\">&nbsp;&nbsp;&nbsp;&nbsp;数据载入中，请稍等...</div>" +
                "<iframe id=\"dialogFrame\" src='" + href + "' width=" + ww + " height=" + hh +
                " frameborder=0 style='display:none;border-left:5px white solid;border-right:3px white solid;' scrolling=no></iframe>";
        setTimeout(function() {
            try {
                JSer("#dialogLoading").hide();
                JSer("#dialogFrame").show();
            } catch(e) {
            }
        }, 60 * 1000);
    }
    JSer("#jcmBody").html(s);
    JSer("#jcmMain").modalDialog({
        dragClass:"#jcmDragBar",
        closeClass:"#jcmClose"
    });
}
function showTip(objId) {
    var o = JSer('#' + objId);
    var w = h = t = l = 0;
    if (navigator.userAgent.indexOf("Netscape") != -1) {
        w = document.body.offsetWidth;
        h = document.body.offsetHeight;
        t = document.body.scrollTop;
        l = document.body.Left;
    } else {
        w = document.documentElement.offsetWidth;
        h = document.documentElement.offsetHeight;
        t = document.documentElement.scrollTop;
        l = document.body.scrollLeft;
    }
    var x = l + (w - parseInt(o.width())) / 2;
    var y = t + (h - parseInt(o.height())) / 2;
    o.css("left", x + 'px');
    o.css("top", y + 'px');
    o.show();
}
function addEvent() {
    JSer("table[@id=tNav]").click(function() {
        JSer("table[@id=tNav]").each(function() {
            this.className = 'tNav0';
        });
        absNav = JSer(this).attr("prefix");
        this.className = 'tNav1';
        JSer.url(JSer(this).attr("href")).go('JD_Menu');
    });
}
function loadChn() {
    JSer("#zltDiv").html("　　　请稍等,载入中......");
    JSer.url('~.jd?~=getChn@Ajax').ajax(function(d) {
            JSer("#zltDiv").html(d);
            addEvent();
            if (absNav)JSer("table[@prefix=" + absNav + "]").click(); else JSer("#tNav").click();
    });
}
var week = ["日","一","二","三","四","五","六"];
var timesetp = 0;
function showClock() {
    var dt = new Date(new Date().getTime() + timesetp + 1000);
    var Y = dt.getFullYear();
    var M = dt.getMonth() + 1;
    var D = dt.getDate();
    var h = dt.getHours();
    var m = dt.getMinutes();
    var s = dt.getSeconds();
    var rtn = "" + Y + "年" + M + "月" + (D < 0 ? "0" + String(D) : D) + "日 周" + week[dt.getDay()] + "　";
    rtn += h < 10 ? "0" + String(h) : h;
    rtn += ":";
    rtn += m < 10 ? "0" + String(m) : m;
    rtn += ":";
    rtn += s < 10 ? "0" + String(s) : s;
    JSer("#divTime").html('<nobr>'+rtn+'</nobr>');
}
JSer.exec(function() {
    loadChn();
    JSer("img[@name=frm]").click(
            function() {
                fx = this.id.charAt(0);
                var frm = JSer('#JD_' + fx);
                var mm = JSer("#JD_Main");
                if (frm.css("display") == 'none') {
                    frm.show();
                    this.src = this.src.replace(/0\.gif/, '1.gif');
                    this.alt = this.alt.replace(/显示/ig, '隐藏');
                    if(JSer.browser.msie) mm.width(mm.width()-160);
                } else {
                    frm.hide();
                    this.src = this.src.replace(/1\.gif/, '0.gif');
                    this.alt = this.alt.replace(/隐藏/ig, '显示');
                    if(JSer.browser.msie) mm.width(mm.width()+160);
                }

            }).each(function(i) {
        JSer(this).css("cursor", "pointer");
        JSer(this).attr("alt", "点击这儿隐藏" + (i == 0 ? "顶" : "左") + "栏");
    });
    JSer("#nav_pointR").mouseover(
            function() {
                navTimer = setInterval("navRightMove()", 50);
            }).mouseout(function() {
        try {
            clearInterval(navTimer);
        } catch(e) {
        }
        navTimer = null;
    });
    JSer("#nav_pointL").mouseover(
            function() {
                navTimer = setInterval("navLeftMove()", 50);
            }).mouseout(function() {
        try {
            clearInterval(navTimer);
        } catch(e) {
        }
        navTimer = null;
    });

    JSer("#skinListDIV").html(getSkinList());
    JSer(".skinBox").click(function() {
        var obj = this;
        var skin = JSer(this).attr("skin");
        JD_loading(true);
        JSer.url("~.jd?~=setSkin@Ajax").set('skin',skin).ajax(function() {
            var css0 = '../JDiy_bin/skins/' + skin + '/css_top.css';
            var css1 = '../JDiy_bin/skins/' + skin + '/css_right.css';
            var css2 = '../JDiy_bin/skins/' + skin + '/css_left.css';
            var newSS;
            try {
                if (document.createStyleSheet) {
                    document.createStyleSheet(css0);
                } else {
                    newSS = document.createElement('link');
                    newSS.rel = 'stylesheet';
                    newSS.type = 'text/css';
                    newSS.href = css0;
                    document.getElementsByTagName("head")[0].appendChild(newSS);
                }
            } catch(e) {
                window.document.location.reload();
            }
            var main = window.frames["JD_Main"];
            try {
                if (document.createStyleSheet) {
                    main.document.createStyleSheet(css1);
                } else {
                    newSS = main.document.createElement('link');
                    newSS.rel = 'stylesheet';
                    newSS.type = 'text/css';
                    newSS.href = css1;
                    var o =main.document.getElementsByTagName("head");
                    if(o.length) o[0].appendChild(newSS);
                }
            } catch(e) {
                try{main.document.location.reload();}catch(e){}
            }
            var left = window.frames["JD_Menu"];
            try {
                if (document.createStyleSheet) {
                    left.document.createStyleSheet(css2);
                } else {
                    newSS = left.document.createElement('link');
                    newSS.rel = 'stylesheet';
                    newSS.type = 'text/css';
                    newSS.href = css2;
                    left.document.getElementsByTagName("head")[0].appendChild(newSS);
                }
            } catch(e) {
                try{left.document.location.reload();}catch(e){}
            }
            try {
                window.frames["JD_Tip"].document.location.reload();
            } catch(e) {
            }

            JSer(".skinBox").each(function() {
                JSer(this).css("border", "1px gray solid");
            });
            JSer(obj).css("border", "1px red solid");
        });
    });
    JSer("#skin_"+absSkin).click();

    var sa = now.split("/");
    var dtS = new Date(parseInt(sa[0]), parseInt(sa[1]) - 1, parseInt(sa[2]), parseInt(sa[3]), parseInt(sa[4]), parseInt(sa[5]));
    var dtL = new Date();
    timesetp = dtS.getTime() - dtL.getTime();
    setInterval("navInit();showClock()", 500);
});
function logout() {
    JD_loading(false);
    if (confirm("您真地要退出本系统吗？"))JSer.url("~.jd?~=ceoLogout@Ajax").ajax(function() {
        document.location.href = "./?s=logout";
    });
}
function getDocWidth() {
    return JSer.browser.msie ? document.body.clientWidth : document.documentElement.clientWidth;
}
function navInit() {
    var docW = getDocWidth();
    if (docW == docWidth)return;
    try {
        var objW = JSer("#tNavBar")[0].clientWidth;
        if (docW < objW + 70) {
            if (docW > docWidth && navLeft < 0) {
                navLeft += docW - docWidth;
            }
            JSer("#zltDiv").css("width", (docW - 70) + "px");
        } else {
            JSer("#zltDiv").css("width", "auto");
            if (navLeft < 0)navLeft = 0;
        }
        JSer("#tNavBar").css("margin-left", navLeft + "px");
        if (JSer.browser.msie) {
            JSer("#titAll, #btAll").css("width", docW + "px");
            JSer("#JD_Main").css("width", (docW - 175) + "px");
        }
        navStatus();
        docWidth = docW;
    } catch(Ex) {
    }
}
function navStatus() {
    if (navLeft >= 0) {
        JSer("#nav_pointL").hide();
    } else {
        JSer("#nav_pointL").show();
    }
    var docW = getDocWidth();
    var objW = JSer("#tNavBar")[0].clientWidth;
    if (Math.abs(navLeft) + docW - 50 > objW) {
        JSer("#nav_pointR").hide();
    } else {
        JSer("#nav_pointR").show();
    }
}
function navLeftMove() {
    if (navLeft == 0)return;
    if (navLeft < 0) navLeft += 10;
    if (navLeft > 0) navLeft = 0;
    JSer("#tNavBar").css("margin-left", navLeft + "px");
    navStatus();
}
function navRightMove() {
    var docW = getDocWidth();
    var objW = JSer("#tNavBar")[0].clientWidth;
    if (navLeft + objW + 70 > docW) {
        navLeft -= 10;
        if (navLeft + objW + 70 < docW) {
            JSer("#nav_pointR").hide();
        }
        JSer("#tNavBar").css("margin-left", navLeft + "px");
    } else {
        JSer("#nav_pointR").hide();
    }
    navStatus();
}

function getSkinList(){
    try{
        if(skinList && skinList.length>1){
            var sa = [];
            sa.push('<table border="0" cellspacing="3"><tr><td nowrap="nowrap">换肤：</td>');
            sa.push('<td><table cellpadding=1 cellspacing=0 border=0><tr>');
            for(var i=0;i<skinList.length;i++){
                sa.push('<td><table class="skinBox" id="skin_'+skinList[i].dir+'"');
                //if abs
                sa.push(' cellpadding="0" cellspacing="0" title="'+skinList[i].name+'" skin="'+skinList[i].dir+'">');
                sa.push('<tr><td style="background-color:'+skinList[i].color+';line-height:9px;padding:0px">');
                sa.push('&nbsp;</td></tr></table></td>');
            }
            sa.push('</tr></table></td></tr></table>');
            return sa.join('');
        }else{
            return '';
        }
    }catch(e){}
}