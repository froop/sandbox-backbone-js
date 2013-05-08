require.config({
	paths: {
		backbone: "lib/backbone",
		underscore: "lib/underscore"
	},
	shim: {
		"lib/jquery": {
			exports: "jQuery"
		},
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: ["underscore", "lib/jquery"],
			exports: "Backbone"
		},
		"lib/backbone.localStorage": {
			deps: ["backbone"]
		}
	}
});
