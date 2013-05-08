(function ($) {
	module("Integrate", {
		setup: function () {
		}
	});

	test("editorView error require", function () {
		var $form = $("#edit-form");
		$("input[name=text1]", $form).val("");
		$("#add", $form).click();

		equal($("#error", $form).text(), "required");
	});
})(jQuery);
