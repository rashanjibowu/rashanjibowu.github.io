/**
 * Defines a main view that includes the sidebar and content view
 * It sits right below the navigation bar
 */
define(["backbone", "text!../../templates/main.html", "../views/sidebarView", "../views/contentView", "handlebars"],
		function(Backbone, template, SidebarView, ContentView, Handlebars) {

	return Backbone.View.extend({

		initialize: function(options) {
			this.options = options;
		},

		className: "container-fluid fullheight",

		render: function() {

			var compiled = Handlebars.compile(template);
			var html = compiled({});

			this.$el.html(html);

			// render sidebar
			if (this.options.showSidebar) {
				var sidebarView = new SidebarView(this.options.sidebar);
				this.$(".sidebar").append(sidebarView.render().el);
			}

			// render the content
			var contentView = new ContentView(this.options.content);
			//this.$el.append(contentView.render().el);
			this.$(".content").append(contentView.render().el);

			return this;
		}

	});
});
