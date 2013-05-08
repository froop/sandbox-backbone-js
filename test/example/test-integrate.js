(function ($) {
	module("Integrate", {
		setup: function () {
			new Example.AppView({
				el: "#example",
				editor: new Example.Editor(),
				items: new Example.Items([], {
					localStorage: new Backbone.LocalStorage("example-items")
				})
			});
			$("#clear").click();
		}
	});

	test("editorView error require", function () {
		var $form = $("#edit-form");
		$("input[name=text1]", $form).val("");
		$("#add", $form).click();

		equal($("#error", $form).text(), "required");
		equal($("#count", $form).text(), 0);
	});

	test("editorView submit", function () {
		var $form = $("#edit-form");
		var $list = $("#list1");
		$("input[name=text1]", $form).val("a");
		$("#add", $form).click();
		$("input[name=text1]", $form).val("b");
		$("#add", $form).click();

		equal($("#count", $form).text(), "2");
		equal($("li", $list).length, 2);
		equal($(".text1", $list).eq(0).text(), "a");
		equal($(".text1", $list).eq(1).text(), "b");
	});
})(jQuery);
