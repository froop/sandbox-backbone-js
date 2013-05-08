/*global alert, jQuery, Backbone, Example */

(function ($) {
	"use strict";

	var ItemView = Backbone.View.extend({
		tagName: "li",
		initialize: function () {
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
		initialize: function () {
			this.listenTo(this.collection, "add", this.addItemView);
			this.collection.fetch();
			this.render();
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
			"submit #edit-form": function (event) {
				this.model.setText1(this.$input.val());
				event.preventDefault();
			},
			"click #clear": function () {
				this.itemsView.clearItems();
			}
		},
		initialize: function (options) {
			this.count = 0;
			this.$input = this.$("input[name=text1]");
			this.$count = this.$("#count");
			this.itemsView = new ItemsView({
				collection: options.items
			});

			this.listenTo(this.model, "change", function () {
				this.itemsView.addItem(this.model.toJSON());
				this.count += 1;
				this.render();
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
		}
	});

	$(function () {
		new AppView({
			el: "#example",
			model: new Example.Editor(),
			items: new Example.Items([], {
				localStorage: new Backbone.LocalStorage("example-items")
			})
		});
	});
})(jQuery);
