define(["backbone", "text!../../templates/navbar.html", "handlebars"], function(Backbone, template, Handlebars) {

	return Backbone.View.extend({

		initialize: function() {},

		tagName: "nav",

		className: "navbar navbar-default navbar-inverse",

		render: function() {
			var compiled = Handlebars.compile(template);
			var html = compiled({});
			this.$el.html(html);
			return this;
		}

	});

});
