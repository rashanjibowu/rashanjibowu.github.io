define(["backbone", "text!../../templates/sidebar.html", "handlebars"], function(Backbone, template, Handlebars) {

	return Backbone.View.extend({

		initialize: function() {

		},

		className: "sidebar",

		render: function() {

			var compiled = Handlebars.compile(template);
			var html = compiled({});
			this.$el.html(html);
			return this;
		}

	});

});