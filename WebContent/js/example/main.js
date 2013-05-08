require.config({
	baseUrl: "js"
});

require(["require.config"], function () {
	require(["jquery", "backbone", "example/models", "example/views",
			"backbone.localStorage"],
			function ($, Backbone, Models, Views) {
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
});
