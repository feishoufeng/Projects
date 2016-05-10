package com.zhuobo.account.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.jdiy.core.App;
import org.jdiy.core.Args;
import org.jdiy.core.Dao;
import org.jdiy.core.JDiyAction;
import org.jdiy.core.Ls;
import org.jdiy.core.Rs;

import com.zhuobo.account.model.MenuModel;


public class MenuList extends JDiyAction {
	public String getmenuList() {
		List<Map<String, List<MenuModel>>> list = new ArrayList<Map<String, List<MenuModel>>>();
		App app = App.get();
		Dao dao = app.getDao();
		Args args = new Args("catalog",
				"group by first_id order by first_id asc", "first_id");
		try {
			Ls ls = dao.ls(args);
			int m = 0;
			for (Rs item : ls.getItems()) {
				Map<String, List<MenuModel>> map = new HashMap<String, List<MenuModel>>();
				Args secondArgs = new Args("catalog", "first_id = '"
						+ item.getInt("first_id", 0) + "'", "catalog.*");
				Ls secondLs = dao.ls(secondArgs);
				List<MenuModel> menu = new ArrayList<MenuModel>();
				for (Rs secondItem : secondLs.getItems()) {
					MenuModel model = new MenuModel();
					model.setFirst_id(secondItem.getInt("first_id", 0));
					model.setFirst_name(secondItem.get("first_name"));
					model.setSecond_id(secondItem.getInt("second_id", 0));
					model.setSecond_name(secondItem.get("second_name"));
					model.setLink_address(secondItem.get("link_address"));
					menu.add(model);
				}
				map.put("key" + m++, menu);
				list.add(map);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		setAttr("list", list);
		return "/left.jsp";
	}
}
