define(["backbone", "../views/mainView"], function(Backbone, MainView) {

	return Backbone.Router.extend({

		initialize: function() {
			console.log("A router has been initialized");
			Backbone.history.start();
		},

		routes: {
			'': 'home'
		},

		home: function() {
			var view = new MainView();
			view.render();
		}
	});

});