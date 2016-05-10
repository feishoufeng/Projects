/**
 * JDiy (v1.x)  -  javaWeb framework Page Events
 *
 * @author         : 子秋(ziquee)
 * @QQ             : 39886616
 * @copyright      : http://www.jdiy.org
 *
 **/
var oldTbName="";
function showPop(){
    JSer("#pop").modalDialog({
        dragClass:"#popTitle",
        closeClass:".popClose",
        opacity:95,
        dragOpacity: 60
    });
}
function showErr(msg){
    if(msg)JSer("#errMsg").html(msg);
    else JSer("#errMsg").empty();
}
JSer.exec(function() {
    JSer("#btnAddTreeTb").click(function(){
        oldTbName="";
        JSer("#popTitle").html(":::新建树形节点表:::");
        JSer("#tb, #tit").val("");
        JSer("#flag").val(0);
        JSer("#id").val("");
        showPop();
    });
    JSer("#btnAddTb").click(function(){
        oldTbName="";
        JSer("#popTitle").html("附加数据库中现有的普通表");
        JSer("#tb, #tit").val("");
        JSer("#flag").val(1);
        JSer("#id").val("");
        showPop();
    });
    JSer("a@editTb").click(function(){
        var data = (JSer(this).attr("editTb") ||"").split(",");
        if(data.length==4){
            oldTbName=data[2];
            JSer("#popTitle", ":::修改表信息:::");
            JSer("#id").val(data[0]);
            JSer("#flag").val(data[1]);
            JSer("#tb").val(data[2]);
            JSer("#tit").val(data[3].replace(/_douhao_/g,","));
            showPop();
        }
    });


    JSer("#zltForm").submit(function() {
        showErr(false);
        var tbo = JSer("#tb");
        if(tbo.val()==''){
            showErr("请输入数据表名.");
            tbo.focus();
            return false;
        }
        if(/[^a-zA-Z0-9_]/.test(tbo.val())){
            showErr('对不起,表名只能是由字母（a-z,A-Z）、数字（0-9）或下划线（_）组成.');
            tbo.focus().select();
            return false;
        }
        var fl = tbo.val().charAt(0);
        if(fl == parseInt(fl) || tbo.val().toLowerCase().indexOf('jdiy_') == 0){
            showErr('对不起,表名不能以数字或“jdiy_”开头.');  //todo 除系统表外，其它表当取消jdiy_开头限制
            tbo.focus().select();
            return false;
        }

        if(JSer("#listTables").val().indexOf(","+tbo+",")!=-1 && JSer("#id").val()==""){
            showErr("对不起，数据表“"+tbo.val()+"”已经在列表中出现，不能重复添加.");
            return false;
        }

        if(JSer("#id").val()!=""){
            var v1 =tbo.val();
            var v2 = oldTbName==''?v1:oldTbName;
            if(v1!=v2 && !confirm("警告：您已将表名由"+v2+"修改为"+v1+
                "，这将导致系统中所有对该表的引用出错。\r\n请确认该表还没有被系统使用，并且可以安全改名。\r\n\r\n" +
                "仍要继续修改，请点击确定，否则请点击取消（取消时系统将为您恢复表名为"+v2+"）！")){
                tbo.val(v2);
                return false;
            }
        }

        JSer("#btnDiv").hide();
        showErr("请稍等，正在处理...");
        JSer.url("~.jd?~=tbSave@Ajax").sel("#flag, #tb, #tit, #id").ajax({
            success:function(d){
                if(d.indexOf("notexists")!=-1){
                    showErr("物理数据库中不存在表"+tbo.val()+"，无法附加。");
                }else if(d.indexOf("existsNew")!=-1){
                    showErr("数据库中已经存在名为"+tbo.val()+"的表，因此当前表不能再被改名为"+tbo.val()+", 操作失败！");
                }else if(d.indexOf("existsOld")!=-1){
                    showErr("表"+tbo.val()+"已经注册，无需重复注册.");
                }else if(d.indexOf("exists")!=-1){
                    showErr("数据库中已经存在名为"+tbo.val()+"的表，无法再创建。");
                }else if(d.indexOf("success")!=-1){
                    JSer("#popClose").get(0).click();
                    JSer.url().set("JD_Status","successUpdate").go(0);
                }else{
                    showErr(d);
                }
                JSer("#btnDiv").show();
            },
            error:function(xhr,e){
                alert(xhr+","+e);
            }
        });
        return false;
    });
});

