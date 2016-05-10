<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<script type="text/javascript" src="js/jquery-1.12.2.min.js"></script>
<script type="text/javascript">
	 function ShowHideLeft(objtd){
		 if (window.parent.secondary.cols=="202,25,*"){
			 window.parent.secondary.cols="0,25,*";
			 $("#control_img").attr("src","images/control_left_botton_right.png");
		 }
		 else{
			 window.parent.secondary.cols="202,25,*";
			 $("#control_img").attr("src","images/control_left_botton_left.png");
		 }
	 }
 </script>

 <table border="0" cellpadding="0" cellspacing="0" style="height: 100%;">
 	<tr style="height: 100%">
 		<td valign="middle">
 			<div style="background: #3661B4;width: 1;height: 100%;"></div>
 		</td>
 		<td valign="middle">
 			<img src="images/control_left_botton_left.png" border="no" id="control_img" height="60" width="16" onclick="ShowHideLeft(this);"/>
 		</td>
 	</tr>
 </table>

