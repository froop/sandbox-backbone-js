require.config({
	paths: {
		jquery:						"js/lib/jquery",
		underscore:					"js/lib/underscore",
		backbone:					"js/lib/backbone",
		"backbone.localStorage":	"js/lib/backbone.localStorage",
		"jquery.clonetemplate":		"js/lib/jquery.clonetemplate"
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
