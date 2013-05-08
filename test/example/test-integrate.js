(function ($) {
	module("Integrate", {
		setup: function () {
			new Example.AppView({
				el: "#example",
				editor: new Example.Editor(),
				items: new Example.Items([], {
					localStorage: new Backbone.LocalStorage("test-integrate-items")
				})
			});
			$("#clear").click();
		}
	});

	test("editorView error required", function () {
		var $form = $("#edit-form");
		$("input[name=text1]", $form).val("");
		$("#add", $form).click();

		equal($("#error", $form).text(), "required");
		equal($("#count", $form).text(), 0);
	});

	test("editorView error not change", function () {
		var $form = $("#edit-form");
		$("input[name=text1]", $form).val("a");
		$("#add", $form).click();
		$("input[name=text1]", $form).val("a");
		$("#add", $form).click();

		equal($("#error", $form).text(), "not change");
	});

	function submitItems() {
		var $form = $("#edit-form");
		$("input[name=text1]", $form).val("a");
		$("#add", $form).click();
		$("input[name=text1]", $form).val("b");
		$("#add", $form).click();
	}

	test("editorView submit", function () {
		var $form = $("#edit-form");
		submitItems();

		equal($("#count", $form).text(), "2");
	});

	test("ItemsView add", function () {
		var $list = $("#list1");
		submitItems();

		equal($("li", $list).length, 2);
		equal($(".text1", $list).eq(0).text(), "a");
		equal($(".text1", $list).eq(1).text(), "b");
	});

	test("ItemsView clear", function () {
		var $list = $("#list1");
		submitItems();

		$("#clear").click();

		equal($("li", $list).length, 0);
	});
})(jQuery);
