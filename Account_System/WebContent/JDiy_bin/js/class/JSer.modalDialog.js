(function() {
    /**
     * JSer.modalDialog plugin.
     * version: 3.0
     *
     * @Depend   : JSer.js
     * @author   : 子秋(ziquee)
     * @qq       : 39886616
     * @copyright: http://www.jdiy.org
     *
     * to use it like this:
     *
     * JSer("#modal").modalDialog({
     *     dragClass: "#jcmTitle",   // The area of the mouse click and drag. (JSer search string, default value: '#jcmTitle')
     *     closeClass: "#jcmClose",  // The area of the mouse click to close the dialog. (JSer string searcher, default value:'#jcmClose')
     *     opacity: 90,              // The opacity value of the dialog. (int range:0-100,  default value: 90)
     *     dragOpacity: 60,          // When the dialog box by dragging the opacity value. (int range: 0-100, default value: 60)
     *     maskOpacity: 48,          // The opacity value of the dialog mask. (int range:0-100, default value:48)
     *     maskColor:'black',        // The color of the dialog mask. (color value, default value:'black')
     *     left: value,              // The 'left' style of the modal dialog(with absolute position). if not set, default display on center of the visable area.
     *     top: value,               // The 'top' style of the modal dialog(with absolute position ). if not set, default display on middle of the visable area.
     *     modal: false,             // show as modal dialog: true | false. the default value is true.

     *     resize: false,       // (Since:2.0+) set the modal dialog resizable. (boolean: true | false ). default value is false.
     *     minWidth: 200,       // (Since:2.0+) Set the minimum width allowed by the modal window, when it resizable.
     *     maxWidth: 800,       // (Since:2.0+) Set the maximum width allowed by the modal window, when it resizable.
     *     minHeight: 100,      // (Since:2.0+) Set the minimum height allowed by the modal window, when it resizable.
     *     maxHeight: 600,      // (Since:2.0+) Set the maximum height allowed by the modal window, when it resizable.
     *
     *     animate: true,       // (Since:3.0+) Show fade in or fade out animate when the modal show/hide.
     *
     *     //Optional event listener functions: you can use built object 'this' to access DOM node of the dialog box,
     *                                You can pass a parameter to the function to access the Javascript Event Object.
     *     onDrag: function(event){},     // when the dialog box is start drag.
     *     onMove: function(event){},     // When the dialog box is moving.
     *     onRelease: function(event){},  // when the dialog box is stop drag.
     *     onClose: function(event){}     // when the dialog box is closed.
     * });
     *
     * */


    JSer.extend({
        modalDialog:function(args) {
            if (!this[0] || JSer(this[0]).data("modaling")) return;
            var defaultConfig = {
                dragClass:'#jcmTitle',
                closeClass:'#jcmClose',
                opacity:90,
                dragOpacity: 60,
                maskOpacity: 48,
                animate:true,
                maskColor:'black'
            };
            if ('OBJECT'.eq(typeof args)) {
                for (var ii in defaultConfig)
                    if (defaultConfig.hasOwnProperty(ii) && args[ii] == undefined) args[ii] = defaultConfig[ii];
            } else args = defaultConfig;

            function x(e) {
                return e.x ? e.clientX : e.pageX;
            }

            function y(e) {
                return e.y ? e.clientY : e.pageY
            }

            function c(e) {
                if(JSer.browser.chrome) JSer('body').unselect(false);
                if (e)arguments.callee.e = e;
                if (args.maskOpacity > 0 && args.animate) {
                    args.maskOpacity -= 10;
                    modal.opacity(args.maskOpacity);
                    setTimeout(arguments.callee, 50);
                } else if (os || !args.animate) {
                    mask.remove();
                    body.css(os.b);
                    if(navigator.userAgent.indexOf("MSIE 6")!=-1){
                        modal.hide();
                    }else{
                        modal.opacity(os.mo).css(os.m);
                    }
                    d.off('mousedown', r).css(os.t);
                    f.css(os.f);
                    os = null;
                    if (args.onClose) args.onClose.call(modal, arguments.callee.e);
                }
                modal.removeData('modaling');
                if(args.resize){
                    mb.remove();
                    mr.remove();
                    mbr.remove();
                    JSer('body').off('mousemove',mm).off('mouseup', mu);
                }
                return false;
            }

            function r(e) {
                function m(e) {
                    modal.css({left: r.jl + x(e) - r.il, top:  r.jt + y(e) - r.it});
                    if (args.onMove) args.onMove.call(modal, e);
                }

                function s(e) {
                    modal.opacity(args.opacity);
                    body.off('mousemove', m).off('mouseup', arguments.callee);
                    if (args.onRelease) args.onRelease.call(modal, e);
                }

                var r = {jl:parseInt(modal.css("left")),jt:parseInt(modal.css("top")),il:x(e),it:y(e)};
                body.on({mousemove:m,mouseup:s});
                modal.opacity(args.dragOpacity);
                if (args.onDrag) args.onDrag.call(modal, e);
            }

            var dde = document.documentElement,db = document.body, body = JSer('body'),bf = body.css('overflow');
            var modal = JSer(this[0]).data('modaling',1), mask = document.createElement("DIV"), maskId = "_J_M_" + new Date().getTime();
            mask.setAttribute("id", maskId);
            JSer(mask).css({
                position:'absolute',
                zIndex: 99998,
                left:0,
                top:0,
                width:screen.width + dde.scrollWidth,
                height:screen.height + dde.scrollHeight,
                backgroundColor:args.maskColor
            }).opacity(0);
            if(JSer.browser.chrome) JSer('body').unselect();

            if(args.modal!==false)body.append(mask);
            mask = JSer('#' + maskId);
            var a = 0, d = JSer(args.dragClass, modal), f = JSer(args.closeClass, modal).css('cursor', 'pointer'), os = {
                b:{overflow: bf,paddingRight:body.css("padding-right")},
                m:{
                    position: modal.css('position'),
                    zIndex:modal.css('z-index'),
                    left:modal.css('left'),
                    top:modal.css('top'),
                    display:modal.css('display')
                },
                t:{cursor:d.css('cursor')},
                f:{cursor:f.css('cursor')},
                mo:modal.opacity()
            };
            if(args.modal!==false) body.css('overflow', 'hidden').css("padding-right",15);
            d.on('mousedown', r).css('cursor', 'move').unselect();
            f.once('click', c);

            (function() {
                if (args.maskOpacity > a && args.animate){a += 10;mask.opacity(a);setTimeout(arguments.callee, 50);}
                else mask.opacity(args.maskOpacity);
            })();
            var ch = Math.min(dde.clientHeight, db.clientHeight),cw = Math.min(dde.clientWidth, db.clientWidth);
            ch = ch || Math.max(dde.clientHeight, db.clientHeight);
            cw = cw || Math.max(dde.clientWidth, db.clientWidth);
            var orgW = modal.width(),orgH=modal.height();
            modal.css({
                position:'absolute',zIndex:99999,
                left:args.left!==undefined ? args.left: Math.max(dde.scrollLeft, db.scrollLeft) + (Math.abs(cw - orgW)) / 2,
                top:args.top!==undefined ? args.top : Math.max(dde.scrollTop, db.scrollTop) + (Math.abs(ch - orgH)) / 2
            }).opacity(args.opacity).show();


            var mb,mr,mbr,mm,mu;
            if(args.resize){
                mb  = JSer('<div style="position: absolute;height:8px;left:0;cursor: n-resize"></div>')
                    .appendTo(modal).mousedown(function(e){JSer(this).data('__md',{y:y(e)});});  //**
                mr  = JSer('<div style="position: absolute;width:8px;top:0;cursor:w-resize"></div>')
                    .appendTo(modal).mousedown(function(e){JSer(this).data('__md',{x:x(e)});});
                mbr = JSer('<div style="position: absolute;height:8px;width:8px;cursor:se-resize"></div>')
                    .appendTo(modal).mousedown(function(e){JSer(this).data('__md',{x:x(e), y:y(e)});});//***

                mm=function(e){
                    var d=mbr.data('__md') || mr.data('__md') || mb.data('__md'),tw,th;
                    if(d&&e){
                        th=orgH+y(e)- d.y; tw=orgW+x(e)- d.x;
                        if(args.minWidth && tw<args.minWidth) tw=args.minWidth;
                        else if(args.maxWidth && tw>args.maxWidth) tw=args.maxWidth;
                        if(args.minHeight && th<args.minHeight) th=args.minHeight;
                        else if(args.maxHeight && th>args.maxHeight) th=args.maxHeight;

                        if(mbr.data('__md')) modal.width(tw).height(th);
                        else if(mr.data('__md')) modal.width(tw);
                        else if(mb.data('__md')) modal.height(th);
                    }else{
                        th=orgH;
                        tw=orgW;
                    }
                    mb.css({width:tw-6, top:th-6});
                    mr.css({height:th-6,left:tw-6,width:6,top:0});
                    mbr.css({top:th-6,left:tw-6,width:6});

                };
                mu=function(){
                    mb.add(mr).add(mbr).removeData('__md');
                    orgW=modal.width();
                    orgH=modal.height();
                };
                JSer('body').on({mousemove:mm,mouseup:mu});
                mm();
            }
        }
    });
})();