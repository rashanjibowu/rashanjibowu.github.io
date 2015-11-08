define(["backbone", "../views/navbarView", "../views/sidebarView", "../views/contentView"],
	function(Backbone, NavbarView, SidebarView, ContentView) {

	return Backbone.View.extend({

		initialize: function() {
			console.log("A view has been initialized!");
		},

		el: "body",

		render: function() {

			// render navigation
			var navbarView = new NavbarView();
			this.$el.append(navbarView.render().el);

			// render sidebar
			var sidebarView = new SidebarView();
			this.$el.append(sidebarView.render().el);

			var contentView = new ContentView();
			this.$el.append(contentView.render().el);

			return this;
		}

	});

});