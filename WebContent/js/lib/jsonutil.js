/*
 * jsonutil.js
 *
 * Created by froop http://github.com/froop/sandbox-backbone-js
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/*global JSON */
var JsonUtil = {};

(function () {

	/**
	 * @returns deep copied object
	 */
	JsonUtil.clone = function (source) {
		return JSON.parse(JSON.stringify(source));
	};

	JsonUtil.alias = function (json, map) {
		var res = JsonUtil.clone(json);
		var key = "";

		for (key in map) {
			res[map[key]] = res[key];
			delete res[key];
		}

		return res;
	};

	JsonUtil.aliasList = function (jsonList, map) {
		var res = [];
		var idx, size = jsonList.length;

		for (idx = 0; idx < size; idx++) {
			res[idx] = JsonUtil.alias(jsonList[idx], map);
		}

		return res;
	};
})();
