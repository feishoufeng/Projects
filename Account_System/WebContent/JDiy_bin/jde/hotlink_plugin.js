/*
 * JDE编辑插件： 前台热区显示
 * 如果用户在后台WEB编辑器中定义了图片热区，前台文章显示页面要包含此脚本，来正确显示图片热区链接。
 * 此脚本默认使用map标签直接输出热区链接。
 * 当然您也可以自己新建一个JS文件，并把下面这段代码复制过去进行适当修改，最后在文章显示页嵌入您修改后的代码，以满足您的特殊显示方式的需要。
 *
 *  Powered by: 子秋(ziquee   qq:39886616)
 *  JDiy官网: http://www.jdiy.org
 */

JSer.exec(function () {

    //遍历body标签中所有带有hotlink属性的图片元素(即带有热区信息的图片对象)
    JSer('img@hotlink', 'body').each(function (imgIndex) {
        var areas=[];
        try {
            areas = eval('(' + decodeURIComponent(JSer(this).attr('hotlink')) + ')');
        } catch (e) {
            areas = [];
        }
        //上面代码获取热区配置信息,areas是一个数组，它的每一个元素就是一个热区配置对象，热区配置对象包含如下属性：
        //width:热区宽度
        //height:热区高度
        //left:热区距离图片左边的相对位置
        //top:热区距离图片顶边的相对位置
        //href: 热区链接地址
        //target: 热区链接打开的目标窗口方式(取值：_self, _blank, _parent, _top)
        //text: 热区文字显示(title)

        if (areas.length) {//如果当前图片存在热区

            //下面为该图片创建usemap(即热区定义。)
            JSer(this).attr('usemap', '#map' + imgIndex);
            var map = JSer('<map/>').afterTo(this).attr({
                name:'map' + imgIndex,
                id:'map' + imgIndex
            });
            //创建热区HTML标签
            JSer.each(areas, function () {
                JSer('<area />').appendTo(map)
                    .attr({
                        href:this.href,
                        target:this.target,
                        title:this.text,
                        coords:this.left + ',' + this.top + ',' + (this.left + this.width) + ',' + (this.top + this.height)
                    });
            });
        }

    });
});