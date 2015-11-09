define(["backbone", "../views/navbarView", "../views/sidebarView", "../views/contentView"],
	function(Backbone, NavbarView, SidebarView, ContentView) {

	return Backbone.View.extend({

		initialize: function(options) {
			this.options = options;
		},

		el: "body",

		render: function() {

			this.$el.empty();

			// render navigation
			var navbarView = new NavbarView();
			this.$el.append(navbarView.render().el);

			// render sidebar
			if (this.options.showSidebar) {
				var sidebarView = new SidebarView(this.options.sidebar);
				this.$el.append(sidebarView.render().el);
			}

			// render the content
			var contentView = new ContentView(this.options.content);
			this.$el.append(contentView.render().el);

			return this;
		}

	});

});