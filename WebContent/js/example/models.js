define(["lib/underscore", "lib/backbone"], function (_, Backbone) {
	"use strict";

	var Editor = Backbone.Model.extend({
		defaults: {
			text1: ""
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

	var Item = Backbone.Model.extend({});
	var Items = Backbone.Collection.extend({
		model: Item,
		initialize: function (attrs, options) {
			if (options) {
				this.localStorage = options.localStorage;
			}
		},
		clearAll: function () {
			_.each(_.clone(this.models), function (item) {
				item.destroy();
			});
		}
	});

	return {
		Editor: Editor,
		Item: Item,
		Items: Items
	};
});
