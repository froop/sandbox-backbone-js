/*global _, Backbone */

var Example = new function () {};

(function () {
	"use strict";

	Example.Editor = Backbone.Model.extend({
		defaults: {
			text1: ""
		},
		initialize: function (attrs, options) {
		},
		validate: function (attrs) {
			if (_.isEmpty(attrs.text1)) {
				return "required";
			}
			if (_.isEmpty(this.changedAttributes(attrs))) {
				return "not change";
			}
		},
		setText1: function (value) {
			this.set("text1", value, {validate: true});
		}
	});
})();
