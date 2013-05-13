define(["jquery", "backbone", "transparency"], function ($, Backbone) {
	"use strict";

	jQuery.fn.render = Transparency.jQueryPlugin;

	var EditorView =  Backbone.View.extend({
		el: "#edit-form",
		events: {
			"submit": function (event) {
				event.preventDefault();
				this.$error.empty();
				this.model.setText1(this.$text1.val());
			}
		},
		initialize: function (options) {
			this.count = 0;
			this.$text1 = this.$("input[name=text1]");
			this.$count = this.$("#count");
			this.$error = this.$("#error");

			this.listenTo(this.model, "change", function () {
				this.count += 1;
				this.render();
			});
			this.listenTo(this.model, "invalid", function (model, error) {
				this.$error.text(error);
			});

			this.render();
		},
		render: function () {
			this.$text1.val(this.model.get("text1"));
			this.$count.text(this.count);
			return this;
		},
		clear: function () {
			this.count = -1;
			this.model.clear();
		}
	});

	var ItemView = Backbone.View.extend({
		tagName: "li",
		className: "item-content",
		initialize: function () {
//			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.render();
		},
		render: function () {
			this.$el.empty().append($("#item-template > *").clone());
			this.$el.render({
				text1: this.model.get("text1")
			});
			return this;
		}
	});

	var ItemsView = Backbone.View.extend({
		el: "#list1",
		initialize: function () {
			this.listenTo(this.collection, "add", function (item) {
				var view = new ItemView({
					model: item
				});
				this.$el.append(view.$el);
			});
			this.collection.fetch();
		},
		addItem: function (values) {
			this.collection.create(values, {wait: true});
		},
		clearItems: function () {
			this.collection.clearAll();
		}
	});

	var AppView = Backbone.View.extend({
		events: {
			"click #clear": function () {
				this.editorView.clear();
				this.itemsView.clearItems();
			}
		},
		initialize: function (options) {
			this.editorView = new EditorView({
				model: options.editor
			});
			this.itemsView = new ItemsView({
				collection: options.items
			});

			this.listenTo(options.editor, "change", function () {
				this.itemsView.addItem(options.editor.toJSON());
			});
		}
	});

	return {
		AppView: AppView
	};
});
