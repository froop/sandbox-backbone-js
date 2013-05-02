(function ($) {
	"use strict";

	var Editor = Backbone.Model.extend({
		defaults: {
			text1: "default1",
			count: 1
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

	var AppView = Backbone.View.extend({
		events: {
			"click #add": "addCount"
		},
		initialize: function (options) {
			this.$input = this.$("input[name=text1]");
			this.$count = this.$("#count");
			this.$items = this.$("#list1");
			this.items = options.items;
			this.model.bind("change", this.render, this);
			this.render();
		},
		render: function () {
			this.$input.val(this.model.get("text1"));
			this.$count.text(this.model.get("count"));
			this.$items.append("<li>" + this.model.get("text1") + "</li>");//TODO
		},
		addCount: function (e) {
			this.model.set("text1", this.$input.val());
			this.model.countUp();
			this.items.add({
				text1: this.$input.val(),
				date: new Date()
			});
		}
	});

	$(function () {
		var items = new Items();
		new AppView({
			el: "#example",
			model: new Editor(),
			items : items
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
