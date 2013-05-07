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
		var items = new Example.Items([], {
			url: "/example/items"
		});
		this.stub($, "ajax");

		items.fetch();

		ok($.ajax.calledOnce);
		var stubArg = $.ajax.getCall(0).args[0];
		equal(stubArg.url, "/example/items");
		equal(stubArg.type, "GET");
		equal(stubArg.dataType, "json");
	});
})(jQuery);
