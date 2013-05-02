(function ($) {
	"use strict";

	var AppView = Backbone.View.extend({
		events : {
			"click #add" : "addItem"
		},
		addItem : function (e) {
			this.$("input[name=text1]").val("test");
		}
	});

	$(function () {
		new AppView({
			el : "#example"
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
