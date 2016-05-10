package com.zhuobo.account.action;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.UUID;

import org.jdiy.core.App;
import org.jdiy.core.Args;
import org.jdiy.core.Dao;
import org.jdiy.core.JDiyAction;
import org.jdiy.core.Ls;
import org.jdiy.core.Rs;
import org.jdiy.json.JsonObject;

public class CashFlow extends JDiyAction {
	App app = App.get();
	Dao dao = app.getDao();

	public String getCashFlowList() {
		int absPage = app.getInt("page", 1);//从地址栏取得页码(如果没有page页码信息，则默认为第1页)
		Args args = new Args("cash_detail", "order by register_date DESC",10,absPage);
		try {
			Ls ls = dao.ls(args);
			setAttr("list", ls);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "/view/case_flow.jsp";
	}

	public JsonObject delFlow() {
		String id = app.get("id");
		if (!id.isEmpty()) {
			Args delArgs = new Args("cash_detail", "id = '" + id + "'");
			int n = dao.del(delArgs);
			if (n > 0) {
				return new JsonObject().set("result", "success");
			} else {
				return new JsonObject().set("result", "删除失败！");
			}
		} else {
			return new JsonObject().set("result", "删除失败！");
		}
	}

	public JsonObject updateFlow() {
		String id = app.get("id");
		String time = app.get("time");
		String money = app.get("money");
		String taxes = app.get("taxes");
		String flow_flag = app.get("flow_flag");
		String total = app.get("total");
		String explain = app.get("explain");
		String remarks = app.get("remark");
		if (!id.isEmpty()) {
			Rs cashFlow = dao.rs(new Args("cash_detail", "id='" + id + "'"));
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			try {
				cashFlow.set("register_date", sdf.parse(time));
			} catch (ParseException e) {
				e.printStackTrace();
			}
			cashFlow.set("money", money);
			cashFlow.set("taxes", taxes);
			cashFlow.set("flow_flag", flow_flag);
			cashFlow.set("total", total);
			cashFlow.set("explain_txt", explain);
			cashFlow.set("remarks", remarks);
			dao.save(cashFlow);
			return new JsonObject().set("result", "success");
		} else {
			return new JsonObject().set("result", "保存失败！");
		}
	}
	
	public JsonObject saveFlow() {
		String time = app.get("time");
		String money = app.get("money");
		String taxes = app.get("taxes");
		String flow_flag = app.get("flow_flag");
		String total = app.get("total");
		String explain = app.get("explain");
		String remarks = app.get("remark");
		String sqlString;
		try {
			sqlString = "insert into cash_detail values('"+ UUID.randomUUID().toString() +"','" + time + " 00:00:00','"+ money +"','"+ flow_flag +"','"+ total +"','"+ explain +"','"+ remarks +"','"+ taxes +"')";
			dao.exec(sqlString);
			return new JsonObject().set("result", "success");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new JsonObject().set("result", "增加流水失败！");
	}

	public String editFlow() {
		String id = app.get("id");
		if (!id.isEmpty()) {
			Args editArgs = new Args("cash_detail", "id = '" + id + "'",
					"cash_detail.*");
			Args remarkArgs = new Args("remarks", "status = '0' order by remark_value ASC",
					"remarks.*");
			Ls flowLs = dao.ls(editArgs);
			Ls remarkLs = dao.ls(remarkArgs);
			if (flowLs.getRowCount() > 0) {
				setAttr("flow", flowLs);
				setAttr("remarks", remarkLs);
				return "/view/edit_flow.jsp";
			} else {
				return "/view/case_flow.jsp";
			}
		} else {
			return "/view/case_flow.jsp";
		}
	}

	public String addFlow() {
		Args remarkArgs = new Args("remarks", "status = '0' order by remark_value ASC",
				"remarks.*");
		Ls remarkLs = dao.ls(remarkArgs);
		Args in = new Args("cash_detail", "flow_flag = '0' group by flow_flag",
				"sum(money) as in_total");
		Args out = new Args("cash_detail",
				"flow_flag = '1' group by flow_flag", "sum(money) as out_total");
		Ls inLs = dao.ls(in);
		Ls outLs = dao.ls(out);
		float in_total = 0;
		float out_total = 0;
		if (inLs.getRowCount() > 0) {
			in_total = inLs.getItems()[0].getFloat("in_total", 0);
		}
		if (outLs.getRowCount() > 0) {
			out_total = outLs.getItems()[0].getFloat("out_total", 0);
		}
		float total = in_total - out_total;
		setAttr("remarks", remarkLs);
		setAttr("total", total);
		return "/view/edit_flow.jsp";
	}
}
