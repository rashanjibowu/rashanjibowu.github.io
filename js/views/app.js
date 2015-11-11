/**
 * This is a composite view that contains the navigation bar, sidebar, and
 * content view
 */
define(["backbone", "../views/navbarView", "../views/mainView"],
	function(Backbone, NavbarView, MainView) {

	return Backbone.View.extend({

		initialize: function(options) {
			this.options = options;
		},

		className: "application fullheight",

		render: function() {
			// render navigation
			var navbarView = new NavbarView();
			this.$el.append(navbarView.render().el);

			// render the main view
			var mainView = new MainView(this.options);
			this.$el.append(mainView.render().el);

			// render to user
			$("body").html(this.$el);

			return this;
		}

	});

});
