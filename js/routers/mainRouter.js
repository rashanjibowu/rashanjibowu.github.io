define(["backbone", "../views/mainView"], function(Backbone, MainView) {

	return Backbone.Router.extend({

		initialize: function() {
			console.log("A router has been initialized");
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

			var view = new MainView({
				showSidebar: true,
				sidebar: {
					text: "The human-centered, data-driven, technically empowered product manager"
				},
				content: {
					title: "Rashan Jibowu",
					subtitle: "The human-centered, data-driven, technically empowered product manager",
					elements: [
						{
							title: "Stuff I Worked On",
							url: "portfolio",
							icon: "code.png"
						},
						{
							title: "Tech I Use",
							url: "techstack",
							icon: "code.png"
						},
						{
							title: "Interesting Code",
							url: "code",
							icon: "code.png"
						},
						{
							title: "Writings",
							url: "articles",
							icon: "code.png"
						},
						{
							title: "Presentations",
							url: "presentations",
							icon: "code.png"
						}
					]
				}
			});

			view.render();
		},

		portfolio: function() {

			var view = new MainView({
				showSidebar: true,
				sidebar: {
					text: "Here is some stuff I am working on"
				},
				content: {
					title: "Portfolio",
					subtitle: "I am very busy!",
				}
			});

			view.render();
		},

		techStack: function() {

			var view = new MainView({
				showSidebar: true,
				sidebar: {
					text: "Javascript all the way!"
				},
				content: {
					title: "TechStack",
					subtitle: "I have a diversified tech stack",
				}
			});

			view.render();
		},

		code: function() {
			console.log("I love writing code...");
		},

		articles: function() {
			console.log("Here are my thoughts - worth more than penny...");
		},

		presentations: function() {
			console.log("My presies!");
		}
	});

});