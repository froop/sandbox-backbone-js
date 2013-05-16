(function () {
	var JSON_DATA = {
		prop1: "value1",
		prop2: "value2"
	};
	module("JsonUtil", {
		setup: function () {
		}
	});

	test("alias frist", function () {
		var result = JsonUtil.alias(JSON_DATA, {
			prop1: "alias1"
		});

		deepEqual(result, {
			alias1: "value1",
			prop2: "value2"
		});
	});

	test("alias last", function () {
		var result = JsonUtil.alias(JSON_DATA, {
			prop2: "alias2"
		});

		deepEqual(result, {
			prop1: "value1",
			alias2: "value2"
		});
	});

	test("alias all", function () {
		var result = JsonUtil.alias(JSON_DATA, {
			prop1: "alias1",
			prop2: "alias2"
		});

		deepEqual(result, {
			alias1: "value1",
			alias2: "value2"
		});
	});

	test("alias empty", function () {
		var result = JsonUtil.alias({}, {
			prop1: "alias1"
		});

		deepEqual(result, {});
	});

	test("alias not exists", function () {
		var result = JsonUtil.alias(JSON_DATA, {
			prop0: "alias0",
			prop1: "alias1"
		});

		deepEqual(result, {
			alias1: "value1",
			prop2: "value2"
		});
	});
})();
