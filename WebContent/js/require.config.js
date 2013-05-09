require.config({
	paths: {
		jquery:						"js/lib/jquery",
		underscore:					"js/lib/underscore",
		backbone:					"js/lib/backbone",
		"backbone.localStorage":	"js/lib/backbone.localStorage"
	},
	shim: {
		jquery: {
			exports: "jQuery"
		},
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		}
	}
});
