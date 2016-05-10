/**
 * JDiy (v1.x)  -  javaWeb framework Page Events
 *
 * @author         : 子秋(ziquee)
 * @QQ             : 39886616
 * @copyright      : http://www.jdiy.org
 *
 **/


JSer.exec(function() {
    JSer("select[@id=chnId]").change(function() {
        JSer.url("~.jd?~=ls_mm@Conf&cid=" + this.value).go("JD_Main");
    });
});