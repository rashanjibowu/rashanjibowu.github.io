/**
 * Defines a main view that includes the sidebar and content view
 * It sits right below the navigation bar
 */
define(["backbone",
		"text!../../templates/main.html",
		"../views/sidebarView",
		"../views/contentView",
		"../views/vContentView",
		"../views/portfolioView",
		"../views/techStackView",
		"handlebars"],
		function(Backbone,
				 template,
				 SidebarView,
				 ContentView,
				 VerticalContentView,
				 PortfolioView,
				 TechStackView,
				 Handlebars) {

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
			var contentView;

			switch (this.options.content.class) {
				case "portfolio":
					contentView = new PortfolioView(this.options.content);
					break;
				case "techStack":
					contentView = new TechStackView(this.options.content);
					break;
				case "presentations":
				case "articles":
					contentView = new VerticalContentView(this.options.content);
					break;
				default:
					contentView = new ContentView(this.options.content);
			}

			// add the blue background to the body when home is selected
			if (this.options.content.class === "home") {
				$("body").addClass("home-bg");
			} else {
				$("body").removeClass("home-bg");
			}

			this.$(".content").append(contentView.render().el);

			return this;
		}

	});
});
