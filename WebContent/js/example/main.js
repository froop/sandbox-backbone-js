require(["lib/jquery", "example/models", "example/views"],
		function ($, Models, Views) {
	"use strict";

	$(function () {
		new Views.AppView({
			el: "#example",
			editor: new Models.Editor(),
			items: new Models.Items([], {
				localStorage: new Backbone.LocalStorage("example-items")
			})
		});
	});
});
