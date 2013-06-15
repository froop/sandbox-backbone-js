define(["jquery", "backbone", "js/common/view"], function ($, Backbone) {
	"use strict";

	var EditorView =  Backbone.View.extend({
		el: "#edit-form",
		events: {
			"submit": function (event) {
				event.preventDefault();
				this.$error.empty();
				this.model.setText1(this.$text1.val());
				this.$text1.focus();
			}
		},
		initialize: function (options) {
			this.count = 0;
			this.$text1 = this.$("input[name=text1]");
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
			var data = this.model.toJSON();
			data.count = this.count;
			this.$el.tmplBind(data, {error: true});
			return this;
		},
		clear: function () {
			this.count = -1;
			this.model.clear();
		}
	});

	var ItemView = Backbone.View.extend({
		initialize: function () {
//			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.render();
		},
		render: function () {
			this.$el.tmplBind(this.model.toJSON());
			return this;
		}
	});

	var ItemsView = Backbone.View.extend({
		el: "#list1",
		initialize: function () {
			this.$el.tmplList();
			this.listenTo(this.collection, "add", function (item) {
				this.append(item);
			});
		},
		append: function (model) {
			var view = new ItemView({
				el: this.$el.tmplItem(),
				model: model
			});
			this.$el.append(view.$el);
		}
	});

	var AppView = Backbone.View.extend({
		el: "#example",
		events: {
			"click #clear": function () {
				this.editorView.clear();
				this.items.clearAll();
			}
		},
		initialize: function (options) {
			this.items = options.items;
			this.editorView = new EditorView({
				model: options.editor
			});
			this.itemsView = new ItemsView({
				collection: options.items
			});

			this.listenTo(options.editor, "change", function () {
				options.items.create(options.editor.toJSON(), {wait: true});
			});

			options.items.fetch();
		}
	});

	return {
		AppView: AppView
	};
});
