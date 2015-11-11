/**
 * Config file for Require.JS
 */
require.config({
	baseUrl: 'js/libs',
	paths: {
		init: '../init'
	},
	shim: {
		backbone: {
			deps: ["underscore", "jquery"],
			exports: 'Backbone'
		},
		underscore: {
			exports: '_'
		}
	}
});

// start the app
require(["init"], function(App) {
	App.start();
});
