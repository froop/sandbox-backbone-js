(function ($) {
	"use strict";

	var Item = Backbone.Model.extend({
		defaults: {
			"text1": "default1"
		},
		initialize: function (attrs, options) {
		},
		validate: function (attrs) {
		}
	});

	var AppView = Backbone.View.extend({
		events: {
			"click #add" : "addItem"
		},
		initialize: function (options) {
			_.bindAll(this, "render");
			this.model.bind("change", this.render);
			this.render();
		},
		render: function () {
			this.$("input[name=text1]").val(this.model.get("text1"));
		},
		addItem: function (e) {
			this.model.set({
				"text1": this.$("input[name=text1]").val()
			});
		}
	});

	$(function () {
		new AppView({
			el: "#example",
			model: new Item()
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
