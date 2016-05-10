package com.zhuobo.account.action;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.jdiy.core.*;

import com.zhuobo.account.model.FineReportModel;

public class FineReport extends JDiyAction {
	App app = App.get();
	Dao dao = app.getDao();

	public String getFineReport() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
		int year = app.getInt("year", Integer.parseInt(sdf.format(new Date())));
		String sql = "";
		int m = 0;
		Args yearArgs = new Args("cash_detail","order by year asc","distinct date_format(register_date,'%Y') year");
		Ls years = dao.ls(yearArgs);
		Args remarkArgs = new Args("cash_detail", "date_format(register_date,'%Y') = '"+ year +"' order by remarks asc", "distinct remarks");
		Ls remaksLs = dao.ls(remarkArgs);
		Map<String,List<FineReportModel>> map = new HashMap<String, List<FineReportModel>>();
		for (Rs remark : remaksLs.getItems()) {
			sql = "	select sum(detail.money) money,remark.remark_value,date_format(detail.register_date,'%m') date_time "
					+ " from cash_detail detail "
					+ " left join remarks remark on detail.remarks = remark.remark_value "
					+ " where remark.remark_value = '" + remark.get("remarks") + "' and date_format(detail.register_date,'%Y') = '"+ year +"' "
					+ " group by date_time,remark.remark_value order by date_time asc ";
			Ls fineReportsLs = dao.ls(sql, 0, 1);
			List<FineReportModel> list = new ArrayList<FineReportModel>();
			for (Rs fineReport : fineReportsLs.getItems()) {
				FineReportModel model = new FineReportModel();
				model.setMoney(fineReport.getFloat("money"));
				model.setRemark_value(fineReport.getString("remark_value"));
				model.setDate_time(fineReport.getString("date_time"));
				list.add(model);
			}
			map.put(m++ + "", list);
		}
		String taxesSql = "	select sum(detail.taxes) taxes,date_format(detail.register_date,'%m') date_time "
				+ " from cash_detail detail "
				+ " where date_format(detail.register_date,'%Y') = '"+ year +"' and detail.flow_flag = 0 "
				+ " group by date_time order by date_time asc ";
		Ls taxesLs = dao.ls(taxesSql, 0, 1);
		setAttr("year", year);
		setAttr("years", years);
		setAttr("taxesLs", taxesLs);
		setAttr("remaksList", remaksLs);
		setAttr("fineReportlist", map);
		return "/view/fine_report.jsp";
	}
}
