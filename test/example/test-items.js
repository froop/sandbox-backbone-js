(function () {
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
})();
