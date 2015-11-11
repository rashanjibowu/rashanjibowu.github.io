define(["backbone",
		"../views/app",
		"text!../models/content/home.json",
		"text!../models/content/portfolio.json",
		"text!../models/content/techStack.json",
		"text!../models/content/code.json",
		"text!../models/content/articles.json",
		"text!../models/content/presentations.json"],
	function(Backbone,
			 AppView,
			 homeContent,
			 portfolioContent,
			 techStackContent,
			 codeContent,
			 articlesContent,
			 presentationsContent) {

	return Backbone.Router.extend({

		initialize: function() {
			Backbone.history.start();
		},

		routes: {
			"": "home",
			"portfolio": "portfolio",
			"stack": "techStack",
			"code": "code",
			"articles": "articles",
			"presentations": "presentations"
		},

		home: function() {
			var view = new AppView(JSON.parse(homeContent));
			view.render();
		},

		portfolio: function() {
			var view = new AppView(JSON.parse(portfolioContent));
			view.render();
		},

		techStack: function() {
			var view = new AppView(JSON.parse(techStackContent));
			view.render();
		},

		code: function() {
			var view = new AppView(JSON.parse(codeContent));
			view.render();
		},

		articles: function() {
			var view = new AppView(JSON.parse(articlesContent));
			view.render();
		},

		presentations: function() {
			var view = new AppView(JSON.parse(presentationsContent));
			view.render();
		}
	});

});
