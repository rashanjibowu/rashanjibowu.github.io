/**
 * Config file for Require.JS
 */
require.config({
	baseUrl: 'js/libs',
	paths: {
		app: '../app'
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
require(["app"], function(App) {
	App.start();
});