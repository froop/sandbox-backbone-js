require.config({
	paths: {
		jquery:						"lib/jquery",
		backbone:					"lib/backbone",
		underscore:					"lib/underscore",
		"backbone.localStorage":	"lib/backbone.localStorage"
	},
	shim: {
		"jquery": {
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
