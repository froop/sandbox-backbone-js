require.config({
	paths: {
		jquery:						"lib/jquery",
		underscore:					"lib/underscore",
		backbone:					"lib/backbone",
		"backbone.localStorage":	"lib/backbone.localStorage"
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
		},
		"backbone.localStorage": {
			deps: ["backbone"]
		}
	}
});
