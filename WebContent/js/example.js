/*global jQuery, Backbone, _ */
(function ($) {
	"use strict";

	var Editor = Backbone.Model.extend({
		defaults: {
			text1: "",
			count: 0
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
		/**
		 * @param value {String}
		 * @returns {Boolean} true is valid
		 */
		setText1: function (value) {
			var res = this.set("text1", value, {validate: true});
			return Boolean(res);
		},
		countUp: function () {
			this.set("count", this.get("count") + 1);
		}
	});

	var Item = Backbone.Model.extend({});
	var Items = Backbone.Collection.extend({
		model: Item,
		localStorage: new Backbone.LocalStorage("example-items"),
		clearAll: function () {
			var idx;
			for (idx = this.models.length - 1; idx >= 0; idx--) {
				this.models[idx].destroy();
			}
		}
	});

	var ItemView = Backbone.View.extend({
		tagName: "li",
		initialize: function (options) {
//			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.render();
		},
		render: function () {
			var $item = $("#item-template .item-content").clone();
			$(".text1", $item).text(this.model.get("text1"));
			this.$el.append($item);
			return this;
		}
	});

	var AppView = Backbone.View.extend({
		events: {
			"click #add": "addItem",
			"click #clear": "clearItems"
		},
		initialize: function (options) {
			this.$input = this.$("input[name=text1]");
			this.$count = this.$("#count");
			this.$list = this.$("#list1");
			this.items = options.items;

			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "invalid", function (model, error) {
				alert(error);
			});
			this.listenTo(this.items, "add", this.addItemView);

			this.items.fetch();
			this.render();
		},
		render: function () {
			this.$input.val(this.model.get("text1"));
			this.$count.text(this.model.get("count"));
			return this;
		},
		addItemView: function (item) {
			var view = new ItemView({
				model: item
			});
			this.$list.append(view.$el);
		},
		addItem: function () {
			if (!this.model.setText1(this.$input.val())) {
				return;
			}
			this.model.countUp();
			this.items.create({
				text1: this.model.get("text1")
			});
		},
		clearItems: function () {
			this.items.clearAll();
		}
	});

	var editor = new Editor();
	var items = new Items();
	new AppView({
		el: "#example",
		model: editor,
		items : items
	});
})(jQuery);
