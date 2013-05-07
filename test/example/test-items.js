(function ($) {
	module("Items", {
		setup: function () {
		}
	});

	test("clearAll", function () {
		var items = new Example.Items([{a:1}, {a:2}], {
			localStorage: new Backbone.LocalStorage("test-items")
		});
		equal(items.length, 2);

		items.clearAll();

		equal(items.length, 0);
	});

	test("ajax fetch", function () {
		var items = new Example.Items([{a:1}, {a:2}], {
			url: "/example/items"
		});

		sinon.stub($, "ajax");
		items.fetch();

		ok($.ajax.calledOnce);
		equal($.ajax.getCall(0).args[0].url, "/example/items");
		equal($.ajax.getCall(0).args[0].dataType, "json");
	});
})(jQuery);
