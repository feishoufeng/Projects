/**
 * JDiy (v1.x)  -  javaWeb framework Page Events
 *
 * @author         : 子秋(ziquee)
 * @QQ             : 39886616
 * @copyright      : http://www.jdiy.org
 *
 **/

JSer.exec(function() {
    function sys2cur() {
        var t_url = JSer("#url").val(), t_ctrl=JSer("#ctrlType").val().indexOf("input");
        var t_tid = JSer("#tid")[0];

        if (t_url == "" && t_tid.selectedIndex > 1) JSer("#ctrlDiv, #nodeDiv").show();
        else  JSer("#ctrlDiv,#nodeDiv").hide();

        if (t_url == "" && t_ctrl== -1 && t_tid.selectedIndex > 1)  JSer("#divSName").show();
        else JSer("#divSName").hide();

        if (t_url == "" && t_ctrl != -1 && t_tid.selectedIndex > 1) JSer("#inDiv").show();
        else  JSer("#inDiv").hide();

        if (t_tid.selectedIndex == 1) {
            JSer("#urlDiv").hide();
            JSer("#showDiv").show();
        } else {
            JSer("#urlDiv").show();
            JSer("#showDiv").hide();
        }
        if(JSer.browser.msie && JSer("#rid").val()!=""){
            JSer("#ridDiv select").val(JSer("#rid").val());
        }
    }

    for (var i = 0; i < $ctrl_type[0].length; i++) {
        var t = JSer("#ctrlType")[0].options[JSer("#ctrlType")[0].options.length] = new Option("　　" + $ctrl_type[1][i], $ctrl_type[0][i]);
        if (ctThis != null && $ctrl_type[0][i] == ctThis.type) t.selected=true;
    }

    JSer("#url").keyup(sys2cur);

    JSer("#ctrlType").change(function() {
        var c= JSer("#ctrl")[0], d=JSer("#inDiv"), e=JSer("#divSName");
        c.options.length = 1;
        for (var i = 0; i < ctObj.length; i++) {
            if (ctObj[i].type == this.value) {
                var t = c.options[c.options.length] = new Option("　　" + ctObj[i].tit, ctObj[i].id);
                JSer(t).attr("tb",ctObj[i].tb).css("color", ctObj[i].tb==0 ? 'black':'blue');
                if (ctThis != null && ctObj[i].id == ctThis.id) t.selected=true;
            }
        }
        JSer("#ctrl").change();

        if (this.value.indexOf("input") == -1)  d.hide();
        else d.show();

        if(this.value.or('list','tree','folder','image')) e.show();
        else e.hide();

    }).change();

    JSer("#ctrl").change(function(){
        var tbo = JSer("#tb")[0];
        var tb = JSer(this.options[this.selectedIndex]).attr("tb");
        if(!tb){
            tbo.options.length=0;
            tbo.options[0]=new Option("==请选择数据表==","");
            return;
        }
        if(tb=='0'){
            tbo.options.length=0;
            tbo.options[0]=new Option("==请选择数据表==","");
            for(var i=0;i<TBLIST.length;i++){
                var aval = JSer("#absTb").val();
                if(TBLIST[i].flag=='0'){
                    tbo.options[tbo.options.length]=new Option("『"+TBLIST[i].tb+"』 "+TBLIST[i].tit, TBLIST[i].tb);
                    JSer(tbo.options[tbo.options.length-1]).attr("flag", TBLIST[i].flag);
                    if(TBLIST[i].tb.eq('jdiy_sys'))
                        JSer(tbo.options[tbo.options.length-1]).css('background-color','#ddd')
                    if(TBLIST[i].tb==aval){
                        JSer(tbo.options[tbo.options.length-1]).attr("selected","selected");
                        JSer("#tb").change();
                    }
                }
            }
        }else{
            tbo.options.length=0;
            for(var i=0;i<TBLIST.length;i++){
                if(TBLIST[i].tb==tb){
                    tbo.options[0]=new Option("『"+TBLIST[i].tb+"』 "+TBLIST[i].tit, TBLIST[i].tb);
                    JSer(tbo.options[0]).css("color","blue");
                    JSer(tbo.options[tbo.options.length-1]).attr("flag", TBLIST[i].flag);
                }
            }
            if(tbo.options.length==0){
                tbo.options[0]=new Option("数据表"+tb+"不存在或被删除!", '');
                JSer(tbo.options[0]).css("color","red");
            }
        }
        JSer("#ridDiv").html("&nbsp;");
    }).change();

    JSer("input[@name=iType], input[@name=sType]").click(function() {
        JSer("#prm").val(this.value);
    });

    JSer("#tb").change(function() {
        if(this.selectedIndex>0 && JSer(this.options[this.selectedIndex]).attr('flag')=='0')
            JSer("#ridDiv").loadUrl("~.jd?~=tidOpt@Conf&tb=" + this.value + "&zlt=" +
                JSer(this).attr("zlt"), sys2cur);
        else JSer("#ridDiv").html("&nbsp;");
    }).change();

    JSer("#cid").change(function() {
        var t = JSer("#tid")[0];
        t.options.length = 2;
        for (var i = 0; i < mms.length; i++) {
            if (this.value == mms[i].cid && mms[i].id != thisId)
                t.options[t.options.length] = new Option("　　" + mms[i].tit, mms[i].id);
            if (mms[i].id == mmThis)t.selectedIndex = t.options.length - 1;
        }
        if (mmThis == 0)t.selectedIndex = 1;
    }).change();

    JSer("#tid").change(sys2cur).change();

    JSer("#zltForm").submit(function() {
        var t = JSer("#cid");
        if(t.val()==''){
            alert('请选择菜单存放的顶部位置!');
            t.focus();
            return false;
        }
        t = JSer("#tid");
        if(t.val()==''){
            alert('请选择菜单存放的位置!');
            t.focus();
            return false;
        }
        t = JSer("#tit");
        if(t.val()==''){
            alert('请输入菜单名称!');
            t.focus();
            return false;
        }
        t = JSer("#sort");
        if(t.val()!=parseInt(t.val()) || parseInt(t.val())<0){
            alert('排序索引必须是一个不小于０的整数!');
            t.focus();
            return false;
        }
        if(JSer("#url").val()==''){
            if(JSer("#tid")[0].selectedIndex>1){
                t = JSer("#ctrl");
                if(t.val()==''){
                    alert('请选择菜单绑定的视图!');
                    t.focus();
                    return false;
                }
                t = JSer("#tb");
                if(t.val()==''){
                    alert('请选择菜单要操作的数据表!');
                    t.focus();
                    return false;
                }
                try {
                    var t= JSer("#ctrl")[0];
                    if (JSer(t.options[t.selectedIndex]).attr('tb')==0
                        && JSer("#rid").val()==''){
                        alert("请选择菜单要操作的数据节点");
                        return false;
                    }
                } catch(e) {
                }

            }
            if (JSer("#divSName").css("display") != "none" && JSer("#sName").val()=='') {
                alert("请输入修改视图显示标题！");
                JSer("#sName").focus();
                return false;
            }
        }
        JSer.url(this.action).sel(":input").ajax(function(d){
            if(d.indexOf("success")!=-1) JSer.url().set('JD_Status','successUpdate').go(0);
            else alert(d);
        });
        return false;
    });
});