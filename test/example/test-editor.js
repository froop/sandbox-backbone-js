(function () {
	var editor = null;

	module("Editor", {
		setup: function () {
			editor = new Example.Editor();
		}
	});

	test("validate text1 required", function () {
		equal(editor.validate({}), "required");
		equal(editor.validate({text1: ""}), "required");
		equal(editor.validate({text1: "a"}), undefined);
	});

	test("validate text1 not change", function () {
		editor.set("text1", "a");

		equal(editor.validate({text1: "a"}), "not change");
		equal(editor.validate({text1: "b"}), undefined);
	});

	test("setText1 success", function () {
		editor.setText1("a");

		equal(editor.get("text1"), "a");
	});

	test("setText1 error", function () {
		var spy = this.spy();
		editor.set("text1", "a");
		editor.on("invalid", spy);

		editor.setText1("");

		ok(spy.calledOnce);
		equal(spy.getCall(0).args[1], "required");
		equal(editor.get("text1"), "a");
	});
})();
