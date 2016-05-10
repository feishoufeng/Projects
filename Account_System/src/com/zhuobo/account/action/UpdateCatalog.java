package com.zhuobo.account.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.jdiy.core.*;

import com.zhuobo.account.model.CatalogModel;

public class UpdateCatalog extends JDiyAction {
	App app = App.get();
	Dao dao = app.getDao();

	public String getCatalog() {
		Args titleArgs = new Args("catalog_title", "order by first_id ASC");
		Ls titleLs = dao.ls(titleArgs);
		Map<String, List<CatalogModel>> map = new HashMap<String, List<CatalogModel>>();
		for (Rs title : titleLs.getItems()) {
			List<CatalogModel> list = new ArrayList<CatalogModel>();
			Args catalogArgs = new Args("catalog", "first_name = '"
					+ title.get("title") + "' order by second_id asc");
			Ls catalogLs = dao.ls(catalogArgs);
			for (Rs catalog : catalogLs.getItems()) {
				CatalogModel model = new CatalogModel();
				model.setId(catalog.getString("id"));
				model.setSecond_id(catalog.getInt("second_id", 0));
				model.setSecond_name(catalog.getString("second_name"));
				model.setLink_address(catalog.getString("link_address"));
				list.add(model);
			}
			map.put(title.getString("title"), list);
		}
		setAttr("titleList", titleLs);
		setAttr("catalogs", map);
		return "/view/catalog_show.jsp";
	}
}
