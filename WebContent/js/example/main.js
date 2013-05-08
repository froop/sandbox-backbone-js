/*global jQuery, Backbone, Example */

(function ($) {
	"use strict";

	$(function () {
		new Example.AppView({
			el: "#example",
			editor: new Example.Editor(),
			items: new Example.Items([], {
				localStorage: new Backbone.LocalStorage("example-items")
			})
		});
	});
})(jQuery);
