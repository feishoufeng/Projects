package com.zhuobo.account.action;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.jdiy.core.*;
import org.jdiy.json.JsonObject;

public class RemarkMaintain extends JDiyAction {
	App app = App.get();
	Dao dao = app.getDao();

	public String getRemark() {
		Args args = new Args("remarks");
		Ls ls = dao.ls(args);
		setAttr("remarks", ls);
		return "/view/remark_maintain.jsp";
	}

	public JsonObject changeStatue() {
		String id = app.get("id");
		Args args = new Args("remarks", "id = '" + id + "'");
		Rs remarkRs = dao.rs(args);
		if (!remarkRs.isNull()) {
			int flag = remarkRs.getInt("status", 0);
			if (flag == 0) {
				remarkRs.set("status", 1);
			} else if (flag == 1) {
				remarkRs.set("status", 0);
			}
			dao.save(remarkRs);
			return new JsonObject().set("result", "success");
		} else {
			return new JsonObject().set("result", "修改状态失败！");
		}
	}

	public JsonObject addStatue() {
		String remark_name = app.get("remark_name").trim();
		Args args = new Args("remarks", "remark_value = '" + remark_name + "'");
		Rs rs = dao.rs(args);
		if (rs.isNull()) {
			String id = UUID.randomUUID().toString();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String sql = "insert into remarks values('" + id + "','"
					+ remark_name + "','" + sdf.format(new Date()) + "','0')";
			int n = dao.exec(sql);
			if (n > 0) {
				return new JsonObject().set("result", "success");
			} else {
				return new JsonObject().set("result", "新增备注失败！");
			}
		}else{
			return new JsonObject().set("result", "备注名称已存在！");
		}
	}
}
