/*
 * jquery.domtmpl.js - jQuery plugin.
 *
 * DOM based HTML template engine.
 *
 * Created by froop http://github.com/froop/jquery-dom-tmpl
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/*global jQuery */
(function ($) {
	"use strict";

	function setValue($fields, value) {
		$fields.filter("input,select").not(":checkbox,:radio").val(value);
		if (typeof value === "boolean") {
			$fields.filter(":checkbox,:radio").prop("checked", value);
		} else {
			$fields.filter(":checkbox").val(value);
			$fields.filter(":radio").val([value]);
		}
		$fields.not("input,select").text(value);
	}

	function setupListTmpl($elem) {
		var $tmpl = $elem.data("domtmpl");
		if (!$tmpl) {
			$tmpl = $elem.children().clone();
			$elem.data("domtmpl", $tmpl);
			$elem.empty();
		}
		return $tmpl;
	}

	function bindItem($elements, data, options) {
		function wrap$() {
			return $elements
					.wrapAll("<div class='wrapper'>")
					.closest(".wrapper");
		}
		wrap$().tmplBind(data, options);
	}

	/**
	 * Bind data to DOM.
	 * @param {Object} data JSON object
	 * @param {Object} options
	 * @returns {jQuery} for method chain
	 */
	$.fn.tmplBind = function (data, options) {
		data = data || {};
		var $elements = this;
		var defaults = {
			find: {},
			attr: {},
			prop: {}
		};
		var setting = $.extend(defaults, options);

		function callIfFunction(target) {
			if (typeof target === "function") {
				return target($elements);
			} else {
				return target;
			}
		}

		$.each(data, function (name, value) {
			function defaultFind() {
				var selId = "#" + name;
				var selClass = "." + name;
				var selName = "[name=" + name + "]";
				return [selId, selClass, selName].join(",");
			}
			var find = callIfFunction(setting.find[name]);
			var attr = callIfFunction(setting.attr[name]);
			var prop = callIfFunction(setting.prop[name]);
			var $target = $elements.find(find || defaultFind());

			if (attr) {
				$target.attr(attr, value);
			} else if (prop) {
				$target.prop(prop, value);
			} else {
				setValue($target, value);
			}
		});
		return this;
	};

	/**
	 * Clone and bind data to DOM.
	 * @param {Object} data JSON object
	 * @param {Object} options
	 * @returns {jQuery} cloned element
	 */
	$.fn.tmplClone = function (data, options) {
		var $item = this.clone();
		bindItem($item, data, options);
		return $item;
	};

	/**
	 * Clone list item and bind data.
	 * @param {Object} data JSON object
	 * @param {Object} options
	 * @returns {jQuery} appended item
	 */
	$.fn.tmplItem = function (data, options) {
		var $list = this;
		var $tmpl = setupListTmpl($list);
		return $tmpl.tmplClone(data, options);
	};

	/**
	 * Append list item and bind data.
	 * @param {Object} data JSON object
	 * @param {Object} options
	 * @returns {jQuery} appended item
	 */
	$.fn.tmplAppend = function (data, options) {
		var $list = this;
		var $item = $list.tmplItem(data, options);
		$list.append($item);
		return $item;
	};

	/**
	 * Bind array of data to list items.
	 * @param {Array} dataList List of JSON object
	 * @param {Object} options
	 * @returns {jQuery} for method chain
	 */
	$.fn.tmplList = function (dataList, options) {
		dataList = dataList || [];
		this.each(function () {
			var $elem = $(this);
			setupListTmpl($elem);
			$elem.empty();
			$.each(dataList, function () {
				$elem.tmplAppend(this, options);
			});
		});
		return this;
	};

	/**
	 * Bind array of value-text to select options (or :radio, :checkbox).
	 * @param {Array} dataList List of JSON object (value, text)
	 * @param {Object} options
	 * @returns {jQuery} for method chain
	 */
	$.fn.tmplSelectOpts = function (dataList, options) {
		dataList = dataList || [];
		var $elements = this;
		var defaults = {
			canEmpty: false,
			emptyText: ""
		};
		var setting = $.extend(defaults, options);
		function isSelect($elem) {
			return $elem.find("option").length > 0;
		}

		if (setting.canEmpty) {
			dataList.unshift({
				value: "",
				text: setting.emptyText
			});
		}
		$elements.tmplList(dataList, {
			find: {
				value: function ($elem) {
					return isSelect($elem) ? "option" : "input";
				},
				text: function ($elem) {
					return isSelect($elem) ? "option" : "label";
				}
			},
			attr: {
				value: function () {
					return "value";
				}
			}
		});
		return this;
	};
})(jQuery);