//powered by: ziquee(qq:39886616  http://www.jdiy.org)

var __execFn=null;

function __getImageInfo() {
    return {
        width:JSer('#width').val(),
        height:JSer('#height').val(),
        src:JSer('#url').val(),
        hotlink:JSer('#hotlink').val()
    };
}

function __writeAttribute(d){
    $G('hotlink').value=d;
}



function showHotlink(){
    var hotlinkDiv=JSer('<div id="hotlinkDiv"/>').appendTo('body').css({
        zIndex:9999,
        width:635,
        height:376,
        position:'absolute',
        backgroundColor:'white',
        left:0,
        top:0
    });

    JSer('<input type="button" value="添加热区.."/>').appendTo(hotlinkDiv)
        .click(function(){
            __execFn='areaAdd';
        });

    JSer('<input type="button" value="删除热区"/>').appendTo(hotlinkDiv)
        .click(function(){
            __execFn='areaDel';
        });

    JSer('<input type="button" value="清除热区"/>').appendTo(hotlinkDiv)
        .click(function(){
            __execFn='areaDelAll';
        });

    JSer('<input type="button" value="返回"/>').appendTo(hotlinkDiv)
        .click(function(){
            JSer('#hotlinkDiv').remove();
        });

    var ifm = JSer('<iframe id="areaIframe"/>')
        .appendTo(hotlinkDiv).css({
        width:634,
            height:356
    }).attr('src','../hotlink/hotlink.html');
}