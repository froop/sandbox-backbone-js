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
		var i = "";

		for (i in map) {
			res[map[i]] = res[i];
			delete res[i];
		}

		return res;
	};

	JsonUtil.aliasList = function (jsonList, map) {
		var res = [];
		var i, size = jsonList.length;

		for (i = 0; i < size; i++) {
			res[i] = JsonUtil.alias(jsonList[i], map);
		}

		return res;
	};
})();
