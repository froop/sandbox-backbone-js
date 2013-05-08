require(["lib/jquery", "lib/backbone.localStorage", "example/models", "example/views"],
		function ($, LocalStorage, Models, Views) {
	"use strict";

	$(function () {
		new Views.AppView({
			el: "#example",
			editor: new Models.Editor(),
			items: new Models.Items([], {
				localStorage: new LocalStorage("example-items")
			})
		});
	});
});
