/**
 * JDiy (v1.x)  -  javaWeb framework Page Events
 *
 * @author         : 子秋(ziquee)
 * @QQ             : 39886616
 * @copyright      : http://www.jdiy.org
 *
 **/

var $input_type = [
    ["text","textarea","number","password","radio","checkbox","select","selectx","linkage","webeditor"
        , "date", "time", "datetime", "hidden"],
    ["单行文本框","多行文本框","数字输入框", "密码框","单选按钮","多选按钮","下拉菜单","平移选择菜单","多级联动菜单","Web编辑器"
        ,"日期输入框","时间输入框","日期时间输入框","隐藏或普通文字"]
];

var $ctrl_type = [
    ["input0","input1","list","tree","folder","image"],
    ["内容输入表单","栏目输入表单","分页列表","树型节点","目录列表","图片列表"]
];

var $c_t_Obj = {
    input0:"内容输入表单".fontcolor("#006666"),
    input1:"栏目输入表单".fontcolor("#ff6633"),
    list:"分页列表".fontcolor("#6666cc"),
    tree:"树型节点".fontcolor("#0099ff"),
    folder:"目录列表".fontcolor("#993399"),
    image:"图片列表".fontcolor("#00AA00")
};