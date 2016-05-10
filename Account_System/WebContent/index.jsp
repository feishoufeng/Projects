<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<html>
<head>
	<title>账务系统</title>
</head>
<frameset rows="12%,25,*,8%" frameborder="no" framespacing="0" id="main">
	<frame src="top.jsp" scrolling="no"  noresize="noresize" name="topPage" frameborder="no">
	<frame src="control_top.jsp" scrolling="no" noresize="noresize" name="control_top" frameborder="no">
	<frameset cols="202,25,*" frameborder="no" framespacing="0" id="secondary">
		<frame src="MenuList/getmenuList.jd" scrolling="auto" noresize="noresize" name="leftPage" frameborder="no">
		<frame src="control_left.jsp" scrolling="no" noresize="noresize" name="control_left" frameborder="no">
		<frame src="right.jsp" scrolling="auto" noresize="noresize" name="rightPage" frameborder="no">
	</frameset>
	<frame src="bottom.jsp" scrolling="no" noresize="noresize" name="bottomPage" frameborder="no">
</frameset>
</html>