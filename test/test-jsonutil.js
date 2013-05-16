(function () {
	module("JsonUtil", {
		setup: function () {
		}
	});

	test("alias frist", function () {
		var result = JsonUtil.alias({
			prop1: "value1",
			prop2: "value2"
		},
		{
			prop1: "alias1"
		});

		deepEqual(result, {
			alias1: "value1",
			prop2: "value2"
		});
	});

	test("alias last", function () {
		var result = JsonUtil.alias({
			prop1: "value1",
			prop2: "value2"
		},
		{
			prop2: "alias2"
		});

		deepEqual(result, {
			prop1: "value1",
			alias2: "value2"
		});
	});

	test("alias all", function () {
		var result = JsonUtil.alias({
			prop1: "value1",
			prop2: "value2"
		},
		{
			prop1: "alias1",
			prop2: "alias2"
		});

		deepEqual(result, {
			alias1: "value1",
			alias2: "value2"
		});
	});

	test("alias empty", function () {
		var result = JsonUtil.alias({
		},
		{
			prop1: "alias1"
		});

		deepEqual(result, {});
	});
})();
