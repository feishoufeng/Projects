(function() {
    /**
     * JSer.autoComplete plugin.
     *
     * @Depend   : JSer.js
     * @author   : 子秋(ziquee)
     * @qq       : 39886616
     * @copyright: http://www.jdiy.org
     *
     * to use it like this:
     *
     * JSer("#inputId").autoComplete({
     *     dataSource:<source>,  // The source is a string array or a callback function.
     *                           // example 1: dataSource: ['a1','a2','a3', 'b1','b2','b3', ... ]
     *                           // example 2: dataSource: function(){ return strArr;}
     *                           // example 3: dataSource: function(){ return JSer.url('query.do?key='+this.value);}
     *                           // Tips: You can use 'this' to access the current input-box in the function;
     *                           //       If function return a 'JSer.url' object, the program will conduct the
     *                           //       AJAX request call and returns the JSON results as the data source.
     *
     *     width: <int>,         // The width of the pop-box. default value is 0(Same as the width of the input-box)
     *     height: <int>,        // int value: The max height of the pop-box. default value is 200.
     *     opacity: <int 0-100>, // The opacity value of the pop-box. default value is 95.
     *     showCss:<css>,        // the default css style of the select-item.
     *                           // example 1: showCss: "color:blue"
     *                           // example 2: showCss: {color:"blue","border-bottom","1px dotted #eee"}
     *     overCss:<css>,        // the css style when the select-item is selected.
     *     onChange:function(){} // the callback function when the input-box value is changed.
     *
     * });
     **/

    JSer.extend({
        autoComplete: function(args) {
            return this.each(function(){
                var jso = JSer(this); if(jso.data("autoCompleting"))return; jso.data("autoCompleting",true);

                function fill(d){
                    if(!d || !d.length || ! d instanceof Array){div.hide();return;}
                    div.empty();items=[];
                    for(var i=0;i< d.length;i++)
                        items.push(JSer("<div/>").html(d[i]).css({padding:'1px 8px',lineHeight:18}).appendTo(div)
                            .data("autoCompleteIndex",i).click(function(){v(JSer(this).html());}).mouseover(function(){
                                bIndex=aIndex; aIndex = JSer(this).data("autoCompleteIndex");s();
                            }).mouseout(function(){ bIndex=aIndex;aIndex=-1;s(); }));
                    var xy = jso.xy(),pyx= 0, pyy=0; aIndex=bIndex=-1; if(JSer.browser.firefox){pyx=2;pyy=5;}
                    div.css({left:xy.x+pyx, top:xy.y+jso.height()+pyy,overflowY:'',height:'auto'}).show();
                    JSer(document.documentElement).once('click',function(){ div.hide();  lastVal=null;});
                    if(div.height()>args.height) div.css({overflowY:'scroll'}).height(args.height);
                }

                function v(v){
                    lastVal=null; jso.val(v);div.hide(); if(args.onChange) try{args.onChange.call(jso[0]);}catch(e){}
                }

                function s(){
                    if(bIndex!=-1) items[bIndex].css(args.showCss?args.showCss:{backgroundColor:'#fff'});
                    if(aIndex!=-1){
                        items[aIndex].css(args.overCss?args.overCss:{backgroundColor:'#ddd'});
                        var offset= 0, de = div[0],dl=items[aIndex][0];
                        for (var i = 0; i <= aIndex; i++) offset += dl.offsetHeight;
                        if (offset - de.clientHeight > de.scrollTop) de.scrollTop = offset - de.clientHeight;
                        else if (offset <= de.scrollTop) de.scrollTop = offset - dl.offsetHeight;
                    }
                }

                var defconf = {dataSource: null,width:0,height:200,opacity:95,showCss:null,overCss:null,
                    onChange:null}, items=[], lastVal, aIndex, bIndex;

                if ('OBJECT'.eq(typeof args)) { for (var i in defconf) if (undefined == args[i]) args[i] = defconf[i];
                }else args=defconf;

                var div =JSer("<div></div>").afterTo(this).css({zIndex:40,display: 'none',position:'absolute',
                    border:'1px #666 solid',backgroundColor:'white',overflowX:'hidden'
                }).opacity(args.opacity).width(args.width?args.width:jso.width()-1);

                jso.keyup(function(e){
                    if(lastVal==this.value || e.keyCode==13) return;//not change value || Enter
                    lastVal = this.value; if(args.onChange) try{args.onChange.call(jso[0]);}catch(e){}
                    var data = args.dataSource,rtn;
                    if(data instanceof Array){
                        var sa=[],i;fill();
                        for(i=0;i<data.length;i++) if(String(data[i]).indexOf(this.value)==0) sa.push(data[i]);fill(sa);
                    }else if('FUNCTION'.eq(typeof data)){
                        fill();if((rtn = data.call(this)) instanceof Array) fill(rtn);
                        else try{
                           rtn.ajax({type:'json',success:function(d){fill(d);}});
                        }catch(e){
                            throw "JSer.autoComplete:'dataSource' need to return a string array or JSer.url object.";
                        }
                    }
                }).keydown(function(e){
                    if(!items.length) return; var k = e.keyCode;
                    if(k==38){  //↑
                        bIndex = aIndex;aIndex = --aIndex <0 ? items.length-1 : aIndex;s();
                    }else if (k == 40) {//↓
                        bIndex = aIndex;aIndex = ++aIndex >= items.length-1 ? 0 : aIndex;s();
                    }else if(k==13){ //enter
                        if(aIndex!=-1){v(items[aIndex].html());return false;/*cancle event bubble.*/ }
                    }
                });
            });
        }
    });
})();