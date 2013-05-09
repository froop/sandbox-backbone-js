// Webサーバーに置いて実行すること。example.htmlへのアクセスにAjax通信をしているため
require(["jquery", "backbone.localStorage",
		"js/example/models", "js/example/views", "text!example.html"],
		function ($, LocalStorage, Models, Views, html) {
	"use strict";
	module("Integrate", {
		setup: function () {
			$("#qunit-fixture").append(
					$("<div>").html(html).find("#example"));

			new Views.AppView({
				el: "#example",
				editor: new Models.Editor(),
				items: new Models.Items([], {
					localStorage: new LocalStorage("test-integrate-items")
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

	test("editorView clear", function () {
		var $form = $("#edit-form");
		$("input[name=text1]", $form).val("a");
		$("#add", $form).click();

		$("#clear").click();

		$("input[name=text1]", $form).val("a");
		$("#add", $form).click();

		equal($("#count", $form).text(), "1");
		equal($("#error", $form).text(), "");
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
});
