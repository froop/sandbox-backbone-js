require(["example/models"], function (Models) {
	module("Items", {
		setup: function () {
		}
	});

	test("clearAll", function () {
		var items = new Models.Items([{a:1}, {a:2}]);
		equal(items.length, 2);

		items.clearAll();

		equal(items.length, 0);
	});

	test("ajax fetch collection", function () {
		var items = new Models.Items([], {
			url: "/example/items"
		});
		this.stub($, "ajax");

		items.fetch();

		equal($.ajax.callCount, 1);
		var stubArg = $.ajax.getCall(0).args[0];
		equal(stubArg.url, "/example/items");
		equal(stubArg.type, "GET");
		equal(stubArg.dataType, "json");
	});

	test("ajax fetch model", function () {
		var item = new Models.Item({id: "1"}, {
			urlRoot: "/example/items"
		});
		this.stub($, "ajax");

		item.fetch();

		equal($.ajax.callCount, 1);
		var stubArg = $.ajax.getCall(0).args[0];
		equal(stubArg.url, "/example/items/1");
		equal(stubArg.type, "GET");
		equal(stubArg.dataType, "json");
	});

	test("ajax create", function () {
		var items = new Models.Items([], {
			url: "/example/items"
		});
		this.stub($, "ajax");

		items.create({text1: "abc"});

		equal($.ajax.callCount, 1);
		var stubArg = $.ajax.getCall(0).args[0];
		equal(stubArg.url, "/example/items");
		equal(stubArg.type, "POST");
		equal(stubArg.dataType, "json");
		equal(stubArg.data, '{"text1":"abc"}');
	});

	test("ajax save", function () {
		var items = new Models.Items(new Models.Item({id: "1"}), {
			url: "/example/items"
		});
		var item = items.get("1");
		this.stub($, "ajax");

		item.set("text1", "a");
		item.save();

		equal($.ajax.callCount, 1);
		var stubArg = $.ajax.getCall(0).args[0];
		equal(stubArg.url, "/example/items/1");
		equal(stubArg.type, "PUT");
		equal(stubArg.dataType, "json");
		equal(stubArg.data, '{"id":"1","text1":"a"}');
	});

	test("ajax destory", function () {
		var item = new Models.Item({id: "1"});
		var items = new Models.Items([item], {
			url: "/example/items"
		});
		this.stub($, "ajax");

		item.destroy();

		equal($.ajax.callCount, 1);
		var stubArg = $.ajax.getCall(0).args[0];
		equal(stubArg.url, "/example/items/1");
		equal(stubArg.type, "DELETE");
		equal(stubArg.dataType, "json");
		equal(items.length, 0);
	});
});
