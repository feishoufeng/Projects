/**
 * JDiy (v1.x)  -  javaWeb framework Page Events
 *
 * @author         : 子秋(ziquee)
 * @QQ             : 39886616
 * @copyright      : http://www.jdiy.org
 *
 **/

JSer.exec(function () {
    JSer("table[@name=mm]").click(function () {
        var n = this.id.substring(1);
        var isHide = JSer("#s" + n).css("display") == 'none';
        if (isHide) {
            JSer("#s" + n).show("fast");
        } else {
            JSer("#s" + n).hide("fast");
        }
        this.className = isHide ? 'menuA1' : 'menuA0';
    });
    JSer("div[@name=mson]").mouseover(function () {
            if (this.className == 'lnk2')return;
            this.className = 'lnk1';
        }
    ).mouseout(function () {
            if (this.className == 'lnk2')return;
            this.className = 'lnk0';
        }
    ).click(function () {
            JSer(".lnk2").each(function () {
                this.className = 'lnk0';
            });
            this.className = 'lnk2';
            var sUrl = JSer(this).attr("href");
            if (sUrl == null || sUrl == '')return;
            var url = JSer.url(sUrl);
            parent.JD_loading(true);
            if (sUrl.indexOf("~.jd?~=list@Output") == 0) {
                var mmId = url.get("mmId"), so;
                if ((so=parent) && (so=so.$jdiycache) && (so=so.sort["sort_" + mmId]))  url.set(so);
            }
            url.go("JD_Main");
            return false;
        });
});