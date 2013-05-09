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
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		"backbone.localStorage": {
			deps: ["backbone"]
		}
	}
});
