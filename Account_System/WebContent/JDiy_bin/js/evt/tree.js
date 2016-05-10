/**
 * JDiy (v1.x)  -  javaWeb framework Page Events
 *
 * @author         : 子秋(ziquee)
 * @QQ             : 39886616
 * @copyright      : http://www.jdiy.org
 *
 **/


JSer.exec(function() {
    var trItems = JSer("tr[@class=treeItem]");
    trItems.mouseover(
            function() {
                if (this.className != 'CSel') this.className = 'COver';
            }).mouseout(
            function() {
                if (this.className != 'CSel') this.className = 'C';
            }).dblclick(function() {
        var url = JSer(this).attr("href");
        if (url == null) return;
        JSer.url(url).go();
    });
    JSer("select[@id=tb]").change(function() {
        JSer.url().set("tb", this.value).del("sortTid").go();
    });
    JSer("tr[@name=d2t]").click(function() {
        var id = this.id.substring(1);
        var oDiv = JSer("#son_" + id);
        var oImg = JSer("#img_" + id)[0];
        if (oDiv.css("display") == "none") {
            oDiv.show();
            oImg.src = oImg.src.replace(/tree_c/, "tree_o");
        } else {
            oDiv.hide();
            oImg.src = oImg.src.replace(/tree_o/, "tree_c");
        }
    });
    JSer("#deploy").click(function() {
        JSer(".tson").each(function() {
            if (JSer(this).css("display") != 'none' ^ JSer("#deploy").attr("value") == '全部展开') {
                var id = this.id.substring(4);
                JSer("#i" + id).click();
            }
        });
        this.value = this.value == '全部收缩' ? '全部展开' : '全部收缩';
    });
    JSer("#deploy").click();
    JSer("#btnCancel").click(function() {
        JSer.url().del("sortTid", "JD_Status").go();
    });
    JSer("#btnCancel2").click(function() {
        JSer("#btnCancel").click();
    });
    JSer("#btnOk").click(function() {
        if (!confirm("您真的要更新当前的排序吗？"))return;
        var o = this.form.ttt;
        var sa = [];
        for (var i = 0; i < o.options.length; i++) {
            sa.push(o.options[i].value);
        }
        if (sa.length > 0) {
            this.form.sortIds.value = sa.join(",");
            try {
                parent.JD_loading(true);
            } catch(e) {
            }
            this.form.submit();
        } else {
            alert('无排序项目。');
        }
    });

    JSer("#btnUp").click(function() {
        JSer("#ttt").selectUp();
    });
    JSer("#btnDown").click(function() {
        JSer("#ttt").selectDown();
    });
    JSer("a[@id=delete]").click(function() {
        var sss = this.innerHTML.substring(2);
        var cStr;
        var dall;
        if (JSer("#ldAbortMsg").val() == "") {
            cStr = "警告:\r\n此操作将删除此" + sss + "以及其下的所有的子" + sss + "和相关信息。\r\n您确定要执行此删除操作吗？此操作无法撤消！";
            dall = 1;
        } else {
            cStr = "此操作无法撤消！您确定要执行此删除操作吗？";
            dall = 0;
        }
        if (confirm(cStr)) {
            JSer.url("~.jd?~=del@Ajax").set({
                __JDiy_Table__:JSer(this).attr("datatable"),
                __JDiy_Id__:JSer(this).attr("dataid"),
                __JDiy_Sign__:JSer(this).attr("datasigner"),
                __JDiy_Jump__:document.location.href,
                DelAll:dall
            }).ajax({
                        success:function(d) {
                            if (d.indexOf("success") != -1) {
                                JSer.url().set("JD_Status", "successDelete").go();
                            } else if (d.indexOf("hasSon") != -1) {
                                alert(JSer("#ldAbortMsg").val());
                            } else {
                                alert(d);
                            }
                        }
                    });

        }
        return false;
    });
});
function doSort(tid) {
    JSer.url().set("sortTid", tid).go();
}