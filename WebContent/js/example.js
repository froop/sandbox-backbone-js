/*global jQuery, Backbone, _ */
(function ($) {
	"use strict";

	var Editor = Backbone.Model.extend({
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

	var ItemsView = Backbone.View.extend({
		el: "#list1",
		initialize: function (options) {
			this.listenTo(this.collection, "add", this.addItemView);
			this.collection.fetch();
			this.render();
		},
		render: function () {
			return this;
		},
		addItemView: function (item) {
			var view = new ItemView({
				model: item
			});
			this.$el.append(view.$el);
		},
		addItem: function (values) {
			this.collection.create(values);
		},
		clearItems: function () {
			this.collection.clearAll();
		}
	});

	var AppView = Backbone.View.extend({
		events: {
			"click #add": "addItem",
			"click #clear": "clearItems"
		},
		initialize: function (options) {
			this.count = 0;
			this.$input = this.$("input[name=text1]");
			this.$count = this.$("#count");
			this.itemsView = new ItemsView({
				collection: options.items
			});

			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "change:text1", function () {
				this.itemsView.addItem(this.model.toJSON());
				this.count += 1;
			});
			this.listenTo(this.model, "invalid", function (model, error) {
				alert(error);
			});

			this.render();
		},
		render: function () {
			this.$input.val(this.model.get("text1"));
			this.$count.text(this.count);
			return this;
		},
		addItem: function () {
			this.model.setText1(this.$input.val());
		},
		clearItems: function () {
			this.itemsView.clearItems();
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
