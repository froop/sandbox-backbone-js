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

	test("ajax fetch collection", function () {
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

	test("ajax fetch model", function () {
		var item = new Example.Item({id: "1"}, {
			urlRoot: "/example/items"
		});
		this.stub($, "ajax");

		item.fetch();

		ok($.ajax.calledOnce);
		var stubArg = $.ajax.getCall(0).args[0];
		equal(stubArg.url, "/example/items/1");
		equal(stubArg.type, "GET");
		equal(stubArg.dataType, "json");
	});

	test("ajax create", function () {
		var items = new Example.Items([], {
			url: "/example/items"
		});
		this.stub($, "ajax");

		items.create({text1: "abc"});

		ok($.ajax.calledOnce);
		var stubArg = $.ajax.getCall(0).args[0];
		equal(stubArg.url, "/example/items");
		equal(stubArg.type, "POST");
		equal(stubArg.dataType, "json");
		equal(stubArg.data, '{"text1":"abc"}');
	});

	test("ajax save collection", function () {
		var items = new Example.Items(new Example.Item({id: "1"}), {
			url: "/example/items"
		});
		var item = items.get("1");
		this.stub($, "ajax");

		item.save();

		ok($.ajax.calledOnce);
		var stubArg = $.ajax.getCall(0).args[0];
		equal(stubArg.url, "/example/items/1");
		equal(stubArg.type, "PUT");
		equal(stubArg.dataType, "json");
	});

	test("ajax destory collection", function () {
		var item = new Example.Item({id: "1"});
		var items = new Example.Items([item], {
			url: "/example/items"
		});
		this.stub($, "ajax");

		item.destroy();

		ok($.ajax.calledOnce);
		var stubArg = $.ajax.getCall(0).args[0];
		equal(stubArg.url, "/example/items/1");
		equal(stubArg.type, "DELETE");
		equal(stubArg.dataType, "json");
		equal(items.length, 0);
	});
})(jQuery);
