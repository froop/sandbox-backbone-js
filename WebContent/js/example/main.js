require(["js/require.config"], function () {
	"use strict";

	require(["jquery", "backbone", "js/example/models", "js/example/views",
			"backbone.localStorage"],
			function ($, Backbone, Models, Views) {

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
});
