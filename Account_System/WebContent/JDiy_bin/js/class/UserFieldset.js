/**
 * JDiy  -  Class: UserFieldset.js
 *
 * @author         : 子秋(ziquee)
 * @QQ             : 39886616
 * @copyright : http://www.jdiy.org

 *
 **/
function UserFieldset($a) {
    var $b = [];
    if ($a != null && $a.length > 10) {
        var L = "<JD_ITEM>";
        var R = "</JD_ITEM>";
        var sa = $a.split(L);
        for (var i = 1; i < sa.length; i++) {
            $c = new UserField(L + sa[i].substring(0, sa[i].indexOf(R)) + R);
            $b.push($c);
        }
    }

    this.set = function($c, oldField) {
        $c = typeof $c == 'string' ? new UserField($c) :$c;
        for (var i = 0; i < $b.length; i++) {
            if ($b[i].get("field") == $c.get("field") || oldField && oldField==$b[i].get('field')) {
                $b[i] = $c;
                return;
            }
        }
        $b.push($c);
    };
    this.get = function($d) {
        if ($d == parseInt($d))return getByIndex($d);
        for (var i = 0; i < $b.length; i++)if ($b[i].get("field") == $d)return $b[i];
        return null;
    };
    this.hasDuplicate=function(name){ //文件字段不区分大小写,所以检测字段重复也应该不区分大小写的.
        name = name.toLowerCase();
        for (var i = 0; i < $b.length; i++){
            if ($b[i].get("field").toLowerCase() == name)return true;
        }
        return false;
    }
    this.del = function($d) {
        for (var i = 0; i < $b.length; i++) {
            if ($b[i].get("field") == $d) {
                void $b.splice(i, 1);
                break;
            }
        }
    };
    this.has = function(s) {
        return this.toString().indexOf("<JD_field>" + s + "</JD_field>") != -1;
    };

    this.moveUp = function(fd){
        for(var i=1;i<$b.length;i++){
            if($b[i].get("field")==fd){
                var t = $b[i-1];
                $b[i-1]=$b[i];
                $b[i]=t;
                break;
            }
        }
        return this;
    };

    this.moveDown = function(fd){
        for(var i=$b.length-2;i>=0;i--){
            if($b[i].get("field")==fd){
                var t = $b[i+1];
                $b[i+1]=$b[i];
                $b[i]=t;
                break;
            }
        }
        return this;
    };

    this.toString = function() {
        var s = [];
        s.push("\r\n\r\n<JD_DATASET>\r\n");
        for (var i = 0; i < $b.length; i++){
            s.push($b[i].toString() + "\r\n\r\n");
        }
        s.push("</JD_DATASET>\r\n\r\n");
        return s.join("");
    };
    this.length = function() {
        return $b.length;
    };
    function getByIndex(n) {
        return $b[n];
    }

}
function UserField($a) {
    var $e = "<JD_ITEM>";
    var $f = "</JD_ITEM>";
    var $g = $e + "\r\n" + $f;
    if ($a) {
        $g = $a;
    }
    this.set = function(name, $h) {
        if(typeof name == 'object' && !$h){
            for(i in name) this.set(i, name[i]);
            return this;
        }
        var b = "<JD_" + name + ">";
        var e = "</JD_" + name + ">";
        if ($g.indexOf(b) == -1) {
            $g = $g.replace($f, b + $h + e + "\n" + $f);
        } else {
            sL = $g.substring(0, $g.indexOf(b));
            sR = $g.substring($g.indexOf(e));
            $g = sL + b + $h + sR;
        }
        return this;
    };
    this.get = function(name) {
        var b = "<JD_" + name + ">";
        var e = "</JD_" + name + ">";
        if ($g.indexOf(b) == -1) {
            return null;
        } else {
            var $i = $g.indexOf(b) + b.length;
            var $j = $g.indexOf(e);
            var s = $g.substring($i, $j);
            if (s == null)s = "";
            return s;
        }
    };
    this.toString = function() {
        return $g;
    }
}

