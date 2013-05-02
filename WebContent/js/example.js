/*global jQuery, Backbone */
(function ($) {
	"use strict";

	var Editor = Backbone.Model.extend({
		defaults: {
			text1: "default1",
			count: 0
		},
		initialize: function (attrs, options) {
		},
		validate: function (attrs) {
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
			this.listenTo(this.items, "add", this.addItemView);

			this.items.fetch();
			this.render();
		},
		render: function () {
			this.$input.val(this.model.get("text1"));
			this.$count.text(this.model.get("count"));
		},
		addItem: function (e) {
			var value = this.$input.val();
			this.model.set("text1", value + ".");
			this.model.countUp();
			this.items.create({
				text1: value
			});
		},
		addItemView: function (item) {
			var view = new ItemView({
				model: item
			});
			this.$list.append(view.$el);
		},
		clearItems: function () {
			this.items.clearAll();
		}
	});

	$(function () {
		var editor = new Editor();
		var items = new Items();
		new AppView({
			el: "#example",
			model: editor,
			items : items
		});
	});
})(jQuery);
