require.config({
	shim: {
		"lib/jquery": {
			exports: "jQuery"
		},
		"lib/underscore": {
			exports: "_"
		},
		"lib/backbone": {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		"lib/backbone.localStorage": {
			deps: ["backbone"]
		}
	}
});
