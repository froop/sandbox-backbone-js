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
		model: Item
	});

	var ItemView = Backbone.View.extend({
		tagName: "li",
		initialize: function (options) {
//			this.listenTo(this.model, "change", this.render);
			this.render();
		},
		render: function () {
			var $item = $("#item-template .item-content").clone();
			$(".text1", $item).text(this.model.get("text1"));
			$(".time", $item).text(this.model.get("time"));
			this.$el.append($item);
		}
	});

	var AppView = Backbone.View.extend({
		events: {
			"click #add": "addCount"
		},
		initialize: function (options) {
			this.$input = this.$("input[name=text1]");
			this.$count = this.$("#count");
			this.$items = this.$("#list1");
			this.items = options.items;
			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.items, "add", this.addItem);
			this.render();
		},
		render: function () {
			this.$input.val(this.model.get("text1"));
			this.$count.text(this.model.get("count"));
		},
		addCount: function (e) {
			var text1 = this.$input.val();
			this.model.set("text1", text1 + ".");
			this.model.countUp();
			this.items.add({
				text1: text1,
				time: new Date()
			});
		},
		addItem: function (item) {
			var view = new ItemView({
				model: item
			});
			this.$items.append(view.$el);
		}
	});

	$(function () {
		new AppView({
			el: "#example",
			model: new Editor(),
			items : new Items()
		});

//		var obj = new Backbone.Model();
//		var obj2 = new Backbone.Model({name: "Kenichiro", age: 30});
//		var objs = new Backbone.Collection([obj, obj2]);
//
//		obj.set({name: "Murata"});
//		obj.set({age: 20});
//
//		console.log("obj: " + JSON.stringify(obj));
//		console.log("obj.name: " + obj.get("name"));
//
//		console.log("objs: " + JSON.stringify(objs));
//		 
//		console.log("objs.get(cid): " + JSON.stringify(objs.get("c1")));
//		console.log("objs.at(index): " + JSON.stringify(objs.at(0)));
//
//		// add
//		objs.add(new Backbone.Model({name: "Acroquest", age: 20}));
//		objs.add(new Backbone.Model({name: "Technology", age: 10}));
//
//		// length
//		console.log("objs.length: " + objs.length);
//		console.log("objs: " + JSON.stringify(objs));
	});
})(jQuery);
