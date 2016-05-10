<script type="text/javascript" src="js/jquery-1.12.2.min.js"></script>
<div align="center" style="height:17;border: none;width: 100%">
	<div style="background: #3661B4;height: 1;width: 100%"></div>
	<div style="height: 16;width: 100%">
		<img src="images/control_top_botton_up.png" border="no" id="control_img" height="16" width="60" onclick="ShowHideLeft(this);"/>
	</div>
</div>
 <script type="text/javascript">
	 function ShowHideLeft(objtd){
		 if (window.parent.main.rows=="12%,25,*,8%"){
			 window.parent.main.rows="0,25,*,8%";
			 $("#control_img").attr("src","images/control_top_botton_down.png");
		 }
		 else{
			 window.parent.main.rows="12%,25,*,8%";
			 $("#control_img").attr("src","images/control_top_botton_up.png");
		 }
	 }
 </script>

