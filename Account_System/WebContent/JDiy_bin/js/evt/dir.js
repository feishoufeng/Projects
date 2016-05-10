/**
 * JDiy (v1.x)  -  javaWeb framework Page Events
 *
 * @author         : 子秋(ziquee)
 * @QQ             : 39886616
 * @copyright      : http://www.jdiy.org
 *
 **/
JSer.exec(function() {
    JSer('#tit2').html(JSer('#tit1').html());
    JSer('#btnSortShow').click(function() {
        JSer('#divDef').hide();
        JSer('#divSort').show();
    });
    JSer('#btnCancel').click(function() {
        JSer('#divSort').hide();
        JSer('#divDef').show();
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
            this.form.action = JSer.url().del('JD_Status').toString();
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
});
function doSort(tid) {
    JSer.url().set("sortTid", tid).go();
}