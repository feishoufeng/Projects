(function(){
    JSer.extend({
        selectUp:function(){
            var o = this[0];
            if(o && "SELECT".eq(o.tagName))
                for (i = 1; i < o.options.length; i++)
                    if (o.options[i].selected && !o.options[i - 1].selected)
                        JSer(o.options[i]).beforeTo(o.options[i-1]).attr('selected',true);
        },
        selectDown: function(){
            var o = this[0];
            if(o && "SELECT".eq(o.tagName))
                for (i = o.options.length - 2; i >= 0; i--)
                    if (o.options[i].selected && !o.options[i + 1].selected)
                        JSer(o.options[i]).afterTo(o.options[i+1]).attr('selected',true);
        },
        selectRemove:function(){
            var o = this[0];
            if(o && "SELECT".eq(o.tagName)){
                var j=0;
                JSer.each(o.options, function(i){
                    if(this.selected){
                        j=i;
                        JSer(this).remove();
                    }
                });
                if(o.options.length) o.selectedIndex = o.options.length>j ? j : o.options.length-1;
            }
        },
        selectMove:function(selector){
            var target=JSer(selector);
            if(target[0] && "select".eq(target[0].tagName)){
                target[0].selectedIndex = -1;
                JSer(":selected", this).appendTo(target).attr("selected", true).end().remove();
            }
        }
    });
})();